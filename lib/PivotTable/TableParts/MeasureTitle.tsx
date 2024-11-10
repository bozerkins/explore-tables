export default ({ title, colSpan, empty = false }: { title?: string, colSpan?: number, empty?: boolean }) => {
    if (empty) {
        return <td className="explore-measure-title explore-empty-sign" colSpan={colSpan}>&nbsp;</td>
    }
    return <td className="explore-measure-title" colSpan={colSpan}>{title}</td>
};