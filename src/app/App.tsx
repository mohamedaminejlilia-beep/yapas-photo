import { useState } from 'react';
import { Navigation } from '@/app/components/Navigation';
import { DynamicVisualizer } from '@/app/components/DynamicVisualizer';
import { ProductConfiguratorAdvanced } from '@/app/components/ProductConfiguratorAdvanced';
import { TechnicalSpecs } from '@/app/components/TechnicalSpecs';

type FormatCategory = 'standard' | 'poster' | 'panoramic' | 'square';

export default function App() {
  const [selectedSize, setSelectedSize] = useState<string>('10x15');
  const [selectedFormat, setSelectedFormat] = useState<FormatCategory>('standard');

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      
      {/* Hero Section - Split Layout */}
      <main className="mx-auto max-w-[1440px] px-6 md:px-20 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column - Dynamic Visualizer */}
          <div className="lg:col-span-5">
            <DynamicVisualizer size={selectedSize} format={selectedFormat} />
          </div>

          {/* Right Column - Advanced Configurator */}
          <div className="lg:col-span-7">
            <ProductConfiguratorAdvanced 
              onSizeChange={setSelectedSize}
              onFormatChange={setSelectedFormat}
            />
          </div>
        </div>
      </main>

      {/* Technical Specs */}
      <TechnicalSpecs />
    </div>
  );
}
