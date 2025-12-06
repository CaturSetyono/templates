# Spec Delta: Hero Component

**Component Type:** `hero`  
**Category:** Atomic Component  
**Version:** 1.0.0  
**Status:** Proposed

---

## Overview

The Hero component serves as the primary landing section of a page, designed to capture attention and drive user action. It supports multiple layout variants, dynamic content, and theme-aware styling.

---

## Configuration Schema

### TypeScript Interface

```typescript
interface HeroSection extends BaseSection {
  type: "hero";
  props: {
    // Content
    headline: string;
    subheadline?: string;
    description?: string;

    // Call to Action
    cta?: {
      primary?: {
        text: string;
        href: string;
        variant?: "solid" | "outline" | "ghost";
      };
      secondary?: {
        text: string;
        href: string;
        variant?: "solid" | "outline" | "ghost";
      };
    };

    // Visual Elements
    backgroundImage?: {
      url: string;
      alt?: string;
      overlay?: {
        enabled: boolean;
        color?: string; // Uses theme color if not specified
        opacity?: number; // 0-100
      };
    };

    image?: {
      url: string;
      alt: string;
      position?: "left" | "right";
    };

    // Layout
    layout: "centered" | "split" | "minimal" | "full-height";
    alignment?: "left" | "center" | "right";

    // Spacing
    padding?: {
      top?: "sm" | "md" | "lg" | "xl";
      bottom?: "sm" | "md" | "lg" | "xl";
    };
  };
}
```

### JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["type", "props"],
  "properties": {
    "type": {
      "type": "string",
      "const": "hero"
    },
    "props": {
      "type": "object",
      "required": ["headline", "layout"],
      "properties": {
        "headline": {
          "type": "string",
          "minLength": 1,
          "maxLength": 200
        },
        "subheadline": {
          "type": "string",
          "maxLength": 300
        },
        "description": {
          "type": "string",
          "maxLength": 500
        },
        "cta": {
          "type": "object",
          "properties": {
            "primary": {
              "type": "object",
              "required": ["text", "href"],
              "properties": {
                "text": { "type": "string" },
                "href": { "type": "string" },
                "variant": {
                  "type": "string",
                  "enum": ["solid", "outline", "ghost"]
                }
              }
            },
            "secondary": {
              "type": "object",
              "required": ["text", "href"],
              "properties": {
                "text": { "type": "string" },
                "href": { "type": "string" },
                "variant": {
                  "type": "string",
                  "enum": ["solid", "outline", "ghost"]
                }
              }
            }
          }
        },
        "backgroundImage": {
          "type": "object",
          "required": ["url"],
          "properties": {
            "url": { "type": "string", "format": "uri" },
            "alt": { "type": "string" },
            "overlay": {
              "type": "object",
              "properties": {
                "enabled": { "type": "boolean" },
                "color": { "type": "string" },
                "opacity": {
                  "type": "number",
                  "minimum": 0,
                  "maximum": 100
                }
              }
            }
          }
        },
        "image": {
          "type": "object",
          "required": ["url", "alt"],
          "properties": {
            "url": { "type": "string", "format": "uri" },
            "alt": { "type": "string" },
            "position": {
              "type": "string",
              "enum": ["left", "right"]
            }
          }
        },
        "layout": {
          "type": "string",
          "enum": ["centered", "split", "minimal", "full-height"]
        },
        "alignment": {
          "type": "string",
          "enum": ["left", "center", "right"]
        },
        "padding": {
          "type": "object",
          "properties": {
            "top": {
              "type": "string",
              "enum": ["sm", "md", "lg", "xl"]
            },
            "bottom": {
              "type": "string",
              "enum": ["sm", "md", "lg", "xl"]
            }
          }
        }
      }
    }
  }
}
```

---

## Layout Variants

### 1. Centered Layout

- Content centered on page
- Optional background image with overlay
- Best for: Landing pages, product launches

```yaml
layout: centered
alignment: center
```

### 2. Split Layout

- Content on one side, image on the other
- Responsive: stacks on mobile
- Best for: SaaS products, app showcases

```yaml
layout: split
image:
  position: right
