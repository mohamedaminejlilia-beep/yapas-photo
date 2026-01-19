import { useState, useEffect } from 'react';
import { Sparkles, Box, Frame, Info } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

type Category = 'standard' | 'poster' | 'panoramic' | 'square';
type Support = 'classic' | 'fineart' | 'rigid';

interface SupportOption {
  id: Support;
  labelFr: string;
  labelEn: string;
  descriptionFr: string;
  descriptionEn: string;
  icon: React.ReactNode;
  startingPrice: string;
}

interface SizeOption {
  value: string;
  label: string;
  prices: {
    classic: number | null;
    fineart: number | null;
    rigid: number | null;
  };
}

const CATEGORIES = [
  { id: 'standard' as Category, label: 'Standard' },
  { id: 'poster' as Category, label: 'Poster' },
  { id: 'panoramic' as Category, label: 'Panoramic' },
  { id: 'square' as Category, label: 'Square' },
];

const SUPPORTS: SupportOption[] = [
  {
    id: 'classic',
    labelFr: 'Le Tirage Classique',
    labelEn: 'Classic Print',
    descriptionFr: 'Papier Fuji Crystal Archive – Idéal pour vos albums et cadres classiques.',
    descriptionEn: 'Fuji Crystal Archive Paper – Perfect for albums and everyday framing.',
    icon: <Sparkles className="h-5 w-5" />,
    startingPrice: 'À partir de 3,00 MAD',
  },
  {
    id: 'fineart',
    labelFr: 'Le Tirage Fine Art',
    labelEn: 'Fine Art Print',
    descriptionFr: 'Papier Canson® ou Hahnemühle – Texture riche, noirs profonds, conservation 100 ans.',
    descriptionEn: 'Canson® or Hahnemühle Paper – Rich texture, deep blacks, 100-year archival.',
    icon: <Frame className="h-5 w-5" />,
    startingPrice: 'À partir de 360,00 MAD',
  },
  {
    id: 'rigid',
    labelFr: 'Finition Rigide',
    labelEn: 'Rigid Finish',
    descriptionFr: 'Effet 3D et profondeur exceptionnelle. Livré prêt à poser.',
    descriptionEn: '3D depth effect & ultra-modern finish. Ready to hang.',
    icon: <Box className="h-5 w-5" />,
    startingPrice: 'Plexiglas / Alu',
  },
];

const SIZES: { [key in Category]: SizeOption[] } = {
  standard: [
    { value: '10x15', label: '10 × 15 cm', prices: { classic: 3, fineart: null, rigid: null } },
    { value: '13x18', label: '13 × 18 cm', prices: { classic: 5, fineart: null, rigid: null } },
    { value: '15x21', label: '15 × 21 cm', prices: { classic: 8, fineart: null, rigid: null } },
    { value: '20x30', label: '20 × 30 cm', prices: { classic: 40, fineart: 360, rigid: 360 } },
    { value: '30x45', label: '30 × 45 cm', prices: { classic: 95, fineart: 520, rigid: 540 } },
    { value: '50x75', label: '50 × 75 cm', prices: { classic: 264, fineart: 1050, rigid: 1068 } },
  ],
  poster: [
    { value: '30x40', label: '30 × 40 cm', prices: { classic: 80, fineart: 480, rigid: 500 } },
    { value: '40x60', label: '40 × 60 cm', prices: { classic: 145, fineart: 680, rigid: 700 } },
    { value: '50x70', label: '50 × 70 cm', prices: { classic: 220, fineart: 920, rigid: 950 } },
    { value: '60x90', label: '60 × 90 cm', prices: { classic: 350, fineart: 1350, rigid: 1400 } },
  ],
  panoramic: [
    { value: '20x60', label: '20 × 60 cm', prices: { classic: 95, fineart: 520, rigid: 540 } },
    { value: '30x90', label: '30 × 90 cm', prices: { classic: 185, fineart: 780, rigid: 820 } },
    { value: '40x120', label: '40 × 120 cm', prices: { classic: 320, fineart: 1200, rigid: 1250 } },
  ],
  square: [
    { value: '20x20', label: '20 × 20 cm', prices: { classic: 35, fineart: 280, rigid: 290 } },
    { value: '30x30', label: '30 × 30 cm', prices: { classic: 75, fineart: 420, rigid: 440 } },
    { value: '40x40', label: '40 × 40 cm', prices: { classic: 130, fineart: 650, rigid: 680 } },
    { value: '50x50', label: '50 × 50 cm', prices: { classic: 205, fineart: 890, rigid: 920 } },
  ],
};

