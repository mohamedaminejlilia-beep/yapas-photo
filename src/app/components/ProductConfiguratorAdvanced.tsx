"use client";

import { useState, useEffect } from 'react';
import { FileImage, Frame, Box, Palette, Info } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

// 1. IMAGE PATHS - Direct strings for the public folder
const plexiImg = "/plexi-sample.jpg";
const aluImg = "/alu-sample.jpg";
const pvcImg = "/pvc-sample.jpg";
const boisImg = "/bois-sample.jpg";

type SupportType = 'classique' | 'fineart' | 'rigide' | 'deco';
type RigideSubType = 'plexi' | 'alu' | 'pvc' | 'bois';
type FormatCategory = 'standard' | 'panoramic' | 'square';

// OFFICIAL 2026 PRICING DATA [cite: 17, 19, 22]
const SIZES: Record<FormatCategory, any[]> = {
  standard: [
    { value: '10x15', label: '10 × 15 cm', prices: { classique: 3, fineart: 0, plexi: 0, alu: 0, bois: 0, toile: 0 } },
    { value: '13x18', label: '13 × 18 cm', prices: { classique: 6, fineart: 0, plexi: 0, alu: 0, bois: 0, toile: 0 } },
    { value: '15x20', label: '15 × 20 cm', prices: { classique: 15, fineart: 0, plexi: 0, alu: 0, bois: 0, toile: 0 } },
    { value: '18x24', label: '18 × 24 cm', prices: { classique: 20, fineart: 0, plexi: 0, alu: 0, bois: 0, toile: 0 } },
    { value: '20x30', label: '20 × 30 cm', prices: { classique: 60, fineart: 360, plexi: 360, alu: 312, bois: 252, toile: 312 }, minFineArt: 4 },
    { value: '30x45', label: '30 × 45 cm', prices: { classique: 90, fineart: 504, plexi: 468, alu: 396, bois: 312, toile: 396 }, minFineArt: 2 },
    { value: '40x60', label: '40 × 60 cm', prices: { classique: 180, fineart: 864, plexi: 756, alu: 660, bois: 552, toile: 660 } },
    { value: '50x75', label: '50 × 75 cm', prices: { classique: 264, fineart: 1050, plexi: 1068, alu: 828, bois: 708, toile: 828 } },
    { value: '60x90', label: '60 × 90 cm', prices: { classique: 384, fineart: 1440, plexi: 2640, alu: 1440, bois: 900, toile: 1068 } },
    { value: '80x120', label: '80 × 120 cm', prices: { classique: 816, fineart: 2304, plexi: 4320, alu: 2340, bois: 1548, toile: 1788 } },
    { value: '100x150', label: '100 × 150 cm', prices: { classique: 1188, fineart: 3120, plexi: 4980, alu: 2820, bois: 1860, toile: 2160 } },
  ],
  panoramic: [
    { value: '15x45', label: '15 × 45 cm', prices: { classique: 84, fineart: 0, plexi: 468, alu: 396, bois: 312, toile: 396 } },
    { value: '20x60', label: '20 × 60 cm', prices: { classique: 180, fineart: 504, plexi: 756, alu: 660, bois: 552, toile: 660 } },
    { value: '30x90', label: '30 × 90 cm', prices: { classique: 219, fineart: 972, plexi: 1068, alu: 828, bois: 708, toile: 828 } },
    { value: '40x120', label: '40 × 120 cm', prices: { classique: 420, fineart: 1440, plexi: 3000, alu: 1740, bois: 1140, toile: 1308 } },
    { value: '50x150', label: '50 × 150 cm', prices: { classique: 648, fineart: 1800, plexi: 3240, alu: 1980, bois: 1260, toile: 1440 } },
    { value: '90x160', label: '90 × 160 cm', prices: { classique: 1188, fineart: 3456, plexi: 4980, alu: 2820, bois: 1860, toile: 2160 } },
  ],
  square: [
    { value: '30x30', label: '30 × 30 cm', prices: { classique: 84, fineart: 378, plexi: 468, alu: 396, bois: 312, toile: 396 } },
    { value: '40x40', label: '40 × 40 cm', prices: { classique: 156, fineart: 588, plexi: 660, alu: 588, bois: 492, toile: 492 } },
    { value: '50x50', label: '50 × 50 cm', prices: { classique: 240, fineart: 900, plexi: 1068, alu: 828, bois: 708, toile: 828 } },
    { value: '60x60', label: '60 × 60 cm', prices: { classique: 348, fineart: 1296, plexi: 2340, alu: 1308, bois: 852, toile: 1020 } },
    { value: '80x80', label: '80 × 80 cm', prices: { classique: 648, fineart: 1536, plexi: 3120, alu: 1860, bois: 1260, toile: 1440 } },
    { value: '100x100', label: '100 × 100 cm', prices: { classique: 1020, fineart: 2400, plexi: 4140, alu: 2340, bois: 1548, toile: 1788 } },
  ],
};

