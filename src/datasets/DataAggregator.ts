type DataRow = Record<string, any>;
export type AggregationType = 'sum' | 'avg' | 'count' | 'min' | 'max';

export interface AggregationConfig {
    dimensions: string[];
    measures: Array<{
        field: string;
        type: AggregationType;
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
}


export class DataAggregator {
    private data: DataRow[];

    constructor(data: DataRow[]) {
        this.data = data;
    }

    private createGroupKey(row: DataRow, dimensions: string[]): string {
        return dimensions.map(dim => row[dim]).join('|');
    }

    private calculateAggregation(values: number[], type: AggregationType): number {
        switch (type) {
            case 'sum':
                return values.reduce((acc, val) => acc + val, 0);
            case 'avg':
                return values.reduce((acc, val) => acc + val, 0) / values.length;
            case 'count':
                return values.length;
            case 'min':
                return Math.min(...values);
            case 'max':
                return Math.max(...values);
            default:
                throw new Error(`Unsupported aggregation type: ${type}`);
        }
    }

    aggregate(config: AggregationConfig): DataRow[] {
        const groupedData = new Map<string, DataRow>();

        // Group the data by dimensions
        this.data.forEach(row => {
            const groupKey = this.createGroupKey(row, config.dimensions);

            if (!groupedData.has(groupKey)) {
                const newRow: DataRow = {};
                // Initialize dimension values
                config.dimensions.forEach(dim => {
                    newRow[dim] = row[dim];
                });
                // Initialize measures with empty arrays
                config.measures.forEach(measure => {
                    newRow[`${measure.field}_values`] = [];
                });
                groupedData.set(groupKey, newRow);
            }

            // Collect values for measures
            config.measures.forEach(measure => {
                const currentRow = groupedData.get(groupKey)!;
                currentRow[`${measure.field}_values`].push(row[measure.field]);
            });
        });

        // Calculate final aggregations
        return Array.from(groupedData.values()).map(groupedRow => {
            const resultRow: DataRow = {};

            // Copy dimension values
            config.dimensions.forEach(dim => {
                resultRow[dim] = groupedRow[dim];
            });

            // Calculate aggregations for measures
            config.measures.forEach(measure => {
                const values = groupedRow[`${measure.field}_values`];
                resultRow[measure.field] = this.calculateAggregation(values, measure.type);
                delete groupedRow[`${measure.field}_values`];
            });

            return resultRow;
        });
    }
}