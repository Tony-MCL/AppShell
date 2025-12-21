// src/components/Toolbar.tsx
import React from "react";
import type { ReactNode } from "react";
import "../styles/toolbar.css";

export type ToolbarProps = {
  /** App-defined content shown on the left side of the toolbar */
  left?: ReactNode;
  /** App-defined content shown in the center of the toolbar */
  center?: ReactNode;
  /** App-defined content shown on the right side of the toolbar */
  right?: ReactNode;
  /** Optional extra class for the root element */
  className?: string;
};

/**
 * MCL Toolbar (AppShell)
 * - AppShell owns placement + styling.
 * - Apps own the content via slots (left/center/right).
 *
 * Keep this component generic: no app semantics, no routing, no view state.
 */
const Toolbar: React.FC<ToolbarProps> = ({ left, center, right, className }) => {
  return (
    <nav className={["mcl-toolbar", className].filter(Boolean).join(" ")}>
      <div className="mcl-toolbar-inner">
        <div className="mcl-toolbar-left">{left}</div>
        <div className="mcl-toolbar-center">{center}</div>
        <div className="mcl-toolbar-right">{right}</div>
      </div>
    </nav>
  );
};

export default Toolbar;
