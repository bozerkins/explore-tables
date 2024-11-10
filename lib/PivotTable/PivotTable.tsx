import React from "react";
import PivotTableMatrix from "./PivotTableMatrix";
import PivotTitle from "./TableParts/PivotTitle";
import PivotValue from "./TableParts/PivotValue";
import TableContainer from "./TableParts/TableContainer";
import Table from "./TableParts/Table";
import ColumnTitle from "./TableParts/ColumnTitle";
import MeasureTitle from "./TableParts/MeasureTitle";
import ColumnValue from "./TableParts/ColumnValue";
import MeasureValue from "./TableParts/MeasureValue";

export const emptySign = "∅";

export const PivotTable = ({ matrix }: { matrix: PivotTableMatrix }) => {
    console.log("Received matrix", matrix);
    const pivotValueMapSize = matrix.pivotValueMap.length;
    const numberOfPivotValuesAdjustedForEmptyRows = !pivotValueMapSize ? 1 : pivotValueMapSize;
    const measuresAdjustedForPivots = Array(numberOfPivotValuesAdjustedForEmptyRows).fill(matrix.measures).flat();

    return <TableContainer>
        <Table border={1} cellPadding={10}>
            <tbody>
                {/* Draw pivots */}
                {matrix.pivots.map(pivot => {
                    return <tr key={pivot}>
                        {/* Draw pivot titles */}
                        <PivotTitle title={pivot} colSpan={matrix.measures.length} />
                        {/* Draw pivot values (when any pivot is selected) */}
                        {matrix.pivotValueMap.length > 0 &&
                            matrix.pivotValueMap.map(({ valueMap }, index) => {
                                const value = valueMap.has(pivot) ? valueMap.get(pivot) : null;
                                if (value === null) {
                                    return <PivotValue key={index} empty />
                                }
                                return <PivotValue key={index} value={value} colSpan={matrix.measures.length} />;
                            })}
                        {/* Draw default pivot value (when no pivots selected) */}
                        {matrix.pivotValueMap.length === 0 && (
                            <PivotValue colSpan={matrix.measures.length} empty />
                        )}
                    </tr>
                })}
                {/* Draw column and measure titles */}
                <tr>
                    {/* Draw column titles */}
                    {matrix.columns.length > 0 &&
                        matrix.columns.map((column, index) => {
                            return <ColumnTitle key={index} title={column} />
                        })}
                    {/* Draw special case when no column selected by any pivot selected */}
                    {matrix.columns.length === 0 && matrix.pivots.length > 0 && (
                        <ColumnTitle empty />
                    )}
                    {/* Draw measure titles */}
                    {matrix.measures.length > 0 &&
                        measuresAdjustedForPivots.map((measure, index) => {
                            return <MeasureTitle key={index} title={measure} />
                        })}
                    {/* Draw special case when no measures selected by any pivot selected */}
                    {matrix.measures.length === 0 && matrix.pivots.length > 0 && (
                        Array(numberOfPivotValuesAdjustedForEmptyRows)
                            .fill({})
                            .map((_, index) => {
                                return <MeasureTitle key={index} empty />
                            }))}
                </tr>
                {/* Draw rows */}
                {matrix.valueMapTree.map(({ columnValueMap, children }, index) => {
                    return <tr key={index}>
                        {/* Draw column values */}
                        {matrix.columns.map((column, index) => {
                            const value = columnValueMap.has(column) ? columnValueMap.get(column) : null;
                            if (value === null) {
                                return <ColumnValue key={index} empty />
                            }
                            return <ColumnValue key={index} value={value} />
                        })}
                        {/* Draw special case when no column selected by any pivot selected */}
                        {matrix.columns.length === 0 && matrix.pivots.length > 0 && (
                            <ColumnValue empty />
                        )}
                        {/* Draw measure values */}
                        {children.map(({ measureValueMap }, index) => {
                            return <React.Fragment key={index}>
                                {[...measureValueMap.values()].map((value, index) => {
                                    if (value === null) {
                                        return <MeasureValue key={index} empty />
                                    }
                                    return <MeasureValue key={index} value={value} />
                                })}
                                {measureValueMap.size === 0 && (<MeasureValue empty />)}
                            </React.Fragment>
                        })}
                    </tr>;
                })}
            </tbody>
        </Table>
    </TableContainer>
};