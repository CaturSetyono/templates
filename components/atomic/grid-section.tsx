'use client';

import type { BaseSection } from '@/types';
import { safeString, safeArray, hasContent } from '@/lib/safe-access';

interface GridSectionProps {
  section: BaseSection;
}

export function GridSection({ section }: GridSectionProps) {
  const props = section?.props || {};

  const items = safeArray(props.items);
  const columns = props.columns || 3;

  if (items.length === 0) {
    return null;
  }

  const getGridClass = () => {
    switch (columns) {
      case 2:
        return 'md:grid-cols-2';
      case 3:
        return 'md:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'md:grid-cols-3';
    }
  };

  return (
    <section id={section.id} className="py-20 px-4">
      <div className="container mx-auto">
        {hasContent(props.title) && (
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            {safeString(props.title)}
          </h2>
        )}

        <div className={`grid ${getGridClass()} gap-8`}>
          {items
            .filter((item) => hasContent(item.title))
            .map((item) => {
              const imageUrl = typeof item.image === 'string' ? item.image : item.image?.url;
              const imageAlt = typeof item.image === 'string' ? '' : item.image?.alt || item.title;

              return (
                <div key={item.id || Math.random()} className="group cursor-pointer">
                  {hasContent(imageUrl) && (
                    <img
                      src={safeString(imageUrl)}
                      alt={safeString(imageAlt)}
                      className="w-full aspect-video object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2">{safeString(item.title)}</h3>
                  {hasContent(item.description) && (
                    <p className="text-gray-600">{safeString(item.description)}</p>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
