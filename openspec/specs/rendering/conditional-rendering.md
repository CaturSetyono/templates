# Conditional Rendering Framework v2.0

**Document Type:** Technical Specification  
**Version:** 2.0.0  
**Status:** Proposed  
**Last Updated:** 2025-12-06

---

## Executive Summary

This document defines the **Conditional Rendering Framework** for the Dynamic Website Builder v2.0. All components follow an **optional-first philosophy** where every field (except critical identifiers) is optional and components gracefully degrade when data is missing.

---

## Core Principles

### 1. Optional by Default

```typescript
// ❌ Old Pattern (v1.0): Required fields
interface HeroProps {
  headline: string; // Required - breaks if missing
  cta: CTAButton; // Required - breaks if missing
}

// ✅ New Pattern (v2.0): Optional fields
interface HeroProps {
  headline?: string; // Optional - renders nothing if missing
  cta?: CTAButton; // Optional - renders nothing if missing
}
```

### 2. Graceful Degradation

Components should work with **any subset of fields**, from fully populated to completely empty:

```typescript
// All valid configurations:
{ type: 'hero', props: { headline: "Full Hero", description: "...", cta: {...} } }
{ type: 'hero', props: { headline: "Minimal Hero" } }
{ type: 'hero', props: {} }  // Renders nothing but doesn't crash
{ type: 'hero' }  // No props at all
```

### 3. No Render if No Content

```typescript
// Don't render empty containers
{
  title && <h2>{title}</h2>;
} // ✅ Only renders if title exists
<h2>{title || ""}</h2>; // ❌ Renders empty h2 tag

// Don't render empty sections
if (!items || items.length === 0) {
  return null; // ✅ Component returns nothing
}
```

### 4. Sensible Defaults

Use defaults for non-content values only:

```typescript
// ✅ Default for layout/structure
const columns = props?.columns ?? 3;
const gap = props?.gap ?? "md";

// ❌ Don't default content
const headline = props?.headline ?? "Welcome"; // Never do this!
```

---

## Safe Access Patterns

### Pattern 1: Optional Chaining

```typescript
// Accessing nested optional properties
const logoUrl = config?.navbar?.logo?.image;
const ctaText = section?.props?.cta?.primary?.text;

// With array access
const firstItem = items?.[0];
const secondLink = navbar?.links?.[1]?.href;
```

### Pattern 2: Logical AND Rendering

```typescript
// Single condition
{
  title && <h2>{title}</h2>;
}

// Multiple conditions
{
  title && description && (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

// Nested conditions
{
  config?.newsletter?.enabled && <NewsletterForm {...config.newsletter} />;
}
```

### Pattern 3: Nullish Coalescing

```typescript
// Provide defaults for non-content values
const columns = props?.columns ?? 3;
const layout = config?.layout ?? "grid";
const placeholder = search?.placeholder ?? "Search...";

// With fallback chain
const logoText =
  config?.navbar?.logo?.text ?? config?.metadata?.siteName ?? "Site";
```

### Pattern 4: Early Return

```typescript
export function Component({ props }: ComponentProps) {
  // Check critical requirements
  if (!props || !props.items || props.items.length === 0) {
    return null;
  }

  // Rest of component logic
  return <div>{/* ... */}</div>;
}
```

### Pattern 5: Safe Array Operations

```typescript
// Check array exists and has length
{items && items.length > 0 && (
  <ul>
    {items.map(item => <li key={item.id}>{item.text}</li>)}
  </ul>
)}

// Safe map with optional chaining
{items?.map(item => (
  <div key={item.id}>
    {item.title && <h3>{item.title}</h3>}
  </div>
))}

// Filter then check length
const visibleItems = items?.filter(item => !item.hidden);
{visibleItems && visibleItems.length > 0 && (
  <div>{visibleItems.map(...)}</div>
)}
```

---

## Component Structure Template

### Base Component Template

