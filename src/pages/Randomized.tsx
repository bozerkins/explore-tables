import { PivotTable } from "../../lib/main"
import { generateRandomDataset } from "../datasets/Randomizer";

export default () => {
    const rows = generateRandomDataset(650);
    const fields = [
        { id: 'one' },
        { id: 'two' },
        { id: 'three' },
        { id: 'four' },
        { id: 'five' },
        { id: 'six' },
    ];
    return <div className="page-container">
        {/* Page Title */}
        <h1 className="page-title">Data Analysis Dashboard</h1>

        {/* Optional Subtitle */}
        <p className="page-subtitle">An interactive pivot table for exploring data trends and insights.</p>

        {/* Table Container */}
        <div className="table-container">
            <PivotTable rows={rows} fields={fields} measures={["five", "six"]} dimensions={["one", "three"]} pivots={["two", "four"]} />
        </div>
    </div>
}