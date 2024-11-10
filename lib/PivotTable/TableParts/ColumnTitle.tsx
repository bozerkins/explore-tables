import { emptySign } from "../PivotTable";

export default ({ title, colSpan, empty = false }: { title?: string, colSpan?: number, empty?: boolean }) => {
    if (empty) {
        return <td className="explore-column-title explore-empty-sign" colSpan={colSpan}>{emptySign}</td>
    }
    return <td className="explore-column-title" colSpan={colSpan}>{title}</td>
};