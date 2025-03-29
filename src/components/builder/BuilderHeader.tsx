
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Eye, Undo, Redo, Settings, Laptop, Smartphone, Tablet } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const BuilderHeader = () => {
  const handleSave = () => {
    toast.success('Changes saved successfully!');
  };

  const handlePreview = () => {
    toast.info('Preview mode not implemented in this prototype.');
  };

  return (
    <div className="h-16 border-b border-builder-border bg-white flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center">
        <h1 className="font-semibold text-xl text-builder-text flex items-center">
          <span className="text-builder-primary mr-2">Easy</span>
          <span className="bg-builder-primary text-white px-2 py-1 rounded-md">Drop</span>
          <span className="text-sm ml-2 text-muted-foreground">Builder</span>
        </h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="bg-builder-background rounded-md flex p-1 mr-2">
          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => toast.info('Desktop view active')}>
            <Laptop size={16} />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => toast.info('Tablet view not implemented')}>
            <Tablet size={16} />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => toast.info('Mobile view not implemented')}>
            <Smartphone size={16} />
          </Button>
        </div>
        
        <Button variant="outline" size="sm" className="h-9" onClick={() => toast.info('Undo not implemented in this prototype.')}>
          <Undo size={16} className="mr-1" />
          Undo
        </Button>
        <Button variant="outline" size="sm" className="h-9" onClick={() => toast.info('Redo not implemented in this prototype.')}>
          <Redo size={16} className="mr-1" />
          Redo
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button variant="outline" size="sm" className="h-9" onClick={handlePreview}>
          <Eye size={16} className="mr-1" />
          Preview
        </Button>
        <Button variant="outline" size="sm" className="h-9" onClick={() => toast.info('Settings not implemented in this prototype.')}>
          <Settings size={16} />
        </Button>
        <Button onClick={handleSave} className="h-9 bg-builder-primary hover:bg-builder-primary/90">
          <Save size={16} className="mr-1" />
          Save
        </Button>
      </div>
    </div>
  );
};

export default BuilderHeader;
