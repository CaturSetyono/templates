# 🚀 Dynamic Section System - Quick Start

## What's New?

Website ini sekarang **fully dynamic** dan **config-driven** dengan fitur:

✅ **13+ Section Types** siap pakai  
✅ **Safe Field Access** - tidak error jika field tidak ada  
✅ **Flexible Schema** - semua field optional  
✅ **Auto-Registration** - section baru langsung tersedia  
✅ **Type-Safe** dengan TypeScript  

## Available Sections

### 🎨 Hero & Landing
- `hero` - Main landing section

### 📝 Content
- `features` - Feature grid/list
- `content` - Rich text + media
- `grid` - Flexible grid layout
- `faq` - FAQ accordion

### 📊 Social Proof
- `stats` - Metrics showcase
- `testimonials` - Customer reviews
- `team` - Team members
- `logo-cloud` - Partner logos
- `gallery` - Image gallery

### 💰 Conversion
- `cta` - Call to action
- `pricing` - Pricing plans
- `contact` - Contact form

## Quick Example

```yaml
# config.yaml
pages:
  - slug: "/"
    sections:
      # Minimal hero - hanya title!
      - type: hero
        props:
          title: "Welcome"
      
      # Features dengan beberapa items
      - type: features
        props:
          title: "Our Features"
          items:
            - id: f1
              title: "Fast"
            - id: f2
              title: "Secure"
              description: "Bank-level security"
      
      # CTA sederhana
      - type: cta
        props:
          title: "Get Started Today"
          buttons:
            - text: "Sign Up"
              href: "/signup"
```

## Testing Configs

Try these configs:
```bash
# Full featured demo
config-dynamic.yaml

# Minimal fields only
config-minimal.yaml

# Existing themes
config-techflow.yaml
config-fitlife.yaml
```

## Dev Mode Features

### Check Available Sections
```
GET http://localhost:3000/api/registry
```

### Validate Config
```
POST http://localhost:3000/api/validate
{
  "sections": [...]
}
```

## Adding New Sections

1. **Create component** in `components/atomic/`
2. **Use safe access** utilities
3. **Register** in `component-renderer.tsx`
4. **Done!** Auto-available

```tsx
// Example
import { safeString, hasContent } from '@/lib/safe-access';

export function MySection({ section }) {
  const title = safeString(section?.props?.title);
  
  if (!hasContent(title)) return null;
  
  return <div>{title}</div>;
}
```

## Key Files

- `lib/section-registry.ts` - Section registration
- `lib/safe-access.ts` - Safe field utilities
- `lib/dev-utils.ts` - Debug tools
- `components/component-renderer.tsx` - Main renderer
- `components/atomic/*` - All section components

## Documentation

📖 **Full Docs:** `docs/DYNAMIC-SECTIONS.md`

## Safe Access Utils

```tsx
import { 
  safeString,   // Get string safely
  safeArray,    // Always returns array
  safeBoolean,  // Get boolean
  hasContent,   // Check if has content
  safeGet       // Nested property access
} from '@/lib/safe-access';

// Usage
const title = safeString(props.title, 'Default');
const items = safeArray(props.items);
const enabled = safeBoolean(props.enabled, false);

if (hasContent(title)) {
  // Render only if has content
}
```

## Error Handling

✅ Field tidak ada → Skip rendering  
✅ Array kosong → Skip section  
✅ Invalid data → Safe fallback  
✅ Unknown section type → Warning (dev only)  

**No crashes, no errors to users!**

## Next Steps

1. Generate config dari model/API
2. Push ke repository
3. Website auto-update
4. Render sections yang valid
5. Skip yang invalid

Simple! 🎉
