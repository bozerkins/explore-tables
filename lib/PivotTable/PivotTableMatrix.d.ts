import { PivotConfig, PivotTableMatrixPayload } from '../types';
type ValueMap = {
    hash: string;
    valueMap: Map<string, any>;
};
type ValueMapTree = Array<{
    columnValueMap: Map<string, any>;
    children: Array<{
        pivotValueMap: Map<string, any>;
        measureValueMap: Map<string, any>;
    }>;
}>;
declare class PivotTableMatrix {
    measures: Array<string>;
    columns: Array<string>;
    pivots: Array<string>;
    valueMapTree: ValueMapTree;
    columnValueMap: Array<ValueMap>;
    pivotValueMap: Array<ValueMap>;
    fieldMap: Map<string, string>;
    constructor(measures: Array<string>, columns: Array<string>, pivots: Array<string>, valueMapTree: ValueMapTree, columnValueMap: Array<ValueMap>, pivotValueMap: Array<ValueMap>, fieldMap: Map<string, string>);
    displayField(field: string): string;
    /**
     * This method creates a Matrix based on the payload.
     * The Matrix size is based on different combinations on Pivot and Column values.
     * Example: With PivotField1(3 values) x PivotField2(5 values) and ColumnField1(with 2 values)
     *          this maximum tootal matrix is PivotField1 x PivotField2 x ColumnField1 = 3 x 5 x 2 = 30 cells.
     * @param payload
     * @param config
     */
    static createFromPayload(payload: PivotTableMatrixPayload, config: PivotConfig): PivotTableMatrix;
}
export default PivotTableMatrix;
