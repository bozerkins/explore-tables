export interface TableColumnTitleParameters {
    title?: string,
    colSpan?: number,
    empty?: boolean,
}

export interface TableColumnTitleInterface {
    (params: TableColumnTitleParameters): JSX.Element
}

export interface TableColumnValueParameters {
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