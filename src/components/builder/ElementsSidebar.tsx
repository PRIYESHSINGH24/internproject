
import React from 'react';
import { Heading, Paragraph, Image, ChevronRight, Type, MoveRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useBuilder, ElementType } from '@/contexts/BuilderContext';

const ElementsSidebar = () => {
  const { setIsDragging, setDraggedElementType } = useBuilder();

  const handleDragStart = (type: ElementType) => {
    setIsDragging(true);
    setDraggedElementType(type);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedElementType(null);
  };

  const elements = [
    { type: 'heading' as ElementType, icon: <Type size={20} />, label: 'Heading' },
    { type: 'paragraph' as ElementType, icon: <Paragraph size={20} />, label: 'Paragraph' },
    { type: 'image' as ElementType, icon: <Image size={20} />, label: 'Image' },
    { type: 'button' as ElementType, icon: <MoveRight size={20} />, label: 'Button' },
  ];

  return (
    <div className="w-64 border-r border-builder-border h-full bg-builder-surface flex flex-col">
      <div className="p-4 font-semibold flex items-center text-builder-text">
        <ChevronRight size={16} className="mr-2" />
        Elements
      </div>
      <Separator />
      <div className="p-4 space-y-2">
        {elements.map((element) => (
          <div
            key={element.type}
            className="flex items-center p-3 bg-white border border-builder-border rounded-md cursor-move hover:shadow-sm transition-all"
            draggable
            onDragStart={() => handleDragStart(element.type)}
            onDragEnd={handleDragEnd}
          >
            <div className="mr-3 text-builder-primary">{element.icon}</div>
            <span className="text-sm font-medium text-builder-text">{element.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElementsSidebar;
