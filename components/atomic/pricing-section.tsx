'use client';

import type { BaseSection } from '@/types';
import { safeGet, safeArray, hasContent, safeString, safeBoolean } from '@/lib/safe-access';
import { cn } from '@/lib/cn';
import { Check } from 'lucide-react';

interface PricingSectionProps {
  section: BaseSection;
}

/**
 * Pricing Section - Display pricing plans
 * Supports: multiple tiers, featured plans, custom features
 */
export function PricingSection({ section }: PricingSectionProps) {
  const props = section?.props || {};

  const title = safeString(props.title);
  const description = safeString(props.description);
  const plans = safeArray(props.plans);

  // Early return if no plans
  if (plans.length === 0) {
    return null;
  }

  return (
    <section
      id={section.id}
      className="relative py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50"
    >
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

        {/* Pricing Cards */}
        <div
          className={cn(
            'grid gap-8',
            plans.length === 1
              ? 'max-w-md mx-auto'
              : plans.length === 2
                ? 'md:grid-cols-2 max-w-4xl mx-auto'
                : 'md:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {plans.map((plan: any, index: number) => {
            const name = safeString(plan.name);
            const price = safeString(plan.price);
            const period = safeString(plan.period, 'month');
            const planDescription = safeString(plan.description);
            const features = safeArray(plan.features);
            const buttonText = safeString(plan.buttonText, 'Get Started');
            const buttonHref = safeString(plan.buttonHref, '#');
            const featured = safeBoolean(plan.featured, false);
            const badge = safeString(plan.badge);

            if (!hasContent(name)) return null;

            return (
              <div
                key={index}
                className={cn(
                  'relative rounded-2xl p-8 transition-all duration-300',
                  featured
                    ? 'bg-primary text-white shadow-2xl scale-105 ring-2 ring-primary'
                    : 'bg-white shadow-lg hover:shadow-xl border border-gray-200'
                )}
              >
                {/* Badge */}
                {hasContent(badge) && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span
                      className={cn(
                        'px-4 py-1 rounded-full text-sm font-semibold',
                        featured ? 'bg-white text-primary' : 'bg-primary text-white'
                      )}
                    >
                      {badge}
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="space-y-4 mb-8">
                  <h3
                    className={cn('text-2xl font-bold', featured ? 'text-white' : 'text-gray-900')}
                  >
                    {name}
                  </h3>

                  {hasContent(planDescription) && (
                    <p className={cn('text-sm', featured ? 'text-white/80' : 'text-gray-600')}>
                      {planDescription}
                    </p>
                  )}

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span
                      className={cn(
                        'text-5xl font-bold',
                        featured ? 'text-white' : 'text-gray-900'
                      )}
                    >
                      {price}
                    </span>
                    {hasContent(period) && (
                      <span className={cn('text-lg', featured ? 'text-white/70' : 'text-gray-600')}>
                        /{period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                {features.length > 0 && (
                  <ul className="space-y-4 mb-8">
                    {features.map((feature: any, fIndex: number) => {
                      const text = typeof feature === 'string' ? feature : safeString(feature.text);
                      const included =
                        typeof feature === 'string' ? true : safeBoolean(feature.included, true);

                      if (!hasContent(text)) return null;

                      return (
                        <li key={fIndex} className="flex items-start gap-3">
                          <Check
                            className={cn(
                              'w-5 h-5 flex-shrink-0 mt-0.5',
                              featured ? 'text-white' : 'text-primary',
                              !included && 'opacity-30'
                            )}
                          />
                          <span
                            className={cn(
                              featured ? 'text-white/90' : 'text-gray-700',
                              !included && 'opacity-50 line-through'
                            )}
                          >
                            {text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {/* CTA Button */}
                <a
                  href={buttonHref}
                  className={cn(
                    'block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all',
                    featured
                      ? 'bg-white text-primary hover:bg-gray-100'
                      : 'bg-primary text-white hover:bg-primary/90'
                  )}
                >
                  {buttonText}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