```typescript
import React from "react";
import { cn } from "@/lib/utils";

// TypeScript Interface (all optional except type)
interface MyComponentSection extends BaseSection {
  type: "mycomponent"; // Only required field
  props?: {
    title?: string;
    description?: string;
    items?: Array<{
      id: string;
      // ... all optional
    }>;
  };
}

// Component Implementation
export function MyComponent({ section }: { section: MyComponentSection }) {
  // 1. Extract props with safe access
  const props = section?.props;

  // 2. Early return if no renderable content
  if (!props || (!props.title && !props.items)) {
    return null;
  }

  // 3. Defaults for structure (not content)
  const alignment = props.alignment ?? "center";

  // 4. Render with conditional blocks
  return (
    <section className={cn("my-component", `align-${alignment}`)}>
      {/* Only render if exists */}
      {props.title && <h2 className="component-title">{props.title}</h2>}

      {props.description && (
        <p className="component-description">{props.description}</p>
      )}

      {/* Safe array rendering */}
      {props.items && props.items.length > 0 && (
        <div className="component-items">
          {props.items.map((item) => (
            <div key={item.id}>
              {item.title && <h3>{item.title}</h3>}
              {item.content && <p>{item.content}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
```

---

## Utility Functions

### Safe Access Helpers

```typescript
// src/lib/safe-access.ts

/**
 * Safely get nested property
 */
export function get<T>(
  obj: any,
  path: string,
  defaultValue?: T
): T | undefined {
  const keys = path.split(".");
  let result = obj;

  for (const key of keys) {
    if (result?.[key] === undefined) {
      return defaultValue;
    }
    result = result[key];
  }

  return result ?? defaultValue;
}

// Usage:
const ctaText = get(section, "props.cta.primary.text", "Click Here");

/**
 * Check if value is empty (null, undefined, empty string, empty array)
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

// Usage:
if (isEmpty(props.items)) return null;

/**
 * Safe array map with automatic null filtering
 */
export function safeMap<T, R>(
  array: T[] | undefined | null,
  fn: (item: T, index: number) => R | null
): R[] {
  return array?.map(fn).filter(Boolean) ?? [];
}

// Usage:
const renderedItems = safeMap(props.items, (item) =>
  item.visible ? <Item key={item.id} {...item} /> : null
);
```

### Validation Helpers

```typescript
// src/lib/validators/section-validator.ts

/**
 * Validate section has minimum required fields
 */
export function validateSection(section: any): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Only check critical fields
  if (!section || typeof section !== "object") {
    errors.push("Section must be an object");
    return { valid: false, errors };
  }

  if (!section.type) {
    errors.push('Section must have a "type" field');
  }

  // All other fields are optional
  // Only warn for common mistakes
  if (section.props === null) {
    console.warn(
      `Section ${section.type} has null props - will render nothing`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate and clean configuration
 */
export function cleanConfig(config: any): any {
  if (!config) return {};

  // Remove null values but keep undefined (they won't serialize anyway)
  const clean = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(clean).filter((item) => item !== null);
    }

    if (typeof obj === "object" && obj !== null) {
      return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== null) {
          acc[key] = clean(value);
        }
        return acc;
      }, {} as any);
    }

    return obj;
  };

  return clean(config);
}
```

---

## Testing Strategies

### Test Cases for Optional Fields

```typescript
describe("MyComponent Optional Fields", () => {
  it("renders with full props", () => {
    const section = {
      type: "mycomponent",
      props: {
        title: "Title",
        description: "Description",
        items: [{ id: "1", text: "Item 1" }],
      },
    };

    render(<MyComponent section={section} />);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("renders with minimal props", () => {
    const section = {
      type: "mycomponent",
      props: { title: "Title Only" },
    };

    render(<MyComponent section={section} />);
    expect(screen.getByText("Title Only")).toBeInTheDocument();
  });

  it("returns null with empty props", () => {
    const section = {
      type: "mycomponent",
      props: {},
    };

    const { container } = render(<MyComponent section={section} />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null with no props", () => {
    const section = { type: "mycomponent" };

    const { container } = render(<MyComponent section={section} />);
    expect(container.firstChild).toBeNull();
  });

  it("handles missing nested properties", () => {
    const section = {
      type: "mycomponent",
      props: {
        items: [{ id: "1" }], // Missing optional fields
      },
    };

    expect(() => render(<MyComponent section={section} />)).not.toThrow();
  });
});
```

