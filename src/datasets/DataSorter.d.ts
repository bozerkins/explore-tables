export type SortDirection = 'asc' | 'desc';
export interface SortParameter {
    field: string;
    direction: SortDirection;
}
export declare class DatasetSorter<T extends Record<string, any>> {
    private data;
    constructor(data: T[]);
    sort(parameters: SortParameter[]): T[];
    private compareValues;
}
