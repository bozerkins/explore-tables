import React from "react";
import PivotTableMatrix from "./PivotTableMatrix";
import { TableInterfaceConfig } from "./TableParts/TableInterfaces";

export interface AggregatePivotTableProperties {
    matrix: PivotTableMatrix;
    elements: TableInterfaceConfig;
}

export default ({ matrix, elements }: AggregatePivotTableProperties) => {
    const {
        TableContainer, TableRow, Table,
        ColumnTitle, ColumnValue,
        MeasureTitle, MeasureValue,
        PivotTitle, PivotValue
    } = elements;
    const pivotValueMapSize = matrix.pivotValueMap.length;
    const numberOfPivotValuesAdjustedForEmptyRows = !pivotValueMapSize ? 1 : pivotValueMapSize;
    const measuresAdjustedForPivots = Array(numberOfPivotValuesAdjustedForEmptyRows).fill(matrix.measures).flat();

    return (
        <TableContainer>
            <Table>
                <tbody>
                    {/* Draw pivots */}
                    {matrix.pivots.map(pivot => {
                        return <TableRow key={pivot}>
                            {/* Draw pivot titles */}
                            <PivotTitle field={pivot} title={matrix.displayField(pivot)} colSpan={matrix.columns.length} />
                            {/* Draw pivot values (when any pivot is selected) */}
                            {matrix.pivotValueMap.length > 0 &&
                                matrix.pivotValueMap.map(({ valueMap }, index) => {
                                    const value = valueMap.has(pivot) ? valueMap.get(pivot) : null;
                                    if (value === null) {
                                        return <PivotValue key={index} field={pivot} colSpan={matrix.measures.length} empty />
                                    }
                                    return <PivotValue key={index} field={pivot} value={value} colSpan={matrix.measures.length} />;
                                })}
                            {/* Draw default pivot value (when no pivots selected) */}
                            {matrix.pivotValueMap.length === 0 && (
                                <PivotValue field={pivot} colSpan={matrix.measures.length} empty />
                            )}
                        </TableRow>
                    })}
                    {/* Draw column and measure titles */}
                    <TableRow>
                        {/* Draw column titles */}
                        {matrix.columns.length > 0 &&
                            matrix.columns.map((column, index) => {
                                return <ColumnTitle key={index} field={column} title={matrix.displayField(column)} />
                            })}
                        {/* Draw special case when no column selected by any pivot selected */}
                        {matrix.columns.length === 0 && matrix.pivots.length > 0 && (
                            <ColumnTitle empty />
                        )}
                        {/* Draw measure titles */}
                        {matrix.measures.length > 0 &&
                            measuresAdjustedForPivots.map((measure, index) => {
                                return <MeasureTitle key={index} field={measure} title={matrix.displayField(measure)} />
                            })}
                        {/* Draw special case when no measures selected by any pivot selected */}
                        {matrix.measures.length === 0 && matrix.pivots.length > 0 && (
                            Array(numberOfPivotValuesAdjustedForEmptyRows)
                                .fill({})
                                .map((measure, index) => {
                                    return <MeasureTitle key={index} field={measure} empty />
                                }))}
                    </TableRow>
                    {/* Draw rows */}
                    {matrix.valueMapTree.map(({ columnValueMap, children }, index) => {
                        return <TableRow key={index}>
                            {/* Draw column values */}
                            {matrix.columns.map((column, index) => {
                                const value = columnValueMap.has(column) ? columnValueMap.get(column) : null;
                                if (value === null) {
                                    return <ColumnValue key={index} field={column} empty />
                                }
                                return <ColumnValue key={index} field={column} value={value} />
                            })}
                            {/* Draw special case when no column selected by any pivot selected */}
                            {matrix.columns.length === 0 && matrix.pivots.length > 0 && (
                                <ColumnValue empty />
                            )}
                            {/* Draw measure values */}
                            {children.map(({ measureValueMap }, index) => {
                                return <React.Fragment key={index}>
                                    {[...measureValueMap.entries()].map(([measure, value], index) => {
                                        if (value === null) {
                                            // TODO: add field 
                                            return <MeasureValue key={index} field={measure} empty />
                                        }
                                        // TODO: add field 
                                        return <MeasureValue key={index} field={measure} value={value} />
                                    })}
                                    {measureValueMap.size === 0 && (<MeasureValue empty />)}
                                </React.Fragment>
                            })}
                        </TableRow>;
                    })}
                    {matrix.valueMapTree.length === 0 && (
                        <TableRow>
                            {/* Draw empty column values */}
                            {matrix.columns.map((column, index) => <ColumnValue key={index} field={column} empty />)}
                            {/* Draw special case when no column selected by any pivot selected */}
                            {matrix.columns.length === 0 && matrix.pivots.length > 0 && (
                                <ColumnValue empty />
                            )}
                            {/* Draw empty measure values */}
                            {matrix.measures.map((measure, index) => <MeasureValue key={index} field={measure} empty />)}
                            {/* Draw special case when no measures selected */}
                            {matrix.measures.length === 0 && (<MeasureValue empty />)}
                        </TableRow>
                    )}
                </tbody>
            </Table>
        </TableContainer>
    );
}