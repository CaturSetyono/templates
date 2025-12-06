'use client';

import type { BaseSection } from '@/types';
import { safeGet, safeArray, hasContent, safeString } from '@/lib/safe-access';
import { cn } from '@/lib/cn';

interface GallerySectionProps {
  section: BaseSection;
}

/**
 * Gallery Section - Image gallery
 * Supports: grid, masonry, carousel layouts
 */
export function GallerySection({ section }: GallerySectionProps) {
  const props = section?.props || {};

  const title = safeString(props.title);
  const description = safeString(props.description);
  const images = safeArray(props.images);
  const layout = safeString(props.layout, 'grid'); // 'grid', 'masonry', 'carousel'
  const columns = safeString(props.columns, '3');

  // Early return if no images
  if (images.length === 0) {
    return null;
  }

  const getGridClass = () => {
    switch (columns) {
      case '2':
        return 'grid-cols-1 md:grid-cols-2';
      case '3':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case '4':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <section id={section.id} className="relative py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(hasContent(title) || hasContent(description)) && (
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            {hasContent(title) && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">{title}</h2>
            )}
            {hasContent(description) && <p className="text-lg text-gray-600">{description}</p>}
          </div>
        )}

        {/* Gallery Grid */}
        <div className={cn('grid gap-6', getGridClass())}>
          {images.map((image: any, index: number) => {
            const src = typeof image === 'string' ? image : safeString(image.src);
            const alt =
              typeof image === 'string' ? '' : safeString(image.alt, `Gallery image ${index + 1}`);
            const title = typeof image === 'string' ? '' : safeString(image.title);
            const description = typeof image === 'string' ? '' : safeString(image.description);

            if (!hasContent(src)) return null;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gray-100 aspect-square hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Overlay with info */}
                {(hasContent(title) || hasContent(description)) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      {hasContent(title) && <h3 className="font-semibold text-lg">{title}</h3>}
                      {hasContent(description) && (
                        <p className="text-sm text-white/90">{description}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
