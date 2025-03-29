
import React from 'react';
import { Heading, Image, ChevronRight, Type, MoveRight, Text } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useBuilder, ElementType } from '@/contexts/BuilderContext';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

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
    { type: 'heading' as ElementType, icon: <Type size={20} />, label: 'Heading', description: 'Add a heading to your page' },
    { type: 'paragraph' as ElementType, icon: <Text size={20} />, label: 'Paragraph', description: 'Add a paragraph of text' },
    { type: 'image' as ElementType, icon: <Image size={20} />, label: 'Image', description: 'Add an image to your page' },
    { type: 'button' as ElementType, icon: <MoveRight size={20} />, label: 'Button', description: 'Add an interactive button' },
  ];

  return (
    <div className="w-64 border-r border-builder-border h-full bg-white flex flex-col shadow-sm">
      <div className="p-4 font-semibold flex items-center text-builder-text bg-gradient-to-r from-builder-primary/10 to-transparent">
        <ChevronRight size={16} className="mr-2 text-builder-primary" />
        <span className="text-lg">Elements</span>
      </div>
      <Separator />
      <div className="p-4 space-y-3 overflow-y-auto">
        {elements.map((element) => (
          <HoverCard key={element.type}>
            <HoverCardTrigger asChild>
              <div
                className="flex items-center p-3 bg-white border border-builder-border rounded-md cursor-move hover:border-builder-primary hover:shadow-md transition-all group relative"
                draggable
                onDragStart={() => handleDragStart(element.type)}
                onDragEnd={handleDragEnd}
              >
                <div className="mr-3 text-builder-primary bg-builder-primary/10 p-2 rounded-md group-hover:bg-builder-primary group-hover:text-white transition-all">
                  {element.icon}
                </div>
                <span className="text-sm font-medium text-builder-text">{element.label}</span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="flex justify-between space-x-4">
                <div>
                  <h4 className="text-sm font-semibold">{element.label}</h4>
                  <p className="text-xs text-muted-foreground">{element.description}</p>
                  <p className="text-xs text-builder-primary mt-1">Drag and drop to add to your page</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default ElementsSidebar;
