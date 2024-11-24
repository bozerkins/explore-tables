import { TableOverrideConfig } from './TableParts/TableInterfaces';
export declare const emptySign = "\u2205";
export interface PivotTableProperties {
    rows: Array<{
        [key: string]: any;
    }>;
    fields: Array<{
        id: string;
        name?: string;
    }>;
    measures?: Array<string>;
    dimensions?: Array<string>;
    pivots?: Array<string>;
    elements?: TableOverrideConfig;
}
export declare const PivotTable: ({ rows, fields, measures, dimensions, pivots, elements }: PivotTableProperties) => import("react/jsx-runtime").JSX.Element;
