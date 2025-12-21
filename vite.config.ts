import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isCI = process.env.GITHUB_ACTIONS === "true";
const base = isCI && repoName ? `/${repoName}/` : "/";

export default defineConfig({
  plugins: [react()],
  base,
});
