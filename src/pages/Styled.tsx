import { PivotTable, TableOverrideConfig } from "../../lib/main"

const colors = {
    primary: '#6b9bd1',
    secondary: '#f6f8fb',
    border: '#e1e8f2',
    text: '#2c3e50',
    headerText: '#ffffff',
    hoverBackground: '#f0f4f8'
};

export const styledTableElements: TableOverrideConfig = {
    TableContainer: ({ children }) => (
        <div style={{
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            backgroundColor: '#ffffff',
            margin: '20px'
        }}>
            {children}
        </div>
    ),

    TableRow: ({ children }) => (
        <tr>{children}</tr>
    ),

    Table: ({ children }) => (
        <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            borderSpacing: 0,
            fontSize: '14px',
            fontFamily: "'Segoe UI', Arial, sans-serif"
        }}>
            {children}
        </table>
    ),

    ColumnTitle: ({ title, colSpan, empty }) => (
        <th style={{
            backgroundColor: colors.primary,
            color: colors.headerText,
            padding: '12px 16px',
            textAlign: 'left',
            fontWeight: 600,
            borderBottom: `2px solid ${colors.border}`,
            whiteSpace: 'nowrap'
        }} colSpan={colSpan}>
            {empty ? '' : title}
        </th>
    ),

    ColumnValue: ({ value, colSpan, empty }) => (
        <td style={{
            padding: '12px 16px',
            borderBottom: `1px solid ${colors.border}`,
            color: colors.text,
            backgroundColor: colors.secondary
        }} colSpan={colSpan}>
            {empty ? '' : value}
        </td>
    ),

    PivotTitle: ({ title, colSpan, empty }) => (
        <th style={{
            backgroundColor: colors.primary,
            color: colors.headerText,
            padding: '12px 16px',
            textAlign: 'center',
            fontWeight: 600,
            borderBottom: `2px solid ${colors.border}`,
            borderLeft: `1px solid ${colors.border}`
        }} colSpan={colSpan}>
            {empty ? '' : title}
        </th>
    ),

    PivotValue: ({ value, colSpan, empty }) => (
        <td style={{
            padding: '12px 16px',
            borderBottom: `1px solid ${colors.border}`,
            borderLeft: `1px solid ${colors.border}`,
            color: colors.text,
            backgroundColor: colors.secondary,
            textAlign: 'center'
        }} colSpan={colSpan}>
            {empty ? '' : value}
        </td>
    ),

    MeasureTitle: ({ title, colSpan, empty }) => (
        <th style={{
            backgroundColor: colors.primary,
            color: colors.headerText,
            padding: '12px 16px',
            textAlign: 'right',
            fontWeight: 600,
            borderBottom: `2px solid ${colors.border}`,
            borderLeft: `1px solid ${colors.border}`
        }} colSpan={colSpan}>
            {empty ? '' : title}
        </th>
    ),

    MeasureValue: ({ value, colSpan, empty }) => (
        <td style={{
            padding: '12px 16px',
            borderBottom: `1px solid ${colors.border}`,
            borderLeft: `1px solid ${colors.border}`,
            color: colors.text,
            backgroundColor: colors.secondary,
            textAlign: 'right',
            fontWeight: 500
        }} colSpan={colSpan}>
            {empty ? '' : value}
        </td>
    ),
};


export default () => {
    const fields = [
        { id: 'species', name: 'Species' },
        { id: 'habitat_type', name: 'Habitat Type' },
        { id: 'total', name: 'Animals' },
    ];
    const rows = [
        { species: 'African Lion', habitat_type: 'Savanna', total: 20000 },
        { species: 'African Elephant', habitat_type: 'Savanna', total: 415000 },
        { species: 'Zebra', habitat_type: 'Savanna', total: 150000 },
        { species: 'African Lion', habitat_type: 'Forest', total: 5000 },
        { species: 'African Elephant', habitat_type: 'Forest', total: 95000 },
        { species: 'Zebra', habitat_type: 'Forest', total: 25000 },
        { species: 'African Lion', habitat_type: 'Desert', total: 2000 },
        { species: 'African Elephant', habitat_type: 'Desert', total: 1000 },
        { species: 'Zebra', habitat_type: 'Desert', total: 5000 },
        { species: 'African Lion', habitat_type: 'Mountain', total: 500 },
        { species: 'African Elephant', habitat_type: 'Mountain', total: 200 },
        { species: 'Zebra', habitat_type: 'Mountain', total: 3000 },
        { species: 'African Lion', habitat_type: 'Wetland', total: 1500 },
        { species: 'African Elephant', habitat_type: 'Wetland', total: 25000 },
        { species: 'Zebra', habitat_type: 'Wetland', total: 8000 }
    ];

    return <div className="page-container">
        <div style={{ maxWidth: "750px", margin: "auto" }}>
            <PivotTable
                rows={rows}
                fields={fields}
                measures={["total",]}
                dimensions={["species",]}
                pivots={["habitat_type"]}
                elements={styledTableElements}
            />
        </div>
    </div >
}