# Spec Delta: Stats Component

**Component Type:** `stats`  
**Category:** Atomic Component  
**Version:** 1.0.0  
**Status:** Proposed

---

## Overview

The Stats component displays numerical metrics, achievements, or key performance indicators (KPIs) in an eye-catching format. It supports counter animations, multiple layouts, and customizable styling to showcase impressive numbers.

---

## Configuration Schema

### TypeScript Interface

```typescript
interface StatsSection extends BaseSection {
  type: "stats";
  props: {
    // Section Header
    title?: string;
    subtitle?: string;
    description?: string;

    // Layout
    layout: "row" | "grid" | "centered" | "split";
    columns?: 2 | 3 | 4; // Only for grid layout

    // Stats Items
    items: Array<{
      id: string;
      value: number | string; // Number for animation, string for custom values
      label: string;
      suffix?: string; // e.g., "+", "%", "K", "M"
      prefix?: string; // e.g., "$", "#"
      description?: string;
      icon?: {
        type: "lucide" | "heroicons" | "emoji";
        name?: string;
        emoji?: string;
        color?: string;
      };
    }>;

    // Animation
    animation?: {
      enabled: boolean;
      duration?: number; // in milliseconds, default 2000
      trigger?: "onLoad" | "onScroll"; // default: onScroll
      easing?: "linear" | "easeOut" | "easeInOut";
    };

    // Styling
    style?: "default" | "minimal" | "cards" | "highlighted";
    size?: "sm" | "md" | "lg" | "xl";
    dividers?: boolean; // Show dividers between stats

    // Background
    background?: {
      color?: string; // Uses theme if not specified
      pattern?: "none" | "dots" | "grid";
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
      "const": "stats"
    },
    "props": {
      "type": "object",
      "required": ["items", "layout"],
      "properties": {
        "title": { "type": "string", "maxLength": 100 },
        "subtitle": { "type": "string", "maxLength": 150 },
        "description": { "type": "string", "maxLength": 300 },
        "layout": {
          "type": "string",
          "enum": ["row", "grid", "centered", "split"]
        },
        "columns": {
          "type": "number",
          "enum": [2, 3, 4]
        },
        "items": {
          "type": "array",
          "minItems": 1,
          "maxItems": 8,
          "items": {
            "type": "object",
            "required": ["id", "value", "label"],
            "properties": {
              "id": { "type": "string" },
              "value": {
                "oneOf": [{ "type": "number" }, { "type": "string" }]
              },
              "label": { "type": "string", "maxLength": 50 },
              "suffix": { "type": "string", "maxLength": 5 },
              "prefix": { "type": "string", "maxLength": 5 },
              "description": { "type": "string", "maxLength": 150 },
              "icon": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "enum": ["lucide", "heroicons", "emoji"]
                  },
                  "name": { "type": "string" },
                  "emoji": { "type": "string", "maxLength": 2 },
                  "color": { "type": "string" }
                }
              }
            }
          }
        },
        "animation": {
          "type": "object",
          "required": ["enabled"],
          "properties": {
            "enabled": { "type": "boolean" },
            "duration": {
              "type": "number",
              "minimum": 500,
              "maximum": 5000
            },
            "trigger": {
              "type": "string",
              "enum": ["onLoad", "onScroll"]
            },
            "easing": {
              "type": "string",
              "enum": ["linear", "easeOut", "easeInOut"]
            }
          }
        },
        "style": {
          "type": "string",
          "enum": ["default", "minimal", "cards", "highlighted"]
        },
        "size": {
          "type": "string",
          "enum": ["sm", "md", "lg", "xl"]
        },
        "dividers": { "type": "boolean" },
        "background": {
          "type": "object",
          "properties": {
            "color": { "type": "string" },
            "pattern": {
              "type": "string",
              "enum": ["none", "dots", "grid"]
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

## Layout Variants

### 1. Row Layout

- Horizontal arrangement
- Equal spacing between stats
- Best for: 2-4 stats, full-width sections

### 2. Grid Layout

- Multi-column grid (2, 3, or 4 columns)
- Wraps responsively
- Best for: 4-8 stats, detailed presentations

### 3. Centered Layout

- Stats centered on page
- Compact arrangement
- Best for: Hero sections, key metrics

### 4. Split Layout

- Text content on one side, stats on other
- Asymmetric design
- Best for: About pages, company info

---

## Animation System

### Counter Animation

When `animation.enabled: true`, numeric values animate from 0 to target:

```typescript
// Easing functions
const easings = {
  linear: (t: number) => t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
};

