/** Markdown table helpers shared by the blog renderer and the admin table builder. */

export type TableAlign = "left" | "center" | "right";

export type BlogTable = {
  header: string[];
  align: TableAlign[];
  rows: string[][];
};

const SEPARATOR_CELL = /^:?-{2,}:?$/;

export function isTableLine(line: string) {
  return line.trim().startsWith("|");
}

function splitRow(line: string): string[] {
  let s = line.trim();
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|") && !s.endsWith("\\|")) s = s.slice(0, -1);
  const cells: string[] = [];
  let current = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "\\" && s[i + 1] === "|") {
      current += "|";
      i++;
    } else if (ch === "|") {
      cells.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  cells.push(current.trim());
  return cells;
}

function isSeparatorRow(cells: string[]) {
  return cells.length > 0 && cells.every((c) => SEPARATOR_CELL.test(c.replace(/\s+/g, "")));
}

function alignOf(cell: string): TableAlign {
  const c = cell.replace(/\s+/g, "");
  if (c.startsWith(":") && c.endsWith(":")) return "center";
  if (c.endsWith(":")) return "right";
  return "left";
}

/** Parse consecutive `| a | b |` lines. First row is always treated as the header. */
export function parseMarkdownTable(lines: string[]): BlogTable | null {
  const rowsRaw = lines.filter(isTableLine).map(splitRow);
  if (rowsRaw.length === 0) return null;

  const header = rowsRaw[0];
  let align: TableAlign[] = header.map(() => "left");
  let bodyStart = 1;
  if (rowsRaw[1] && isSeparatorRow(rowsRaw[1])) {
    align = header.map((_, i) => alignOf(rowsRaw[1][i] ?? "---"));
    bodyStart = 2;
  }

  const cols = header.length;
  const rows = rowsRaw
    .slice(bodyStart)
    .filter((r) => !isSeparatorRow(r))
    .map((r) => Array.from({ length: cols }, (_, i) => r[i] ?? ""));

  return { header, align, rows };
}

function escapeCell(text: string) {
  return text.replace(/\r?\n/g, " ").replace(/\|/g, "\\|").trim();
}

export function buildMarkdownTable(table: BlogTable): string {
  const cols = table.header.length;
  const sep = Array.from({ length: cols }, (_, i) => {
    const a = table.align[i] ?? "left";
    if (a === "center") return ":---:";
    if (a === "right") return "---:";
    return "---";
  });
  const line = (cells: string[]) =>
    `| ${Array.from({ length: cols }, (_, i) => escapeCell(cells[i] ?? "") || " ").join(" | ")} |`;

  return [line(table.header), `| ${sep.join(" | ")} |`, ...table.rows.map(line)].join("\n");
}

/** Find the markdown table block (if any) that contains the given cursor offset. */
export function findTableAt(text: string, offset: number) {
  const lines = text.split("\n");
  let pos = 0;
  let cursorLine = -1;
  for (let i = 0; i < lines.length; i++) {
    const end = pos + lines[i].length;
    if (offset >= pos && offset <= end) {
      cursorLine = i;
      break;
    }
    pos = end + 1;
  }
  if (cursorLine === -1 || !isTableLine(lines[cursorLine])) return null;

  let first = cursorLine;
  while (first > 0 && isTableLine(lines[first - 1])) first--;
  let last = cursorLine;
  while (last < lines.length - 1 && isTableLine(lines[last + 1])) last++;

  const start = lines.slice(0, first).reduce((n, l) => n + l.length + 1, 0);
  const tableText = lines.slice(first, last + 1).join("\n");
  const table = parseMarkdownTable(lines.slice(first, last + 1));
  if (!table) return null;
  return { start, end: start + tableText.length, table };
}
