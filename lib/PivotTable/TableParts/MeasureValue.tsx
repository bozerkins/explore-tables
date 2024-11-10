import { emptySign } from "../PivotTable";

export default ({ value, colSpan, empty = false }: { value?: any, colSpan?: number, empty?: boolean }) => {
    if (empty) {
        return <td className="explore-measure-value explore-empty-sign">{emptySign}</td>
    }
    return <td className="explore-measure-value" colSpan={colSpan}>{value}</td>
};