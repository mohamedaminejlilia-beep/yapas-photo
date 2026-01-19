"use client";

import { useState, useEffect } from 'react';
import { FileImage, Frame, Box, Palette } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

// We use direct strings because the images are now in the PUBLIC folder
const plexiImg = "/plexi-sample.jpg";
const aluImg = "/alu-sample.jpg";
const pvcImg = "/pvc-sample.jpg";
const boisImg = "/bois-sample.jpg";

type SupportType = 'classique' | 'fineart' | 'rigide' | 'deco';
type RigideSubType = 'plexi3' | 'plexi5' | 'alu' | 'pvc' | 'bois';
type FormatCategory = 'standard' | 'poster' | 'panoramic' | 'square';

const SIZES: Record<FormatCategory, any[]> = {
  standard: [
    { value: '10x15', label: '10 × 15 cm', prices: { classique: 3, fineart: 45, plexi3: 150, plexi5: 180, alu: 150, pvc: 120, bois: 160, toile: 140 } },
    { value: '13x18', label: '13 × 18 cm', prices: { classique: 6, fineart: 60, plexi3: 200, plexi5: 230, alu: 200, pvc: 170, bois: 210, toile: 190 } },
    { value: '20x30', label: '20 × 30 cm', prices: { classique: 40, fineart: 180, plexi3: 360, plexi5: 400, alu: 360, pvc: 320, bois: 380, toile: 312 } },
  ],
  poster: [
    { value: '30x45', label: '30 × 45 cm', prices: { classique: 95, fineart: 520, plexi3: 520, plexi5: 580, alu: 520, pvc: 480, bois: 540, toile: 468 } },
    { value: '40x60', label: '40 × 60 cm', prices: { classique: 145, fineart: 680, plexi3: 680, plexi5: 760, alu: 680, pvc: 620, bois: 720, toile: 612 } },
  ],
  panoramic: [
    { value: '15x45', label: '15 × 45 cm', prices: { classique: 80, fineart: 420, plexi3: 420, plexi5: 460, alu: 420, pvc: 380, bois: 440, toile: 360 } },
  ],
  square: [
    { value: '30x30', label: '30 × 30 cm', prices: { classique: 75, fineart: 420, plexi3: 440, plexi5: 480, alu: 440, pvc: 400, bois: 460, toile: 360 } },
  ],
};

const RIGIDE_SUBTYPES = [
  { id: 'plexi3', label: 'Plexiglas 3mm', img: plexiImg },
  { id: 'plexi5', label: 'Plexiglas 5mm', img: plexiImg },
  { id: 'alu', label: 'Alu-Dibond 3mm', img: aluImg },
  { id: 'pvc', label: 'PVC 10mm', img: pvcImg },
  { id: 'bois', label: 'Bois 10mm', img: boisImg },
];

export function ProductConfiguratorAdvanced({ onSizeChange, onFormatChange }: any) {
  const [supportType, setSupportType] = useState<SupportType>('rigide');
  const [rigideSubType, setRigideSubType] = useState<RigideSubType>('alu');
  const [formatCategory, setFormatCategory] = useState<FormatCategory>('standard');
  const [selectedSize, setSelectedSize] = useState<string>('10x15');

  const currentSizes = SIZES[formatCategory] || [];

  useEffect(() => {
    if (onFormatChange) onFormatChange(formatCategory);
    const firstSize = currentSizes[0]?.value;
    if (firstSize) {
      setSelectedSize(firstSize);
      if (onSizeChange) onSizeChange(firstSize);
    }
  }, [formatCategory]);

  const getCurrentPrice = () => {
    const sizeData = currentSizes.find((s: any) => s.value === selectedSize);
    if (!sizeData) return 0;
    if (supportType === 'rigide') return sizeData.prices[rigideSubType] || 0;
    return sizeData.prices[supportType] || sizeData.prices.toile || 0;
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <Tabs value={supportType} onValueChange={(v: any) => setSupportType(v)}>
        <TabsList className="grid grid-cols-4 bg-neutral-100 p-1 rounded-xl mb-4">
          <TabsTrigger value="classique">Classique</TabsTrigger>
          <TabsTrigger value="fineart">Fine Art</TabsTrigger>
          <TabsTrigger value="rigide">Rigide</TabsTrigger>
          <TabsTrigger value="deco">Toile</TabsTrigger>
        </TabsList>

        {supportType === 'rigide' && (
          <div className="space-y-4 mb-6">
            <div className="h-44 w-full overflow-hidden rounded-2xl border bg-neutral-100">
              <img 
                src={RIGIDE_SUBTYPES.find(s => s.id === rigideSubType)?.img} 
                className="w-full h-full object-cover" 
                alt="Support Preview" 
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              {RIGIDE_SUBTYPES.map((sub) => (
                <button 
                  key={sub.id} 
                  onClick={() => setRigideSubType(sub.id as RigideSubType)} 
                  className={`text-left px-4 py-3 rounded-xl border-2 transition-all ${rigideSubType === sub.id ? 'bg-black text-white border-black font-bold' : 'bg-white border-neutral-200 text-neutral-600'}`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </Tabs>

      <div>
        <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-3 tracking-widest">1. Choisir le format</label>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['standard', 'poster', 'panoramic', 'square'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFormatCategory(cat)}
              className={`px-4 py-2 rounded-full border text-xs font-bold uppercase transition-all whitespace-nowrap ${formatCategory === cat ? 'bg-black text-white border-black' : 'bg-white border-neutral-200 text-neutral-500'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {currentSizes.map((size: any) => (
            <button 
              key={size.value} 
              onClick={() => setSelectedSize(size.value)} 
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center ${selectedSize === size.value ? 'bg-black text-white border-black shadow-lg' : 'bg-white border-neutral-100'}`}
            >
              <span className="font-bold text-sm">{size.label}</span>
              <span className="text-[10px] opacity-60">
                {supportType === 'rigide' ? size.prices[rigideSubType] : size.prices[supportType]} MAD
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 p-8 rounded-[2rem] bg-neutral-900 text-white text-center shadow-xl">
        <p className="text-[10px] uppercase tracking-widest opacity-50 mb-2">Prix Total</p>
        <p className="text-5xl font-black mb-6">{getCurrentPrice()} MAD</p>
        <button className="w-full bg-white text-black font-black py-5 rounded-2xl uppercase tracking-widest">
          Commander
        </button>
      </div>
    </div>
  );
}