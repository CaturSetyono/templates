# Spec Delta: New Atomic Components (v2.0)

**Version:** 2.0.0  
**Status:** Proposed  
**Components:** 9 new atomic components  
**Last Updated:** 2025-12-06

---

## Overview

This document specifies **9 new atomic components** for the Dynamic Website Builder v2.0. All components follow the **optional-first philosophy** with graceful degradation and zero-config support.

---

## 1. CTA (Call to Action) Component

### Purpose

Full-width conversion sections with background images, multiple buttons, and compelling copy.

### TypeScript Interface

```typescript
interface CTASection extends BaseSection {
  type: "cta";
  props?: {
    title?: string;
    description?: string;
    buttons?: Array<{
      text?: string;
      href?: string;
      variant?: "primary" | "secondary" | "outline";
    }>;
    background?: {
      color?: string; // Theme color or custom
      image?: string;
      overlay?: boolean;
      pattern?: "none" | "dots" | "grid";
    };
    alignment?: "left" | "center" | "right";
    padding?: "sm" | "md" | "lg" | "xl";
  };
}
```

### Example Configuration

```yaml
type: cta
props:
  title: "Ready to Get Started?"
  description: "Join thousands of satisfied customers"
  buttons:
    - text: "Start Free Trial"
      href: "/signup"
      variant: primary
    - text: "Contact Sales"
      href: "/contact"
      variant: outline
  background:
    color: "primary"
    pattern: dots
  alignment: center
```

### Conditional Rendering

```typescript
if (!props || (!props.title && !props.buttons)) return null;

{
  props.title && <h2>{props.title}</h2>;
}
{
  props.description && <p>{props.description}</p>;
}
{
  props.buttons && props.buttons.length > 0 && (
    <div className="cta-buttons">
      {props.buttons.map(
        (btn, idx) => btn.text && <Button key={idx} {...btn} />
      )}
    </div>
  );
}
```

---

## 2. Contact Form Component

### Purpose

Dynamic form builder with configurable fields, validation, and submission handling.

### TypeScript Interface

```typescript
interface ContactFormSection extends BaseSection {
  type: "contact";
  props?: {
    title?: string;
    description?: string;
    fields?: Array<{
      name: string;
      label?: string;
      type: "text" | "email" | "tel" | "textarea" | "select";
      placeholder?: string;
      required?: boolean;
      options?: string[]; // For select fields
    }>;
    submitButton?: {
      text?: string;
      loadingText?: string;
    };
    action?: string; // Form submission endpoint
    successMessage?: string;
    layout?: "single" | "two-column";
  };
}
```

### Example Configuration

```yaml
type: contact
props:
  title: "Get in Touch"
  description: "Fill out the form and we'll get back to you within 24 hours"
  fields:
    - name: "name"
      label: "Full Name"
      type: text
      required: true
    - name: "email"
      label: "Email Address"
      type: email
      required: true
    - name: "company"
      label: "Company"
      type: text
    - name: "message"
      label: "Message"
      type: textarea
      required: true
  submitButton:
    text: "Send Message"
    loadingText: "Sending..."
  action: "/api/contact"
  successMessage: "Thank you! We'll be in touch soon."
  layout: two-column
```

### Conditional Rendering

```typescript
if (!props?.fields || props.fields.length === 0) return null;

<form action={props.action || "/api/contact"} method="POST">
  {props.fields.map((field) => (
    <FormField
      key={field.name}
      {...field}
      label={field.label || field.name}
      required={field.required ?? false}
    />
  ))}
  <button type="submit">{props.submitButton?.text || "Submit"}</button>
</form>;
```

---

## 3. Pricing Component

### Purpose

Plan comparison tables with monthly/yearly toggle and feature lists.

### TypeScript Interface

```typescript
interface PricingSection extends BaseSection {
  type: "pricing";
  props?: {
    title?: string;
    subtitle?: string;
    toggle?: {
      enabled?: boolean;
      options?: ["monthly", "yearly"];
      discount?: string; // e.g., "Save 20%"
    };
    plans?: Array<{
      name?: string;
      description?: string;
      price?: {
        monthly?: number | string;
        yearly?: number | string;
        currency?: string;
        period?: string; // e.g., "/month"
      };
      features?: string[];
      cta?: {
        text?: string;
        href?: string;
      };
      featured?: boolean;
      badge?: string; // e.g., "Popular"
    }>;
    columns?: 2 | 3 | 4;
  };
}
```

