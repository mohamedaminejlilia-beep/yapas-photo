import { useState } from 'react';
import roomBackground from '../../room-bg.jpg';
import myArtwork from '../../artwork.jpg';

interface DynamicVisualizerProps {
  size: string;
  format: 'standard' | 'poster' | 'panoramic' | 'square';
}

const getSizeInPixels = (size: string): { width: number; height: number } => {
  const [width, height] = size.split('x').map(Number);
  return { width: width * 4, height: height * 4 };
};

export function DynamicVisualizer({ size, format }: DynamicVisualizerProps) {
  const dimensions = getSizeInPixels(size);

  return (
    <div className="sticky top-8">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-neutral-100">
        <img src={roomBackground} alt="Living room" className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative bg-white shadow-2xl transition-all duration-500 ease-out"
            style={{
              width: `${Math.min(dimensions.width, 400)}px`,
              height: `${Math.min(dimensions.height, 500)}px`,
              maxWidth: '80%',
              maxHeight: '70%',
            }}
          >
            <div className="absolute inset-0 border-8 border-white shadow-inner">
              <img src={myArtwork} alt="Sample artwork" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 rounded-lg bg-black/70 px-4 py-2 backdrop-blur-sm">
          <p className="text-sm text-white">
            Dimensions: <span className="font-semibold">{size.replace('x', ' × ')} cm</span>
          </p>
        </div>
      </div>
    </div>
  );
}