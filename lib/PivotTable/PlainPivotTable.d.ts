import { TableInterfaceConfig } from './TableParts/TableInterfaces';
export interface PlainPivotTableProperties {
    rows: Array<{
        [key: string]: any;
    }>;
    fields: Array<{
        id: string;
        name?: string;
    }>;
    dimensions?: Array<string>;
    elements: TableInterfaceConfig;
}
declare const _default: ({ rows, fields, elements, dimensions }: PlainPivotTableProperties) => import("react/jsx-runtime").JSX.Element;
export default _default;
