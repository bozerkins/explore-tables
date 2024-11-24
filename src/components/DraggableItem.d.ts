import { default as React } from 'react';
interface DraggableItemProps {
    id: string;
    index: number;
    type: 'dimension' | 'pivoted' | 'measure';
    children: React.ReactNode;
    moveItem: (dragIndex: number, hoverIndex: number) => void;
}
export declare const DraggableItem: React.FC<DraggableItemProps>;
export {};
