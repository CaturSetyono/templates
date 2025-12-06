'use client';

import type { BaseSection } from '@/types';
import { safeGet, safeArray, hasContent, safeString } from '@/lib/safe-access';
import { cn } from '@/lib/cn';

interface ContentSectionProps {
  section: BaseSection;
}

/**
 * Content Section - Rich content with text, images, videos
 * Supports: left-right, right-left, centered layouts
 */
export function ContentSection({ section }: ContentSectionProps) {
  const props = section?.props || {};

  const title = safeString(props.title);
  const subtitle = safeString(props.subtitle);
  const content = safeString(props.content);
  const image = safeString(props.image);
  const video = safeString(props.video);
  const layout = safeString(props.layout, 'left-right'); // 'left-right', 'right-left', 'centered'
  const buttons = safeArray(props.buttons);

  // Early return if no content
  if (!hasContent(title) && !hasContent(content) && !hasContent(image)) {
    return null;
  }

  const hasMedia = hasContent(image) || hasContent(video);
  const isCentered = layout === 'centered' || !hasMedia;

  return (
    <section id={section.id} className="relative py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isCentered ? (
          // Centered Layout
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {hasContent(subtitle) && (
              <p className="text-primary font-semibold uppercase tracking-wide text-sm">
                {subtitle}
              </p>
            )}
            {hasContent(title) && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">{title}</h2>
            )}
            {hasContent(content) && (
              <div className="text-lg text-gray-600 leading-relaxed prose prose-lg mx-auto">
                <p>{content}</p>
              </div>
            )}
            {hasContent(image) && (
              <div className="mt-8">
                <img
                  src={image}
                  alt={safeString(props.imageAlt, title)}
                  className="rounded-2xl shadow-xl mx-auto"
                />
              </div>
            )}
            {buttons.length > 0 && (
              <div className="flex flex-wrap gap-4 justify-center mt-8">
                {buttons.map((button: any, index: number) => {
                  const text = safeString(button.text);
                  const href = safeString(button.href, '#');
                  const variant = safeString(button.variant, 'primary');

                  if (!hasContent(text)) return null;

                  return (
                    <a
                      key={index}
                      href={href}
                      className={cn(
                        'px-6 py-3 rounded-lg font-semibold transition-all',
                        variant === 'primary'
                          ? 'bg-primary text-white hover:bg-primary/90'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      )}
                    >
                      {text}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          // Split Layout
          <div
            className={cn(
              'grid lg:grid-cols-2 gap-12 items-center',
              layout === 'right-left' && 'lg:flex-row-reverse'
            )}
          >
            {/* Content */}
            <div className={cn('space-y-6', layout === 'right-left' && 'lg:order-2')}>
              {hasContent(subtitle) && (
                <p className="text-primary font-semibold uppercase tracking-wide text-sm">
                  {subtitle}
                </p>
              )}
              {hasContent(title) && (
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                  {title}
                </h2>
              )}
              {hasContent(content) && (
                <div className="text-lg text-gray-600 leading-relaxed">
                  <p>{content}</p>
                </div>
              )}
              {buttons.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {buttons.map((button: any, index: number) => {
                    const text = safeString(button.text);
                    const href = safeString(button.href, '#');
                    const variant = safeString(button.variant, 'primary');

                    if (!hasContent(text)) return null;

                    return (
                      <a
                        key={index}
                        href={href}
                        className={cn(
                          'px-6 py-3 rounded-lg font-semibold transition-all',
                          variant === 'primary'
                            ? 'bg-primary text-white hover:bg-primary/90'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        )}
                      >
                        {text}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Media */}
            <div className={cn(layout === 'right-left' && 'lg:order-1')}>
              {hasContent(video) ? (
                <video src={video} controls className="w-full rounded-2xl shadow-xl" />
              ) : hasContent(image) ? (
                <img
                  src={image}
                  alt={safeString(props.imageAlt, title)}
                  className="w-full rounded-2xl shadow-xl"
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
