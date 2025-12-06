'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import type { NavigationConfig } from '@/types';

interface NavbarProps {
  config?: NavigationConfig;
}

export function Navbar({ config }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Handle hash navigation on page load (when navigating from another page)
  useEffect(() => {
    if (pathname === '/' && typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        // Wait for page to render, then scroll to section
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, [pathname]);

  if (!config) return null;

  const isTransparent = config.transparent && !isScrolled;
  const isSticky = config.sticky !== false;
  const hasLinks = config.links && config.links.length > 0;
  const hasCTA = config.cta?.text && config.cta?.href;

  const toggleDropdown = (idx: number) => {
    setActiveDropdown(activeDropdown === idx ? null : idx);
  };

  // Helper to normalize hash links to always include homepage
  const normalizeHref = (href: string | undefined): string => {
    if (!href) return '/';
    // If it's a hash link (section ID), ensure it goes to homepage
    if (href.startsWith('#')) {
      return `/${href}`;
    }
    return href;
  };

  // Helper to check if we should use smooth scroll (same page) or navigate
  const shouldSmoothScroll = (href: string): boolean => {
    return pathname === '/' && href.startsWith('#');
  };

  return (
    <nav
      className={cn(
        'w-full z-50 transition-all duration-300 ease-in-out',
        isSticky && 'sticky top-0',
        isTransparent
          ? 'bg-transparent py-6'
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 py-4 shadow-sm'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              {config.logo?.image ? (
                <img
                  src={config.logo.image}
                  alt={config.logo.alt || 'Logo'}
                  className="h-10 w-auto"
                />
              ) : (
                <div className="relative">
                  <div className="absolute -inset-1 bg-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span
                    className={cn(
                      'text-2xl font-bold tracking-tight relative',
                      isTransparent ? 'text-white' : 'text-gray-900 dark:text-gray-100'
                    )}
                  >
                    {config.logo?.text || 'Brand'}
                  </span>
                </div>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {hasLinks && (
              <div className="flex items-center gap-6">
                {config.links?.map((link, idx) => {
                  const isHashLink = link.href?.startsWith('#');
                  const normalizedHref = normalizeHref(link.href);

                  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
                    if (href.startsWith('#') && shouldSmoothScroll(href)) {
                      e.preventDefault();
                      const element = document.querySelector(href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                    // If not on homepage, let Next.js handle navigation to /#section
                  };

                  return (
                    <div key={idx} className="relative group">
                      {link.children ? (
                        <>
                          <button
                            className={cn(
                              'flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-primary focus:outline-none',
                              isTransparent ? 'text-white/90 hover:text-white' : 'text-gray-600 dark:text-gray-300'
                            )}
                          >
                            {link.text}
                            <svg
                              className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {/* Dropdown Menu */}
                          <div className="absolute left-0 mt-2 w-48 rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                            <div className="py-2">
                              {link.children.map((child, childIdx) => {
                                const childNormalizedHref = normalizeHref(child.href);
                                const childIsHashLink = child.href?.startsWith('#');

                                return childIsHashLink ? (
                                  <Link
                                    key={childIdx}
                                    href={childNormalizedHref as any}
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors"
                                    onClick={(e) => {
                                      if (shouldSmoothScroll(child.href || '')) {
                                        e.preventDefault();
                                        const element = document.querySelector(child.href || '');
                                        if (element) {
                                          element.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start',
                                          });
                                        }
                                      }
                                    }}
                                  >
                                    {child.text}
                                  </Link>
                                ) : (
                                  <Link
                                    key={childIdx}
                                    href={child.href as any}
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors"
                                  >
                                    {child.text}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      ) : isHashLink ? (
                        <Link
                          href={normalizedHref as any}
                          onClick={(e) => handleClick(e, link.href || '')}
                          className={cn(
                            'text-sm font-medium transition-colors duration-200 hover:text-primary cursor-pointer',
                            isTransparent ? 'text-white/90 hover:text-white' : 'text-gray-600 dark:text-gray-300'
                          )}
                        >
                          {link.text}
                        </Link>
                      ) : (
                        <Link
                          href={link.href as any}
                          className={cn(
                            'text-sm font-medium transition-colors duration-200 hover:text-primary',
                            isTransparent ? 'text-white/90 hover:text-white' : 'text-gray-600 dark:text-gray-300'
                          )}
                        >
                          {link.text}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* CTA Button */}
            {hasCTA && (
              <Link
                href={config.cta!.href as any}
                className={cn(
                  'px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform hover:-translate-y-0.5',
                  isTransparent
                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                    : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25 dark:shadow-primary/10'
                )}
              >
                {config.cta!.text}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'p-2 rounded-lg transition-colors',
                isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl lg:hidden transition-all duration-300 ease-in-out transform',
          isMobileMenuOpen
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0 pointer-events-none'
        )}
        style={{ top: '0', paddingTop: '80px' }}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col gap-6 h-full overflow-y-auto">
          {hasLinks &&
            config.links?.map((link, idx) => {
              const isHashLink = link.href?.startsWith('#');
              const normalizedHref = normalizeHref(link.href);

              const handleMobileClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
                if (href.startsWith('#') && shouldSmoothScroll(href)) {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  // Small delay to allow menu to close before scrolling
                  setTimeout(() => {
                    const element = document.querySelector(href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 300);
                } else {
                  setIsMobileMenuOpen(false);
                }
              };

              return (
                <div key={idx} className="flex flex-col">
                  {link.children ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(idx)}
                        className="flex items-center justify-between text-2xl font-semibold text-gray-900 dark:text-gray-100 hover:text-primary transition-colors w-full text-left"
                      >
                        {link.text}
                        <svg
                          className={cn(
                            'w-6 h-6 transition-transform duration-200',
                            activeDropdown === idx ? 'rotate-180' : ''
                          )}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <div
                        className={cn(
                          'overflow-hidden transition-all duration-300 ease-in-out',
                          activeDropdown === idx ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                        )}
                      >
                        <div className="flex flex-col gap-4 pl-4 border-l-2 border-gray-100 dark:border-gray-700">
                          {link.children.map((child, childIdx) => {
                            const childNormalizedHref = normalizeHref(child.href);
                            const childIsHashLink = child.href?.startsWith('#');

                            return (
                              <Link
                                key={childIdx}
                                href={
                                  childIsHashLink
                                    ? (childNormalizedHref as any)
                                    : (child.href as any)
                                }
                                className="text-lg font-medium text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                                onClick={(e) => {
                                  if (childIsHashLink) {
                                    handleMobileClick(e, child.href || '');
                                  } else {
                                    setIsMobileMenuOpen(false);
                                  }
                                }}
                              >
                                {child.text}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : isHashLink ? (
                    <Link
                      href={normalizedHref as any}
                      onClick={(e) => handleMobileClick(e, link.href || '')}
                      className="text-2xl font-semibold text-gray-900 dark:text-gray-100 hover:text-primary transition-colors cursor-pointer"
                    >
                      {link.text}
                    </Link>
                  ) : (
                    <Link
                      href={link.href as any}
                      className="text-2xl font-semibold text-gray-900 dark:text-gray-100 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.text}
                    </Link>
                  )}
                </div>
              );
            })}

          {hasCTA && (
            <div className="pt-6 mt-auto pb-8">
              <Link
                href={config.cta!.href as any}
                className="block w-full py-4 text-center rounded-xl text-lg font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {config.cta!.text}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
