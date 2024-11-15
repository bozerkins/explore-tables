export interface PivotTableMatrixPayload {
    rows: Array<{ [key: string]: any; }>;
    fields: Array<{ id: string; name?: string; }>;
}

export interface PivotConfig {
    measures: Array<string>;
    dimensions: Array<string>;
    pivots: Array<string>;
}