const RIGIDE_SUBTYPES = [
  { id: 'plexi', label: 'Pléxi (Alucobond + Châssis)', img: plexiImg, desc: 'Verso renforcé en Alucobond avec châssis rentrant en aluminium.' },
  { id: 'alu', label: 'Alu-Dibond (Châssis rentrant)', img: aluImg, desc: 'Châssis rentrant en aluminium pour un effet de flottement.' },
  { id: 'bois', label: 'Bois 10mm', img: boisImg, desc: 'Finition naturelle sur support bois robuste.' },
  { id: 'pvc', label: 'PVC 10mm', img: pvcImg, desc: 'Support rigide léger et moderne.' },
];

export function ProductConfiguratorAdvanced({ onSizeChange, onFormatChange }: any) {
  const [supportType, setSupportType] = useState<SupportType>('classique');
  const [rigideSubType, setRigideSubType] = useState<RigideSubType>('alu');
  const [formatCategory, setFormatCategory] = useState<FormatCategory>('standard');
  const [selectedSize, setSelectedSize] = useState<string>('20x30');

  const currentSizes = SIZES[formatCategory] || [];
  const selectedSizeData = currentSizes.find(s => s.value === selectedSize);

  useEffect(() => {
    if (onFormatChange) onFormatChange(formatCategory);
    const firstAvailable = currentSizes.find(s => s.prices[supportType] > 0 || supportType === 'rigide');
    if (firstAvailable) setSelectedSize(firstAvailable.value);
  }, [formatCategory, supportType]);

  const getCurrentPrice = () => {
    if (!selectedSizeData) return 0;
    if (supportType === 'rigide') return selectedSizeData.prices[rigideSubType] || 0;
    return selectedSizeData.prices[supportType] || 0;
  };

  return (
    <div className="flex flex-col gap-6 p-4 max-w-2xl mx-auto font-sans">
      <div className="border-b pb-4 flex justify-between items-end">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Studio Photo</h1>
        <span className="text-[10px] font-bold text-neutral-400">TARIFS 2026</span>
      </div>

      <Tabs value={supportType} onValueChange={(v: any) => setSupportType(v)}>
        <TabsList className="grid grid-cols-4 bg-neutral-100 p-1 rounded-xl mb-4">
          <TabsTrigger value="classique">Standard</TabsTrigger>
          <TabsTrigger value="fineart">Fine Art</TabsTrigger>
          <TabsTrigger value="rigide">Rigide</TabsTrigger>
          <TabsTrigger value="deco">Toile</TabsTrigger>
        </TabsList>

        {supportType === 'rigide' && (
          <div className="space-y-4 mb-6">
            <div className="h-44 w-full overflow-hidden rounded-2xl border bg-neutral-100 relative">
              <img 
                src={RIGIDE_SUBTYPES.find(s => s.id === rigideSubType)?.img} 
                className="w-full h-full object-cover" 
                alt="Support Preview" 
              />
              <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1">
                <Info size={10} /> {RIGIDE_SUBTYPES.find(s => s.id === rigideSubType)?.desc}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {RIGIDE_SUBTYPES.map((sub) => (
                <button 
                  key={sub.id} 
                  onClick={() => setRigideSubType(sub.id as RigideSubType)} 
                  className={`text-left px-4 py-3 rounded-xl border-2 transition-all text-xs ${rigideSubType === sub.id ? 'bg-black text-white border-black font-bold' : 'bg-white border-neutral-200 text-neutral-600'}`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </Tabs>

      <div>
        <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-3 tracking-widest">Catégorie de Format</label>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {(['standard', 'panoramic', 'square'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFormatCategory(cat)}
              className={`px-6 py-2 rounded-full border text-xs font-bold uppercase transition-all whitespace-nowrap ${formatCategory === cat ? 'bg-black text-white border-black' : 'bg-white border-neutral-200 text-neutral-500'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {currentSizes.map((size: any) => {
            const price = supportType === 'rigide' ? size.prices[rigideSubType] : size.prices[supportType];
            if (price === 0) return null; // Hide sizes not available for this support

            return (
              <button 
                key={size.value} 
                onClick={() => setSelectedSize(size.value)} 
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center relative ${selectedSize === size.value ? 'bg-black text-white border-black shadow-lg' : 'bg-white border-neutral-100'}`}
              >
                <span className="font-bold text-sm">{size.label}</span>
                <span className="text-[10px] opacity-60">{price} MAD</span>
                {supportType === 'fineart' && size.minFineArt && (
                  <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[8px] font-black px-1.5 py-0.5 rounded-full">
                    MIN {size.minFineArt}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 p-8 rounded-[2rem] bg-neutral-900 text-white text-center shadow-xl">
        <p className="text-[10px] uppercase tracking-widest opacity-50 mb-2">Estimation Prix Unitaire</p>
        <p className="text-5xl font-black mb-6">{getCurrentPrice()} MAD</p>
        <button className="w-full bg-white text-black font-black py-5 rounded-2xl uppercase tracking-widest hover:scale-95 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          Commander le Tirage
        </button>
      </div>
    </div>
  );
}