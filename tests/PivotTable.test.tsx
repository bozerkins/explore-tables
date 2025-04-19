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