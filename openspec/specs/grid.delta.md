# Spec Delta: Grid Component

**Component Type:** `grid`  
**Category:** Atomic Component  
**Version:** 1.0.0  
**Status:** Proposed

---

## Overview

The Grid component displays a responsive grid of items, ideal for portfolios, project showcases, product catalogs, or blog post listings. It supports filtering, multiple column layouts, and various card styles.

---

## Configuration Schema

### TypeScript Interface

```typescript
interface GridSection extends BaseSection {
  type: "grid";
  props: {
    // Section Header
    title?: string;
    subtitle?: string;
    description?: string;

    // Layout
    columns: 1 | 2 | 3 | 4;
    gap?: "sm" | "md" | "lg";
    aspectRatio?: "1:1" | "4:3" | "16:9" | "auto";

    // Grid Items
    items: Array<{
      id: string;
      title: string;
      description?: string;
      image: {
        url: string;
        alt: string;
      };
      category?: string;
      tags?: string[];
      link?: {
        href: string;
        text?: string; // Defaults to "View Project"
        target?: "_self" | "_blank";
      };
      metadata?: {
        date?: string;
        author?: string;
        client?: string;
        [key: string]: any;
      };
    }>;

    // Filtering
    filters?: {
      enabled: boolean;
      categories?: string[]; // Auto-extracted if not provided
      defaultCategory?: string; // "all" if not specified
    };

    // Card Style
    cardStyle?: "standard" | "overlay" | "minimal" | "hover-zoom";
    showMetadata?: boolean;

    // Load More
    pagination?: {
      type: "none" | "load-more" | "infinite-scroll";
      itemsPerPage?: number; // Default: all items
    };

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
      "const": "grid"
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
          "enum": [1, 2, 3, 4]
        },
        "gap": {
          "type": "string",
          "enum": ["sm", "md", "lg"]
        },
        "aspectRatio": {
          "type": "string",
          "enum": ["1:1", "4:3", "16:9", "auto"]
        },
        "items": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "object",
            "required": ["id", "title", "image"],
            "properties": {
              "id": { "type": "string" },
              "title": { "type": "string", "maxLength": 100 },
              "description": { "type": "string", "maxLength": 300 },
              "image": {
                "type": "object",
                "required": ["url", "alt"],
                "properties": {
                  "url": { "type": "string", "format": "uri" },
                  "alt": { "type": "string" }
                }
              },
              "category": { "type": "string" },
              "tags": {
                "type": "array",
                "items": { "type": "string" }
              },
              "link": {
                "type": "object",
                "required": ["href"],
                "properties": {
                  "href": { "type": "string" },
                  "text": { "type": "string" },
                  "target": {
                    "type": "string",
                    "enum": ["_self", "_blank"]
                  }
                }
              },
              "metadata": {
                "type": "object"
              }
            }
          }
        },
        "filters": {
          "type": "object",
          "required": ["enabled"],
          "properties": {
            "enabled": { "type": "boolean" },
            "categories": {
              "type": "array",
              "items": { "type": "string" }
            },
            "defaultCategory": { "type": "string" }
          }
        },
        "cardStyle": {
          "type": "string",
          "enum": ["standard", "overlay", "minimal", "hover-zoom"]
        },
        "showMetadata": { "type": "boolean" },
        "pagination": {
          "type": "object",
          "required": ["type"],
          "properties": {
            "type": {
              "type": "string",
              "enum": ["none", "load-more", "infinite-scroll"]
            },
            "itemsPerPage": {
              "type": "number",
              "minimum": 1
            }
          }
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

## Card Style Variants

### 1. Standard

- Image with title and description below
- Clean, professional look
- Best for: Corporate portfolios, case studies

### 2. Overlay

- Text overlays image on hover
- Full-image background
- Best for: Creative portfolios, photography

### 3. Minimal

- Image with title only
- No description or borders
- Best for: Product showcases, galleries

### 4. Hover Zoom

- Image zooms on hover
- Title/description appear
- Best for: Dynamic portfolios, modern designs

---

## Filtering System

### Auto-Category Extraction

If `filters.categories` is not provided, categories are automatically extracted from items:

```typescript
const categories = [
  "All",
  ...new Set(items.map((item) => item.category).filter(Boolean)),
];
```

### Filter Behavior

- **All:** Shows all items
- **Category:** Shows items matching selected category
- **Animation:** Fade out → filter → fade in
- **State:** Maintained in URL query params for shareability

---

## Component Behavior

### Responsive Breakpoints

| Breakpoint          | Columns Behavior           |
| ------------------- | -------------------------- |
| Mobile (<640px)     | Always 1 column            |
| Tablet (640-1024px) | 2 columns (if columns ≥ 2) |
| Desktop (>1024px)   | As configured              |

### Image Handling

- **Lazy Loading:** All images below fold
- **Blur Placeholder:** Next.js automatic blur
- **Aspect Ratio:** Maintained via CSS
- **Fallback:** Gradient background if image fails

### Theme Integration

```css
.grid-card {
  background: var(--color-card-background);
  border-color: var(--color-border);
}

.grid-card__title {
  color: var(--color-text);
}

.grid-card__description {
  color: var(--color-text-secondary);
}

