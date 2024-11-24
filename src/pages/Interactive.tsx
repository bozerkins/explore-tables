// src/pages/Interactive.tsx
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { model } from '../datasets/FuelConsumption';
import { PivotTable } from '../../lib/main';
import { DraggableItem } from '../components/DraggableItem';
import { useInteractiveTable } from '../hooks/useInteractiveTable';
import './Interactive.css';
import { useState } from 'react';

const dimensions = model.dimensions;
const measures = model.measures;
const fields = new Array().concat(dimensions).concat(measures);

export default () => {
    const [isInfoVisible, setIsInfoVisible] = useState(true);
    const {
        selectedDimensions,
        selectedMeasures,
        pivotedDimensions,
        aggregatedData,
        toggleDimension,
        toggleMeasure,
        togglePivot,
        moveItem,
    } = useInteractiveTable();

    return (
        <div className="interactive-wrapper">
            <div className="info-section">
                <div
                    className="info-header"
                    onClick={() => setIsInfoVisible(!isInfoVisible)}
                >
                    <h2>About This Demo</h2>
                    <button className={`collapse-button ${isInfoVisible ? 'expanded' : ''}`}>
                        <i className={`fa ${isInfoVisible ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </button>
                </div>

                {isInfoVisible && (
                    <div className="info-content">
                        <h3>Dataset: Fuel Consumption</h3>
                        <p>
                            This demo uses a dataset containing vehicle fuel consumption ratings.
                            The data includes various vehicle characteristics and their fuel efficiency metrics.
                        </p>

                        <h3>How to Use</h3>
                        <ol>
                            <li>
                                <strong>Select Dimensions:</strong> Choose the vehicle characteristics
                                you want to analyze (e.g., Make, Model, Vehicle Class)
                            </li>
                            <li>
                                <strong>Add Measures:</strong> Select the metrics you want to view
                                (e.g., Fuel Consumption, CO2 Emissions)
                            </li>
                            <li>
                                <strong>Pivot Data:</strong> Use the "Pivot" button to rotate dimensions
                                from rows to columns for different perspectives
                            </li>
                            <li>
                                <strong>Reorder Fields:</strong> Drag and drop dimensions in the
                                "Selected Dimensions" or "Pivoted Dimensions" sections to reorder them
                            </li>
                        </ol>

                        <div className="info-tip">
                            <strong>Tip:</strong> Try starting with one dimension and one measure,
                            then gradually add more to explore the data in different ways.
                        </div>
                    </div>
                )}
            </div>
            <DndProvider backend={HTML5Backend}>
                <div className="interactive-layout">
                    {/* Left Sidebar */}
                    <div className="interactive-sidebar">
                        <div className="sidebar-section">
                            <h3>Dimensions</h3>
                            <div className="field-list">
                                {dimensions.map(dimension => (
                                    <div key={dimension.id} className="field-item">
                                        <span className="field-name">{dimension.name}</span>
                                        <div className="field-actions">
                                            <button
                                                onClick={() => toggleDimension(dimension)}
                                                className={`action-button ${selectedDimensions.includes(dimension.id) ? 'active' : ''}`}
                                            >
                                                {selectedDimensions.includes(dimension.id) ? 'Remove' : 'Add'}
                                            </button>
                                            <button
                                                onClick={() => togglePivot(dimension)}
                                                className={`action-button ${pivotedDimensions.includes(dimension.id) ? 'pivot-active' : ''}`}
                                            >
                                                Pivot
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="sidebar-section">
                            <h3>Measures</h3>
                            <div className="field-list">
                                {measures.map(measure => (
                                    <div key={measure.id} className="field-item">
                                        <span className="field-name">{measure.name}</span>
                                        <button
                                            onClick={() => toggleMeasure(measure)}
                                            className={`action-button ${selectedMeasures.includes(measure.id) ? 'measure-active' : ''}`}
                                        >
                                            {selectedMeasures.includes(measure.id) ? 'Remove' : 'Add'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="interactive-content">
                        <div className="selected-fields">
                            <div className="field-section">
                                <h3>Selected Dimensions</h3>
                                <div className="draggable-container" id="selected-dimensions">
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

                            <div className="field-section">
                                <h3>Pivoted Dimensions</h3>
                                <div className="draggable-container" id="pivoted-dimensions">
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

                            <div className="field-section">
                                <h3>Selected Measures</h3>
                                <div className="draggable-container" id="selected-measures">
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

                        <div className="pivot-table-container">
                            {aggregatedData ? (
                                <PivotTable
                                    rows={aggregatedData}
                                    fields={fields}
                                    dimensions={selectedDimensions.filter(dimension => !pivotedDimensions.includes(dimension))}
                                    measures={selectedMeasures}
                                    pivots={pivotedDimensions}
                                />
                            ) : (
                                <div className="empty-state">
                                    <p>Select dimensions and measures to display data</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DndProvider>
        </div >
    );
};