export function ProductConfigurator() {
  const [category, setCategory] = useState<Category>('standard');
  const [support, setSupport] = useState<Support>('classic');
  const [size, setSize] = useState<string>('');

  const currentSizes = SIZES[category];

  // Update size when category changes
  useEffect(() => {
    setSize(currentSizes[0]?.value || '');
  }, [category]);

  // Calculate price
  const calculatePrice = () => {
    if (!size) return null;
    const sizeOption = currentSizes.find((s) => s.value === size);
    if (!sizeOption) return null;
    return sizeOption.prices[support];
  };

  const currentPrice = calculatePrice();

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl lg:text-4xl mb-2">
          Tirages Photo de Qualité Galerie
        </h1>
        <p className="text-base text-neutral-600">
          Gallery-Quality Photo Prints
        </p>
        <p className="mt-3 text-sm text-neutral-500">
          De l'album souvenir au format géant pour vos murs.
        </p>
        <p className="text-sm text-neutral-500">
          From pocket-sized memories to museum-grade wall art.
        </p>
      </div>

      {/* Category Segmented Control */}
      <div>
        <label className="block text-sm font-medium mb-3">Category</label>
        <div className="inline-flex w-full sm:w-auto rounded-lg border bg-neutral-50 p-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex-1 sm:flex-none px-4 py-2 text-sm rounded-md transition-all ${
                category === cat.id
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-neutral-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Support Selection */}
      <div>
        <label className="block text-sm font-medium mb-3">Type de Support</label>
        <div className="flex flex-col gap-3">
          {SUPPORTS.map((sup) => (
            <button
              key={sup.id}
              onClick={() => setSupport(sup.id)}
              className={`flex items-start gap-4 rounded-lg border-2 p-4 text-left transition-all ${
                support === sup.id
                  ? 'border-neutral-900 bg-neutral-50'
                  : 'border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className={`mt-1 ${support === sup.id ? 'text-neutral-900' : 'text-neutral-500'}`}>
                {sup.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <div>
                    <span className="font-medium">{sup.labelFr}</span>
                    <span className="text-sm text-neutral-500 ml-2">({sup.labelEn})</span>
                  </div>
                  <span className="text-xs font-medium text-neutral-600 whitespace-nowrap">
                    {sup.startingPrice}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mb-1">{sup.descriptionFr}</p>
                <p className="text-xs text-neutral-500">{sup.descriptionEn}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Technical Note for Rigid */}
      {support === 'rigid' && (
        <div className="flex gap-3 rounded-lg bg-blue-50 border border-blue-200 p-4">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-blue-900 mb-1">
              <strong>FR:</strong> Inclus : Châssis rentrant en aluminium pour un effet "flottant" sur vos murs (Grands formats).
            </p>
            <p className="text-blue-800">
              <strong>EN:</strong> Included: Rear aluminum subframe for a "floating" effect on your walls (Large formats).
            </p>
          </div>
        </div>
      )}

      {/* Size Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-3">Format</label>
        <Select value={size} onValueChange={setSize}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionner un format" />
          </SelectTrigger>
          <SelectContent>
            {currentSizes.map((sizeOpt) => {
              const price = sizeOpt.prices[support];
              return (
                <SelectItem key={sizeOpt.value} value={sizeOpt.value}>
                  {sizeOpt.label} {price !== null ? `— ${price} MAD` : '— Sur devis'}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-2">
        <button 
          disabled={currentPrice === null}
          className="w-full rounded-lg bg-neutral-900 px-6 py-3 text-white hover:bg-neutral-800 transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed"
        >
          {currentPrice !== null 
            ? `Transférer mes Photos — ${currentPrice} MAD`
            : 'Transférer mes Photos — Sur devis'
          }
        </button>
        <button className="w-full rounded-lg border-2 border-neutral-900 bg-white px-6 py-3 text-neutral-900 hover:bg-neutral-50 transition-colors">
          Visualiser sur mon mur (AR)
        </button>
      </div>
    </div>
  );
}