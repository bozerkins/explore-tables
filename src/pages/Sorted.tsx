import React, { useState } from "react";
import { PivotTable, TableOverrideConfig, } from "../../lib/main"
import { DatasetSorter, SortParameter } from "../datasets/DataSorter";
import PageTemplate from "../components/PageTemplate";
import CodeBlock from "../components/CodeBlock";
import { Link } from "react-router-dom";

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
    const [sortState, setSortState] = useState<SortParameter[]>([{ field: "species", "direction": "asc" }]);
    const [tableData, setTableData] = useState((() => {
        const defaultRows = [...rows];
        const sorter = new DatasetSorter(defaultRows);
        sorter.sort(sortState);
        return defaultRows;
    })());

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
                    setTableData([...rows]);
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
            setTableData([...rows]);
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

    return (
        <PageTemplate
            title="Sorted tables"
            description="Learn how to override table elements and implement interactive functionality"
        >
            <div className="content-sections">
                <section className="content-section">
                    <h2>Overriding Table Elements</h2>
                    <p>
                        The explore table library allows you to override default table elements to add custom functionality.
                        This is particularly useful when implementing features like sorting, custom styling, or interactive elements.
                    </p>
                    <p>
                        Use default classes that come with explore tables or implement your own.
                    </p>
                    <p>
                        Remember to handle empty use-case, since it's common in pivot tables with dynamic structure to render empty cells.
                    </p>
                    <CodeBlock code={`
const styledTableElements: TableOverrideConfig = {
    ColumnTitle: ({ title, field, colSpan, empty }) => {
        if (empty) {
            return <td className="explore-column-title explore-empty-sign" colSpan={colSpan}>&nbsp;</td>
        }
        return (
            <td colSpan={colSpan} 
                className="explore-column-title" 
                style={{ cursor: 'pointer', userSelect: "none" }}
                onClick={(event) => handleSort(field, event)}>{title}</td>
        );
    },
    // other elements override ...
};

const handleSort = (field, event) => {
    // sorting logic goes here ...
}

<PivotTable
    elements={styledTableElements}
    rows={rows}
    fields={fields}
    measures={["total"]}
    dimensions={["species"]}
    pivots={["habitat_type"]}
/>
`} />
                    <p>
                        The TableOverrideConfig allows you to customize various table elements:
                    </p>
                    <ul>
                        <li>ColumnTitle - Header cells for regular columns</li>
                        <li>PivotTitle - Header cells for pivot columns</li>
                        <li>MeasureTitle - Header cells for measure columns</li>
                    </ul>
                </section>

                <section className="content-section">
                    <h2>Live Demo - Column Sorting</h2>
                    <p>
                        Try it out:
                    </p>
                    <ul>
                        <li>Click any column header to sort</li>
                        <li>Click again to reverse the sort direction</li>
                        <li>Hold Shift and click to sort by multiple columns</li>
                    </ul>
                    <PivotTable
                        rows={tableData}
                        fields={fields}
                        measures={["total"]}
                        dimensions={["species"]}
                        pivots={["habitat_type"]}
                        elements={styledTableElements}
                    />
                </section>

                <section className="content-section">
                    <h2>Implementing Sorting</h2>
                    <p>
                        To implement sorting in your pivot table, you'll need to:
                    </p>
                    <ol>
                        <li>
                            <strong>Manage Sort State</strong>: Keep track of which columns are being sorted
                            and in what direction using React state.
                        </li>
                        <li>
                            <strong>Override Column Headers</strong>: Customize column headers to be clickable
                            and display sort indicators.
                        </li>
                        <li>
                            <strong>Handle Sort Events</strong>: Implement logic to update the sort state
                            when users click on column headers.
                        </li>
                        <li>
                            <strong>Apply Sorting</strong>: Sort the data according to the current sort state
                            before passing it to the PivotTable.
                        </li>
                    </ol>
                </section>

                {/* Next Section Link */}
                <div className="next-section">
                    <Link to="/interactive">
                        Next: Interactive Demo →
                    </Link>
                </div>
            </div>
        </PageTemplate>
    );
}