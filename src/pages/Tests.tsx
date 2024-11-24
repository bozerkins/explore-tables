import React, { useState } from "react";
import tests from "../datasets/Tests";
import { PivotTable } from "../../lib/main";
import PageTemplate from "../components/PageTemplate";
import CodeBlock from "../components/CodeBlock";
import "./Tests.css"

export default () => {
    const [showOnlyOne, setShowOnlyOne] = useState<number | null>(null);

    return (
        <PageTemplate
            title="Tests"
            description="Manual testing environment for pivot table configurations"
        >
            <div className="test-description">
                <h2>Test Cases Overview</h2>
                <p>
                    This page demonstrates various configurations and edge cases for the pivot table component.
                    Each test case shows different aspects of the table's functionality.
                </p>

                <h3>Test Categories</h3>
                <ul>
                    <li>
                        <strong>Basic Configurations:</strong>
                        <ul>
                            <li>Simple tables with measures only</li>
                            <li>Tables without measures</li>
                            <li>Empty dataset handling</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Pivot Configurations:</strong>
                        <ul>
                            <li>Single pivot column</li>
                            <li>Multiple pivot columns</li>
                            <li>Pivot tables without measures</li>
                            <li>Pivot tables with multiple measures</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Edge Cases:</strong>
                        <ul>
                            <li>Empty datasets with pivots</li>
                            <li>Single row datasets</li>
                            <li>Tables with all columns as pivots</li>
                            <li>Tables with no columns as pivots</li>
                        </ul>
                    </li>
                </ul>

                <div className="usage-note">
                    <strong>Note:</strong> Each test case can be viewed individually using the "Show only this" button,
                    or you can view all cases simultaneously. The configuration for each test is displayed above its table,
                    showing the dimensions, pivots, and measures being used.
                </div>
            </div>

            <div className="content-sections">
                {tests.map(({ name, fields, rows, pivots, measures }, index) => {
                    if (showOnlyOne !== null && showOnlyOne !== index) {
                        return <React.Fragment key={index}></React.Fragment>;
                    }
                    console.log("Starting " + name);
                    const dimensions = fields
                        .map((field) => field.id)
                        .filter((field) => !pivots.includes(field as never) && !measures.includes(field));

                    return (
                        <section className="content-section" key={index}>
                            <div className="test-header">
                                <h3>{name}</h3>
                                <button
                                    className="toggle-button"
                                    onClick={() => {
                                        if (showOnlyOne !== index) {
                                            setShowOnlyOne(index);
                                        } else {
                                            setShowOnlyOne(null);
                                        }
                                    }}
                                >
                                    {showOnlyOne !== index ? "Show only this" : "Show all"}
                                </button>
                            </div>
                            <div className="test-config">
                                <div className="config-item">
                                    <h6>Dimensions</h6>
                                    <CodeBlock code={JSON.stringify(dimensions)} />
                                </div>
                                <div className="config-item">
                                    <h6>Pivots</h6>
                                    <CodeBlock code={JSON.stringify(pivots)} />
                                </div>
                                <div className="config-item">
                                    <h6>Measures</h6>
                                    <CodeBlock code={JSON.stringify(measures)} />
                                </div>
                            </div>
                            <PivotTable
                                rows={rows}
                                fields={fields}
                                measures={measures}
                                dimensions={dimensions}
                                pivots={pivots}
                            />
                        </section>
                    );
                })}
            </div>
        </PageTemplate>
    );
};
