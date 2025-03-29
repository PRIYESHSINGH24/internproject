
import React from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Sliders, Settings } from 'lucide-react';

const PropertiesPanel = () => {
  const { selectedElement, updateElement } = useBuilder();

  if (!selectedElement) {
    return (
      <div className="w-80 border-l border-builder-border h-full bg-builder-surface flex flex-col">
        <div className="p-4 font-semibold flex items-center text-builder-text">
          <Settings size={16} className="mr-2" />
          Properties
        </div>
        <Separator />
        <div className="p-4 text-sm text-gray-500 flex items-center justify-center h-full">
          Select an element to edit its properties
        </div>
      </div>
    );
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateElement(selectedElement.id, { content: e.target.value });
  };

  const handlePropChange = (prop: string, value: any) => {
    updateElement(selectedElement.id, {
      props: { ...selectedElement.props, [prop]: value },
    });
  };

  const renderCommonProperties = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        {selectedElement.type === 'paragraph' ? (
          <textarea
            id="content"
            className="w-full p-2 border border-builder-border rounded-md min-h-[100px]"
            value={selectedElement.content}
            onChange={handleContentChange}
          />
        ) : (
          <Input
            id="content"
            value={selectedElement.content}
            onChange={handleContentChange}
          />
        )}
      </div>
    </>
  );

  const renderTextProperties = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="fontSize">Font Size</Label>
        <Input
          id="fontSize"
          value={selectedElement.props.fontSize}
          onChange={(e) => handlePropChange('fontSize', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="color">Text Color</Label>
        <div className="flex items-center gap-2">
          <Input
            id="color"
            type="color"
            className="w-12 h-8 p-1"
            value={selectedElement.props.color}
            onChange={(e) => handlePropChange('color', e.target.value)}
          />
          <Input
            value={selectedElement.props.color}
            onChange={(e) => handlePropChange('color', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fontWeight">Font Weight</Label>
        <Select
          value={selectedElement.props.fontWeight}
          onValueChange={(value) => handlePropChange('fontWeight', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select weight" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="bold">Bold</SelectItem>
            <SelectItem value="lighter">Lighter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="align">Alignment</Label>
        <Select
          value={selectedElement.props.align}
          onValueChange={(value) => handlePropChange('align', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );

  const renderImageProperties = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="alt">Alt Text</Label>
        <Input
          id="alt"
          value={selectedElement.props.alt}
          onChange={(e) => handlePropChange('alt', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="width">Width</Label>
        <Input
          id="width"
          value={selectedElement.props.width}
          onChange={(e) => handlePropChange('width', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="height">Height</Label>
        <Input
          id="height"
          value={selectedElement.props.height}
          onChange={(e) => handlePropChange('height', e.target.value)}
        />
      </div>
    </>
  );

  const renderButtonProperties = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="backgroundColor">Background Color</Label>
        <div className="flex items-center gap-2">
          <Input
            id="backgroundColor"
            type="color"
            className="w-12 h-8 p-1"
            value={selectedElement.props.backgroundColor}
            onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
          />
          <Input
            value={selectedElement.props.backgroundColor}
            onChange={(e) => handlePropChange('backgroundColor', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="textColor">Text Color</Label>
        <div className="flex items-center gap-2">
          <Input
            id="textColor"
            type="color"
            className="w-12 h-8 p-1"
            value={selectedElement.props.color}
            onChange={(e) => handlePropChange('color', e.target.value)}
          />
          <Input
            value={selectedElement.props.color}
            onChange={(e) => handlePropChange('color', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="padding">Padding</Label>
        <Input
          id="padding"
          value={selectedElement.props.padding}
          onChange={(e) => handlePropChange('padding', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="borderRadius">Border Radius</Label>
        <Input
          id="borderRadius"
          value={selectedElement.props.borderRadius}
          onChange={(e) => handlePropChange('borderRadius', e.target.value)}
        />
      </div>
    </>
  );

  return (
    <div className="w-80 border-l border-builder-border h-full bg-builder-surface flex flex-col">
      <div className="p-4 font-semibold flex items-center text-builder-text">
        <Sliders size={16} className="mr-2" />
        {selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)} Properties
      </div>
      <Separator />
      <div className="p-4 space-y-4 overflow-auto">
        {renderCommonProperties()}
        
        <Separator className="my-4" />
        
        {(selectedElement.type === 'heading' || selectedElement.type === 'paragraph') && renderTextProperties()}
        {selectedElement.type === 'image' && renderImageProperties()}
        {selectedElement.type === 'button' && renderButtonProperties()}
      </div>
    </div>
  );
};

export default PropertiesPanel;
