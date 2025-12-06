'use client';

import type { BaseSection } from '@/types';
import { safeString, safeArray, hasContent } from '@/lib/safe-access';
import { cn } from '@/lib/cn';

interface FeaturesSectionProps {
  section: BaseSection;
}

export function FeaturesSection({ section }: FeaturesSectionProps) {
  const props = section?.props || {};

  const items = safeArray(props.items);

  if (items.length === 0) {
    return null;
  }

  const columns = props.columns || 3;

  return (
    <section id={section.id} className="section-container" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="content-container">
        {(hasContent(props.title) || hasContent(props.subtitle)) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            {hasContent(props.title) && (
              <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-foreground)' }}>{safeString(props.title)}</h2>
            )}
            {hasContent(props.subtitle) && (
              <p className="text-xl" style={{ color: 'var(--color-muted-foreground)' }}>{safeString(props.subtitle)}</p>
            )}
          </div>
        )}

        <div
          className={cn(
            'grid gap-8',
            columns === 2 && 'md:grid-cols-2 lg:grid-cols-2',
            columns === 3 && 'md:grid-cols-2 lg:grid-cols-3',
            columns === 4 && 'md:grid-cols-2 lg:grid-cols-4'
          )}
        >
          {items
            .filter((item) => hasContent(item.title))
            .map((item, idx) => (
              <div
                key={item.id}
                className="card p-8 group relative hover:border-primary/20 transition-colors duration-300 flex flex-col"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  {/* Abstract shape or pattern could go here */}
                  <div className="w-24 h-24 rounded-full bg-primary blur-2xl" />
                </div>

                {item.icon?.value && (
                  <div className="w-14 h-14 rounded-xl bg-primary/5 dark:bg-primary/10 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-all duration-300 text-primary">
                    {item.icon.value}
                  </div>
                )}

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors" style={{ color: 'var(--color-foreground)' }}>
                  {item.title}
                </h3>

                {item.description && (
                  <p className="leading-relaxed mb-4 flex-grow" style={{ color: 'var(--color-muted-foreground)' }}>{item.description}</p>
                )}

                {item.link && (
                  <a
                    href={typeof item.link === 'string' ? item.link : item.link.href}
                    className="inline-flex items-center mt-auto text-primary font-semibold hover:gap-2 transition-all"
                  >
                    {typeof item.link === 'string' ? 'Learn more' : item.link.text || 'Learn more'}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
