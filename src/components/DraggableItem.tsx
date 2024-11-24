// src/components/DraggableItem.tsx
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface DraggableItemProps {
    id: string;
    index: number;
    type: 'dimension' | 'pivoted' | 'measure';
    children: React.ReactNode;
    moveItem: (dragIndex: number, hoverIndex: number) => void;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({
    id,
    index,
    type,
    children,
    moveItem
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
