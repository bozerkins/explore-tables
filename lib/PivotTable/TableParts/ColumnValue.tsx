import { emptySign } from "../PivotTable";

export default ({ value, colSpan, empty = false }: { value?: any, colSpan?: number, empty?: boolean }) => {
    if (empty) {
        return <td className="explore-column-value explore-empty-sign" colSpan={colSpan}>{emptySign}</td>
    }
    return <td className="explore-column-value" colSpan={colSpan}>{value}</td>
};