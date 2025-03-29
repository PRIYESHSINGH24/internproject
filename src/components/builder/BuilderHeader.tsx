
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Eye, Undo, Redo, Settings } from 'lucide-react';
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
    <div className="h-14 border-b border-builder-border bg-white flex items-center justify-between px-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg text-builder-text">EasyDrop Builder</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => toast.info('Undo not implemented in this prototype.')}>
          <Undo size={16} className="mr-1" />
          Undo
        </Button>
        <Button variant="outline" size="sm" onClick={() => toast.info('Redo not implemented in this prototype.')}>
          <Redo size={16} className="mr-1" />
          Redo
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button variant="outline" size="sm" onClick={handlePreview}>
          <Eye size={16} className="mr-1" />
          Preview
        </Button>
        <Button variant="outline" size="sm" onClick={() => toast.info('Settings not implemented in this prototype.')}>
          <Settings size={16} />
        </Button>
        <Button onClick={handleSave}>
          <Save size={16} className="mr-1" />
          Save
        </Button>
      </div>
    </div>
  );
};

export default BuilderHeader;
