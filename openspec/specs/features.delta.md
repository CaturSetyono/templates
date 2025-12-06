# Spec Delta: Features Component

**Component Type:** `features`  
**Category:** Atomic Component  
**Version:** 1.0.0  
**Status:** Proposed

---

## Overview

The Features component displays a grid of features, services, or benefits. It supports icons, multi-column layouts, and hover effects to showcase product capabilities or service offerings.

---

## Configuration Schema

### TypeScript Interface

```typescript
interface FeaturesSection extends BaseSection {
  type: "features";
  props: {
    // Section Header
    title?: string;
    subtitle?: string;
    description?: string;

    // Layout
    columns: 2 | 3 | 4;
    layout?: "grid" | "list" | "cards";

    // Features Items
    items: Array<{
      id: string;
      title: string;
      description: string;
      icon?: {
        type: "lucide" | "heroicons" | "custom" | "emoji";
        name?: string; // e.g., "Zap", "AcademicCap"
        url?: string; // for custom icons
        emoji?: string; // for emoji type
        color?: string; // Uses theme color if not specified
      };
      link?: {
        text: string;
        href: string;
      };
    }>;

    // Styling
    cardStyle?: "flat" | "elevated" | "bordered" | "minimal";
    iconPosition?: "top" | "left";

    // Spacing
    spacing?: "compact" | "normal" | "relaxed";
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
      "const": "features"
    },
    "props": {
      "type": "object",
      "required": ["items", "columns"],
      "properties": {
        "title": { "type": "string", "maxLength": 100 },
        "subtitle": { "type": "string", "maxLength": 150 },
        "description": { "type": "string", "maxLength": 300 },
        "columns": {
          "type": "number",
          "enum": [2, 3, 4]
        },
        "layout": {
          "type": "string",
          "enum": ["grid", "list", "cards"]
        },
        "items": {
          "type": "array",
          "minItems": 1,
          "maxItems": 12,
          "items": {
            "type": "object",
            "required": ["id", "title", "description"],
            "properties": {
              "id": { "type": "string" },
              "title": { "type": "string", "maxLength": 80 },
              "description": { "type": "string", "maxLength": 250 },
              "icon": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "enum": ["lucide", "heroicons", "custom", "emoji"]
                  },
                  "name": { "type": "string" },
                  "url": { "type": "string", "format": "uri" },
                  "emoji": { "type": "string", "maxLength": 2 },
                  "color": { "type": "string" }
                }
              },
              "link": {
                "type": "object",
                "required": ["text", "href"],
                "properties": {
                  "text": { "type": "string" },
                  "href": { "type": "string" }
                }
              }
            }
          }
        },
        "cardStyle": {
          "type": "string",
          "enum": ["flat", "elevated", "bordered", "minimal"]
        },
        "iconPosition": {
          "type": "string",
          "enum": ["top", "left"]
        },
        "spacing": {
          "type": "string",
          "enum": ["compact", "normal", "relaxed"]
        },
        "padding": {
          "type": "object",
          "properties": {
            "top": { "type": "string", "enum": ["sm", "md", "lg", "xl"] },
            "bottom": { "type": "string", "enum": ["sm", "md", "lg", "xl"] }
          }
        }
      }
    }
  }
}
```

---

## Layout Variants

### Grid Layout

- Equal-width columns
- Wraps responsively
- Best for: Feature showcases, service listings

### List Layout

- Single column on mobile, multi-column on desktop
- More text-focused
- Best for: Detailed features, comparison lists

### Cards Layout

- Elevated or bordered cards
- Hover effects
- Best for: Product features, benefits

---

## Icon Systems

### Supported Icon Libraries

1. **Lucide Icons** (Recommended)

   ```yaml
   icon:
     type: lucide
     name: "Zap" # Lightning bolt
     color: "primary"
   ```

2. **Heroicons**

   ```yaml
   icon:
     type: heroicons
     name: "AcademicCapIcon"
     color: "secondary"
   ```

3. **Custom URL**

   ```yaml
   icon:
     type: custom
     url: "https://cdn.example.com/icon.svg"
   ```

4. **Emoji**
   ```yaml
   icon:
     type: emoji
     emoji: "🚀"
   ```

---

## Component Behavior

### Responsive Breakpoints

| Breakpoint          | Columns Behavior           |
| ------------------- | -------------------------- |
| Mobile (<640px)     | Always 1 column            |
| Tablet (640-1024px) | 2 columns (if columns ≥ 2) |
| Desktop (>1024px)   | As configured (2, 3, or 4) |

### Theme Integration

```css
.feature-card {
  background: var(--color-card-background);
  border-color: var(--color-border);
}

.feature-icon {
  color: var(--color-primary); /* Default */
}

.feature-title {
  color: var(--color-text);
}

.feature-description {
  color: var(--color-text-secondary);
}
```

### Hover Effects

- **Cards:** Slight lift with shadow increase
- **Icons:** Scale up 110%
- **Links:** Underline and color change

---

## Example Configurations

### Example 1: 3-Column Grid with Icons

