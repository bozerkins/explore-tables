import { normalize } from "path";
import { PivotTable, PivotTableMatrix } from "../lib/main";
import { generateRandomDataset } from "./datasets/Randomizer";

const App: React.FC = () => {
    const rows = generateRandomDataset(650);
    const fields = [
        { id: 'one' },
        { id: 'two' },
        { id: 'three' },
        { id: 'four' },
        { id: 'five' },
        { id: 'six' },
    ];
    const matrix = PivotTableMatrix.createFromPayload({ rows, fields }, { measures: ["five", "six"], pivots: ["two", "four"] })
    return <>
        <link rel="stylesheet" href="themes/default.css" type="text/css" />
        <div className="page-container">
            {/* Page Title */}
            <h1 className="page-title">Data Analysis Dashboard</h1>

            {/* Optional Subtitle */}
            <p className="page-subtitle">An interactive pivot table for exploring data trends and insights.</p>

            {/* Table Container */}
            <div className="table-container">
                <PivotTable matrix={matrix} />
            </div>
        </div>
    </>

}

export default App;