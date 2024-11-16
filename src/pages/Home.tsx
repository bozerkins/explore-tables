import { PivotTable } from "../../lib/main"

export default () => {
    const fields = [
        { id: 'species', name: 'Species' },
        { id: 'habitat_type', name: 'Habitat Type' },
        { id: 'total', name: 'Number of Animals' },
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

    return <div className="page-container">
        <div style={{ maxWidth: "700px", margin: "auto" }}>
            <PivotTable
                rows={rows}
                fields={fields}
                measures={["total",]}
                dimensions={["species",]}
                pivots={["habitat_type"]}
            />
        </div>
    </div >
}