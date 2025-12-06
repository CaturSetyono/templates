'use client';

import type { BaseSection } from '@/types';
import { safeGet, safeArray, hasContent, safeString } from '@/lib/safe-access';
import { cn } from '@/lib/cn';

interface LogoCloudSectionProps {
  section: BaseSection;
}

/**
 * Logo Cloud Section - Display company/partner logos
 * Supports: grid, marquee layouts
 */
export function LogoCloudSection({ section }: LogoCloudSectionProps) {
  const props = section?.props || {};

  const title = safeString(props.title);
  const description = safeString(props.description);
  const logos = safeArray(props.logos);
  const layout = safeString(props.layout, 'grid');

  // Early return if no logos
  if (logos.length === 0) {
    return null;
  }

  return (
    <section id={section.id} className="relative py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(hasContent(title) || hasContent(description)) && (
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            {hasContent(title) && (
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
            )}
            {hasContent(description) && <p className="text-gray-600">{description}</p>}
          </div>
        )}

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 items-center">
          {logos.map((logo: any, index: number) => {
            const src = typeof logo === 'string' ? logo : safeString(logo.src || logo.image);
            const alt =
              typeof logo === 'string'
                ? ''
                : safeString(logo.alt || logo.name, `Partner ${index + 1}`);
            const link = typeof logo === 'string' ? '' : safeString(logo.link || logo.href);

            if (!hasContent(src)) return null;

            const LogoImage = (
              <div className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <img src={src} alt={alt} className="h-12 w-auto mx-auto object-contain" />
              </div>
            );

            if (hasContent(link)) {
              return (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  {LogoImage}
                </a>
              );
            }

            return (
              <div key={index} className="flex items-center justify-center">
                {LogoImage}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
