import React from "react";
import PivotTableMatrix from "./PivotTableMatrix";

const PivotTable = ({ matrix }: { matrix: PivotTableMatrix }) => {
    console.log("Received matrix", matrix);
    const emptySign = "∅";
    const pivotValueMapSize = matrix.pivotValueMap.length;
    const numberOfPivotValuesAdjustedForEmptyRows = !pivotValueMapSize ? 1 : pivotValueMapSize;
    const measuresAdjustedForPivots = Array(numberOfPivotValuesAdjustedForEmptyRows).fill(matrix.measures).flat();

    return <div>
        <h1>Pivot Table!</h1>
        <table border={1} cellPadding={10}>
            <tbody>
                {/* Draw pivots */}
                {matrix.pivots.map(pivot => {
                    return <tr key={pivot}>
                        {/* Draw pivot titles */}
                        <td colSpan={matrix.measures.length}>{pivot}</td>
                        {/* Draw pivot values (when any pivot is selected) */}
                        {matrix.pivotValueMap.length > 0 &&
                            matrix.pivotValueMap.map(({ valueMap }, index) => {
                                const value = valueMap.has(pivot) ? valueMap.get(pivot) : null;
                                if (value === null) {
                                    return <td key={index}>{emptySign}</td>
                                }
                                return <td key={index} colSpan={matrix.measures.length}>{value}</td>;
                            })}
                        {/* Draw default pivot value (when no pivots selected) */}
                        {matrix.pivotValueMap.length === 0 && (
                            <td colSpan={matrix.measures.length}>{emptySign}</td>
                        )}
                    </tr>
                })}
                {/* Draw column and measure titles */}
                <tr>
                    {/* Draw column titles */}
                    {matrix.columns.length > 0 &&
                        matrix.columns.map((column, index) => {
                            return <td key={index}>{column}</td>
                        })}
                    {/* Draw special case when no column selected by any pivot selected */}
                    {matrix.columns.length === 0 && matrix.pivots.length > 0 && (
                        <td>{emptySign}</td>
                    )}
                    {/* Draw measure titles */}
                    {matrix.measures.length > 0 &&
                        measuresAdjustedForPivots.map((measure, index) => {
                            return <td key={index}>{measure}</td>
                        })}
                    {/* Draw special case when no measures selected by any pivot selected */}
                    {matrix.measures.length === 0 && matrix.pivots.length > 0 && (
                        Array(numberOfPivotValuesAdjustedForEmptyRows)
                            .fill({})
                            .map((_, index) => {
                                return <td key={index}>{emptySign}</td>
                            }))}
                </tr>
                {/* Draw rows */}
                {matrix.valueMapTree.map(({ columnValueMap, children }, index) => {
                    return <tr key={index}>
                        {/* Draw column values */}
                        {matrix.columns.map((column, index) => {
                            const value = columnValueMap.has(column) ? columnValueMap.get(column) : null;
                            if (value === null) {
                                return <td key={index}>{emptySign}</td>
                            }
                            return <td key={index}>{value}</td>
                        })}
                        {/* Draw special case when no column selected by any pivot selected */}
                        {matrix.columns.length === 0 && matrix.pivots.length > 0 && (
                            <td>{emptySign}</td>
                        )}
                        {/* Draw measure values */}
                        {children.map(({ pivotValueMap, measureValueMap }, index) => {
                            return <React.Fragment key={index}>
                                {[...measureValueMap.values()].map((value, index) => {
                                    if (value === null) {
                                        return <td key={index}>{emptySign}</td>
                                    }
                                    return <td key={index}>{value}</td>
                                })}
                                {measureValueMap.size === 0 && (<td>{emptySign}</td>)}
                            </React.Fragment>
                        })}
                    </tr>;
                })}
            </tbody>

        </table>
    </div>
};

export default PivotTable;