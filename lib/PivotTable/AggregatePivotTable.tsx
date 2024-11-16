import React from "react";
import PivotTableMatrix from "./PivotTableMatrix";
import ColumnTitle from "./TableParts/ColumnTitle";
import ColumnValue from "./TableParts/ColumnValue";
import MeasureTitle from "./TableParts/MeasureTitle";
import PivotTitle from "./TableParts/PivotTitle";
import PivotValue from "./TableParts/PivotValue";
import Table from "./TableParts/Table";
import TableContainer from "./TableParts/TableContainer";
import TableRow from "./TableParts/TableRow";
import MeasureValue from "./TableParts/MeasureValue";

export default ({ matrix }: { matrix: PivotTableMatrix }) => {
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
                            <PivotTitle title={matrix.displayField(pivot)} colSpan={matrix.columns.length} />
                            {/* Draw pivot values (when any pivot is selected) */}
                            {matrix.pivotValueMap.length > 0 &&
                                matrix.pivotValueMap.map(({ valueMap }, index) => {
                                    const value = valueMap.has(pivot) ? valueMap.get(pivot) : null;

                                    if (value === null) {
                                        return <PivotValue key={index} colSpan={matrix.measures.length} empty />
                                    }
                                    return <PivotValue key={index} value={value} colSpan={matrix.measures.length} />;
                                })}
                            {/* Draw default pivot value (when no pivots selected) */}
                            {matrix.pivotValueMap.length === 0 && (
                                <PivotValue colSpan={matrix.measures.length} empty />
                            )}
                        </TableRow>
                    })}
                    {/* Draw column and measure titles */}
                    <TableRow>
                        {/* Draw column titles */}
                        {matrix.columns.length > 0 &&
                            matrix.columns.map((column, index) => {
                                return <ColumnTitle key={index} title={matrix.displayField(column)} />
                            })}
                        {/* Draw special case when no column selected by any pivot selected */}
                        {matrix.columns.length === 0 && matrix.pivots.length > 0 && (
                            <ColumnTitle empty />
                        )}
                        {/* Draw measure titles */}
                        {matrix.measures.length > 0 &&
                            measuresAdjustedForPivots.map((measure, index) => {
                                return <MeasureTitle key={index} title={matrix.displayField(measure)} />
                            })}
                        {/* Draw special case when no measures selected by any pivot selected */}
                        {matrix.measures.length === 0 && matrix.pivots.length > 0 && (
                            Array(numberOfPivotValuesAdjustedForEmptyRows)
                                .fill({})
                                .map((_, index) => {
                                    return <MeasureTitle key={index} empty />
                                }))}
                    </TableRow>
                    {/* Draw rows */}
                    {matrix.valueMapTree.map(({ columnValueMap, children }, index) => {
                        return <TableRow key={index}>
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
                        </TableRow>;
                    })}
                    {matrix.valueMapTree.length === 0 && (
                        <TableRow>
                            {/* Draw empty column values */}
                            {matrix.columns.map((_, index) => <ColumnValue key={index} empty />)}
                            {/* Draw special case when no column selected by any pivot selected */}
                            {matrix.columns.length === 0 && matrix.pivots.length > 0 && (
                                <ColumnValue empty />
                            )}
                            {/* Draw empty measure values */}
                            {matrix.measures.map((_, index) => <MeasureValue key={index} empty />)}
                            {/* Draw special case when no measures selected */}
                            {matrix.measures.length === 0 && (<MeasureValue empty />)}
                        </TableRow>
                    )}
                </tbody>
            </Table>
        </TableContainer>
    );
}