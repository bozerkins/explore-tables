import { useState } from "react";
import Default from "../datasets/Default";
import React from "react";
import { PivotTable } from "../../lib/main";

export default () => {
    const [showOnlyOne, setShowOnlyOne] = useState<number | null>(null);
    return (
        <div>
            <section>
                <h1>
                    Pivot table test
                </h1>
                <div style={{ overflow: "inherit" }}>
                    <div>
                        {Default.map(({ name, fields, rows, pivots, measures, sorting }, index) => {
                            if (showOnlyOne !== null && showOnlyOne !== index) {
                                return <React.Fragment key={index}></React.Fragment>;
                            }
                            console.log("Starting " + name);
                            return (
                                <div key={index}>
                                    <h5>{name}</h5>
                                    <button
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
                                    <div style={{ display: "flex", gap: "50px" }}>
                                        <div>
                                            <h6>Dimensions</h6>
                                            <pre>
                                                {JSON.stringify(
                                                    fields
                                                        .map((field) => field.id)
                                                        .filter((field) => !pivots.includes(field as never) && !measures.includes(field))
                                                )}
                                            </pre>
                                        </div>
                                        <div>
                                            <h6>Pivots</h6>
                                            <pre>{JSON.stringify(pivots)}</pre>
                                        </div>
                                        <div>
                                            <h6>Measures</h6>
                                            <pre>{JSON.stringify(measures)}</pre>
                                        </div>
                                        <div>
                                            <h6>Sorting</h6>
                                            <pre>{JSON.stringify(sorting)}</pre>
                                        </div>
                                    </div>
                                    <PivotTable rows={rows} fields={fields} measures={measures} pivots={pivots} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section >
        </div >
    );
}