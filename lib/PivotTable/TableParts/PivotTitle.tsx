export default ({ title, colSpan }: { title: string, colSpan?: number }) => {
    return <td className="explore-pivot-title" colSpan={colSpan}>{title}</td>
};