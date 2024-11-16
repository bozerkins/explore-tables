import { TableColumnTitleInterface, TableColumnValueInterface, TableElement } from "./TableInterfaces";
import { emptySign } from "../PivotTable";

export const Table: TableElement = ({ children }) => {
    return <table className="explore-table">{children}</table>
}

export const TableContainer: TableElement = ({ children }) => {
    return <div className="explore-table-container explore-smooth-scroll">{children}</div>
}

export const TableRow: TableElement = ({ children }) => {
    return <tr className="explore-table-row">{children}</tr>
}

export const ColumnTitle: TableColumnTitleInterface = ({ title, colSpan, empty = false }) => {
    if (empty) {
        return <td className="explore-column-title explore-empty-sign" colSpan={colSpan}>&nbsp;</td>
    }
    return <td className="explore-column-title" colSpan={colSpan}>{title}</td>
};

export const ColumnValue: TableColumnValueInterface = ({ value, colSpan, empty = false }) => {
    if (empty) {
        return <td className="explore-column-value explore-empty-sign" colSpan={colSpan}>{emptySign}</td>
    }
    return <td className="explore-column-value" colSpan={colSpan}>{value}</td>
};

export const PivotTitle: TableColumnTitleInterface = ({ title, colSpan }) => {
    return <td className="explore-pivot-title" colSpan={colSpan}>{title}</td>
};

export const PivotValue: TableColumnValueInterface = ({ value, colSpan, empty = false }) => {
    if (empty) {
        return <td className="explore-pivot-value explore-empty-sign" colSpan={colSpan}>{emptySign}</td>
    }
    return <td className="explore-pivot-value" colSpan={colSpan}>{value}</td>
};

export const MeasureTitle: TableColumnTitleInterface = ({ title, colSpan, empty = false }) => {
    if (empty) {
        return <td className="explore-measure-title explore-empty-sign" colSpan={colSpan}>&nbsp;</td>
    }
    return <td className="explore-measure-title" colSpan={colSpan}>{title}</td>
};

export const MeasureValue: TableColumnValueInterface = ({ value, colSpan, empty = false }) => {
    if (empty) {
        return <td className="explore-measure-value explore-empty-sign" colSpan={colSpan}>{emptySign}</td>
    }
    return <td className="explore-measure-value" colSpan={colSpan}>{value}</td>
};