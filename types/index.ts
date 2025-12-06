/**
 * Base TypeScript Interfaces for Server-Driven UI
 * All interfaces follow optional-first design philosophy
 */

// ==================== CORE TYPES ====================

export interface SiteConfig {
  name?: string;
  description?: string;
  theme?: ThemeConfig;
  navigation?: NavigationConfig;
  footer?: FooterConfig;
}

export interface ThemeConfig {
  primary?: string;
  secondary?: string;
  accent?: string;
}

export interface PageConfig {
  slug: string;
  title?: string;
  description?: string;
  sections?: BaseSection[];
}

// ==================== BASE SECTION ====================

export interface BaseSection {
  type: string;
  id?: string;
  props?: Record<string, unknown>;
}

// ==================== NAVIGATION ====================

export interface NavigationConfig {
  logo?: {
    image?: string;
    text?: string;
    alt?: string;
  };
  links?: NavigationLink[];
  cta?: {
    text?: string;
    href?: string;
  };
  search?: {
    enabled?: boolean;
    placeholder?: string;
  };
  social?: SocialLink[];
  sticky?: boolean;
  transparent?: boolean;
}

export interface NavigationLink {
  text: string;
  href: string;
  children?: NavigationLink[];
}

export interface SocialLink {
  platform:
    | 'twitter'
    | 'facebook'
    | 'instagram'
    | 'linkedin'
    | 'github'
    | 'youtube'
    | 'dribbble'
    | 'behance';
  url: string;
}

// ==================== FOOTER ====================