// Animation logic
const animateValue = (start: number, end: number, duration: number) => {
  const startTime = Date.now();

  const update = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easings[easing](progress);
    const current = start + (end - start) * easedProgress;

    setValue(Math.floor(current));

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  update();
};
```

### Scroll-Triggered Animation

With `trigger: onScroll`, animation starts when component enters viewport:

```typescript
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      startAnimation();
      observer.disconnect();
    }
  },
  { threshold: 0.3 }
);
```

---

## Component Behavior

### Responsive Breakpoints

| Layout       | Mobile (<640px) | Tablet (640-1024px) | Desktop (>1024px) |
| ------------ | --------------- | ------------------- | ----------------- |
| **Row**      | Vertical stack  | 2 columns           | Horizontal row    |
| **Grid**     | 1 column        | 2 columns           | As configured     |
| **Centered** | 1 column        | 2 columns           | Horizontal row    |
| **Split**    | Vertical stack  | Vertical stack      | Side-by-side      |

### Number Formatting

```typescript
function formatNumber(value: number, prefix?: string, suffix?: string): string {
  const formatted = value.toLocaleString("en-US");
  return `${prefix || ""}${formatted}${suffix || ""}`;
}

// Examples:
// 1000, prefix: "$" → "$1,000"
// 95, suffix: "%" → "95%"
// 2500, suffix: "+" → "2,500+"
```

### Theme Integration

```css
.stats-container {
  background: var(--color-stats-background);
}

.stat-value {
  color: var(--color-primary);
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
}

.stat-label {
  color: var(--color-text);
}

.stat-description {
  color: var(--color-text-secondary);
}

.stat-divider {
  border-color: var(--color-border);
}
```

---

## Example Configurations

### Example 1: Simple Row Layout

```yaml
type: stats
props:
  layout: row
  size: lg
  dividers: true
  animation:
    enabled: true
    duration: 2000
    trigger: onScroll
    easing: easeOut
  items:
    - id: "stat-1"
      value: 500
      suffix: "+"
      label: "Projects Completed"

    - id: "stat-2"
      value: 150
      label: "Happy Clients"

    - id: "stat-3"
      value: 12
      label: "Years Experience"

    - id: "stat-4"
      value: 25
      label: "Team Members"
```

### Example 2: Grid with Icons

```yaml
type: stats
props:
  title: "Our Impact"
  subtitle: "Making a difference every day"
  layout: grid
  columns: 3
  style: cards
  size: md
  animation:
    enabled: true
    trigger: onScroll
  items:
    - id: "impact-1"
      value: 1000000
      suffix: "+"
      label: "Users Served"
      description: "Across 50+ countries"
      icon:
        type: emoji
        emoji: "👥"

    - id: "impact-2"
      value: 99
      suffix: "%"
      label: "Satisfaction Rate"
      description: "Based on customer surveys"
      icon:
        type: emoji
        emoji: "⭐"

    - id: "impact-3"
      value: 24
      suffix: "/7"
      label: "Support"
      description: "Always here to help"
      icon:
        type: emoji
        emoji: "💬"
