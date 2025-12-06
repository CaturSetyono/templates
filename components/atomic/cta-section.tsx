'use client';

import type { BaseSection } from '@/types';
import { safeGet, safeArray, hasContent, safeString } from '@/lib/safe-access';
import { cn } from '@/lib/cn';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTASectionProps {
  section: BaseSection;
}

/**
 * CTA Section - Call to Action
 * Supports: centered, split, minimal layouts
 */
export function CTASection({ section }: CTASectionProps) {
  const props = section?.props || {};

  // Safe access to all fields
  const title = safeString(props.title);
  const description = safeString(props.description);
  const buttons = safeArray(props.buttons);
  const layout = safeString(props.layout, 'centered');
  const background = safeString(props.background, 'gradient');
  const image = safeString(props.image);
  const badge = safeString(props.badge);

  // Early return if no content
  if (!hasContent(title) && !hasContent(description) && buttons.length === 0) {
    return null;
  }

  const getBackgroundClass = () => {
    switch (background) {
      case 'gradient':
        return 'bg-gradient-to-r from-primary via-blue-600 to-purple-600';
      case 'solid':
        return 'bg-primary';
      case 'dark':
        return 'bg-gray-900';
      case 'light':
        return 'bg-gray-50';
      default:
        return 'bg-gradient-to-r from-primary to-blue-600';
    }
  };

  const isLightBg = background === 'light';

  return (
    <section id={section.id} className="relative overflow-hidden py-16 lg:py-24">
      <div className={cn('relative', getBackgroundClass())}>
        {/* Decorative elements */}
        {background === 'gradient' && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {layout === 'split' && hasContent(image) ? (
            // Split Layout with Image
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {hasContent(badge) && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-sm font-medium text-white">{badge}</span>
                  </div>
                )}
                {hasContent(title) && (
                  <h2
                    className={cn(
                      'text-3xl sm:text-4xl lg:text-5xl font-bold',
                      isLightBg ? 'text-gray-900' : 'text-white'
                    )}
                  >
                    {title}
                  </h2>
                )}
                {hasContent(description) && (
                  <p className={cn('text-lg', isLightBg ? 'text-gray-600' : 'text-white/90')}>
                    {description}
                  </p>
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
                            'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all',
                            variant === 'primary' && isLightBg
                              ? 'bg-primary text-white hover:bg-primary/90'
                              : variant === 'primary'
                                ? 'bg-white text-primary hover:bg-gray-100'
                                : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                          )}
                        >
                          {text}
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="relative">
                <img
                  src={image}
                  alt={safeString(props.imageAlt, 'CTA illustration')}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          ) : (
            // Centered Layout
            <div className="max-w-4xl mx-auto text-center space-y-6">
              {hasContent(badge) && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">{badge}</span>
                </div>
              )}
              {hasContent(title) && (
                <h2
                  className={cn(
                    'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold',
                    isLightBg ? 'text-gray-900' : 'text-white'
                  )}
                >
                  {title}
                </h2>
              )}
              {hasContent(description) && (
                <p
                  className={cn(
                    'text-lg lg:text-xl max-w-2xl mx-auto',
                    isLightBg ? 'text-gray-600' : 'text-white/90'
                  )}
                >
                  {description}
                </p>
              )}
              {buttons.length > 0 && (
                <div className="flex flex-wrap gap-4 justify-center">
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
                          'inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all text-lg',
                          variant === 'primary' && isLightBg
                            ? 'bg-primary text-white hover:bg-primary/90'
                            : variant === 'primary'
                              ? 'bg-white text-primary hover:bg-gray-100'
                              : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                        )}
                      >
                        {text}
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