.grid-filter-button--active {
  background: var(--color-primary);
  color: var(--color-primary-text);
}
```

---

## Example Configurations

### Example 1: Portfolio Grid with Filters

```yaml
type: grid
props:
  title: "Our Work"
  subtitle: "Recent Projects"
  columns: 3
  gap: lg
  aspectRatio: "16:9"
  cardStyle: overlay
  filters:
    enabled: true
    defaultCategory: "all"
  items:
    - id: "proj-1"
      title: "E-Commerce Redesign"
      description: "Complete overhaul of online shopping experience"
      image:
        url: "https://cdn.example.com/project1.jpg"
        alt: "E-commerce website mockup"
      category: "Web Design"
      tags: ["UI/UX", "Shopify"]
      link:
        href: "/projects/ecommerce-redesign"

    - id: "proj-2"
      title: "Brand Identity"
      description: "Logo and brand guidelines for startup"
      image:
        url: "https://cdn.example.com/project2.jpg"
        alt: "Brand identity design"
      category: "Branding"
      tags: ["Logo", "Guidelines"]
      link:
        href: "/projects/brand-identity"

    - id: "proj-3"
      title: "Mobile App Development"
      description: "iOS and Android app for fitness tracking"
      image:
        url: "https://cdn.example.com/project3.jpg"
        alt: "Mobile app screens"
      category: "App Development"
      tags: ["React Native", "Fitness"]
      link:
        href: "/projects/fitness-app"
```

### Example 2: Blog Post Grid

```yaml
type: grid
props:
  title: "Latest Articles"
  columns: 3
  gap: md
  aspectRatio: "4:3"
  cardStyle: standard
  showMetadata: true
  pagination:
    type: load-more
    itemsPerPage: 6
  items:
    - id: "post-1"
      title: "10 Web Design Trends for 2025"
      description: "Stay ahead with these emerging design patterns"
      image:
        url: "https://cdn.example.com/blog1.jpg"
        alt: "Design trends illustration"
      category: "Design"
      metadata:
        date: "2025-12-01"
        author: "Jane Doe"
      link:
        href: "/blog/web-design-trends-2025"
```

### Example 3: Product Showcase

```yaml
type: grid
props:
  title: "Featured Products"
  columns: 4
  gap: sm
  aspectRatio: "1:1"
  cardStyle: minimal
  items:
    - id: "prod-1"
      title: "Wireless Headphones"
      image:
        url: "https://cdn.example.com/product1.jpg"
        alt: "Black wireless headphones"
      link:
        href: "/products/wireless-headphones"
        text: "Shop Now"

    - id: "prod-2"
      title: "Smart Watch"
      image:
        url: "https://cdn.example.com/product2.jpg"
        alt: "Silver smart watch"
      link:
        href: "/products/smart-watch"
        text: "Shop Now"
```

---

## Component Implementation

### File Structure

```
src/components/atomic/Grid/
  ├── Grid.tsx              # Main component
  ├── GridCard.tsx          # Card variants
  ├── GridFilters.tsx       # Filter UI
  ├── GridPagination.tsx    # Load more/infinite scroll
  └── Grid.test.tsx         # Tests
```

### Filter Implementation

```typescript
const [activeFilter, setActiveFilter] = useState("all");
const [visibleItems, setVisibleItems] = useState(items);

const handleFilter = (category: string) => {
  setActiveFilter(category);

  if (category === "all") {
    setVisibleItems(items);
  } else {
    setVisibleItems(items.filter((item) => item.category === category));
  }
};
```

### Pagination Implementation

```typescript
const [displayCount, setDisplayCount] = useState(itemsPerPage);

const loadMore = () => {
  setDisplayCount((prev) => prev + itemsPerPage);
};

const displayedItems = visibleItems.slice(0, displayCount);
```

---

## Validation Rules

### Required Fields

- ✅ `items` (minimum 1 item)
- ✅ `columns` (1-4)
- ✅ Each item must have `id`, `title`, `image`

### Optional Fields

- Section header
- Filters
- Pagination
- Metadata display

### Business Rules

- If `filters.enabled: true` and categories not provided, auto-extract
- If `pagination.type: load-more`, default `itemsPerPage: 6`
- If `pagination.type: infinite-scroll`, default `itemsPerPage: 12`
- If no `gap` specified, defaults to `md`
- If no `aspectRatio` specified, defaults to `4:3`

---

## Accessibility

- ✅ Images have descriptive alt text
- ✅ Cards have proper heading hierarchy
- ✅ Filter buttons have ARIA labels
- ✅ Keyboard navigation for filters
- ✅ Focus management after filtering
- ✅ "Load More" button has loading state

---

## Performance Considerations

- **Image Optimization:** Next.js Image with lazy loading
- **Filtering:** Client-side filtering with animation frame
- **Infinite Scroll:** Intersection Observer API
- **Virtual Scrolling:** For grids with 50+ items
- **Debounced Filter:** 150ms debounce on rapid clicks

---

## SEO Considerations

- **Image Alt Text:** Required for all images
- **Semantic HTML:** `<article>` for grid items
- **Structured Data:** JSON-LD for portfolio items
- **Metadata:** OpenGraph tags from item data

---

## Testing Strategy

### Unit Tests

- Filter logic
- Pagination logic
- Card rendering variants
- Responsive column calculations

### Integration Tests

- Filter interaction
- Load more functionality
- Image loading and errors
- Category extraction

### Visual Tests

- All card styles
- Grid layouts at breakpoints
- Hover states

---

## Migration Notes

### Adding New Card Style

1. Add style to enum in TypeScript
2. Create variant in `GridCard.tsx`
3. Add example configuration
4. Update documentation

### Custom Metadata Fields

- Extend `metadata` object with any custom fields
- Conditionally render in card component
- Update TypeScript interface if needed

---

## Related Components

- **Image:** Next.js Image wrapper
- **Button:** For filters and pagination
- **Badge:** For tags display
- **Card:** Base card component

---

## Changelog

### v1.0.0 (2025-12-06)

- Initial specification
- Support for 1-4 columns
- 4 card styles (standard, overlay, minimal, hover-zoom)
- Category filtering with auto-extraction
- 3 pagination types (none, load-more, infinite-scroll)
- Metadata display support
- Multiple aspect ratios
