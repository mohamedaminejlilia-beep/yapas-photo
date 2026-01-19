import { Shield, Zap, Layers, Award } from 'lucide-react';

const specs = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Plexiglas",
    description: "Impression sous verre acrylique avec châssis en alu au dos pour une profondeur exceptionnelle."
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Alu-Dibond",
    description: "Support rigide en aluminium mat. Ultra-résistant et moderne, parfait pour les grands formats."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "PVC / Forex",
    description: "Support léger et économique avec une surface lisse et satinée, idéal pour les expositions."
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Fine Art",
    description: "Papiers d'art texturés (Canson/Hahnemühle) pour une qualité musée et une conservation longue durée."
  }
];

export function TechnicalSpecs() {
  return (
    <section className="bg-white py-16 border-t">
      <div className="mx-auto max-w-[1440px] px-6 md:px-20">
        <h2 className="text-2xl font-bold mb-10">Supports & Spécifications Techniques</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((spec, index) => (
            <div key={index} className="p-6 rounded-xl border border-neutral-100 bg-neutral-50">
              <div className="text-neutral-900 mb-4">{spec.icon}</div>
              <h3 className="font-bold text-lg mb-2">{spec.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {spec.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}