```yaml
type: features
props:
  title: "Why Choose Us"
  subtitle: "Everything you need to succeed"
  columns: 3
  layout: grid
  cardStyle: elevated
  iconPosition: top
  items:
    - id: "feat-1"
      title: "Lightning Fast"
      description: "Deploy your site in minutes with our optimized infrastructure"
      icon:
        type: lucide
        name: "Zap"
        color: "primary"

    - id: "feat-2"
      title: "Fully Customizable"
      description: "Every aspect controlled through simple configuration files"
      icon:
        type: lucide
        name: "Palette"
        color: "secondary"

    - id: "feat-3"
      title: "Auto-Deploy"
      description: "Push changes and watch your site update automatically"
      icon:
        type: lucide
        name: "Rocket"
        color: "accent"
```

### Example 2: 2-Column List with Links

```yaml
type: features
props:
  title: "Core Services"
  columns: 2
  layout: list
  cardStyle: bordered
  iconPosition: left
  spacing: relaxed
  items:
    - id: "service-1"
      title: "Brand Strategy"
      description: "We help define your brand identity and market positioning for maximum impact"
      icon:
        type: emoji
        emoji: "🎯"
      link:
        text: "Learn More"
        href: "/services/branding"

    - id: "service-2"
      title: "Web Development"
      description: "Custom websites built with modern tech stack and best practices"
      icon:
        type: emoji
        emoji: "💻"
      link:
        text: "View Portfolio"
        href: "/portfolio"
```

### Example 3: 4-Column Minimal Cards

```yaml
type: features
props:
  title: "Key Benefits"
  columns: 4
  layout: cards
  cardStyle: minimal
  iconPosition: top
  spacing: compact
  items:
    - id: "benefit-1"
      title: "No Code"
      description: "Configure everything without touching code"
      icon:
        type: lucide
        name: "Code"

    - id: "benefit-2"
      title: "Responsive"
      description: "Perfect on any device size"
      icon:
        type: lucide
        name: "Smartphone"

    - id: "benefit-3"
      title: "SEO Ready"
      description: "Optimized for search engines"
      icon:
        type: lucide
        name: "Search"

    - id: "benefit-4"
      title: "Secure"
      description: "Enterprise-grade security"
      icon:
        type: lucide
        name: "Shield"
```

---

## Component Implementation

### File Structure

```
src/components/atomic/Features/
  ├── Features.tsx          # Main component
  ├── FeatureCard.tsx       # Individual feature card
  ├── FeatureIcon.tsx       # Icon renderer
  ├── FeatureHeader.tsx     # Section header
  └── Features.test.tsx     # Tests
```

### Icon Rendering Logic

```typescript
function renderIcon(icon: IconConfig) {
  switch (icon.type) {
    case "lucide":
      return <LucideIcon name={icon.name} color={icon.color} />;
    case "heroicons":
      return <HeroIcon name={icon.name} color={icon.color} />;
    case "custom":
      return <img src={icon.url} alt="" />;
    case "emoji":
      return <span className="emoji">{icon.emoji}</span>;
  }
}
```

### Grid Layout Implementation

```tsx
<div
  className={cn(
    "grid gap-8",
    columns === 2 && "md:grid-cols-2",
    columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
    columns === 4 && "md:grid-cols-2 lg:grid-cols-4"
  )}
>
  {items.map((item) => (
    <FeatureCard key={item.id} {...item} />
  ))}
</div>
```

---

## Validation Rules

### Required Fields

- ✅ `items` (minimum 1, maximum 12 items)
- ✅ `columns` (2, 3, or 4)

### Optional Fields

- Section header (title, subtitle, description)
- Icon configuration
- Card styling options

### Business Rules

- If `columns: 4`, recommend maximum 8 items for visual balance
- If `iconPosition: left`, use `cardStyle: minimal` or `flat`
- Icon color defaults to `primary` if not specified
- If no `layout` specified, defaults to `grid`

---

## Accessibility

- ✅ Icons have `aria-hidden="true"` (decorative)
- ✅ Feature titles use `<h3>` tags
- ✅ Links have descriptive text
- ✅ Keyboard navigation support
- ✅ Focus indicators on interactive elements

---

## Performance Considerations

- **Icon Loading:** Lazy load icon libraries
- **Image Icons:** Use Next.js Image with lazy loading
- **Animation:** Use CSS transforms (GPU-accelerated)
- **Grid Layout:** CSS Grid for optimal performance

---

## Testing Strategy

### Unit Tests

- Icon rendering for all types
- Column responsive behavior
- Link rendering
- Theme color application

### Visual Tests

- All card style variants
- Icon position variants
- Grid layouts at different breakpoints

---

## Migration Notes

### Adding New Icon Library

1. Install icon package
2. Add to icon type enum
3. Create renderer in `FeatureIcon.tsx`
4. Update documentation

### Customizing Card Styles

1. Add new style to `cardStyle` enum
2. Define CSS classes in `FeatureCard.tsx`
3. Update examples

---

## Related Components

- **Icon:** Icon rendering utility
- **Card:** Base card component
- **Link:** Link component with theme support

---

## Changelog

### v1.0.0 (2025-12-06)

- Initial specification
- Support for 2-4 columns
- 4 icon systems (Lucide, Heroicons, Custom, Emoji)
- 3 layout variants (grid, list, cards)
- 4 card styles (flat, elevated, bordered, minimal)
- Optional links on feature items
