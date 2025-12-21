// ==== [BLOCK: DataSource] BEGIN ====
import type { RowData } from './TableTypes'


/**
* Abstraksjon for senere DB-integrasjon. Nå: enkel minne-implementasjon.
*/
export interface DataSource {
load(): Promise<RowData[]>
save(rows: RowData[]): Promise<void>
}


export class MemoryDataSource implements DataSource {
private data: RowData[]
constructor(initial: RowData[] = []) {
this.data = initial
}
async load() { return structuredClone(this.data) }
async save(rows: RowData[]) { this.data = structuredClone(rows) }
}
// ==== [BLOCK: DataSource] END ====
