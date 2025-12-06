'use client';

import { useEffect, useState, useRef } from 'react';
import type { BaseSection } from '@/types';
import { cn } from '@/lib/cn';
import { safeString, safeArray, hasContent } from '@/lib/safe-access';

interface StatsSectionProps {
  section: BaseSection;
}

function AnimatedCounter({
  value,
  duration = 2000,
}: {
  value: number | string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || typeof value !== 'number') return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return <div ref={ref}>{typeof value === 'number' ? count : value}</div>;
}

export function StatsSection({ section }: StatsSectionProps) {
  const props = section?.props || {};

  const items = safeArray(props.items);

  if (items.length === 0) {
    return null;
  }

  const layout = safeString(props.layout, 'grid');
  const itemCount = items.length;

  return (
    <section
      id={section.id}
      className="section-container bg-gradient-to-br from-primary via-primary to-blue-700 dark:from-primary/90 dark:via-primary/80 dark:to-blue-800 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="content-container relative z-10">
        {hasContent(props.title) && (
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">
            {safeString(props.title)}
          </h2>
        )}
        {hasContent(props.subtitle) && (
          <p className="text-xl text-center mb-16 text-blue-100 dark:text-blue-200">{safeString(props.subtitle)}</p>
        )}

        <div
          className={cn(
            'grid gap-8 text-center',
            itemCount === 2 && 'md:grid-cols-2',
            itemCount === 3 && 'md:grid-cols-3',
            itemCount === 4 && 'md:grid-cols-2 lg:grid-cols-4',
            itemCount > 4 && 'md:grid-cols-2 lg:grid-cols-4'
          )}
        >
          {items
            .filter((item) => hasContent(item.label))
            .map((item, idx) => (
              <div
                key={item.id}
                className="p-8 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="text-5xl md:text-6xl font-bold mb-3">
                  {item.prefix}
                  {item.animation !== false ? <AnimatedCounter value={item.value} /> : item.value}
                  {item.suffix}
                </div>
                <div className="text-lg text-blue-100 dark:text-blue-200 font-medium">{item.label}</div>
                {item.description && (
                  <p className="text-sm text-blue-200 dark:text-blue-300 mt-2">{item.description}</p>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
