import { useState } from "react";
import { PivotTable, TableOverrideConfig, } from "../../lib/main"
import { DatasetSorter, SortParameter } from "../datasets/DataSorter";

const fields = [
    { id: 'species', name: 'Species' },
    { id: 'habitat_type', name: 'Habitat Type' },
    { id: 'total', name: 'Animals' },
];
const rows = [
    { species: 'African Lion', habitat_type: 'Savanna', total: 20000 },
    { species: 'African Elephant', habitat_type: 'Savanna', total: 415000 },
    { species: 'Zebra', habitat_type: 'Savanna', total: 150000 },
    { species: 'African Lion', habitat_type: 'Forest', total: 5000 },
    { species: 'African Elephant', habitat_type: 'Forest', total: 95000 },
    { species: 'Zebra', habitat_type: 'Forest', total: 25000 },
    { species: 'African Lion', habitat_type: 'Desert', total: 2000 },
    { species: 'African Elephant', habitat_type: 'Desert', total: 1000 },
    { species: 'Zebra', habitat_type: 'Desert', total: 5000 },
    { species: 'African Lion', habitat_type: 'Mountain', total: 500 },
    { species: 'African Elephant', habitat_type: 'Mountain', total: 200 },
    { species: 'Zebra', habitat_type: 'Mountain', total: 3000 },
    { species: 'African Lion', habitat_type: 'Wetland', total: 1500 },
    { species: 'African Elephant', habitat_type: 'Wetland', total: 25000 },
    { species: 'Zebra', habitat_type: 'Wetland', total: 8000 }
];


export default () => {
    const [sortState, setSortState] = useState<SortParameter[]>([]);
    const [tableData, setTableData] = useState(rows);
    const [originalData] = useState([...rows]); // Store original order

    const handleSort = (field: string, event: React.MouseEvent) => {
        const sorter = new DatasetSorter(tableData);
        let newSortState: SortParameter[] = [];

        // Find if this field is already being sorted
        const existingCriteriaIndex = sortState.findIndex(criteria => criteria.field === field);

        if (event.shiftKey) {
            // Shift key: add/update sort criteria
            if (existingCriteriaIndex !== -1) {
                // Toggle direction for existing field
                if (sortState[existingCriteriaIndex].direction === 'desc') {
                    // Remove this field from sort criteria on third click
                    newSortState = sortState.filter((_, index) => index !== existingCriteriaIndex);
                } else {
                    // Toggle from asc to desc
                    newSortState = sortState.map((criteria, index) =>
                        index === existingCriteriaIndex
                            ? { ...criteria, direction: 'desc' }
                            : criteria
                    );
                }
            } else {
                // Add new sort criteria
                newSortState = [...sortState, { field, direction: 'asc' }];
            }
        } else {
            // No shift key: replace all sort criteria
            if (existingCriteriaIndex !== -1 && sortState.length === 1) {
                if (sortState[0].direction === 'desc') {
                    // Third click: reset to original order
                    setTableData([...originalData]);
                    setSortState([]);
                    return;
                } else {
                    // Toggle from asc to desc
                    newSortState = [{ field, direction: 'desc' }];
                }
            } else {
                // Start fresh sort with this field
                newSortState = [{ field, direction: 'asc' }];
            }
        }

        // Apply sorting if there are any sort parameters
        if (newSortState.length > 0) {
            sorter.sort(newSortState);
        } else {
            // Reset to original order if no sort parameters
            setTableData([...originalData]);
        }

        // Update state
        setTableData([...tableData]);
        setSortState(newSortState);
    };

    const getSortIndicator = (field: string) => {
        const criteria = sortState.find(c => c.field === field);
        if (!criteria) return null;

        const index = sortState.findIndex(c => c.field === field);
        return (
            <span style={{ marginLeft: '4px' }}>
                {criteria.direction === 'asc' ? '↑' : '↓'}
                {sortState.length > 1 && (
                    <sup style={{ fontSize: '0.7em' }}>{index + 1}</sup>
                )}
            </span>
        );
    };

    const styledTableElements: TableOverrideConfig = {
        ColumnTitle: ({ title, field, colSpan, empty }) => {
            if (empty) {
                return <td className="explore-column-title explore-empty-sign" colSpan={colSpan}>&nbsp;</td>
            }
            console.log("Column title");
            field = field || "";
            return (
                <td
                    className="explore-column-title"
                    colSpan={colSpan}
                    onClick={(e) => handleSort(field, e)}
                    style={{ cursor: 'pointer' }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", WebkitUserSelect: "none" }}>
                        <span>{title}</span>
                        {getSortIndicator(field)}
                    </div>
                </td>
            );
        },

        PivotTitle: ({ title, field, colSpan }) => {
            field = field || "";
            return (
                <td
                    className="explore-pivot-title"
                    colSpan={colSpan}
                    onClick={(e) => handleSort(field, e)}
                    style={{ cursor: 'pointer', userSelect: "none" }}
                    title="Click to sort, Shift+Click to add to sort"
                >
                    <div style={{ display: "flex", justifyContent: "space-between", WebkitUserSelect: "none" }}>
                        <span>{title}</span>
                        {getSortIndicator(field)}
                    </div>
                </td>
            );
        },

        MeasureTitle: ({ title, field, colSpan, empty }) => {
            if (empty) {
                return <td className="explore-measure-title explore-empty-sign" colSpan={colSpan}>&nbsp;</td>
            }
            field = field || "";
            return (
                <td
                    className="explore-measure-title"
                    colSpan={colSpan}
                    onClick={(e) => handleSort(field, e)}
                    style={{ cursor: 'pointer', userSelect: "none" }}
                    title="Click to sort, Shift+Click to add to sort"
                >
                    <div style={{ display: "flex", justifyContent: "space-between", WebkitUserSelect: "none" }}>
                        <span>{title}</span>
                        {getSortIndicator(field)}
                    </div>
                </td>
            );
        }
    };

    return <div className="page-container">
        <div style={{ maxWidth: "750px", margin: "auto" }}>
            <div style={{ marginBottom: '10px', fontSize: '0.9em', color: '#666' }}>
                Click to sort by a single field. Shift+Click to sort by multiple fields.
            </div>
            <PivotTable
                rows={tableData}
                fields={fields}
                measures={["total"]}
                dimensions={["species"]}
                pivots={["habitat_type"]}
                elements={styledTableElements}
            />
        </div>
    </div>
}