```

### 3. Minimal Layout

- Simple text-focused design
- No background image
- Best for: Blog headers, documentation

```yaml
layout: minimal
alignment: left
```

### 4. Full-Height Layout

- Takes entire viewport height
- Centered content with scroll indicator
- Best for: Agency homepages, portfolios

```yaml
layout: full-height
```

---

## Component Behavior

### Responsive Design

| Breakpoint          | Behavior                                       |
| ------------------- | ---------------------------------------------- |
| Mobile (<640px)     | Single column, reduced padding, smaller text   |
| Tablet (640-1024px) | Moderate spacing, split layout becomes stacked |
| Desktop (>1024px)   | Full layout, optimal spacing                   |

### Theme Integration

All colors use CSS variables from theme:

- Headlines: `var(--color-text)`
- Descriptions: `var(--color-text-secondary)`
- CTA Primary: `var(--color-primary)`
- CTA Secondary: `var(--color-secondary)`
- Background overlay: `var(--color-background)` or custom

### Accessibility

- ✅ ARIA labels on CTAs
- ✅ Semantic HTML (`<section>`, `<h1>`, `<p>`)
- ✅ Keyboard navigation for buttons
- ✅ Alt text for images
- ✅ Contrast ratio > 4.5:1 for text

---

## Example Configurations

### Example 1: Simple Centered Hero

```yaml
type: hero
props:
  headline: "Build Websites in Minutes, Not Days"
  subheadline: "Server-Driven UI Platform"
  description: "Deploy dynamic, branded websites with just a configuration file. No code changes required."
  layout: centered
  alignment: center
  cta:
    primary:
      text: "Get Started"
      href: "/signup"
      variant: solid
    secondary:
      text: "View Demo"
      href: "/demo"
      variant: outline
  padding:
    top: xl
    bottom: xl
```

### Example 2: Split Layout with Image

```yaml
type: hero
props:
  headline: "Design That Speaks"
  description: "Create stunning digital experiences that captivate your audience."
  layout: split
  alignment: left
  image:
    url: "https://cdn.example.com/hero-design.jpg"
    alt: "Beautiful design mockup"
    position: right
  cta:
    primary:
      text: "Start Your Project"
      href: "/contact"
```

### Example 3: Full-Height with Background

```yaml
type: hero
props:
  headline: "Welcome to Innovation"
  subheadline: "Where Ideas Become Reality"
  layout: full-height
  alignment: center
  backgroundImage:
    url: "https://cdn.example.com/hero-bg.jpg"
    alt: "Creative workspace"
    overlay:
      enabled: true
      opacity: 60
  cta:
    primary:
      text: "Explore"
      href: "#services"
      variant: solid
```

---

## Component Implementation

### File Structure

```
src/components/atomic/Hero/
  ├── Hero.tsx           # Main component
  ├── HeroVariants.tsx   # Layout variants
  ├── HeroButton.tsx     # CTA button subcomponent
  └── Hero.test.tsx      # Tests
```

### Key Implementation Details

1. **Responsive Images:** Use Next.js `<Image>` component with priority loading
2. **Background Overlay:** Implement with pseudo-element `::before`
3. **CTA Buttons:** Reusable button component with theme variants
4. **Animation:** Fade-in on mount, subtle parallax for background (optional)

### CSS Variables Used

```css
.hero {
  background-color: var(--color-background);
  color: var(--color-text);
}

.hero__headline {
  color: var(--color-text);
  font-size: var(--text-5xl);
}

.hero__description {
  color: var(--color-text-secondary);
}

.hero__cta--primary {
  background-color: var(--color-primary);
  color: var(--color-primary-text);
}

.hero__cta--secondary {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
}
```

---

## Validation Rules

### Required Fields

- ✅ `headline` (must be 1-200 characters)
- ✅ `layout` (must be one of defined variants)

### Optional Fields

- `subheadline` (max 300 characters)
- `description` (max 500 characters)
- `cta` (at least one button recommended)
- `backgroundImage` (requires valid URL)

### Business Rules

- If `layout: split`, `image` should be provided
- If `backgroundImage.overlay.enabled: true`, opacity defaults to 50%
- If no `alignment` specified, defaults based on layout:
  - `centered` → `center`
  - `split` → `left`
  - `minimal` → `left`
  - `full-height` → `center`

---

## Performance Considerations

- **Image Optimization:** Use Next.js Image with `priority` for above-fold
- **Lazy Loading:** Background images loaded with `loading="lazy"`
- **Code Splitting:** Hero component lazy loaded if not first section
- **LCP Target:** < 2.5s for Largest Contentful Paint

---

## Testing Strategy

### Unit Tests

- Props validation
- CTA button rendering
- Layout variant switching
- Theme color application

### Integration Tests

- Responsive behavior at breakpoints
- Image loading and error states
- Link navigation

### Visual Regression Tests

- Snapshot tests for all layouts
- Theme switching (light/dark)

---

## Migration Notes

### From Static HTML

- Extract headline, description from existing `<h1>`, `<p>`
- Convert inline styles to theme colors
- Move images to CDN and reference URLs

### Adding New Layout Variant

1. Add variant to `layout` enum in TypeScript type
2. Create variant component in `HeroVariants.tsx`
3. Update renderer switch case
4. Add example configuration
5. Update tests

---

## Related Components

- **Button:** Reused for CTA rendering
- **Image:** Wrapper around Next.js Image
- **Container:** Layout wrapper for max-width

---

## Changelog

### v1.0.0 (2025-12-06)

- Initial specification
- Defined 4 layout variants
- Added CTA support (primary/secondary)
- Background image with overlay
- Theme integration
- Responsive design rules
