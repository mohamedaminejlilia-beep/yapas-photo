import { useState } from 'react';

interface ProductGalleryProps {
  images: {
    id: string;
    url: string;
    label: string;
  }[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="aspect-[4/5] overflow-hidden rounded-lg bg-neutral-100">
        <img
          src={selectedImage.url}
          alt={selectedImage.label}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={`aspect-square overflow-hidden rounded-md border-2 transition-all ${
              selectedImage.id === image.id
                ? 'border-neutral-900'
                : 'border-neutral-200 hover:border-neutral-400'
            }`}
          >
            <img
              src={image.url}
              alt={image.label}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
