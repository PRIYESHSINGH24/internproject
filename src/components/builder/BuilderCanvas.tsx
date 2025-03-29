
import React, { useRef, useState } from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import CanvasElement from './CanvasElement';

const BuilderCanvas = () => {
  const { elements, addElement, isDragging, draggedElementType, selectElement } = useBuilder();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dropTargetActive, setDropTargetActive] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isDragging && !dropTargetActive) {
      setDropTargetActive(true);
    }
  };

  const handleDragLeave = () => {
    setDropTargetActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropTargetActive(false);

    if (draggedElementType && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - canvasRect.left;
      const y = e.clientY - canvasRect.top;
      
      addElement(draggedElementType, { x, y });
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only deselect if clicking directly on the canvas, not on an element
    if (e.target === canvasRef.current) {
      selectElement(null);
    }
  };

  return (
    <div
      ref={canvasRef}
      className={`flex-1 min-h-full bg-builder-background p-6 overflow-auto relative ${
        dropTargetActive ? 'ring-2 ring-builder-accent ring-opacity-50' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleCanvasClick}
    >
      <div className="mx-auto max-w-4xl min-h-[500px] bg-white rounded-lg shadow-sm border border-builder-border p-8 relative">
        {elements.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
            Drag and drop elements here
          </div>
        ) : (
          elements.map((element) => (
            <CanvasElement key={element.id} element={element} />
          ))
        )}
      </div>
    </div>
  );
};

export default BuilderCanvas;
