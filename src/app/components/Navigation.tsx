import { ShoppingCart } from 'lucide-react';
// This import is safe as long as the file exists. 
// If it still shows a RED error, delete the next line and the <img> tag.
import logoImg from '../../logo.png'; 

export function Navigation() {
  return (
    <nav className="border-b border-white/20 bg-white/70 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-[1440px] px-6 md:px-20 h-20 flex items-center justify-between">
        
        {/* Logo Area */}
        <div className="flex items-center">
          {/* If logo.png exists, it shows the image. Otherwise, it shows text. */}
          {logoImg ? (
            <img src={logoImg} alt="Logo" className="h-10 w-auto" />
          ) : (
            <span className="text-xl font-bold tracking-tight text-neutral-900">Yapa Photo</span>
          )}
        </div>
        
        {/* Right side - Only Cart icon */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-black/5 rounded-full transition-colors">
            <ShoppingCart className="h-6 w-6 text-neutral-900" />
            <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}