export interface FooterConfig {
  layout?: 'columns' | 'centered' | 'minimal';
  logo?: {
    image?: string;
    text?: string;
    alt?: string;
  };
  tagline?: string;
  sections?: FooterSection[];
  social?: SocialLink[];
  newsletter?: {
    title?: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  copyright?: string;
}

export interface FooterSection {
  title?: string;
  links?: {
    text: string;
    href: string;
  }[];
}

// ==================== COMPONENT SECTIONS ====================

export interface HeroSection extends BaseSection {
  type: 'hero';
  props?: {
    layout?: 'centered' | 'split' | 'minimal' | 'full-height';
    title?: string;
    subtitle?: string;
    description?: string;
    buttons?: Array<{
      text?: string;
      href?: string;
      variant?: 'primary' | 'outline' | 'secondary';
    }>;
    image?:
      | string
      | {
          src?: string;
          alt?: string;
        };
    background?: {
      gradient?: string;
      wave?: boolean;
    };
    trustIndicators?: string[];
  };
}

export interface FeaturesSection extends BaseSection {
  type: 'features';
  props?: {
    title?: string;
    subtitle?: string;
    columns?: 2 | 3 | 4;
    items?: FeatureItem[];
  };
}

export interface FeatureItem {
  id: string;
  title: string;
  description?: string;
  icon?: {
    type?: string;
    value?: string;
  };
  image?: string;
  link?:
    | string
    | {
        href: string;
        text?: string;
      };
}

export interface StatsSection extends BaseSection {
  type: 'stats';
  props?: {
    title?: string;
    subtitle?: string;
    layout?: 'inline' | 'grid' | 'centered' | 'split';
    items?: StatItem[];
  };
}

export interface StatItem {
  id: string;
  value: number | string;
  label: string;
  prefix?: string;
  suffix?: string;
  animation?: boolean;
  description?: string;
}

export interface TeamSection extends BaseSection {
  type: 'team';
  props?: {
    title?: string;
    subtitle?: string;
    layout?: 'grid' | 'carousel' | 'list';
    columns?: 2 | 3 | 4;
    members?: TeamMember[];
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  image?: string;
  social?: SocialLink[];
}

export interface TestimonialsSection extends BaseSection {
  type: 'testimonials';
  props?: {
    title?: string;
    subtitle?: string;
    layout?: 'grid' | 'carousel' | 'masonry' | 'single';
    trustBadge?: string;
    items?: TestimonialItem[];
  };
}

export interface TestimonialItem {
  id: string;
  content: string;
  author?: {
    name?: string;
    role?: string;
    company?: string;
    avatar?: string;
  };
  rating?: number;
  source?: string;
  company?: string;
}

export interface GridSection extends BaseSection {
  type: 'grid';
  props?: {
    title?: string;
    subtitle?: string;
    columns?: 2 | 3 | 4;
    items?: GridItem[];
    filters?: {
      enabled?: boolean;
      categories?: string[];
    };
    pagination?: {
      type?: 'none' | 'load-more' | 'page-numbers';
      itemsPerPage?: number;
    };
  };
}

export interface GridItem {
  id: string;
  title: string;
  description?: string;
  image?: ImageProps;
  category?: string;
  link?: {
    href: string;
    text?: string;
  };
}

export interface CTASection extends BaseSection {
  type: 'cta';
  props?: {
    title?: string;
    description?: string;
    buttons?: ButtonProps[];
    background?: BackgroundProps;
    alignment?: 'left' | 'center' | 'right';
    padding?: 'sm' | 'md' | 'lg' | 'xl';
  };
}

export interface ContactFormSection extends BaseSection {
  type: 'contact';
  props?: {
    title?: string;
    description?: string;
    fields?: FormField[];
    submitButton?: {
      text?: string;
      loadingText?: string;
    };
    action?: string;
    successMessage?: string;
    layout?: 'single' | 'two-column';
  };
}

export interface FormField {
  name: string;
  label?: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface PricingSection extends BaseSection {
  type: 'pricing';
  props?: {
    title?: string;
    subtitle?: string;
    toggle?: {
      enabled?: boolean;
      options?: ['monthly', 'yearly'];
      discount?: string;
    };
    plans?: PricingPlan[];
    columns?: 2 | 3 | 4;
  };
}

export interface PricingPlan {
  id: string;
  name?: string;
  description?: string;
  price?: {
    monthly?: number | string;
    yearly?: number | string;
    currency?: string;
    period?: string;
  };
  features?: string[];
  cta?: ButtonProps;
  featured?: boolean;
  badge?: string;
}

// ==================== COMMON PROPS ====================

export interface ButtonProps {
  text?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export interface ImageProps {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface IconProps {
  type?: 'lucide' | 'heroicons' | 'emoji' | 'custom';
  name?: string;
  value?: string;
  url?: string;
}

export interface BackgroundProps {
  color?: string;
  image?: string;
  overlay?: boolean;
  pattern?: 'none' | 'dots' | 'grid';
}

// ==================== NEW SECTION TYPES ====================

export interface FAQSection extends BaseSection {
  type: 'faq';
  props?: {
    title?: string;
    description?: string;
    layout?: 'single' | 'two-column';
    items?: Array<{
      question?: string;
      answer?: string;
      category?: string;
    }>;
  };
}

export interface GallerySection extends BaseSection {
  type: 'gallery';
  props?: {
    title?: string;
    description?: string;
    layout?: 'grid' | 'masonry' | 'carousel';
    columns?: '2' | '3' | '4';
    images?: Array<
      | string
      | {
          src?: string;
          alt?: string;
          title?: string;
          description?: string;
        }
    >;
  };
}

export interface LogoCloudSection extends BaseSection {
  type: 'logo-cloud';
  props?: {
    title?: string;
    description?: string;
    layout?: 'grid' | 'marquee';
    logos?: Array<
      | string
      | {
          src?: string;
          image?: string;
          alt?: string;
          name?: string;
          link?: string;
          href?: string;
        }
    >;
  };
}

export interface ContentSection extends BaseSection {
  type: 'content';
  props?: {
    title?: string;
    subtitle?: string;
    content?: string;
    image?: string;
    imageAlt?: string;
    video?: string;
    layout?: 'left-right' | 'right-left' | 'centered';
    buttons?: Array<{
      text?: string;
      href?: string;
      variant?: 'primary' | 'secondary';
    }>;
  };
}

// ==================== UTILITY TYPES ====================

export type ComponentSection =
  | HeroSection
  | FeaturesSection
  | StatsSection
  | TeamSection
  | TestimonialsSection
  | GridSection
  | CTASection
  | ContactFormSection
  | PricingSection
  | FAQSection
  | GallerySection
  | LogoCloudSection
  | ContentSection;
