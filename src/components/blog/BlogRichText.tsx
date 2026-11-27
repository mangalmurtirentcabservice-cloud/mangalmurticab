import type { ReactNode } from "react";
import { isTableLine, parseMarkdownTable, type TableAlign } from "@/lib/blog-table";

function formatInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-navy">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const alignClass: Record<TableAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function BlogTableView({ lines }: { lines: string[] }) {
  const table = parseMarkdownTable(lines);
  if (!table) return null;

  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table className="w-full min-w-[420px] border-collapse border border-black/[0.08] text-[14px] leading-snug">
        <thead className="bg-[#f6f7f9]">
          <tr>
            {table.header.map((cell, i) => (
              <th
                key={i}
                scope="col"
                className={`border border-black/[0.08] px-3 py-2.5 font-semibold text-navy ${alignClass[table.align[i] ?? "left"]}`}
              >
                {formatInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        {table.rows.length > 0 ? (
          <tbody>
            {table.rows.map((row, r) => (
              <tr key={r} className="even:bg-[#fafbfc]">
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={`border border-black/[0.08] px-3 py-2.5 text-navy/70 ${alignClass[table.align[c] ?? "left"]}`}
                  >
                    {formatInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
    </div>
  );
}

function TextBlock({ block }: { block: string }) {
  const lines = block
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const isList = lines.length > 0 && lines.every((l) => l.startsWith("- "));

  if (isList) {
    return (
      <ul className="list-disc space-y-1 pl-5 text-[15px] leading-[1.65] text-navy/65">
        {lines.map((line, j) => (
          <li key={j}>{formatInline(line.replace(/^- /, ""))}</li>
        ))}
      </ul>
    );
  }

  if (block.startsWith("**") && block.includes(":**")) {
    const [boldPart, ...rest] = block.split(":**");
    return (
      <p className="text-[15px] leading-[1.65] text-navy/65">
        <strong className="font-semibold text-navy">{boldPart.replace(/\*\*/g, "")}:</strong>
        {formatInline(rest.join(":**"))}
      </p>
    );
  }

  return <p className="text-[15px] leading-[1.65] text-navy/65">{formatInline(block)}</p>;
}

/** Split a block into runs of table lines and plain-text lines. */
function segmentBlock(block: string) {
  const segments: { table: boolean; lines: string[] }[] = [];
  for (const line of block.split("\n")) {
    const table = isTableLine(line);
    const last = segments[segments.length - 1];
    if (last && last.table === table) last.lines.push(line);
    else segments.push({ table, lines: [line] });
  }
  return segments;
}

export default function BlogRichText({ text }: { text: string }) {
  const blocks = text.replace(/\r\n/g, "\n").trim().split(/\n\n+/);

  return (
    <div className="space-y-2.5">
      {blocks.flatMap((block, i) =>
        segmentBlock(block).map((seg, j) => {
          const key = `${i}-${j}`;
          if (seg.table) return <BlogTableView key={key} lines={seg.lines} />;
          const content = seg.lines.join("\n").trim();
          return content ? <TextBlock key={key} block={content} /> : null;
        })
      )}
    </div>
  );
}
