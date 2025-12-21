// src/App.tsx
import React, { useMemo, useState } from "react";
import TableCore from "./core/TableCore";
import type { ColumnDef, RowData } from "./core/TableTypes";

import Header from "./components/Header";
import HelpPanel from "./components/HelpPanel";
import Toolbar from "./components/Toolbar";

import "./styles/mcl-theme.css";
import "./styles/appshell.css";
import "./styles/header.css";
import "./styles/tablecore.css";

const columns: ColumnDef[] = [
  { key: "title", title: "Title", isTitle: true },
  { key: "start", title: "Start", type: "date", dateRole: "start" },
  { key: "end", title: "End", type: "date", dateRole: "end" },
  { key: "value", title: "Value", type: "number", summarizable: true },
];

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function dateDMY(year: number, month: number, day: number) {
  return `${pad2(day)}.${pad2(month)}.${year}`;
}

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function toDMY(d: Date) {
  return dateDMY(d.getFullYear(), d.getMonth() + 1, d.getDate());
}

function buildDemoRows(): RowData[] {
  const rows: RowData[] = [];

  // ✅ 5 rader med dummy-data i januar 2026
  // (1 parent + 4 children, så du kan teste collapse/indent med en gang)
  const base = new Date(2026, 0, 5); // 05.01.2026
  let id = 1;

  rows.push({
    id: `r${id++}`,
    indent: 0,
    cells: {
      title: "Phase 1 – Planning",
      start: toDMY(base), // 05.01.2026
      end: toDMY(addDays(base, 15)), // 20.01.2026
      value: 10,
    },
  });

  rows.push({
    id: `r${id++}`,
    indent: 1,
    cells: {
      title: "Define scope",
      start: toDMY(addDays(base, 1)), // 06.01.2026
      end: toDMY(addDays(base, 3)), // 08.01.2026
      value: 3,
    },
  });

  rows.push({
    id: `r${id++}`,
    indent: 1,
    cells: {
      title: "Stakeholder alignment",
      start: toDMY(addDays(base, 4)), // 09.01.2026
      end: toDMY(addDays(base, 7)), // 12.01.2026
      value: 4,
    },
  });

  rows.push({
    id: `r${id++}`,
    indent: 1,
    cells: {
      title: "Risk assessment",
      start: toDMY(addDays(base, 8)), // 13.01.2026
      end: toDMY(addDays(base, 11)), // 16.01.2026
      value: 4,
    },
  });

  rows.push({
    id: `r${id++}`,
    indent: 1,
    cells: {
      title: "Planning sign-off",
      start: toDMY(addDays(base, 12)), // 17.01.2026
      end: toDMY(addDays(base, 15)), // 20.01.2026
      value: 2,
    },
  });

  // ✅ Fyll opp til 100 rader totalt (95 tomme rader)
  for (let i = rows.length; i < 100; i++) {
    rows.push({
      id: `r${id++}`,
      indent: 0,
      cells: {
        title: "",
        start: "",
        end: "",
        value: "",
      },
    });
  }

  return rows;
}

type ViewMode = "single" | "split";
type ScrollYMode = "internal" | "shared";

export default function App() {
  const demoRows = useMemo(() => buildDemoRows(), []);
  const [rows, setRows] = useState<RowData[]>(demoRows);
  const [helpOpen, setHelpOpen] = useState(false);

  // Viktig: state gjør at TS ikke "låser" viewMode til en umulig literal
  // (og split-view er klar når du vil bytte til "split")
  const [viewMode] = useState<ViewMode>("single");

  const scrollY: ScrollYMode = viewMode === "split" ? "shared" : "internal";

  return (
    <div
      className="app-shell"
      data-scroll-y={scrollY === "shared" ? "shared" : undefined}
    >
      <Header onToggleHelp={() => setHelpOpen(true)} />
      <Toolbar left={null} center={null} right={null} />

      <main className="app-main">
        <div className="app-scrollhost">
          <div className="app-viewport">
            {viewMode === "single" ? (
              <section className="app-section app-section--table-card">
                <div className="app-table-wrapper">
                  <TableCore
                    columns={columns}
                    rows={rows}
                    onChange={setRows}
                    showSummary
                    headerInfoText="Project: Progress Demo • Customer: Example AS • Plan: v0 • Jan 2026"
                  />
                </div>
              </section>
            ) : (
              <div className="app-split">
                {/* LEFT: Table */}
                <section className="app-section app-split-panel">
                  <div className="app-split-panel-body">
                    <div className="app-split-panel-xscroll">
                      <div className="app-table-wrapper" style={{ marginTop: 0 }}>
                        <TableCore
                          columns={columns}
                          rows={rows}
                          onChange={setRows}
                          showSummary
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* RIGHT: Gantt (placeholder) */}
                <section className="app-section app-split-panel">
                  <div className="app-split-panel-body">
                    <div className="app-split-panel-xscroll">
                      <div
                        style={{
                          minWidth: 1200,
                          padding: 16,
                          color: "var(--mcl-muted)",
                        }}
                      >
                        Gantt (placeholder)
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </main>

      <HelpPanel open={helpOpen} onClose={() => setHelpOpen(false)} />

      <footer className="app-footer">
        <div className="app-footer-inner">
          <span>© 2025 Morning Coffee Labs</span>
          <span className="app-footer-links">
            <a href="#terms">Terms</a>
            <span className="app-footer-separator">•</span>
            <a href="#privacy">Privacy</a>
          </span>
          <span className="app-footer-icon" aria-hidden="true">
            ☕
          </span>
        </div>
      </footer>
    </div>
  );
}
