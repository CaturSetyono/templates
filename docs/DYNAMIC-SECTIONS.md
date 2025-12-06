# Dynamic Section System

## Overview

Sistem web builder ini sepenuhnya **dinamis** dan **config-driven**. Semua section dapat di-render berdasarkan config yang digenerate dari model/API, dengan safe handling untuk field yang tidak ada.

## 🎯 Key Features

### 1. **Dynamic Section Registry**

- Auto-register semua komponen atomic
- Scalable - tinggal tambah section baru, otomatis tersedia
- Type-safe dengan TypeScript

### 2. **Safe Field Access**

- Tidak akan error jika field tidak ada
- Graceful degradation - render yang ada, skip yang tidak
- Smart validation - cek minimum content requirement

### 3. **Flexible Schema**

- Semua field optional (kecuali yang benar-benar critical)
- Support berbagai format data (string, object, array)
- Backward compatible

## 📦 Available Sections

### Hero & Landing

- **hero** - Main landing section dengan headline, CTA, dan image

### Content Sections

- **features** - Grid/list untuk menampilkan fitur
- **content** - Rich content dengan text, image, video
- **grid** - Flexible grid layout

### Social Proof

- **stats** - Key metrics dan statistik
- **testimonials** - Customer reviews
- **team** - Team member showcase
- **logo-cloud** - Partner logos

### Conversion

- **cta** - Call-to-action section
- **pricing** - Pricing plans
- **contact** - Contact form dan info
- **faq** - Frequently asked questions

### Media

- **gallery** - Image gallery

## 🚀 Usage

### Basic Config Structure

```yaml
pages:
  - slug: '/'
    title: 'Home'
    sections:
      - type: hero # Section type
        id: hero-1 # Optional unique ID
        props: # Section properties
          title: 'Welcome'
          description: 'Your description'
```

### Minimal Config Example

Hanya perlu field yang benar-benar penting:

```yaml
sections:
  - type: hero
    props:
      title: 'Just a Title'
      # Tidak ada buttons, image - OK!

  - type: features
    props:
      items:
        - id: f1
          title: 'Feature'
          # Tidak ada description - OK!

  - type: cta
    props:
      title: 'Call to Action'
      buttons:
        - text: 'Click'
          href: '#'
```

### Flexible Data Formats

Sistem mendukung berbagai format:

```yaml
# Logo Cloud - string array
logos:
  - "https://logo1.png"
  - "https://logo2.png"

# Atau object array
logos:
  - src: "https://logo1.png"
    alt: "Company 1"
  - src: "https://logo2.png"
    link: "https://company.com"

# Gallery - mixed format
images:
  - "https://image1.jpg"  # Simple string
  - src: "https://image2.jpg"  # With metadata
    title: "Featured"
    description: "Our work"
```

## 🛠️ Adding New Sections

### 1. Create Component

```tsx
// components/atomic/my-section.tsx
'use client';

import { safeString, safeArray, hasContent } from '@/lib/safe-access';

export function MySection({ section }) {
  const props = section?.props || {};

  const title = safeString(props.title);
  const items = safeArray(props.items);

  // Early return if no content
  if (!hasContent(title) && items.length === 0) {
    return null;
  }

  return (
    <section>
      {hasContent(title) && <h2>{title}</h2>}
      {items.map((item) => {
        // Safe access untuk item properties
        const text = safeString(item.text);
        if (!hasContent(text)) return null;

        return <div key={item.id}>{text}</div>;
      })}
    </section>
  );
}
```

### 2. Register in Component Renderer

```tsx
// components/component-renderer.tsx
import { MySection } from '@/components/atomic/my-section';

registerSection('my-section', MySection, {
  displayName: 'My Section',
  category: 'content',
  description: 'Description of section',
});
```

### 3. Add Type Definition (Optional)

```ts
// types/index.ts
export interface MySection extends BaseSection {
  type: 'my-section';
  props?: {
    title?: string;
    items?: Array<{
      id?: string;
      text?: string;
    }>;
  };
}
```

### 4. Use in Config

```yaml
sections:
  - type: my-section
    props:
      title: 'My New Section'
      items:
        - id: 1
          text: 'Item 1'
```

