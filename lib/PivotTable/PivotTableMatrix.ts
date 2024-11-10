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
        public columns: Array<string>,
        public pivots: Array<string>,
        public measures: Array<string>,
        public valueMapTree: ValueMapTree,
        public columnValueMap: Array<ValueMap>,
        public pivotValueMap: Array<ValueMap>,
    ) { }

    /**
     * This method creates a Matrix based on the payload. 
     * The Matrix size is based on different combinations on Pivot and Column values. 
     * Example: With PivotField1(3 values) x PivotField2(5 values) and ColumnField1(with 2 values)
     *          this maximum tootal matrix is PivotField1 x PivotField2 x ColumnField1 = 3 x 5 x 2 = 30 cells.
     * @param payload 
     * @param config 
     */
    static createFromPayload(payload: PivotTableMatrixPayload, config: PivotConfig): PivotTableMatrix {
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

        const fields = payload.fields.map((field) => field.id);
        const measures = fields.filter((field) => config.measures.includes(field));
        const columns = fields.filter((field) => !config.measures.includes(field) && !config.pivots.includes(field));
        const pivots = fields.filter((field) => config.pivots.includes(field));
        const pivotValueMaps = createValueMaps(payload.rows, pivots);
        const columnValueMaps = createValueMaps(payload.rows, columns);
        const valueMapTree = createDataTree(payload.rows, columns, columnValueMaps, pivots, pivotValueMaps, measures);
        return new PivotTableMatrix(columns, pivots, measures, valueMapTree, columnValueMaps, pivotValueMaps);
    }
}

export default PivotTableMatrix;