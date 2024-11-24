// pages/GettingStarted.tsx
import React from 'react';
import PageTemplate from '../components/PageTemplate';
import CodeBlock from '../components/CodeBlock';
import { PivotTable } from "../../lib/main";
import { Link } from 'react-router-dom';

const GettingStarted = () => {
    // Basic table data
    const basicData = [
        { category: 'Furniture', product: 'Chair', region: 'North', sales: 100 },
        { category: 'Furniture', product: 'Table', region: 'North', sales: 250 },
        { category: 'Electronics', product: 'Phone', region: 'South', sales: 300 },
        { category: 'Electronics', product: 'Laptop', region: 'South', sales: 1200 },
    ];

    return (
        <PageTemplate
            title="Getting Started"
            description="Learn how to use pivot tables step by step, from basic usage to advanced features."
        >
            <div className="content-sections">
                {/* Installation Section */}
                <section className="content-section">
                    <h3>Installation</h3>
                    <p>
                        Start by installing the package using npm. The package provides all the necessary components
                        for creating interactive pivot tables in your React application.
                    </p>
                    <div className="example-container">
                        <CodeBlock code={`npm install explore-tables`} />
                    </div>
                    <p>
                        After installation, you can import the PivotTable component and the default theme in your React components:
                    </p>
                    <div className="example-container">
                        <CodeBlock code={`
import { PivotTable } from 'explore-tables';
import 'explore-tables/themes/default.css'; `} />
                    </div>
                </section>
                {/* Basic Usage Section - stays the same except remove h4 Result */}
                <section className="content-section">
                    <h3>Basic Table Structure</h3>
                    <p>
                        Let's start with a simple table showing basic data organization with fields.
                    </p>
                    <div className="example-container">
                        <CodeBlock code={`
const data = [
    { category: 'Furniture', product: 'Chair', region: 'North', sales: 100 },
    { category: 'Furniture', product: 'Table', region: 'North', sales: 250 },
    { category: 'Electronics', product: 'Phone', region: 'South', sales: 300 },
    { category: 'Electronics', product: 'Laptop', region: 'South', sales: 1200 },
];

<PivotTable 
    rows={data}
    fields={[
        { id: 'category', name: 'Category' },
        { id: 'product', name: 'Product' },
        { id: 'region', name: 'Region' }
    ]}
/>
`} />
                        <div className="result-container">
                            <PivotTable
                                rows={basicData}
                                fields={[
                                    { id: 'category', name: 'Category' },
                                    { id: 'product', name: 'Product' },
                                    { id: 'region', name: 'Region' }
                                ]}
                            />
                        </div>
                    </div>
                </section>

                {/* Dimensions and Measures Section */}
                <section className="content-section">
                    <h3>Adding Dimensions and Measures</h3>
                    <p>
                        Now let's organize our data using dimensions and add measures for calculations.
                    </p>
                    <div className="example-container">
                        <CodeBlock code={`
const data = [
    { category: 'Furniture', product: 'Chair', region: 'North', sales: 100 },
    { category: 'Furniture', product: 'Table', region: 'North', sales: 250 },
    { category: 'Electronics', product: 'Phone', region: 'South', sales: 300 },
    { category: 'Electronics', product: 'Laptop', region: 'South', sales: 1200 },
];

<PivotTable 
    rows={data}
    fields={[
        { id: 'category', name: 'Category' },
        { id: 'product', name: 'Product' },
        { id: 'region', name: 'Region' },
        { id: 'sales', name: 'Sales' }
    ]}
    dimensions={['category', 'product', 'region']}
    measures={['sales']}
/>
`} />
                        <div className="result-container">
                            <PivotTable
                                rows={basicData}
                                fields={[
                                    { id: 'category', name: 'Category' },
                                    { id: 'product', name: 'Product' },
                                    { id: 'region', name: 'Region' },
                                    { id: 'sales', name: 'Sales' }
                                ]}
                                dimensions={['category', 'product', 'region']}
                                measures={['sales']}
                            />
                        </div>
                    </div>
                </section>

                {/* Pivots Section */}
                <section className="content-section">
                    <h3>Adding Pivot Columns</h3>
                    <p>
                        Finally, let's see how to pivot our data to create cross-tabulated views.
                    </p>
                    <div className="example-container">
                        <CodeBlock code={`
const data = [
    { category: 'Furniture', product: 'Chair', region: 'North', sales: 100 },
    { category: 'Furniture', product: 'Table', region: 'North', sales: 250 },
    { category: 'Electronics', product: 'Phone', region: 'South', sales: 300 },
    { category: 'Electronics', product: 'Laptop', region: 'South', sales: 1200 },
];

<PivotTable 
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
`} />
                        <div className="result-container">
                            <PivotTable
                                rows={basicData}
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
                        </div>
                    </div>
                </section>

                {/* Next Section Link */}
                <div className="next-section">
                    <Link to="/themes">
                        Next: Themes →
                    </Link>
                </div>
            </div>
        </PageTemplate>
    );
};

export default GettingStarted;
