import PivotTableMatrix from "./PivotTableMatrix";
import AggregatePivotTable from "./AggregatePivotTable";
import PlainPivotTable from "./PlainPivotTable";
import { TableInterfaceConfig, TableOverrideConfig } from "./TableParts/TableInterfaces";
import {
    TableContainer, TableRow, Table,
    ColumnTitle, ColumnValue,
    PivotTitle, PivotValue,
    MeasureTitle, MeasureValue
} from "./TableParts/TableParts"

export const emptySign = "∅";

export interface PivotTableProperties {
    rows: Array<{ [key: string]: any; }>;
    fields: Array<{ id: string; name?: string; }>;
    measures?: Array<string>;
    dimensions?: Array<string>;
    pivots?: Array<string>;
    elements?: TableOverrideConfig;
}

const defaultElements: TableInterfaceConfig = {
    TableContainer, TableRow, Table,
    ColumnTitle, ColumnValue,
    MeasureTitle, MeasureValue,
    PivotTitle, PivotValue
};

export const PivotTable = ({
    rows, fields,
    measures = [], dimensions = [], pivots = [],
    elements = {}
}: PivotTableProperties) => {
    // merge override elements
    const mergedElements = { ...defaultElements, ...elements }
    // check if we need to create a complex pivot
    const isPlainTable = measures.length === 0 && pivots.length === 0;
    if (isPlainTable) {
        // create simple pivot-styled table
        return <PlainPivotTable rows={rows} fields={fields} elements={mergedElements} />
    }

    // create a matrix from the provided data
    const matrix: PivotTableMatrix = PivotTableMatrix.createFromPayload({ rows, fields }, { dimensions, measures, pivots })
    // render aggregate pivot table
    return <AggregatePivotTable matrix={matrix} elements={mergedElements} />

};