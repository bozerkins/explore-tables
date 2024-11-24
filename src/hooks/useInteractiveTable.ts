// src/hooks/useInteractiveTable.ts
import { useState, useCallback, useEffect } from 'react';
import { Dimension, Measure, DataAggregator } from '../datasets/DataAggregator';
import { dataset, model } from '../datasets/FuelConsumption';

export const useInteractiveTable = () => {
    const [selectedDimensions, setSelectedDimensions] = useState<string[]>([model.dimensions[0].id, model.dimensions[1].id]);
    const [selectedMeasures, setSelectedMeasures] = useState<string[]>([model.measures[0].id]);
    const [pivotedDimensions, setPivotedDimensions] = useState<string[]>([model.dimensions[0].id]);
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

    useEffect(() => {
        if (selectedDimensions.length === 0 && selectedMeasures.length === 0) {
            setAggregatedData(null);
            return;
        }

        const aggregator = new DataAggregator(dataset);
        const result = aggregator.aggregate({
            dimensions: [...selectedDimensions],
            measures: model.measures
                .filter(measure => selectedMeasures.includes(measure.id))
                .map(measure => ({
                    field: measure.id,
                    type: measure.aggregate,
                    aggregate_over: measure.field,
                })),
        });
        setAggregatedData(result);
    }, [selectedDimensions, selectedMeasures]);

    return {
        selectedDimensions,
        selectedMeasures,
        pivotedDimensions,
        aggregatedData,
        toggleDimension,
        toggleMeasure,
        togglePivot,
        moveItem,
    };
};
