type DataRow = Record<string, any>;
export type AggregationType = 'sum' | 'avg' | 'count' | 'min' | 'max';
export interface AggregationConfig {
    dimensions: string[];
    measures: Array<{
        field: string;
        type: AggregationType;
        aggregate_over?: string;
    }>;
}
export interface Dimension {
    id: string;
    name: string;
    type: string;
}
export interface Measure {
    id: string;
    name: string;
    aggregate: AggregationType;
    field?: string;
}
export declare class DataAggregator {
    private data;
    constructor(data: DataRow[]);
    private createGroupKey;
    private calculateAggregation;
    aggregate(config: AggregationConfig): DataRow[];
}
export {};
