// src/components/Header.tsx
import React from "react";
import LangToggle from "./LangToggle";
import ThemeToggle from "./ThemeToggle";
import "../styles/header.css";

// Bruk URL for logo (app-spesifikk)
const logoUrl = new URL("../assets/mcl-logo.png", import.meta.url).href;

type HeaderProps = {
  onToggleHelp: () => void;
};

/**
 * MCL Standard Header v1.1
 * Variant for apps som bruker ferdige header-logoer med navn inkludert.
 */
export default function Header({ onToggleHelp }: HeaderProps) {
  return (
    <header className="mcl-header">
      <div className="mcl-header-inner">

        {/* Venstre: kun logo */}
        <div className="mcl-header-left">
          <div className="mcl-logo-wrap">
            <img
              src={logoUrl}
              alt="App logo"
              className="mcl-logo"
            />
          </div>
        </div>

        {/* Høyre: språk, tema, hjelp */}
        <div className="mcl-header-right">
          <LangToggle />
          <ThemeToggle />
          <button
            type="button"
            className="mcl-header-icon-button"
            onClick={onToggleHelp}
          >
            <span aria-hidden="true">❓</span>
            <span className="mcl-header-icon-label">Help</span>
          </button>
        </div>
      </div>
    </header>
  );
}