### Example Configuration

```yaml
type: pricing
props:
  title: "Simple, Transparent Pricing"
  subtitle: "Choose the plan that's right for you"
  toggle:
    enabled: true
    discount: "Save 20% with annual billing"
  plans:
    - name: "Starter"
      price:
        monthly: 29
        yearly: 290
        currency: "$"
      features:
        - "Up to 10 projects"
        - "5GB storage"
        - "Email support"
      cta:
        text: "Start Free Trial"
        href: "/signup?plan=starter"

    - name: "Pro"
      badge: "Most Popular"
      featured: true
      price:
        monthly: 99
        yearly: 990
        currency: "$"
      features:
        - "Unlimited projects"
        - "50GB storage"
        - "Priority support"
        - "Advanced analytics"
      cta:
        text: "Start Free Trial"
        href: "/signup?plan=pro"
```

---

## 4. FAQ Component

### Purpose

Accordion-style frequently asked questions with optional search and categories.

### TypeScript Interface

```typescript
interface FAQSection extends BaseSection {
  type: "faq";
  props?: {
    title?: string;
    subtitle?: string;
    items?: Array<{
      id: string;
      question: string;
      answer: string;
      category?: string;
    }>;
    search?: {
      enabled?: boolean;
      placeholder?: string;
    };
    categories?: string[]; // Auto-extracted if not provided
    layout?: "single" | "two-column";
    defaultOpen?: boolean; // First item open by default
  };
}
```

### Example Configuration

```yaml
type: faq
props:
  title: "Frequently Asked Questions"
  subtitle: "Everything you need to know"
  search:
    enabled: true
    placeholder: "Search questions..."
  items:
    - id: "faq-1"
      question: "How does the free trial work?"
      answer: "You get 14 days of full access, no credit card required."
      category: "Billing"
    - id: "faq-2"
      question: "Can I cancel anytime?"
      answer: "Yes, you can cancel your subscription at any time with one click."
      category: "Billing"
    - id: "faq-3"
      question: "What kind of support do you offer?"
      answer: "We offer email support for all plans, and priority support for Pro and Enterprise."
      category: "Support"
  layout: two-column
```

---

## 5. Blog/News Component

### Purpose

Article/post listings with featured content, categories, and pagination.

### TypeScript Interface

```typescript
interface BlogSection extends BaseSection {
  type: "blog";
  props?: {
    title?: string;
    subtitle?: string;
    posts?: Array<{
      id: string;
      title: string;
      excerpt?: string;
      image?: {
        url: string;
        alt: string;
      };
      author?: {
        name?: string;
        avatar?: string;
      };
      date?: string;
      category?: string;
      readTime?: string;
      link: {
        href: string;
        text?: string;
      };
      featured?: boolean;
    }>;
    layout?: "grid" | "list" | "cards";
    columns?: 2 | 3;
    showExcerpt?: boolean;
    showAuthor?: boolean;
    showDate?: boolean;
    showCategory?: boolean;
    pagination?: {
      type?: "none" | "load-more" | "page-numbers";
      itemsPerPage?: number;
    };
  };
}
```

### Example Configuration

```yaml
type: blog
props:
  title: "Latest from Our Blog"
  layout: grid
  columns: 3
  showExcerpt: true
  showAuthor: true
  showDate: true
  posts:
    - id: "post-1"
      title: "10 Tips for Better Website Performance"
      excerpt: "Learn how to optimize your website for speed and user experience"
      image:
        url: "https://cdn.example.com/blog/post1.jpg"
        alt: "Website performance"
      author:
        name: "Sarah Johnson"
        avatar: "https://cdn.example.com/avatars/sarah.jpg"
      date: "2025-12-01"
      category: "Development"
      readTime: "5 min read"
      link:
        href: "/blog/website-performance"
      featured: true
```

---

## 6. Gallery Component

### Purpose

