
import React from 'react';
import ElementsSidebar from './ElementsSidebar';
import BuilderCanvas from './BuilderCanvas';
import PropertiesPanel from './PropertiesPanel';
import BuilderHeader from './BuilderHeader';
import { BuilderProvider } from '@/contexts/BuilderContext';
import { Card } from '@/components/ui/card';

const BuilderLayout = () => {
  return (
    <BuilderProvider>
      <div className="flex flex-col h-screen bg-builder-background">
        <BuilderHeader />
        <div className="flex flex-1 overflow-hidden">
          <Card className="rounded-none border-t-0 border-l-0 border-b-0">
            <ElementsSidebar />
          </Card>
          <BuilderCanvas />
          <Card className="rounded-none border-t-0 border-r-0 border-b-0 w-64 shadow-sm">
            <PropertiesPanel />
          </Card>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 bg-white p-2 rounded-full shadow-lg border border-builder-border text-xs opacity-70 hover:opacity-100 transition-opacity">
        EasyDrop v0.1
      </div>
    </BuilderProvider>
  );
};

export default BuilderLayout;