---

## TypeScript Best Practices

### Interface Design

```typescript
// ✅ Good: All optional except critical IDs
interface Feature {
  id: string; // Required for React keys
  title?: string;
  description?: string;
  icon?: IconConfig;
}

// ✅ Good: Nested optional structures
interface OptionalConfig {
  navbar?: {
    logo?: {
      image?: string;
      text?: string;
    };
  };
}

// ❌ Bad: Required nested objects
interface BadConfig {
  navbar: {
    // Required
    logo: {
      // Required
      image?: string; // Then optional inside
    };
  };
}
```

### Type Guards

```typescript
// Check if component has renderable content
function hasContent(
  props: ComponentProps | undefined
): props is ComponentProps {
  return !!(props && (props.title || props.description || props.items?.length));
}

// Usage:
if (!hasContent(section.props)) {
  return null;
}

// Now TypeScript knows props is defined
const title = section.props.title; // No error
```

---

## Common Pitfalls & Solutions

### Pitfall 1: Empty Element Rendering

```typescript
// ❌ Bad: Renders empty div
<div className="container">{props?.title && <h2>{props.title}</h2>}</div>;

// ✅ Good: Only renders if title exists
{
  props?.title && (
    <div className="container">
      <h2>{props.title}</h2>
    </div>
  );
}
```

### Pitfall 2: Using || Instead of ??

```typescript
// ❌ Bad: 0 or false are valid values
const count = props.count || 10; // If count is 0, returns 10

// ✅ Good: Only use default if null/undefined
const count = props.count ?? 10; // If count is 0, returns 0
```

### Pitfall 3: Not Checking Array Length

```typescript
// ❌ Bad: Renders empty ul
<ul>
  {items?.map((item) => (
    <li key={item.id}>{item.text}</li>
  ))}
</ul>;

// ✅ Good: Only renders if items exist
{
  items && items.length > 0 && (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}
```

### Pitfall 4: Defaulting Content

```typescript
// ❌ Bad: Never provide default content
const headline = props.headline || "Default Headline";

// ✅ Good: Return null if no content
if (!props.headline) return null;
const headline = props.headline;
```

---

## Linting Rules

### ESLint Configuration

```json
{
  "rules": {
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "no-unnecessary-condition": "warn"
  }
}
```

---

## Migration Checklist

### Converting v1.0 Component to v2.0

- [ ] Make all non-critical fields optional in TypeScript interface
- [ ] Add early return if no renderable content
- [ ] Replace all direct property access with optional chaining
- [ ] Replace all `||` with `??` for defaults
- [ ] Add `&& length > 0` checks before array `.map()`
- [ ] Remove default content values (keep only structural defaults)
- [ ] Add null checks before rendering subsections
- [ ] Test with empty props `{}`
- [ ] Test with no props at all
- [ ] Update documentation with optional field examples

---

## Summary

### Dos

✅ Use optional chaining (`?.`) for nested access  
✅ Use nullish coalescing (`??`) for defaults  
✅ Check array length before mapping  
✅ Return `null` if no renderable content  
✅ Make everything optional except IDs  
✅ Test with partial configs

### Don'ts

❌ Don't provide default content text  
❌ Don't render empty containers  
❌ Don't use `!` non-null assertion  
❌ Don't assume nested objects exist  
❌ Don't use `||` for defaults (use `??`)  
❌ Don't make fields required unless critical

---

## Resources

- TypeScript Handbook: Optional Properties
- React Docs: Conditional Rendering
- MDN: Optional Chaining (?.)
- MDN: Nullish Coalescing (??)

---

**Version:** 2.0.0  
**Last Updated:** 2025-12-06  
**Maintained by:** Template Architect Team
