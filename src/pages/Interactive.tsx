import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { dataset, model } from '../datasets/FuelConsumption';
import { DataAggregator, Dimension, Measure } from '../datasets/DataAggregator';
import { PivotTable } from '../../lib/main';

const dimensions: Dimension[] = model.dimensions;
const measures: Measure[] = model.measures;
const fields = new Array().concat(dimensions).concat(measures);

const DraggableItem = ({ id, index, type, children, moveItem }: {
    id: string;
    index: number;
    type: 'dimension' | 'pivoted' | 'measure';
    children: React.ReactNode;
    moveItem: (dragIndex: number, hoverIndex: number) => void;
}) => {
    const [{ isDragging }, drag] = useDrag({
        type,
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: type,
        hover: (item: { id: string; index: number }) => {
            if (!item) return;

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    return (
        <div
            ref={(node) => drag(drop(node))}
            style={{
                padding: '6px 12px',
                backgroundColor: type === 'measure' ? '#ffe0e0' :
                    type === 'pivoted' ? '#bbdefb' : '#e0e0e0',
                borderRadius: '16px',
                fontSize: '14px',
                cursor: 'grab',
                userSelect: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                margin: '4px',
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            {children}
        </div>
    );
};

export default () => {
    const [selectedDimensions, setSelectedDimensions] = useState<string[]>([]);
    const [selectedMeasures, setSelectedMeasures] = useState<string[]>([measures[0].id]);
    const [pivotedDimensions, setPivotedDimensions] = useState<string[]>([]);
    const [aggregatedData, setAggregatedData] = useState<any[] | null>(null);

    const toggleDimension = (dimension: Dimension) => {
        setSelectedDimensions(prev => {
            if (prev.includes(dimension.id)) {
                return prev.filter(id => id !== dimension.id);
            } else {
                return [...prev, dimension.id];
            }
        });
        // If dimension was pivoted, remove it from pivot when unselecting
        if (pivotedDimensions.includes(dimension.id)) {
            setPivotedDimensions(prev => prev.filter(id => id !== dimension.id));
        }
    };

    const toggleMeasure = (measure: Measure) => {
        setSelectedMeasures(prev => {
            if (prev.includes(measure.id)) {
                return prev.filter(id => id !== measure.id);
            } else {
                return [...prev, measure.id];
            }
        });
    };

    const togglePivot = (dimension: Dimension) => {
        // Can only pivot if dimension is selected
        if (!selectedDimensions.includes(dimension.id)) {
            setSelectedDimensions(prev => [...prev, dimension.id]);
        }
        setPivotedDimensions(prev => {
            if (prev.includes(dimension.id)) {
                return prev.filter(id => id !== dimension.id);
            } else {
                return [...prev, dimension.id];
            }
        });
    };

    const moveItem = useCallback((listId: string, dragIndex: number, hoverIndex: number) => {
        switch (listId) {
            case 'selected-dimensions': {
                setSelectedDimensions(prev => {
                    const nonPivoted = prev.filter(id => !pivotedDimensions.includes(id));
                    const pivoted = prev.filter(id => pivotedDimensions.includes(id));
                    const newList = [...nonPivoted];
                    const [movedItem] = newList.splice(dragIndex, 1);
                    newList.splice(hoverIndex, 0, movedItem);
                    return [...newList, ...pivoted];
                });
                break;
            }
            case 'pivoted-dimensions': {
                setPivotedDimensions(prev => {
                    const newList = [...prev];
                    const [movedItem] = newList.splice(dragIndex, 1);
                    newList.splice(hoverIndex, 0, movedItem);
                    return newList;
                });
                break;
            }
            case 'selected-measures': {
                setSelectedMeasures(prev => {
                    const newList = [...prev];
                    const [movedItem] = newList.splice(dragIndex, 1);
                    newList.splice(hoverIndex, 0, movedItem);
                    return newList;
                });
                break;
            }
        }
    }, [pivotedDimensions]);

    function handleDataChange() {
        if (selectedDimensions.length === 0 && selectedMeasures.length === 0) {
            setAggregatedData(null);
            return;
        }

        const aggregator = new DataAggregator(dataset);
        const result = aggregator.aggregate({
            dimensions: [...new Array<string>().concat(selectedDimensions)],
            measures: measures.filter(measure => selectedMeasures.includes(measure.id)).map(measure => {
                return {
                    field: measure.id,
                    type: measure.aggregate
                }
            }),
        });
        setAggregatedData(result);
    }

    useEffect(handleDataChange, [selectedDimensions, selectedMeasures]);

    useEffect(() => {
        console.log("selectedDimensions changed")
    }, [selectedDimensions]);

    useEffect(() => {
        console.log("selectedMeasures changed")
    }, [selectedMeasures]);

    useEffect(() => {
        console.log("pivotedDimensions changed")
    }, [pivotedDimensions]);

    useEffect(() => {
        console.log("handleDataChange changed")
    }, [handleDataChange]);


    const buttonStyle = {
        border: 'none',
        padding: '6px 16px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 500,
        textTransform: 'uppercase' as const,
        transition: 'background-color 0.3s',
        marginLeft: '8px',
        outline: 'none',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };
    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
                    {/* Left Sidebar */}
                    <div style={{
                        width: '400px',
                        borderRight: '1px solid #ccc',
                        padding: '20px',
                        backgroundColor: '#f5f5f5',
                        overflowY: 'auto'
                    }}>
                        <div>
                            <h3>Dimensions</h3>
                            {dimensions.map(dimension => (
                                <div key={dimension.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    margin: '8px 0',
                                    padding: '8px',
                                    backgroundColor: selectedDimensions.includes(dimension.id) ? '#e0e0e0' : 'white',
                                    borderRadius: '8px',
                                    userSelect: 'none'
                                }}>
                                    <div style={{ flex: 1, pointerEvents: 'none' }}>
                                        {dimension.name}
                                    </div>
                                    <button
                                        onClick={() => toggleDimension(dimension)}
                                        style={{
                                            ...buttonStyle,
                                            backgroundColor: selectedDimensions.includes(dimension.id) ? '#a0a0a0' : '#e0e0e0',
                                            color: selectedDimensions.includes(dimension.id) ? 'white' : 'black',
                                        }}
                                    >
                                        {selectedDimensions.includes(dimension.id) ? 'Remove' : 'Add'}
                                    </button>
                                    <button
                                        onClick={() => togglePivot(dimension)}
                                        style={{
                                            ...buttonStyle,
                                            backgroundColor: pivotedDimensions.includes(dimension.id) ? '#2196f3' : '#e0e0e0',
                                            color: pivotedDimensions.includes(dimension.id) ? 'white' : 'black',
                                        }}
                                    >
                                        Pivot
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <h3>Measures</h3>
                            {measures.map(measure => (
                                <div key={measure.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    margin: '8px 0',
                                    padding: '8px',
                                    backgroundColor: selectedMeasures.includes(measure.id) ? '#ffe0e0' : 'white',
                                    borderRadius: '8px',
                                    userSelect: 'none'
                                }}>
                                    <div style={{ flex: 1, pointerEvents: 'none' }}>
                                        {measure.name}
                                    </div>
                                    <button
                                        onClick={() => toggleMeasure(measure)}
                                        style={{
                                            ...buttonStyle,
                                            backgroundColor: selectedMeasures.includes(measure.id) ? '#ff4081' : '#e0e0e0',
                                            color: selectedMeasures.includes(measure.id) ? 'white' : 'black',
                                        }}
                                    >
                                        {selectedMeasures.includes(measure.id) ? 'Remove' : 'Add'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <div>
                                <h3>Selected Dimensions</h3>
                                <div
                                    id="selected-dimensions"
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '8px',
                                        minHeight: '40px',
                                        padding: '8px',
                                        border: '1px dashed #ccc',
                                        borderRadius: '4px',
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    {selectedDimensions
                                        .filter(id => !pivotedDimensions.includes(id))
                                        .map((dimensionId, index) => {
                                            const dimension = dimensions.find(d => d.id === dimensionId)!;
                                            return (
                                                <DraggableItem
                                                    key={dimension.id}
                                                    id={dimension.id}
                                                    index={index}
                                                    type="dimension"
                                                    moveItem={(dragIndex, hoverIndex) =>
                                                        moveItem('selected-dimensions', dragIndex, hoverIndex)}
                                                >
                                                    {dimension.name}
                                                </DraggableItem>
                                            );
                                        })}
                                </div>
                            </div>
                            <div style={{ marginTop: '12px' }}>
                                <h3>Pivoted Dimensions</h3>
                                <div
                                    id="pivoted-dimensions"
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '8px',
                                        minHeight: '40px',
                                        padding: '8px',
                                        border: '1px dashed #ccc',
                                        borderRadius: '4px',
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    {pivotedDimensions.map((dimensionId, index) => {
                                        const dimension = dimensions.find(d => d.id === dimensionId)!;
                                        return (
                                            <DraggableItem
                                                key={dimension.id}
                                                id={dimension.id}
                                                index={index}
                                                type="pivoted"
                                                moveItem={(dragIndex, hoverIndex) =>
                                                    moveItem('pivoted-dimensions', dragIndex, hoverIndex)}
                                            >
                                                {dimension.name}
                                            </DraggableItem>
                                        );
                                    })}
                                </div>
                            </div>

                            <div style={{ marginTop: '12px' }}>
                                <h3>Selected Measures</h3>
                                <div
                                    id="selected-measures"
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '8px',
                                        minHeight: '40px',
                                        padding: '8px',
                                        border: '1px dashed #ccc',
                                        borderRadius: '4px',
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    {selectedMeasures.map((measureId, index) => {
                                        const measure = measures.find(m => m.id === measureId)!;
                                        return (
                                            <DraggableItem
                                                key={measure.id}
                                                id={measure.id}
                                                index={index}
                                                type="measure"
                                                moveItem={(dragIndex, hoverIndex) =>
                                                    moveItem('selected-measures', dragIndex, hoverIndex)}
                                            >
                                                {measure.name}
                                            </DraggableItem>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div style={{
                            flex: 1,
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            padding: '16px',
                            backgroundColor: 'white'
                        }}>
                            <h3>Data Table</h3>
                            {aggregatedData === null && <div style={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#666'
                            }}>
                                Select dimensions and measures to display data
                            </div>}
                            {aggregatedData !== null && (
                                <PivotTable
                                    rows={aggregatedData}
                                    fields={fields}
                                    dimensions={selectedDimensions.filter(dimension => !pivotedDimensions.includes(dimension))}
                                    measures={selectedMeasures}
                                    pivots={pivotedDimensions}
                                />
                            )}


                        </div>
                    </div>
                </div>
            </div>
        </DndProvider >
    );
};
