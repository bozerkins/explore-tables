import { TableOverrideConfig } from "../../lib/main";

export const styledElements: TableOverrideConfig = {
    TableContainer: ({ children }) => (
        <div style={{
            padding: '16px',
            backgroundColor: '#f0f4f8',
            borderRadius: '8px'
        }}>
            {children}
        </div>
    ),

    Table: ({ children }) => (
        <table style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '2px'
        }}>
            {children}
        </table>
    ),

    TableRow: ({ children }) => (
        <tr>{children}</tr>
    ),

    ColumnTitle: ({ title, colSpan, empty }) => (
        <th style={{
            backgroundColor: '#4299e1',
            color: 'white',
            padding: '12px',
            borderRadius: '4px'
        }} colSpan={colSpan}>
            {empty ? '-' : title}
        </th>
    ),

    ColumnValue: ({ value, colSpan, empty }) => (
        <td style={{
            backgroundColor: '#bee3f8',
            padding: '12px',
            borderRadius: '4px'
        }} colSpan={colSpan}>
            {empty ? '-' : value}
        </td>
    ),

    PivotTitle: ({ title, colSpan, empty }) => (
        <th style={{
            backgroundColor: '#48bb78',
            color: 'white',
            padding: '12px',
            borderRadius: '4px'
        }} colSpan={colSpan}>
            {empty ? '-' : title}
        </th>
    ),

    PivotValue: ({ value, colSpan, empty }) => (
        <td style={{
            backgroundColor: '#c6f6d5',
            padding: '12px',
            borderRadius: '4px'
        }} colSpan={colSpan}>
            {empty ? '-' : value}
        </td>
    ),

    MeasureTitle: ({ title, colSpan, empty }) => (
        <th style={{
            backgroundColor: '#ed64a6',
            color: 'white',
            padding: '12px',
            borderRadius: '4px'
        }} colSpan={colSpan}>
            {empty ? '-' : title}
        </th>
    ),

    MeasureValue: ({ value, colSpan, empty }) => (
        <td style={{
            backgroundColor: '#fed7e2',
            padding: '12px',
            borderRadius: '4px',
            textAlign: 'right'
        }} colSpan={colSpan}>
            {empty ? '-' : value}
        </td>
    ),
};