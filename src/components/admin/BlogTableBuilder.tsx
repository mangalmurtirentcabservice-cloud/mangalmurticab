"use client";

import { useState } from "react";
import { AlignCenter, AlignLeft, AlignRight, Minus, Plus, X } from "lucide-react";
import type { BlogTable, TableAlign } from "@/lib/blog-table";

const MAX_COLS = 8;
const MAX_ROWS = 40;

export function emptyBlogTable(cols = 3, rows = 3): BlogTable {
  return {
    header: Array.from({ length: cols }, (_, i) => `Column ${i + 1}`),
    align: Array.from({ length: cols }, () => "left" as TableAlign),
    rows: Array.from({ length: rows }, () => Array.from({ length: cols }, () => "")),
  };
}

const cellClass =
  "w-full min-w-[110px] border-0 bg-transparent px-2 py-1.5 text-[13px] text-navy outline-none placeholder:text-navy/25 focus:bg-brand/[0.04]";

export default function BlogTableBuilder({
  initial,
  isEditing,
  onInsert,
  onCancel,
}: {
  initial: BlogTable;
  isEditing: boolean;
  onInsert: (table: BlogTable) => void;
  onCancel: () => void;
}) {
  const [table, setTable] = useState<BlogTable>(initial);
  const [error, setError] = useState("");
  const cols = table.header.length;

  function setHeader(c: number, value: string) {
    setTable((t) => ({ ...t, header: t.header.map((h, i) => (i === c ? value : h)) }));
  }

  function setCell(r: number, c: number, value: string) {
    setTable((t) => ({
      ...t,
      rows: t.rows.map((row, i) => (i === r ? row.map((v, j) => (j === c ? value : v)) : row)),
    }));
  }

  function setAlign(c: number, align: TableAlign) {
    setTable((t) => ({ ...t, align: t.align.map((a, i) => (i === c ? align : a)) }));
  }

  function addColumn() {
    if (cols >= MAX_COLS) return;
    setTable((t) => ({
      header: [...t.header, `Column ${t.header.length + 1}`],
      align: [...t.align, "left"],
      rows: t.rows.map((r) => [...r, ""]),
    }));
  }

  function removeColumn(c: number) {
    if (cols <= 1) return;
    setTable((t) => ({
      header: t.header.filter((_, i) => i !== c),
      align: t.align.filter((_, i) => i !== c),
      rows: t.rows.map((r) => r.filter((_, i) => i !== c)),
    }));
  }

  function addRow() {
    if (table.rows.length >= MAX_ROWS) return;
    setTable((t) => ({ ...t, rows: [...t.rows, Array.from({ length: cols }, () => "")] }));
  }

  function removeRow(r: number) {
    setTable((t) => ({ ...t, rows: t.rows.filter((_, i) => i !== r) }));
  }

  /** Paste a block copied from Excel / Google Sheets (tab-separated) starting at this cell. */
  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>, startRow: number, startCol: number) {
    const text = e.clipboardData.getData("text/plain");
    if (!text.includes("\t") && !text.includes("\n")) return;
    e.preventDefault();

    const grid = text
      .replace(/\r\n/g, "\n")
      .replace(/\n+$/, "")
      .split("\n")
      .map((line) => line.split("\t").map((v) => v.trim()));

    setTable((t) => {
      const neededCols = Math.min(MAX_COLS, Math.max(t.header.length, startCol + Math.max(...grid.map((g) => g.length))));
      const header = [...t.header];
      const align = [...t.align];
      while (header.length < neededCols) {
        header.push(`Column ${header.length + 1}`);
        align.push("left");
      }
      let rows = t.rows.map((r) => [...r, ...Array.from({ length: neededCols - r.length }, () => "")]);

      // startRow -1 means the header row.
      grid.forEach((values, gi) => {
        const r = startRow + gi;
        values.forEach((value, vi) => {
          const c = startCol + vi;
          if (c >= neededCols) return;
          if (r === -1) {
            header[c] = value;
          } else if (r < MAX_ROWS) {
            while (rows.length <= r) rows.push(Array.from({ length: neededCols }, () => ""));
            rows[r][c] = value;
          }
        });
      });
      rows = rows.slice(0, MAX_ROWS);
      return { header, align, rows };
    });
  }

  function submit() {
    if (table.header.every((h) => !h.trim())) {
      setError("Add at least one column heading.");
      return;
    }
    const rows = table.rows.filter((r) => r.some((v) => v.trim()));
    onInsert({ ...table, rows });
  }

  const alignButtons: { value: TableAlign; icon: typeof AlignLeft; label: string }[] = [
    { value: "left", icon: AlignLeft, label: "Align left" },
    { value: "center", icon: AlignCenter, label: "Align center" },
    { value: "right", icon: AlignRight, label: "Align right" },
  ];

  return (
    <div className="rounded-xl border border-brand/25 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] font-semibold text-navy">
            {isEditing ? "Edit table" : "Insert table"}
          </p>
          <p className="mt-0.5 text-[11px] text-navy/45">
            First row is the heading. Tip: copy cells from Excel / Google Sheets and paste into any cell.
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-navy/40 hover:bg-black/[0.04] hover:text-navy"
          aria-label="Close table builder"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 max-h-[340px] overflow-auto border border-black/[0.08]">
        <table className="border-collapse text-left">
          <thead>
            <tr className="bg-[#fafbfc]">
              <th className="w-8 border border-black/[0.06]" />
              {table.header.map((_, c) => (
                <th key={c} className="border border-black/[0.06] px-1 py-1">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center">
                      {alignButtons.map(({ value, icon: Icon, label }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setAlign(c, value)}
                          aria-label={`${label} column ${c + 1}`}
                          className={`flex h-6 w-6 items-center justify-center rounded ${
                            table.align[c] === value ? "bg-brand/10 text-brand" : "text-navy/30 hover:text-navy"
                          }`}
                        >
                          <Icon className="h-3 w-3" />
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeColumn(c)}
                      disabled={cols <= 1}
                      aria-label={`Remove column ${c + 1}`}
                      className="flex h-6 w-6 items-center justify-center rounded text-navy/30 hover:text-brand disabled:opacity-30"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
            <tr className="bg-[#f3f4f6]">
              <th className="border border-black/[0.06] px-1 text-[10px] font-semibold uppercase text-navy/35">
                H
              </th>
              {table.header.map((h, c) => (
                <th key={c} className="border border-black/[0.06] p-0">
                  <input
                    value={h}
                    onChange={(e) => setHeader(c, e.target.value)}
                    onPaste={(e) => handlePaste(e, -1, c)}
                    placeholder="Heading"
                    className={`${cellClass} font-semibold`}
                    aria-label={`Heading ${c + 1}`}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => (
              <tr key={r}>
                <td className="border border-black/[0.06] px-0.5 text-center">
                  <button
                    type="button"
                    onClick={() => removeRow(r)}
                    aria-label={`Remove row ${r + 1}`}
                    className="flex h-6 w-6 items-center justify-center rounded text-navy/30 hover:text-brand"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                </td>
                {row.map((value, c) => (
                  <td key={c} className="border border-black/[0.06] p-0">
                    <input
                      value={value}
                      onChange={(e) => setCell(r, c, e.target.value)}
                      onPaste={(e) => handlePaste(e, r, c)}
                      className={cellClass}
                      aria-label={`Row ${r + 1}, column ${c + 1}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={addRow}
            disabled={table.rows.length >= MAX_ROWS}
            className="inline-flex items-center gap-1 rounded-lg border border-black/[0.1] px-2.5 py-1.5 text-[12px] font-semibold text-navy/70 hover:border-brand/40 hover:text-brand disabled:opacity-40"
          >
            <Plus className="h-3 w-3" /> Row
          </button>
          <button
            type="button"
            onClick={addColumn}
            disabled={cols >= MAX_COLS}
            className="inline-flex items-center gap-1 rounded-lg border border-black/[0.1] px-2.5 py-1.5 text-[12px] font-semibold text-navy/70 hover:border-brand/40 hover:text-brand disabled:opacity-40"
          >
            <Plus className="h-3 w-3" /> Column
          </button>
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-3 py-1.5 text-[12px] font-semibold text-navy/50 hover:text-navy"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            className="rounded-lg bg-brand px-3.5 py-1.5 text-[12px] font-semibold text-white"
          >
            {isEditing ? "Update table" : "Insert table"}
          </button>
        </div>
      </div>
      {error ? <p className="mt-2 text-[12px] text-brand">{error}</p> : null}
    </div>
  );
}
