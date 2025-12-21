// src/core/TableTypes.ts

export type CellValue = string | number | null | undefined;

export type ColumnDef = {
  key: string;
  title: string;
  type?: "text" | "number" | "date" | "datetime";
  width?: number;
  summarizable?: boolean;
  isTitle?: boolean;
  dateRole?: "start" | "end";
};

export type RowData = {
  id: string;
  indent: number;
  cells: Record<string, CellValue>;
};

export type Selection = {
  r1: number;
  r2: number;
  c1: number;
  c2: number;
};

export type TableCoreUIOptions = {
  fontSizePx?: number;
  rowHeightPx?: number;
  colors?: {
    bg?: string;
    fg?: string;
    grid?: string;
    accent?: string;
    sel?: string;
    selBorder?: string;
    editBg?: string;
  };
};

/** Knutepunkt: når en celle commits (for app-lag/undo/validering) */
export type TableCoreCellCommit = {
  row: number;
  col: number;
  columnKey: string;
  prev: CellValue;
  next: CellValue;
};

export type TableCoreProps = {
  columns: ColumnDef[];
  rows: RowData[];
  onChange: (next: RowData[]) => void;

  // Sammendrag
  showSummary?: boolean;
  summaryValues?: Record<string, CellValue>;
  summaryTitle?: string;

  // UI-innstillinger fra appen
  ui?: TableCoreUIOptions;

  /** Visningsformat for datoer */
  dateFormat?: string; // f.eks. "dd.mm.yyyy", "mm/dd/yyyy", "yyyy-mm-dd"

  /** Hook for å åpne ekstern datepicker */
  onRequestDatePicker?: (info: {
    row: number;
    col: number;
    column: ColumnDef;
    currentValue: CellValue;
  }) => void;

  /** Knutepunkt: selection endres */
  onSelectionChange?: (sel: Selection) => void;

  /** Knutepunkt: editing start/stop */
  onEditingChange?: (editing: { r: number; c: number } | null) => void;

  /** Knutepunkt: commit av celleverdi */
  onCellCommit?: (evt: TableCoreCellCommit) => void;

  /**
   * ✅ Ny: Sticky “prosjektinfo”-linje over kolonneheader.
   * - Bruk demo-tekst nå.
   * - Senere kan Progress hente denne fra DB (prosjektmetadata).
   */
  headerInfoText?: string;
};
