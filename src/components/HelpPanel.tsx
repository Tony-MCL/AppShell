// src/components/HelpPanel.tsx
import React, { useEffect, useState } from "react";
import { useI18n } from "../i18n";
import "../styles/panel.css";

type HelpPanelProps = {
  open: boolean;
  onClose: () => void;
};

export default function HelpPanel({ open, onClose }: HelpPanelProps) {
  const { t } = useI18n();

  // Intern state: vi viser panelet litt lenger for å spille exit-animasjon
  const [shouldRender, setShouldRender] = useState(open);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
    } else {
      // Vent til animasjonen er ferdig (200ms)
      const timeout = setTimeout(() => setShouldRender(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  // Lukk på Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!shouldRender) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`mcl-panel-overlay ${open ? "open" : "closing"}`}
      onClick={handleOverlayClick}
    >
      <aside
        className={`mcl-help-panel ${open ? "open" : "closing"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mcl-help-header">
          <h2 className="mcl-help-title">{t("help.title")}</h2>
          <button
            type="button"
            className="mcl-help-close"
            onClick={onClose}
            aria-label="Close help"
          >
            ✕
          </button>
        </div>

        <div className="mcl-help-body">
          <p>{t("help.text1")}</p>
          <p>{t("help.text2")}</p>
          <p>{t("help.text3")}</p>
        </div>
      </aside>
    </div>
  );
}
