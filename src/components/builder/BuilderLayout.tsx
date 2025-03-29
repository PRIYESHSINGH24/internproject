
import React from 'react';
import ElementsSidebar from './ElementsSidebar';
import BuilderCanvas from './BuilderCanvas';
import PropertiesPanel from './PropertiesPanel';
import BuilderHeader from './BuilderHeader';
import { BuilderProvider } from '@/contexts/BuilderContext';

const BuilderLayout = () => {
  return (
    <BuilderProvider>
      <div className="flex flex-col h-screen bg-builder-background">
        <BuilderHeader />
        <div className="flex flex-1 overflow-hidden">
          <ElementsSidebar />
          <BuilderCanvas />
          <PropertiesPanel />
        </div>
      </div>
    </BuilderProvider>
  );
};

export default BuilderLayout;
