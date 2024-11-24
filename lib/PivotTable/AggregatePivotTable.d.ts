import { default as PivotTableMatrix } from './PivotTableMatrix';
import { TableInterfaceConfig } from './TableParts/TableInterfaces';
export interface AggregatePivotTableProperties {
    matrix: PivotTableMatrix;
    elements: TableInterfaceConfig;
}
declare const _default: ({ matrix, elements }: AggregatePivotTableProperties) => import("react/jsx-runtime").JSX.Element;
export default _default;
