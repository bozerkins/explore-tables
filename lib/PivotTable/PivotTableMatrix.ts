import { PivotConfig, PivotTableMatrixPayload } from "../types";

const delimiter = "|";

type ValueMap = { hash: string, valueMap: Map<string, any> };
type ValueMapTreeInternal = Map<string, {
    columnValueMap: Map<string, any>,
    children: Map<string, {
        pivotValueMap: Map<string, any>,
        measureValueMap: Map<string, any>
    }>
}>;
type ValueMapTree = Array<{
    columnValueMap: Map<string, any>,
    children: Array<{
        pivotValueMap: Map<string, any>,
        measureValueMap: Map<string, any>
    }>
}>;

class PivotTableMatrix {
    constructor(
        public measures: Array<string>,
        public columns: Array<string>,
        public pivots: Array<string>,
        public valueMapTree: ValueMapTree,
        public columnValueMap: Array<ValueMap>,
        public pivotValueMap: Array<ValueMap>,
        public fieldMap: Map<string, string>
    ) { }

    displayField(field: string): string {
        const displayField = this.fieldMap.get(field);
        if (displayField === undefined) {
            throw new Error(`Field ${field} is undefined in the field map`);
        }
        return displayField;
    }

    /**
     * This method creates a Matrix based on the payload. 
     * The Matrix size is based on different combinations on Pivot and Column values. 
     * Example: With PivotField1(3 values) x PivotField2(5 values) and ColumnField1(with 2 values)
     *          this maximum tootal matrix is PivotField1 x PivotField2 x ColumnField1 = 3 x 5 x 2 = 30 cells.
     * @param payload 
     * @param config 
     */
    static createFromPayload(payload: PivotTableMatrixPayload, config: PivotConfig): PivotTableMatrix {
        const fields = payload.fields.map((field) => field.id);
        const measures = config.measures.filter(measure => fields.includes(measure));
        const columns = config.dimensions.filter(dimension => fields.includes(dimension));
        const pivots = config.pivots.filter(pivot => fields.includes(pivot));
        const rows = isArrayOfArraysFormat(payload.rows)
            ? convertToArrayOfObjects(payload.rows as Array<Array<any>>, fields)
            : payload.rows;

        const pivotValueMaps = createValueMaps(rows, pivots);
        const columnValueMaps = createValueMaps(rows, columns);
        const valueMapTree = createDataTree(rows, columns, columnValueMaps, pivots, pivotValueMaps, measures);
        const fieldMap = createFieldMap(payload.fields);
        return new PivotTableMatrix(measures, columns, pivots, valueMapTree, columnValueMaps, pivotValueMaps, fieldMap);
    }
}

function isArrayOfArraysFormat(rows: Array<any>) {
    if (!Array.isArray(rows)) {
        throw new Error("Property \"rows\" must be an array of elements");
    }

    for (let row of rows) {
        if (!Array.isArray(row)) {
            return false;
        }
    }

    return true;
}

function convertToArrayOfObjects(rows: Array<Array<any>>, fields: string[]): Array<Record<string, any>> {
    return rows.map(row => {
        return fields.reduce((obj, field, index) => {
            // Only add the value if it exists in the row array
            if (row[index] !== undefined) {
                obj[field] = row[index];
            }
            return obj;
        }, {} as Record<string, any>);
    });
}

function createValueMaps(rows: Array<any>, fields: Array<string>): Array<ValueMap> {
    const valueMaps = new Map<string, { hash: string, valueMap: Map<string, any> }>();

    for (const row of rows) {
        const values = fields.map((field) => row[field]);
        const hash = values.join(delimiter);
        if (valueMaps.has(hash)) {
            continue;
        }

        const entry: ValueMap = { hash, valueMap: new Map() };
        fields.forEach((field) => {
            entry.valueMap.set(field, row[field]);
        });
        valueMaps.set(hash, entry);
    }

    // get values
    return Array.from(valueMaps.values());
}

/**
 * Create a data tree to render everything more efficiently
 *
 * @param {*} rows
 * @param {*} columns
 * @param {*} columnValueMaps
 * @param {*} pivots
 * @param {*} pivotValueMaps
 * @param {*} measures
 *
 * @returns Array<Array<Map{[key: string]: any}>>
 */
function createDataTree(
    rows: Array<{ [key: string]: any }>,
    columns: Array<string>,
    columnValueMaps: Array<ValueMap>,
    pivots: Array<string>,
    pivotValueMaps: Array<ValueMap>,
    measures: Array<string>
): ValueMapTree {
    // create measure collection
    const valueMapTree: ValueMapTreeInternal = new Map();

    // create all the keys and maps in the collection
    columnValueMaps.forEach((columnValueMap) => {
        // create node in tree
        const columnHash = columnValueMap.hash;
        const columnNode = {
            columnValueMap: columnValueMap.valueMap,
            children: new Map(),
        };
        valueMapTree.set(columnHash, columnNode);
        // fill with values
        pivotValueMaps.forEach((pivotValueMap) => {
            // create node in tree
            const pivotHash = pivotValueMap.hash;
            const pivotNode = {
                pivotValueMap: pivotValueMap.valueMap, // TODO: this might not be needed
                measureValueMap: new Map(),
            };
            columnNode.children.set(pivotHash, pivotNode);
            // set fields with default values
            measures.forEach((field) => {
                // fill with empty values
                pivotNode.measureValueMap.set(field, null);
            });
        });
    });
    // fill measure collection with values
    rows.forEach((row) => {
        const columnHash = columns.map((field) => row[field]).join(delimiter);
        const pivotHash = pivots.map((field) => row[field]).join(delimiter);
        const measureValueMap = valueMapTree?.get(columnHash)?.children?.get(pivotHash)?.measureValueMap;
        if (!measureValueMap) {
            throw new Error(`Could not find measureValueMap for columnHash: ${columnHash} and pivotHash: ${pivotHash}`);
        }
        measures.forEach(field => measureValueMap.set(field, row[field]));
    });

    // return array of arrays
    return Array.from(valueMapTree.values()).map(({ columnValueMap, children }) => {
        return { columnValueMap, children: Array.from(children.values()) };
    });
}

function createFieldMap(fields: Array<{ id: string; name?: string; }>) {
    const fieldMap = new Map<string, string>();
    fields.forEach(field => {
        if (fieldMap.has(field.id)) {
            return;
        }
        fieldMap.set(field.id, field.name || field.id);
    });
    return fieldMap;
}


export default PivotTableMatrix;