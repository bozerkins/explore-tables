import PivotTableMatrix from "./PivotTableMatrix";
import AggregatePivotTable from "./AggregatePivotTable";
import PlainPivotTable from "./PlainPivotTable";

export const emptySign = "∅";

export interface PivotTableProperties {
    rows: Array<{ [key: string]: any; }>;
    fields: Array<{ id: string; name?: string; }>;
    measures: Array<string>;
    pivots: Array<string>;
}

export const PivotTable = ({
    rows, fields, measures = [], pivots = []
}: PivotTableProperties) => {
    // check if we need to create a complex pivot
    const isPlainTable = measures.length === 0 && pivots.length === 0;
    if (isPlainTable) {
        // create simple pivot-styled table
        return <PlainPivotTable rows={rows} fields={fields} />
    }

    // create a matrix from the provided data
    const matrix: PivotTableMatrix = PivotTableMatrix.createFromPayload({ rows, fields }, { measures, pivots })
    // render aggregate pivot table
    return <AggregatePivotTable matrix={matrix} />

};