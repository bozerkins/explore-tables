import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PivotTable } from '../lib/PivotTable/PivotTable';
import tests from "../src/datasets/Tests";

describe('PivotTable', () => {
    // This will create a separate test for each element in tests array
    tests.forEach((testCase, index) => {
        it(`renders table correctly for test case ${index}: ${testCase.name}`, () => {
            const { name, fields, rows, pivots, measures } = testCase;
            const dimensions = fields
                .map((field) => field.id)
                .filter((field) => !pivots.includes(field as never) && !measures.includes(field));

            const table = <PivotTable
                rows={rows}
                fields={fields}
                measures={measures}
                dimensions={dimensions}
                pivots={pivots}
            />;
            const { container } = render(table);
            expect(container).toMatchSnapshot(`${name || `test-case-${index}`}`);
        });
    });
});

describe('PivotTable - data formats', () => {
    it(`renders basic json input correctly`, () => {
        // The data that is morphed into a pivot during rendering.
        // Note that the dataset should be unique between dimensions + pivots.
        // In case when duplicate records are found, the pivot table displays the last value.
        const data = [
            { category: 'Furniture', product: 'Chair', region: 'North', sales: 100 },
            { category: 'Furniture', product: 'Table', region: 'North', sales: 250 },
            { category: 'Electronics', product: 'Phone', region: 'South', sales: 300 },
            { category: 'Electronics', product: 'Laptop', region: 'South', sales: 1200 },
        ];

        // Render the data.
        // Note that pivot tables do not aggregate the data, but merely display it
        const table = <PivotTable
            rows={data}
            fields={[
                { id: 'category', name: 'Category' },
                { id: 'product', name: 'Product' },
                { id: 'region', name: 'Region' },
                { id: 'sales', name: 'Sales' }
            ]}
            dimensions={['category', 'product']}
            measures={['sales']}
            pivots={['region']}
        />
        const { container } = render(table);
        expect(container.innerHTML).toBe(`
            <div class="explore-table-container explore-smooth-scroll"><table class="explore-table"><tbody><tr class="explore-table-row"><td class="explore-pivot-title" colspan="2">Region</td><td class="explore-pivot-value" colspan="1">North</td><td class="explore-pivot-value" colspan="1">South</td></tr><tr class="explore-table-row"><td class="explore-column-title">Category</td><td class="explore-column-title">Product</td><td class="explore-measure-title">Sales</td><td class="explore-measure-title">Sales</td></tr><tr class="explore-table-row"><td class="explore-column-value">Furniture</td><td class="explore-column-value">Chair</td><td class="explore-measure-value">100</td><td class="explore-measure-value explore-empty-sign">∅</td></tr><tr class="explore-table-row"><td class="explore-column-value">Furniture</td><td class="explore-column-value">Table</td><td class="explore-measure-value">250</td><td class="explore-measure-value explore-empty-sign">∅</td></tr><tr class="explore-table-row"><td class="explore-column-value">Electronics</td><td class="explore-column-value">Phone</td><td class="explore-measure-value explore-empty-sign">∅</td><td class="explore-measure-value">300</td></tr><tr class="explore-table-row"><td class="explore-column-value">Electronics</td><td class="explore-column-value">Laptop</td><td class="explore-measure-value explore-empty-sign">∅</td><td class="explore-measure-value">1200</td></tr></tbody></table></div>
        `.trim());
    });

    // it(`renders basic json input correctly`, () => {
    //     // The data that is morphed into a pivot during rendering.
    //     // Note that the dataset should be unique between dimensions + pivots.
    //     // In case when duplicate records are found, the pivot table displays the last value.
    //     const data = [
    //         ['Furniture', 'Chair', 'North', 100],
    //         ['Furniture', 'Table', 'North', 250],
    //         ['Electronics', 'Phone', 'South', 300],
    //         ['Electronics', 'Laptop', 'South', 1200],
    //     ];

    //     // Render the data.
    //     // Note that pivot tables do not aggregate the data, but merely display it
    //     const table = <PivotTable
    //         rows={data}
    //         fields={[
    //             { id: 'category', name: 'Category' },
    //             { id: 'product', name: 'Product' },
    //             { id: 'region', name: 'Region' },
    //             { id: 'sales', name: 'Sales' }
    //         ]}
    //         dimensions={['category', 'product']}
    //         measures={['sales']}
    //         pivots={['region']}
    //     />
    //     const { container } = render(table);
    //     expect(container.innerHTML).toBe(`
    //         <div class="explore-table-container explore-smooth-scroll"><table class="explore-table"><tbody><tr class="explore-table-row"><td class="explore-pivot-title" colspan="2">Region</td><td class="explore-pivot-value" colspan="1">North</td><td class="explore-pivot-value" colspan="1">South</td></tr><tr class="explore-table-row"><td class="explore-column-title">Category</td><td class="explore-column-title">Product</td><td class="explore-measure-title">Sales</td><td class="explore-measure-title">Sales</td></tr><tr class="explore-table-row"><td class="explore-column-value">Furniture</td><td class="explore-column-value">Chair</td><td class="explore-measure-value">100</td><td class="explore-measure-value explore-empty-sign">∅</td></tr><tr class="explore-table-row"><td class="explore-column-value">Furniture</td><td class="explore-column-value">Table</td><td class="explore-measure-value">250</td><td class="explore-measure-value explore-empty-sign">∅</td></tr><tr class="explore-table-row"><td class="explore-column-value">Electronics</td><td class="explore-column-value">Phone</td><td class="explore-measure-value explore-empty-sign">∅</td><td class="explore-measure-value">300</td></tr><tr class="explore-table-row"><td class="explore-column-value">Electronics</td><td class="explore-column-value">Laptop</td><td class="explore-measure-value explore-empty-sign">∅</td><td class="explore-measure-value">1200</td></tr></tbody></table></div>
    //     `.trim());
    // });
})