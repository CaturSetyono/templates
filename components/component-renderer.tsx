/**
 * Component Renderer - Dynamic entry point for all atomic components
 * Uses registry pattern for scalable section management
 */

'use client';

import type { BaseSection } from '@/types';
import { sectionRegistry, registerSection } from '@/lib/section-registry';
import { canRenderSection } from '@/lib/safe-access';

// Import all atomic sections
import { HeroSection } from '@/components/atomic/hero-section';
import { FeaturesSection } from '@/components/atomic/features-section';
import { StatsSection } from '@/components/atomic/stats-section';
import { TeamSection } from '@/components/atomic/team-section';
import { TestimonialsSection } from '@/components/atomic/testimonials-section';
import { GridSection } from '@/components/atomic/grid-section';
import { CTASection } from '@/components/atomic/cta-section';
import { PricingSection } from '@/components/atomic/pricing-section';
import { FAQSection } from '@/components/atomic/faq-section';
import { ContactSection } from '@/components/atomic/contact-section';
import { GallerySection } from '@/components/atomic/gallery-section';
import { LogoCloudSection } from '@/components/atomic/logo-cloud-section';
import { ContentSection } from '@/components/atomic/content-section';

// Type-safe wrapper for sections
const wrapSection = (Component: any) => {
  return ({ section }: { section: BaseSection }) => <Component section={section} />;
};

// Register all sections (only runs once)
if (sectionRegistry.getAllTypes().length === 0) {
  // Hero & Landing
  registerSection('hero', wrapSection(HeroSection), {
    displayName: 'Hero Section',
    category: 'hero',
    description: 'Main landing section with headline, CTA, and image',
  });

  // Content Sections
  registerSection('features', wrapSection(FeaturesSection), {
    displayName: 'Features Section',
    category: 'content',
    description: 'Display product/service features in grid or list',
  });

  registerSection('content', wrapSection(ContentSection), {
    displayName: 'Content Section',
    category: 'content',
    description: 'Rich content with text, images, and videos',
  });

  registerSection('grid', wrapSection(GridSection), {
    displayName: 'Grid Section',
    category: 'layout',
    description: 'Flexible grid layout for any content',
  });

  // Social Proof
  registerSection('stats', wrapSection(StatsSection), {
    displayName: 'Stats Section',
    category: 'social-proof',
    description: 'Display key metrics and statistics',
  });

  registerSection('testimonials', wrapSection(TestimonialsSection), {
    displayName: 'Testimonials Section',
    category: 'social-proof',
    description: 'Customer testimonials and reviews',
  });

  registerSection('team', wrapSection(TeamSection), {
    displayName: 'Team Section',
    category: 'social-proof',
    description: 'Team members showcase',
  });

  registerSection('logo-cloud', wrapSection(LogoCloudSection), {
    displayName: 'Logo Cloud',
    category: 'social-proof',
    description: 'Partner and client logos',
  });

  registerSection('gallery', wrapSection(GallerySection), {
    displayName: 'Gallery Section',
    category: 'content',
    description: 'Image gallery with various layouts',
  });

  // Conversion Sections
  registerSection('cta', wrapSection(CTASection), {
    displayName: 'Call to Action',
    category: 'conversion',
    description: 'Call-to-action section with buttons',
  });

  registerSection('pricing', wrapSection(PricingSection), {
    displayName: 'Pricing Section',
    category: 'conversion',
    description: 'Pricing plans and tiers',
  });

  registerSection('contact', wrapSection(ContactSection), {
    displayName: 'Contact Section',
    category: 'conversion',
    description: 'Contact form and information',
  });

  registerSection('faq', wrapSection(FAQSection), {
    displayName: 'FAQ Section',
    category: 'content',
    description: 'Frequently asked questions',
  });
}

interface ComponentRendererProps {
  section: BaseSection;
}

export function ComponentRenderer({ section }: ComponentRendererProps) {
  // Validate section has minimum required data
  if (!canRenderSection(section)) {
    return null;
  }

  // Get component from registry
  const Component = sectionRegistry.get(section.type);

  if (!Component) {
    // Log warning in development only
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[ComponentRenderer] Unknown section type: "${section.type}"`);
      console.warn('Available types:', sectionRegistry.getAllTypes());
    }
    return null;
  }

  // Render component with error boundary
  try {
    return <Component section={section} />;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ComponentRenderer] Error rendering section type "${section.type}":`, error);
    }
    return null;
  }
}
