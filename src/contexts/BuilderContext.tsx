
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ElementType = 'heading' | 'paragraph' | 'image' | 'button';

export interface BuilderElement {
  id: string;
  type: ElementType;
  content: string;
  props: Record<string, any>;
  position: { x: number; y: number } | null;
}

interface BuilderContextType {
  elements: BuilderElement[];
  selectedElement: BuilderElement | null;
  addElement: (type: ElementType, position: { x: number; y: number }) => void;
  updateElement: (id: string, updates: Partial<BuilderElement>) => void;
  selectElement: (id: string | null) => void;
  deleteElement: (id: string) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  draggedElementType: ElementType | null;
  setDraggedElementType: (type: ElementType | null) => void;
}

export const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};

interface BuilderProviderProps {
  children: ReactNode;
}

export const BuilderProvider: React.FC<BuilderProviderProps> = ({ children }) => {
  const [elements, setElements] = useState<BuilderElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<BuilderElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElementType, setDraggedElementType] = useState<ElementType | null>(null);

  const addElement = (type: ElementType, position: { x: number; y: number }) => {
    const newElement: BuilderElement = {
      id: `element-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      props: getDefaultProps(type),
      position,
    };

    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement);
  };

  const updateElement = (id: string, updates: Partial<BuilderElement>) => {
    setElements(prev => 
      prev.map(el => (el.id === id ? { ...el, ...updates } : el))
    );

    if (selectedElement && selectedElement.id === id) {
      setSelectedElement(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const selectElement = (id: string | null) => {
    if (!id) {
      setSelectedElement(null);
      return;
    }
    
    const element = elements.find(el => el.id === id);
    setSelectedElement(element || null);
  };

  const deleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement(null);
    }
  };

  const getDefaultContent = (type: ElementType): string => {
    switch (type) {
      case 'heading':
        return 'New Heading';
      case 'paragraph':
        return 'This is a new paragraph. Click to edit the text.';
      case 'image':
        return 'https://via.placeholder.com/300x200';
      case 'button':
        return 'Click Me';
      default:
        return '';
    }
  };

  const getDefaultProps = (type: ElementType): Record<string, any> => {
    switch (type) {
      case 'heading':
        return { 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#1A1F2C',
          align: 'left'
        };
      case 'paragraph':
        return { 
          fontSize: '16px', 
          fontWeight: 'normal', 
          color: '#1A1F2C',
          align: 'left'
        };
      case 'image':
        return { 
          width: '300px', 
          height: '200px', 
          alt: 'Image description' 
        };
      case 'button':
        return { 
          backgroundColor: '#0EA5E9', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '4px' 
        };
      default:
        return {};
    }
  };

  const value = {
    elements,
    selectedElement,
    addElement,
    updateElement,
    selectElement,
    deleteElement,
    isDragging,
    setIsDragging,
    draggedElementType,
    setDraggedElementType,
  };

  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>;
};
