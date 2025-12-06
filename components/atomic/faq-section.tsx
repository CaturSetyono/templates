'use client';

import type { BaseSection } from '@/types';
import { safeGet, safeArray, hasContent, safeString } from '@/lib/safe-access';
import { cn } from '@/lib/cn';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQSectionProps {
  section: BaseSection;
}

/**
 * FAQ Section - Frequently Asked Questions
 * Supports: accordion style, categories
 */
export function FAQSection({ section }: FAQSectionProps) {
  const props = section?.props || {};

  const title = safeString(props.title);
  const description = safeString(props.description);
  const items = safeArray(props.items);
  const layout = safeString(props.layout, 'single'); // 'single' or 'two-column'

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Early return if no items
  if (items.length === 0) {
    return null;
  }

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

        {/* FAQ Items */}
        <div
          className={cn(
            'mx-auto',
            layout === 'two-column' ? 'max-w-7xl grid lg:grid-cols-2 gap-6' : 'max-w-3xl'
          )}
        >
          {items.map((item: any, index: number) => {
            const question = safeString(item.question);
            const answer = safeString(item.answer);

            if (!hasContent(question) || !hasContent(answer)) return null;

            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-lg">{question}</span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-gray-500 transition-transform flex-shrink-0',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>

                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">{answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
