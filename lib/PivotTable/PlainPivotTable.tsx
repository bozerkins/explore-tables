import { TableInterfaceConfig } from "./TableParts/TableInterfaces";

export interface PlainPivotTableProperties {
    rows: Array<{ [key: string]: any; }>;
    fields: Array<{ id: string; name?: string; }>;
    dimensions?: Array<string>;
    elements: TableInterfaceConfig;
}

export default ({
    rows, fields, elements, dimensions = []
}: PlainPivotTableProperties) => {
    const { TableContainer, TableRow, Table, ColumnTitle, ColumnValue } = elements;
    const filteredFields = dimensions.length > 0 ? fields.filter(field => dimensions.includes(field.id)) : fields;
    return (
        <TableContainer>
            <Table>
                <tbody>
                    <TableRow>
                        {/* Draw column titles */}
                        {filteredFields.length > 0 &&
                            filteredFields.map((field, index) => {
                                return <ColumnTitle key={index} field={field.id} title={field.name || field.id} />
                            })}
                        {/* Draw special case when no column selected by any pivot selected */}
                        {filteredFields.length === 0 && (
                            <ColumnTitle empty />
                        )}
                    </TableRow>
                    {/* Draw rows */}
                    {rows.map((row, index) => {
                        return (
                            <TableRow key={index}>
                                {filteredFields.map((field, index) => {
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
                            {filteredFields.map((field, index) => {
                                return <ColumnValue key={index} field={field.id} empty />;
                            })}
                        </TableRow>
                    )}
                </tbody>
            </Table>
        </TableContainer>
    );
}