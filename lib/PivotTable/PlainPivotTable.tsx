import { TableInterfaceConfig } from "./TableParts/TableInterfaces";

export interface PlainPivotTableProperties {
    rows: Array<{ [key: string]: any; }>;
    fields: Array<{ id: string; name?: string; }>;
    elements: TableInterfaceConfig;
}

export default ({
    rows, fields, elements
}: PlainPivotTableProperties) => {
    const { TableContainer, TableRow, Table, ColumnTitle, ColumnValue } = elements;
    return (
        <TableContainer>
            <Table>
                <tbody>
                    <TableRow>
                        {/* Draw column titles */}
                        {fields.length > 0 &&
                            fields.map((field, index) => {
                                return <ColumnTitle key={index} field={field.id} title={field.name || field.id} />
                            })}
                        {/* Draw special case when no column selected by any pivot selected */}
                        {fields.length === 0 && (
                            <ColumnTitle empty />
                        )}
                    </TableRow>
                    {/* Draw rows */}
                    {rows.map((row, index) => {
                        return (
                            <TableRow key={index}>
                                {fields.map((field, index) => {
                                    if (row[field.id] === null) {
                                        return <ColumnValue key={index} field={field.id} empty />;
                                    }
                                    return <ColumnValue key={index} field={field.id} value={row[field.id]} />;
                                })}
                            </TableRow>
                        );
                    })}
                    {rows.length === 0 && (
                        <TableRow>
                            {fields.map((field, index) => {
                                return <ColumnValue key={index} field={field.id} empty />;
                            })}
                        </TableRow>
                    )}
                </tbody>
            </Table>
        </TableContainer>
    );
}