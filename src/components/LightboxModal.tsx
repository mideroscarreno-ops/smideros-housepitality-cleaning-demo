import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GalleryItem } from '../types';
import { EditorialImage } from './EditorialImage';

interface LightboxModalProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export function LightboxModal({
  items,
  activeIndex,
  onClose,
  onSelectIndex,
}: LightboxModalProps) {
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onSelectIndex((activeIndex + 1) % items.length);
      } else if (e.key === 'ArrowLeft') {
        onSelectIndex((activeIndex - 1 + items.length) % items.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, items.length, onClose, onSelectIndex]);

  if (activeIndex === null || !items[activeIndex]) return null;

  const current = items[activeIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image preview: ${current.title}`}
      className="fixed inset-0 z-50 bg-[#1A2621]/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[#FCF9F3] rounded-xl overflow-hidden shadow-2xl border border-[#29342F]/15"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#29342F]/10">
          <div className="min-w-0 pr-4">
            <p className="text-xs font-medium text-[#23483F]/75">
              {current.category} · Illustrative Interior
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#29342F] truncate">
              {current.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image preview"
            className="inline-flex items-center justify-center w-11 h-11 rounded-md text-[#29342F] hover:bg-[#F5EFE4] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="relative bg-[#EFE9DD] aspect-[16/10] max-h-[65vh] w-full">
          <EditorialImage
            src={current.image}
            alt={current.alt}
            fallbackTitle={current.title}
            className="w-full h-full"
          />

          <button
            type="button"
            onClick={() => onSelectIndex((activeIndex - 1 + items.length) % items.length)}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#FCF9F3]/90 hover:bg-[#FCF9F3] text-[#29342F] flex items-center justify-center shadow-md transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => onSelectIndex((activeIndex + 1) % items.length)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#FCF9F3]/90 hover:bg-[#FCF9F3] text-[#29342F] flex items-center justify-center shadow-md transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#FCF9F3]">
          <p className="text-sm text-[#29342F]/80">{current.caption}</p>
          <span className="text-xs font-medium text-[#23483F] tabular-nums shrink-0">
            {activeIndex + 1} / {items.length}
          </span>
        </div>
      </div>
    </div>
  );
}
