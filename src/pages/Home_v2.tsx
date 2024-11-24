// import React from "react";
import { PivotTable } from "../../lib/main"

// Example usage in Styled.tsx
import React from 'react';
import PageTemplate from '../components/PageTemplate';

// const Styled: React.FC = () => {
//     return (
//         <PageTemplate
//             title="Getting Started"
//             description="This demo showcases different styling options available for the pivot table."
//         >
//             {/* Your pivot table component goes here */}
//             <div className="table-container">
//                 {/* Your table content */}
//             </div>
//         </PageTemplate>
//     );
// };

// export default Styled;


export default () => {
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

    return (
        <PageTemplate
            title="Getting Started"
            description="This demo showcases different styling options available for the pivot table."
        >
            {/* Your pivot table component goes here */}
            <div className="table-container">
                <PivotTable
                    rows={rows}
                    fields={fields}
                    measures={["total",]}
                    dimensions={["species",]}
                    pivots={["habitat_type"]}
                />
            </div>
        </PageTemplate>
    );
    // return <div className="page-container">
    //     <div style={{ maxWidth: "750px", margin: "auto" }}>

    //     </div>
    // </div >
}