import { emptySign } from "../PivotTable";

export default ({ value, colSpan, empty = false }: { value?: any, colSpan?: number, empty?: boolean }) => {
    if (empty) {
        return <td>{emptySign}</td>
    }
    return <td className="explore-pivot-value" colSpan={colSpan}>{value}</td>
};