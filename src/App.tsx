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
    return <div>
        <PivotTable matrix={matrix} />
    </div>;
}

export default App;