```

### Example 3: Highlighted Style with Background

```yaml
type: stats
props:
  layout: centered
  style: highlighted
  size: xl
  background:
    color: "primary"
    pattern: dots
  animation:
    enabled: true
    duration: 2500
    trigger: onLoad
    easing: easeInOut
  items:
    - id: "metric-1"
      value: 5
      suffix: "M"
      label: "Downloads"
      icon:
        type: lucide
        name: "Download"

    - id: "metric-2"
      value: 4.9
      label: "App Rating"
      icon:
        type: lucide
        name: "Star"

    - id: "metric-3"
      value: 200
      suffix: "K"
      label: "Active Users"
      icon:
        type: lucide
        name: "Users"
```

### Example 4: Split Layout with Description

```yaml
type: stats
props:
  title: "By The Numbers"
  description: "Our track record speaks for itself. We've helped hundreds of businesses achieve their digital goals."
  layout: split
  style: minimal
  size: lg
  items:
    - id: "num-1"
      value: 450
      suffix: "+"
      label: "Websites Launched"

    - id: "num-2"
      value: 95
      suffix: "%"
      label: "Client Retention"

    - id: "num-3"
      value: 8
      label: "Industry Awards"
```

---

## Component Implementation

### File Structure

```
src/components/atomic/Stats/
  ├── Stats.tsx             # Main component
  ├── StatItem.tsx          # Individual stat
  ├── StatCounter.tsx       # Animation logic
  ├── StatsLayout.tsx       # Layout variants
  └── Stats.test.tsx        # Tests
```

### Counter Hook

```typescript
function useCounter(
  end: number,
  duration: number,
  easing: string,
  trigger: string
) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (trigger === "onLoad" && !hasAnimated) {
      animateValue(0, end, duration, easing, setCount);
      setHasAnimated(true);
    }
  }, []);

  useEffect(() => {
    if (trigger === "onScroll") {
      const observer = new IntersectionObserver(/* ... */);
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, []);

  return { count, ref };
}
```

---

## Validation Rules

### Required Fields

- ✅ `items` (1-8 items recommended)
- ✅ `layout` (one of defined types)
- ✅ Each item must have `id`, `value`, `label`

### Optional Fields

- Section header
- Animation configuration
- Icons
- Background styling

### Business Rules

- If `value` is string, animation is disabled for that item
- If `layout: grid`, `columns` is required
- If `animation.enabled: false`, `trigger` and `easing` are ignored
- Default `size: md` if not specified
- Default `animation.duration: 2000` if not specified

---

## Accessibility

- ✅ Values use `<span>` with `aria-label` for screen readers
- ✅ Animated values have `aria-live="polite"`
- ✅ Semantic HTML with proper heading levels
- ✅ Sufficient color contrast for all text
- ✅ `prefers-reduced-motion` respected (disables animation)

---

## Performance Considerations

- **Animation:** RequestAnimationFrame for smooth 60fps
- **Intersection Observer:** Efficient scroll detection
- **Number Formatting:** Memoized with `useMemo`
- **Reduced Motion:** Respects user preferences

```typescript
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  // Skip animation, show final value immediately
  setCount(end);
}
```

---

## Testing Strategy

### Unit Tests

- Counter animation logic
- Number formatting with prefix/suffix
- Layout calculations
- Easing functions

### Integration Tests

- Scroll-triggered animation
- Intersection observer
- Theme color application
- Responsive layouts

### Performance Tests

- Animation frame rate
- Memory leaks in observer

---

## Migration Notes

### Custom Easing Functions

To add new easing:

1. Add to easing enum in TypeScript
2. Define function in easings object
3. Update documentation

### Large Numbers

For very large numbers (millions, billions):

- Use abbreviated suffix ("M", "B")
- Or custom formatter for internationalization

---

## Related Components

- **Icon:** For optional stat icons
- **Counter:** Reusable counter animation hook
- **Section:** Base section wrapper

---

## Changelog

### v1.0.0 (2025-12-06)

- Initial specification
- 4 layout variants (row, grid, centered, split)
- Counter animation with 3 easing options
- Scroll and load triggers
- 4 style variants (default, minimal, cards, highlighted)
- Prefix/suffix support for values
- Icon support
- Background patterns
- Responsive behavior