## 🔒 Safe Access Utilities

### `safeString(value, fallback?)`

```ts
const title = safeString(props.title, 'Default Title');
// Returns string or fallback
```

### `safeArray(value)`

```ts
const items = safeArray(props.items);
// Always returns array (empty if invalid)
```

### `safeBoolean(value, fallback?)`

```ts
const enabled = safeBoolean(props.enabled, false);
```

### `hasContent(value)`

```ts
if (hasContent(props.title)) {
  // Only render if title has content
}
```

### `safeGet(obj, path, default?)`

```ts
const email = safeGet(props, 'contact.email', '');
// Safe nested property access
```

### `filterValidItems(items, requiredFields)`

```ts
const validItems = filterValidItems(props.items, ['id', 'title']);
// Filter array items that have required fields
```

## 📋 Best Practices

### 1. Always Use Safe Access

```tsx
// ❌ BAD - will crash if props.title is undefined
<h1>{props.title}</h1>;

// ✅ GOOD - safe with fallback
const title = safeString(props.title);
{
  hasContent(title) && <h1>{title}</h1>;
}
```

### 2. Early Return Pattern

```tsx
export function MySection({ section }) {
  const props = section?.props || {};

  // Check minimum requirements
  if (!hasContent(props.title)) {
    return null;
  }

  // Continue rendering...
}
```

### 3. Validate Arrays

```tsx
const items = safeArray(props.items);

// Filter invalid items
const validItems = items.filter((item) => hasContent(item.title));

if (validItems.length === 0) {
  return null;
}
```

### 4. Conditional Rendering

```tsx
{
  hasContent(description) && <p>{description}</p>;
}

{
  buttons.length > 0 && (
    <div>
      {buttons.map((button) => {
        const text = safeString(button.text);
        if (!hasContent(text)) return null;
        return <Button key={button.id}>{text}</Button>;
      })}
    </div>
  );
}
```

## 🧪 Testing Different Configs

### Test Files Provided:

- `config-dynamic.yaml` - Full featured showcase
- `config-minimal.yaml` - Minimal fields only
- `config-*.yaml` - Various theme examples

### Testing Strategy:

1. Test dengan field lengkap
2. Test dengan field minimal
3. Test dengan field hilang/null
4. Test dengan array kosong
5. Test dengan data format berbeda

## 🔄 Integration with Model/API

### Expected Flow:

```
Model/API Generate Config
       ↓
Push to Repository
       ↓
Config Loader reads YAML
       ↓
Component Renderer + Registry
       ↓
Safe Access Utilities
       ↓
Render Sections (skip invalid)
```

### API Contract:

```yaml
# Model hanya perlu generate structure ini:
pages:
  - slug: '/'
    sections:
      - type: 'section-type'
        props:
          # Any fields the model generates
          # Missing fields = no problem!
```

## 🎨 Styling System

All sections use:

- **Tailwind CSS** - utility-first
- **CSS Variables** - for theming (`--color-primary`, etc)
- **Responsive** - mobile-first approach
- **Dark mode ready** - using Tailwind dark: variant

## 📝 Config Schema Validation

Optional - dapat ditambahkan:

- JSON Schema validation
- Runtime validation dengan Zod
- Build-time checks

Namun sistem dirancang untuk **graceful degradation** tanpa strict validation.

## 🚨 Error Handling

### Development Mode

- Console warnings untuk unknown section types
- Error logs untuk rendering issues
- Type hints dari TypeScript

### Production Mode

- Silent failures (tidak render)
- No error messages to users
- Graceful degradation

## 📊 Performance

- **Lazy loading** - sections loaded on demand
- **Memoization** - React optimization
- **Code splitting** - per-section chunks
- **Image optimization** - Next.js Image component ready

## 🔮 Future Extensions

Mudah ditambahkan:

- Animation variants per section
- A/B testing configs
- Personalization based on user data
- Real-time config updates
- Visual config editor
- Section templates library

## 📞 Support

Untuk menambah section baru atau custom behavior, ikuti pattern yang sama:

1. Safe access untuk semua fields
2. Early return jika no content
3. Register di component renderer
4. Test dengan berbagai config scenarios