Image showcase with lightbox, filters, and masonry/grid layouts.

### TypeScript Interface

```typescript
interface GallerySection extends BaseSection {
  type: "gallery";
  props?: {
    title?: string;
    subtitle?: string;
    images?: Array<{
      id: string;
      url: string;
      alt: string;
      title?: string;
      description?: string;
      category?: string;
      thumbnail?: string;
    }>;
    layout?: "grid" | "masonry";
    columns?: 2 | 3 | 4 | 5;
    gap?: "sm" | "md" | "lg";
    lightbox?: boolean;
    filters?: {
      enabled?: boolean;
      categories?: string[];
    };
  };
}
```

### Example Configuration

```yaml
type: gallery
props:
  title: "Our Portfolio"
  layout: masonry
  columns: 3
  lightbox: true
  filters:
    enabled: true
  images:
    - id: "img-1"
      url: "https://cdn.example.com/gallery/1.jpg"
      alt: "Project showcase"
      title: "Modern Architecture"
      category: "Architecture"
    - id: "img-2"
      url: "https://cdn.example.com/gallery/2.jpg"
      alt: "Interior design"
      title: "Minimalist Interior"
      category: "Interior"
```

---

## 7. Process/Timeline Component

### Purpose

Step-by-step process visualization with vertical/horizontal layouts.

### TypeScript Interface

```typescript
interface TimelineSection extends BaseSection {
  type: "timeline";
  props?: {
    title?: string;
    subtitle?: string;
    steps?: Array<{
      id: string;
      title: string;
      description?: string;
      icon?: {
        type?: "number" | "icon" | "emoji";
        value?: string;
      };
      date?: string;
      milestone?: boolean;
    }>;
    layout?: "vertical" | "horizontal";
    style?: "line" | "dots" | "arrows";
  };
}
```

### Example Configuration

```yaml
type: timeline
props:
  title: "Our Process"
  subtitle: "How we work with clients"
  layout: horizontal
  style: arrows
  steps:
    - id: "step-1"
      title: "Discovery"
      description: "We learn about your business and goals"
      icon:
        type: number
        value: "1"
    - id: "step-2"
      title: "Planning"
      description: "We create a strategic roadmap"
      icon:
        type: number
        value: "2"
    - id: "step-3"
      title: "Design"
      description: "We craft beautiful user experiences"
      icon:
        type: number
        value: "3"
    - id: "step-4"
      title: "Development"
      description: "We build robust, scalable solutions"
      icon:
        type: number
        value: "4"
    - id: "step-5"
      title: "Launch"
      description: "We deploy and support your success"
      icon:
        type: number
        value: "5"
      milestone: true
```

---

## 8. Video Component

### Purpose

Embedded video player with custom thumbnails and controls.

### TypeScript Interface

```typescript
interface VideoSection extends BaseSection {
  type: "video";
  props?: {
    title?: string;
    description?: string;
    video: {
      type: "youtube" | "vimeo" | "direct";
      id?: string; // YouTube/Vimeo ID
      url?: string; // Direct video URL
      thumbnail?: string;
      aspectRatio?: "16:9" | "4:3" | "1:1";
    };
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    overlay?: {
      enabled?: boolean;
      playButtonColor?: string;
    };
    caption?: string;
  };
}
```

### Example Configuration

```yaml
type: video
props:
  title: "Watch Our Product Demo"
  description: "See how easy it is to get started"
  video:
    type: youtube
    id: "dQw4w9WgXcQ"
    thumbnail: "https://cdn.example.com/video-thumb.jpg"
    aspectRatio: "16:9"
  controls: true
  overlay:
    enabled: true
  caption: "Product demo - 2 minutes"
```

---

## 9. Partners/Logos Component

### Purpose

Display company logos, client lists, or partner badges.

### TypeScript Interface

```typescript
interface PartnersSection extends BaseSection {
  type: "partners";
  props?: {
    title?: string;
    subtitle?: string;
    logos?: Array<{
      id: string;
      image: string;
      alt: string;
      link?: string;
      width?: number;
      height?: number;
    }>;
    layout?: "grid" | "marquee";
    columns?: 3 | 4 | 5 | 6;
    grayscale?: boolean; // Grayscale with color on hover
    animation?: {
      enabled?: boolean;
      speed?: "slow" | "medium" | "fast";
      direction?: "left" | "right";
    };
  };
}
```

