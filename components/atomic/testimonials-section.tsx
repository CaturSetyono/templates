'use client';

import { useState, useEffect } from 'react';
import type { BaseSection } from '@/types';
import { cn } from '@/lib/cn';
import { safeString, safeArray, hasContent, safeBoolean } from '@/lib/safe-access';

interface TestimonialsSectionProps {
  section: BaseSection;
}

export function TestimonialsSection({ section }: TestimonialsSectionProps) {
  const props = section?.props || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const items = safeArray(props.items);

  if (items.length === 0) {
    return null;
  }
  const totalItems = items.length;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalItems]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
    setIsAutoPlaying(false);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section
      id={section.id}
      className="section-container relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/30 dark:bg-green-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200/30 dark:bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      <div className="content-container relative z-10">
        {/* Header */}
        {(hasContent(props.title) || hasContent(props.subtitle)) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            {hasContent(props.title) && (
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-orange-600 dark:from-green-400 dark:to-orange-400 bg-clip-text text-transparent">
                {safeString(props.title)}
              </h2>
            )}
            {hasContent(props.subtitle) && (
              <p className="text-xl text-gray-600 dark:text-gray-400">{safeString(props.subtitle)}</p>
            )}
          </div>
        )}

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="relative min-h-[400px] md:min-h-[350px]">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={cn(
                  'absolute inset-0 transition-all duration-700 ease-in-out',
                  idx === currentIndex
                    ? 'opacity-100 translate-x-0 scale-100'
                    : idx < currentIndex
                      ? 'opacity-0 -translate-x-full scale-95 pointer-events-none'
                      : 'opacity-0 translate-x-full scale-95 pointer-events-none'
                )}
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
                  {/* Gradient Accent */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-600 via-green-500 to-orange-600" />

                  {/* Quote Icon */}
                  <div className="absolute top-8 right-8 text-green-600/10 dark:text-green-400/10">
                    <svg
                      className="w-24 h-24 md:w-32 md:h-32"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>

                  <div className="relative z-10">
                    {/* Rating Stars */}
                    {typeof item.rating === 'number' && item.rating > 0 && (
                      <div className="flex gap-1 mb-6">
                        {Array.from({ length: Math.min(item.rating, 5) }).map((_, i) => (
                          <svg
                            key={i}
                            className="w-6 h-6 text-yellow-400 drop-shadow-md"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    )}

                    {/* Testimonial Content */}
                    {hasContent(item.content) && (
                      <blockquote className="text-gray-700 dark:text-gray-300 text-xl md:text-2xl leading-relaxed mb-8 font-medium">
                        "{safeString(item.content)}"
                      </blockquote>
                    )}

                    {/* Author Info */}
                    <div className="flex items-center gap-5 pt-6 border-t-2 border-gray-100 dark:border-gray-700">
                      {hasContent(item.author?.avatar) ? (
                        <img
                          src={safeString(item.author.avatar)}
                          alt={safeString(item.author?.name, 'User')}
                          className="w-16 h-16 rounded-full object-cover ring-4 ring-green-100 dark:ring-green-900 shadow-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-4 ring-green-100 dark:ring-green-900">
                          {safeString(item.author?.name, '?').charAt(0)}
                        </div>
                      )}
                      <div className="flex-grow">
                        <div className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                          {safeString(item.author?.name, 'Anonymous')}
                        </div>
                        {hasContent(item.author?.role) && (
                          <div className="text-green-600 dark:text-green-400 font-semibold">
                            {safeString(item.author.role)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {totalItems > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-gray-800 rounded-full shadow-xl flex items-center justify-center text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-600 transition-all duration-300 hover:scale-110 z-20"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-gray-800 rounded-full shadow-xl flex items-center justify-center text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-600 transition-all duration-300 hover:scale-110 z-20"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {totalItems > 1 && (
            <div className="flex justify-center gap-3 mt-10">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={cn(
                    'transition-all duration-300 rounded-full',
                    idx === currentIndex
                      ? 'w-12 h-3 bg-gradient-to-r from-green-600 to-orange-600'
                      : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  )}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Trust Badge - Only show if configured */}
        {hasContent(props.trustBadge) && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300 font-semibold">{safeString(props.trustBadge)}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
