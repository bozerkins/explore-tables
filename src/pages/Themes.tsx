// pages/Themes.tsx
import "./Themes.css"
import '../../public/themes/default.css';
import React, { useState } from 'react';
import { PivotTable } from 'explore-tables';
import PageTemplate from '../components/PageTemplate';
import CodeBlock from '../components/CodeBlock';
import { Link } from 'react-router-dom';

const Themes = () => {
    const [activeTheme, setActiveTheme] = useState('default');

    const themes = [
        { id: 'default', name: 'Default' },
        { id: 'night', name: 'Night' },
        { id: 'ocean', name: 'Ocean' },
        { id: 'forest', name: 'Forest' },
        { id: 'sunset', name: 'Sunset' },
        { id: 'royal', name: 'Royal' },
        { id: 'mint', name: 'Mint' },
        { id: 'berry', name: 'Berry' },
        { id: 'sky', name: 'Sky' },
        { id: 'earth', name: 'Earth' }
    ];


    // Sample data for the table
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

    const getThemeImports = () => {
        const imports = ["import 'explore-tables/themes/default.css';"];
        if (activeTheme !== 'default') {
            imports.push(`import 'explore-tables/themes/${activeTheme}.css';`);
        } else {
            imports.push(``);
        }
        return imports.join('\n');
    };

    const codeExample = `${getThemeImports()}

const MyComponent = () => (
    <PivotTable
        rows={data}
        fields={fields}
        dimensions={['category', 'product']}
        measures={['sales']}
        pivots={['region']}
    />
);`;

    return (
        <PageTemplate
            title="Themes"
            description="Explore different themes available for the pivot table component."
        >
            <div className="content-sections">
                <section className="content-section">
                    <h3>Available Themes</h3>
                    <p>
                        Choose from our pre-built themes to match your application's design.
                        Import the desired theme CSS file and the components will automatically adopt the styling.
                    </p>
                    <div className="theme-selector">
                        {themes.map(theme => (
                            <button
                                key={theme.id}
                                onClick={() => setActiveTheme(theme.id)}
                                className={`theme-button ${activeTheme === theme.id ? 'active' : ''}`}
                            >
                                {theme.name}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="content-section">
                    <h3>Theme Preview</h3>
                    <div className="example-container">
                        <CodeBlock code={codeExample} />
                        <div className={`result-container theme-${activeTheme}`}>
                            {(() => {
                                return <>
                                    <link rel="stylesheet" href={`themes/${activeTheme}.css`} />
                                    <PivotTable
                                        rows={data}
                                        fields={fields}
                                        dimensions={['category', 'product']}
                                        measures={['sales']}
                                        pivots={['region']}
                                    />
                                </>
                            })()}
                        </div>
                    </div>
                </section>

                <section className="content-section">
                    <h3>Creating Custom Themes</h3>
                    <p>
                        You can create your own theme by defining four essential CSS variables in your stylesheet.
                        These variables control the core visual aspects of the table components.
                    </p>
                    <div className="example-container">
                        <CodeBlock code={`.explore-table-container {
    --explore-main-color: #3e5488;    /* Primary color for headers and accents */
    --explore-second-color: #883e54;  /* Secondary color for highlights and interactions */
    --explore-color: #333;            /* Main text color */
    --explore-background: #ffffff;    /* Background color of the table */
}`} />
                    </div>
                    <p>
                        To implement your custom theme, create a CSS file with these variables and import it after the default theme.
                        The custom values will override the default theme while maintaining the component's structure.
                    </p>
                    <div className="example-container">
                        <CodeBlock code={`// First import the default theme as a base
import 'explore-tables/themes/default.css';

// Then import your custom theme to override the variables
import './my-custom-theme.css';`} />
                    </div>
                    <p>
                        The variables are used throughout the components as follows:
                    </p>
                    <ul className="theme-usage-list">
                        <li><code>--explore-main-color</code>: Used for headers, borders, and primary interactive elements</li>
                        <li><code>--explore-second-color</code>: Applied to highlights, hover states, and secondary elements</li>
                        <li><code>--explore-color</code>: Defines the main text color throughout the table</li>
                        <li><code>--explore-background</code>: Sets the base background color of the table</li>
                    </ul>

                    <p>
                        Explore the <strong>default.css</strong> styles for more override options or continue to the next section to create override table elements for custom styling.
                    </p>
                </section>

                {/* Next Section Link */}
                <div className="next-section">
                    <Link to="/Styled">
                        Next: Custom Styles →
                    </Link>
                </div>

            </div>
        </PageTemplate>
    );
};

export default Themes;