### Example Configuration

```yaml
type: partners
props:
  title: "Trusted by Leading Companies"
  layout: marquee
  grayscale: true
  animation:
    enabled: true
    speed: medium
    direction: left
  logos:
    - id: "logo-1"
      image: "https://cdn.example.com/logos/company1.svg"
      alt: "Company 1"
      link: "https://company1.com"
    - id: "logo-2"
      image: "https://cdn.example.com/logos/company2.svg"
      alt: "Company 2"
    - id: "logo-3"
      image: "https://cdn.example.com/logos/company3.svg"
      alt: "Company 3"
```

---

## Summary Table

| Component    | Primary Use Case | Key Features                                   |
| ------------ | ---------------- | ---------------------------------------------- |
| **CTA**      | Conversions      | Full-width banners, multiple CTAs, backgrounds |
| **Contact**  | Lead capture     | Dynamic fields, validation, submission         |
| **Pricing**  | Plans            | Monthly/yearly toggle, feature comparison      |
| **FAQ**      | Support          | Accordion, search, categories                  |
| **Blog**     | Content          | Featured posts, pagination, categories         |
| **Gallery**  | Images           | Lightbox, masonry, filters                     |
| **Timeline** | Process          | Vertical/horizontal, milestones                |
| **Video**    | Media            | YouTube/Vimeo embed, custom controls           |
| **Partners** | Trust            | Logo grid, marquee animation                   |

---

## Common Conditional Rendering Patterns

### Pattern for All Components

```typescript
export function Component({ section }: { section: ComponentSection }) {
  const props = section?.props;

  // Early return if no renderable content
  if (!props || !hasMinimumContent(props)) {
    return null;
  }

  return (
    <section className="component">
      {props.title && <h2>{props.title}</h2>}
      {props.subtitle && <p className="subtitle">{props.subtitle}</p>}
      {/* Component-specific content */}
    </section>
  );
}
```

---

## File Structure for New Components

```
src/components/atomic/
  ├── CTA/
  │   ├── CTA.tsx
  │   ├── CTAButton.tsx
  │   └── CTA.test.tsx
  ├── ContactForm/
  │   ├── ContactForm.tsx
  │   ├── FormField.tsx
  │   └── ContactForm.test.tsx
  ├── Pricing/
  │   ├── Pricing.tsx
  │   ├── PricingCard.tsx
  │   ├── BillingToggle.tsx
  │   └── Pricing.test.tsx
  ├── FAQ/
  │   ├── FAQ.tsx
  │   ├── FAQItem.tsx
  │   ├── FAQSearch.tsx
  │   └── FAQ.test.tsx
  ├── Blog/
  │   ├── Blog.tsx
  │   ├── BlogCard.tsx
  │   ├── BlogFeatured.tsx
  │   └── Blog.test.tsx
  ├── Gallery/
  │   ├── Gallery.tsx
  │   ├── GalleryImage.tsx
  │   ├── Lightbox.tsx
  │   └── Gallery.test.tsx
  ├── Timeline/
  │   ├── Timeline.tsx
  │   ├── TimelineStep.tsx
  │   └── Timeline.test.tsx
  ├── Video/
  │   ├── Video.tsx
  │   ├── VideoPlayer.tsx
  │   └── Video.test.tsx
  └── Partners/
      ├── Partners.tsx
      ├── LogoGrid.tsx
      ├── LogoMarquee.tsx
      └── Partners.test.tsx
```

---

## Testing Checklist for Each Component

- [ ] Renders with full props
- [ ] Renders with minimal props
- [ ] Returns null with empty props
- [ ] Handles missing nested properties
- [ ] Theme colors applied correctly
- [ ] Responsive at all breakpoints
- [ ] Keyboard accessible
- [ ] Screen reader compatible
- [ ] No console errors/warnings

---

**Version:** 2.0.0  
**Last Updated:** 2025-12-06  
**Total Components:** 15 (6 existing + 9 new)
