'use client';

import type { HeroSection as HeroSectionType } from '@/types';
import { hasMinimumContent } from '@/lib/utils';
import { cn } from '@/lib/cn';

interface HeroSectionProps {
  section: HeroSectionType;
}

export function HeroSection({ section }: HeroSectionProps) {
  const props = section?.props;

  // Early return if no renderable content
  if (!props || !hasMinimumContent(props)) {
    return null;
  }

  const layout = props.layout || 'centered';
  const hasTitle = Boolean(props.title);
  const hasSubtitle = Boolean(props.subtitle);
  const hasButtons = props.buttons && props.buttons.length > 0;
  const hasTrustIndicators = props.trustIndicators && props.trustIndicators.length > 0;
  const hasImage = Boolean(props.image);
  const backgroundStyle = props.background?.gradient || 'from-gray-50 via-white to-blue-50';

  return (
    <section
      id={section.id}
      className={cn(
        'relative overflow-hidden',
        layout === 'full-height' ? 'min-h-screen' : 'min-h-[600px] lg:min-h-[700px]',
        'flex items-center',
        `bg-gradient-to-br ${backgroundStyle}`
      )}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Gradient Blobs */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div
          className={cn(
            'animate-fade-in',
            layout === 'split' && hasImage
              ? 'grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center'
              : 'flex flex-col items-center'
          )}
        >
          {/* Content Section */}
          <div
            className={cn(
              'space-y-6 lg:space-y-8',
              layout === 'centered' ? 'text-center max-w-4xl mx-auto' : '',
              layout === 'split' && hasImage ? 'lg:pr-8' : ''
            )}
          >
            {/* Title */}
            {hasTitle && (
              <h1
                className={cn(
                  'font-bold leading-[1.1] tracking-tight',
                  'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
                  'animate-slide-up'
                )}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-primary to-blue-600">
                  {props.title}
                </span>
              </h1>
            )}

            {/* Subtitle */}
            {hasSubtitle && (
              <p
                className={cn(
                  'text-lg sm:text-xl md:text-2xl',
                  'text-gray-600 leading-relaxed',
                  'max-w-3xl',
                  layout === 'centered' && 'mx-auto',
                  'animate-slide-up'
                )}
                style={{ animationDelay: '0.1s' }}
              >
                {props.subtitle}
              </p>
            )}

            {/* Description (optional) */}
            {props.description && (
              <p
                className={cn(
                  'text-base sm:text-lg text-gray-500 leading-relaxed',
                  'max-w-2xl',
                  layout === 'centered' && 'mx-auto',
                  'animate-slide-up'
                )}
                style={{ animationDelay: '0.2s' }}
              >
                {props.description}
              </p>
            )}

            {/* CTA Buttons */}
            {hasButtons && (
              <div
                className={cn(
                  'flex flex-col sm:flex-row gap-3 sm:gap-4',
                  'pt-2',
                  layout === 'centered' ? 'justify-center' : 'justify-start',
                  'animate-slide-up'
                )}
                style={{ animationDelay: '0.3s' }}
              >
                {props.buttons?.map((btn, idx) => {
                  if (!btn.text) return null;

                  const isPrimary = btn.variant === 'primary';
                  const isOutline = btn.variant === 'outline';

                  return (
                    <a
                      key={idx}
                      href={btn.href || '#'}
                      className={cn(
                        'inline-flex items-center justify-center',
                        'px-6 sm:px-8 py-3 sm:py-4',
                        'rounded-xl font-semibold text-base sm:text-lg',
                        'transition-all duration-200',
                        'hover:scale-105 active:scale-95',
                        'focus:outline-none focus:ring-4 focus:ring-primary/20',
                        'whitespace-nowrap',
                        isPrimary &&
                          'bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40',
                        isOutline &&
                          'border-2 border-primary text-primary hover:bg-primary hover:text-white',
                        !isPrimary && !isOutline && 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      )}
                    >
                      {btn.text}
                      {isPrimary && (
                        <svg
                          className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      )}
                    </a>
                  );
                })}
              </div>
            )}

            {/* Trust Indicators */}
            {hasTrustIndicators && (
              <div
                className={cn(
                  'flex flex-wrap items-center gap-4 sm:gap-6',
                  'pt-4 sm:pt-6',
                  'text-sm text-gray-500',
                  layout === 'centered' && 'justify-center',
                  'animate-slide-up'
                )}
                style={{ animationDelay: '0.4s' }}
              >
                {props.trustIndicators?.map((indicator: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">{indicator}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hero Image for Split Layout */}
          {layout === 'split' && hasImage && (
            <div
              className="relative animate-slide-up order-first lg:order-last"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {typeof props.image === 'string' ? (
                  <img
                    src={props.image}
                    alt={props.title || 'Hero illustration'}
                    className="w-full h-auto object-cover"
                  />
                ) : props.image?.src ? (
                  <img
                    src={props.image.src}
                    alt={props.image.alt || props.title || 'Hero illustration'}
                    className="w-full h-auto object-cover"
                  />
                ) : null}

                {/* Image Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
              </div>

              {/* Decorative element behind image */}
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-primary/10 rounded-2xl -z-10 blur-2xl" />
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-accent/10 rounded-2xl -z-10 blur-2xl" />
            </div>
          )}

          {/* Centered Image (for centered layout) */}
          {layout === 'centered' && hasImage && (
            <div
              className="mt-12 lg:mt-16 relative max-w-4xl mx-auto animate-slide-up"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {typeof props.image === 'string' ? (
                  <img
                    src={props.image}
                    alt={props.title || 'Hero illustration'}
                    className="w-full h-auto"
                  />
                ) : props.image?.src ? (
                  <img
                    src={props.image.src}
                    alt={props.image.alt || props.title || 'Hero illustration'}
                    className="w-full h-auto"
                  />
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>

    
    </section>
  );
}
