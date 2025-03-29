
import React, { useRef, useState } from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import CanvasElement from './CanvasElement';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
      className={`flex-1 min-h-full bg-builder-background p-8 overflow-auto relative ${
        dropTargetActive ? 'ring-2 ring-builder-accent animate-drop-highlight' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleCanvasClick}
    >
      <div className="mx-auto max-w-4xl min-h-[60vh] bg-white rounded-lg shadow-md border border-builder-border p-8 relative">
        {elements.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground pointer-events-none gap-4">
            <div className="animate-pulse p-4 rounded-full bg-builder-primary/5">
              <AlertCircle size={40} className="text-builder-primary/50" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium">Your canvas is empty</p>
              <p className="text-sm mt-1">Drag and drop elements from the sidebar to get started</p>
            </div>
          </div>
        ) : (
          elements.map((element) => (
            <CanvasElement key={element.id} element={element} />
          ))
        )}
      </div>

      {isDragging && (
        <Alert className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-auto max-w-md bg-builder-primary text-white shadow-lg border-none animate-fade-in">
          <AlertDescription>
            Drop your element on the canvas to place it
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default BuilderCanvas;
