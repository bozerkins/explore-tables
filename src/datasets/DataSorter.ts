export type SortDirection = 'asc' | 'desc';

export interface SortParameter {
    field: string;
    direction: SortDirection;
}

export class DatasetSorter<T extends Record<string, any>> {
    private data: T[];

    constructor(data: T[]) {
        this.data = data;
    }

    sort(parameters: SortParameter[]): T[] {
        this.data.sort((a, b) => {
            for (const param of parameters) {
                const comparison = this.compareValues(
                    a[param.field],
                    b[param.field],
                    param.direction
                );

                if (comparison !== 0) {
                    return comparison;
                }
            }
            return 0;
        });

        return this.data;
    }

    private compareValues(a: any, b: any, direction: SortDirection): number {
        if (a === b) return 0;

        // Handle null/undefined values
        if (a == null) return direction === 'asc' ? -1 : 1;
        if (b == null) return direction === 'asc' ? 1 : -1;

        // Compare numbers
        if (typeof a === 'number' && typeof b === 'number') {
            return direction === 'asc' ? a - b : b - a;
        }

        // Compare strings (case-insensitive)
        if (typeof a === 'string' && typeof b === 'string') {
            const compareResult = a.toLowerCase().localeCompare(b.toLowerCase());
            return direction === 'asc' ? compareResult : -compareResult;
        }

        // Compare dates
        if (a instanceof Date && b instanceof Date) {
            return direction === 'asc' ? a.getTime() - b.getTime() : b.getTime() - a.getTime();
        }

        // Convert to strings for any other type
        const strA = String(a);
        const strB = String(b);
        return direction === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
    }
}