import { useState } from 'react';
import { Home } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackTitle?: string;
  priority?: boolean;
}

export function EditorialImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  fallbackTitle = 'Housepitality Interior',
  priority = false,
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F5EFE4] via-[#EAE2D3] to-[#D8E2D9] text-[#23483F] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Home className="w-8 h-8 mb-3 opacity-60" aria-hidden="true" />
        <p className="font-serif text-lg font-medium">{fallbackTitle}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#EFE9DD] ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
