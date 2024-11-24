// pages/Home.tsx
import React from 'react';
import PageTemplate from '../components/PageTemplate';
import CodeBlock from '../components/CodeBlock';
import { PivotTable } from "../../lib/main";

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

// pages/Home.tsx
const Home: React.FC = () => {
    const basicExample = `// Define your table fields
const fields = [
    { id: 'species', name: 'Species' },
    { id: 'habitat_type', name: 'Habitat Type' },
    { id: 'total', name: 'Animals' }
];

// Sample data
const rows = [
    { species: 'Lion', habitat_type: 'Savanna', total: 12 },
    { species: 'Penguin', habitat_type: 'Arctic', total: 30 }
];

// Render the pivot table
<PivotTable
    rows={rows}
    fields={fields}
    measures={["total"]}
    dimensions={["species"]}
    pivots={["habitat_type"]}
/>`;

    return (
        <PageTemplate
            title="Getting Started"
            description="Learn how to use Explore Tables with these simple examples."
        >
            <div className="content-sections">
                <section className="content-section">
                    <h3>Basic Usage</h3>
                    <p>
                        Start with a simple pivot table by defining your fields and data structure.
                        Here's how to create a basic pivot table:
                    </p>
                    <div className="example-container">
                        <CodeBlock code={basicExample} language="typescript" />
                        <div className="result-container">
                            <h4>Result:</h4>
                            <PivotTable
                                rows={rows}
                                fields={fields}
                                measures={["total"]}
                                dimensions={["species"]}
                                pivots={["habitat_type"]}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </PageTemplate>
    );
};

export default Home;
