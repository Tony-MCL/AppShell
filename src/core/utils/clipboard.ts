// ==== [BLOCK: Clipboard Utils] BEGIN ====
/** Del opp innlimt tekst (TSV/CSV) til matrise av strenger */
export function parseClipboard(text: string): string[][] {
// Normaliser linjer
const rows = text.replace(/\r\n?/g, '\n').split('\n').filter(r => r.length > 0)
return rows.map(r => {
// Prioriter TAB, ellers semikolon, ellers komma
const useTab = r.includes('\t')
const useSemicolon = !useTab && r.includes(';')
if (useTab) return r.split('\t')
if (useSemicolon) return r.split(';')
// Enkel CSV – ingen sitat-håndtering i v1
return r.split(',')
})
}


export function toTSV(matrix: (string|number|'')[][]): string {
return matrix.map(row => row.map(v => `${v}`).join('\t')).join('\n')
}
// ==== [BLOCK: Clipboard Utils] END ====
