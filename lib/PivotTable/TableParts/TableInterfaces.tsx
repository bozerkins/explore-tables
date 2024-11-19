export interface TableColumnTitleParameters {
    field?: string,
    title?: string,
    colSpan?: number,
    empty?: boolean,
}

export interface TableColumnTitleInterface {
    (params: TableColumnTitleParameters): JSX.Element
}

export interface TableColumnValueParameters {
    field?: string,
    value?: string,
    colSpan?: number,
    empty?: boolean,
}

export interface TableColumnValueInterface {
    (params: TableColumnValueParameters): JSX.Element
}

export interface TableElement {
    (params: { children: React.ReactNode }): JSX.Element
}

export interface TableInterfaceConfig {
    TableContainer: TableElement;
    TableRow: TableElement;
    Table: TableElement;
    ColumnTitle: TableColumnTitleInterface;
    ColumnValue: TableColumnValueInterface;
    PivotTitle: TableColumnTitleInterface;
    PivotValue: TableColumnValueInterface;
    MeasureTitle: TableColumnTitleInterface;
    MeasureValue: TableColumnValueInterface;
}

export interface TableOverrideConfig {
    TableContainer?: TableElement;
    TableRow?: TableElement;
    Table?: TableElement;
    ColumnTitle?: TableColumnTitleInterface;
    ColumnValue?: TableColumnValueInterface;
    PivotTitle?: TableColumnTitleInterface;
    PivotValue?: TableColumnValueInterface;
    MeasureTitle?: TableColumnTitleInterface;
    MeasureValue?: TableColumnValueInterface;
}