// pages/CustomElements.tsx
import React from 'react';
import { PivotTable } from 'explore-tables';
import PageTemplate from '../components/PageTemplate';
import CodeBlock from '../components/CodeBlock';
import { styledElements } from '../examples/StyledElements';
import { Link } from 'react-router-dom';

export default () => {
    // Sample data
    const fields = [
        { id: 'category', name: 'Category' },
        { id: 'product', name: 'Product' },
        { id: 'region', name: 'Region' },
        { id: 'sales', name: 'Sales' }
    ];

    const data = [
        { category: 'Furniture', product: 'Chair', region: 'North', sales: 100 },
        { category: 'Furniture', product: 'Table', region: 'North', sales: 250 },
        { category: 'Electronics', product: 'Phone', region: 'South', sales: 300 },
        { category: 'Electronics', product: 'Laptop', region: 'South', sales: 1200 }
    ];

    return (
        <PageTemplate
            title="Styled"
            description="Learn how to customize the appearance of your pivot table using element overrides."
        >
            <div className="content-sections">
                <section className="content-section">
                    <h3>Understanding Element Overrides</h3>
                    <p>
                        The pivot table component uses a flexible override system that allows customization
                        at different levels of the table structure.
                    </p>
                    <h4>Structural Elements</h4>
                    <p>
                        The base structure consists of three main components:
                    </p>
                    <ul>
                        <li><code>TableContainer</code> - Wraps the entire table, perfect for adding outer styling like shadows or borders</li>
                        <li><code>Table</code> - The main table element, controls the overall table layout</li>
                        <li><code>TableRow</code> - Individual rows, useful for adding row-specific styling or hover effects</li>
                    </ul>
                    <h4>Content Elements</h4>
                    <p>
                        Content elements are divided into three categories, each with title and value variants:
                    </p>
                    <ul>
                        <li><code>Column</code> - For dimension columns (leftmost columns)</li>
                        <li><code>Pivot</code> - For pivot headers and their corresponding values</li>
                        <li><code>Measure</code> - For measure headers and their values</li>
                    </ul>
                    <p>
                        Each content element receives <code>colSpan</code> for layout and an <code>empty</code> flag
                        for handling empty states. Always ensure your overrides handle empty states appropriately.
                    </p>
                </section>

                <section className="content-section">
                    <h3>Colorful Example</h3>
                    <p>
                        Here's a simple example that uses different colors for each element type,
                        making it easy to identify different parts of the table.
                    </p>
                    <div className="example-container">
                        <CodeBlock code={`const styledElements: TableOverrideConfig = {
    TableContainer: ({ children }) => (
        <div style={{
            padding: '16px',
            backgroundColor: '#f0f4f8',
            borderRadius: '8px'
        }}>
            {children}
        </div>
    ),

    MeasureTitle: ({ title, colSpan, empty }) => (
        <th style={{
            backgroundColor: '#ed64a6',
            color: 'white',
            padding: '12px',
            borderRadius: '4px'
        }} colSpan={colSpan}>
            {empty ? '-' : title}
        </th>
    ),

    MeasureValue: ({ value, colSpan, empty }) => (
        <td style={{
            backgroundColor: '#fed7e2',
            padding: '12px',
            borderRadius: '4px',
            textAlign: 'right'
        }} colSpan={colSpan}>
            {empty ? '-' : value}
        </td>
    ),

    // other elements ...
};

<PivotTable
    rows={data}
    fields={fields}
    dimensions={['category', 'product']}
    measures={['sales']}
    pivots={['region']}
    elements={colorfulElements}
/>
`} />
                        <div className="result-container">
                            <PivotTable
                                rows={data}
                                fields={fields}
                                dimensions={['category', 'product']}
                                measures={['sales']}
                                pivots={['region']}
                                elements={styledElements}
                            />
                        </div>
                    </div>
                </section>

                {/* Next Section Link */}
                <div className="next-section">
                    <Link to="/sorted">
                        Next: Sorting →
                    </Link>
                </div>
            </div>
        </PageTemplate>
    );
};