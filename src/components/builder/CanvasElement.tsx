
import React from 'react';
import { useBuilder, BuilderElement } from '@/contexts/BuilderContext';
import { Trash2 } from 'lucide-react';

interface CanvasElementProps {
  element: BuilderElement;
}

const CanvasElement: React.FC<CanvasElementProps> = ({ element }) => {
  const { selectElement, selectedElement, deleteElement } = useBuilder();
  const isSelected = selectedElement?.id === element.id;

  const handleElementClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteElement(element.id);
  };

  const renderElementContent = () => {
    const { type, content, props } = element;

    switch (type) {
      case 'heading':
        return (
          <h2 
            style={{ 
              fontSize: props.fontSize, 
              fontWeight: props.fontWeight, 
              color: props.color,
              textAlign: props.align,
            }}
          >
            {content}
          </h2>
        );
      case 'paragraph':
        return (
          <p 
            style={{ 
              fontSize: props.fontSize, 
              fontWeight: props.fontWeight, 
              color: props.color,
              textAlign: props.align,
            }}
          >
            {content}
          </p>
        );
      case 'image':
        return (
          <img 
            src={content} 
            alt={props.alt} 
            style={{ 
              width: props.width, 
              height: props.height 
            }} 
            className="object-cover"
          />
        );
      case 'button':
        return (
          <button
            style={{
              backgroundColor: props.backgroundColor,
              color: props.color,
              padding: props.padding,
              borderRadius: props.borderRadius,
            }}
            className="transition-colors hover:opacity-90"
          >
            {content}
          </button>
        );
      default:
        return null;
    }
  };

  // Position the element if it has position data
  const style = element.position
    ? { 
        position: 'absolute' as const, 
        left: `${element.position.x}px`, 
        top: `${element.position.y}px` 
      }
    : {};

  return (
    <div
      className={`relative ${isSelected ? 'ring-2 ring-builder-primary' : ''}`}
      style={style}
      onClick={handleElementClick}
    >
      {renderElementContent()}
      
      {isSelected && (
        <div className="absolute -top-3 -right-3 bg-builder-primary rounded-full p-1 cursor-pointer text-white hover:bg-red-500 transition-colors">
          <Trash2 size={14} onClick={handleDeleteClick} />
        </div>
      )}
    </div>
  );
};

export default CanvasElement;
