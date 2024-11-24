import { Dimension, Measure } from '../datasets/DataAggregator';
export declare const useInteractiveTable: () => {
    selectedDimensions: string[];
    selectedMeasures: string[];
    pivotedDimensions: string[];
    aggregatedData: any[] | null;
    toggleDimension: (dimension: Dimension) => void;
    toggleMeasure: (measure: Measure) => void;
    togglePivot: (dimension: Dimension) => void;
    moveItem: (listId: string, dragIndex: number, hoverIndex: number) => void;
};
