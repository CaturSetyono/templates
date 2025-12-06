# Integration Guide - Model/API → Website

## Overview

Panduan ini menjelaskan cara mengintegrasikan sistem dynamic sections dengan model/API yang akan generate config.

## 🔄 Integration Flow

```
┌─────────────────┐
│   Model/LLM     │
│   (External)    │
└────────┬────────┘
         │ Generates
         ↓
┌─────────────────┐
│   config.yaml   │
│   Structure     │
└────────┬────────┘
         │ Push to Repo
         ↓
┌─────────────────┐
│   Repository    │
│   (This Repo)   │
└────────┬────────┘
         │ Auto-deploy
         ↓
┌─────────────────┐
│   Website       │
│   Renders       │
└─────────────────┘
```

## 📋 Config Structure Requirements

### Minimal Structure

Model hanya perlu generate structure ini:

```yaml
site:
  name: 'Site Name' # Optional
  description: 'Description' # Optional
  theme: # Optional
    primary: '#color'
    secondary: '#color'

pages:
  - slug: '/'
    title: 'Page Title' # Optional
    sections:
      - type: 'section-type' # Required!
        id: 'unique-id' # Optional
        props: # Required (can be empty {})
          # Any properties...
```

### ✅ Valid Examples

#### Minimal Valid Config

```yaml
pages:
  - slug: '/'
    sections:
      - type: hero
        props:
          title: 'Welcome'
```

#### Rich Config

```yaml
pages:
  - slug: '/'
    sections:
      - type: hero
        id: hero-main
        props:
          title: 'Welcome to Our Site'
          description: 'We build amazing things'
          buttons:
            - text: 'Get Started'
              href: '/signup'
            - text: 'Learn More'
              href: '/about'
          image: 'https://example.com/hero.jpg'
          layout: 'split'
```

## 🎯 Section Type Reference

### Available Types

| Type           | Category | Required Props                       | Optional Props                               |
| -------------- | -------- | ------------------------------------ | -------------------------------------------- |
| `hero`         | Landing  | `title`                              | `description`, `buttons`, `image`, `layout`  |
| `features`     | Content  | `items[].title`                      | `title`, `description`, `columns`            |
| `stats`        | Proof    | `items[].value`, `items[].label`     | `title`, `layout`                            |
| `testimonials` | Proof    | `items[].content`                    | `title`, `items[].author`                    |
| `team`         | Proof    | `members[].name`                     | `title`, `members[].role`, `members[].image` |
| `logo-cloud`   | Proof    | `logos[]`                            | `title`                                      |
| `gallery`      | Media    | `images[]`                           | `title`, `columns`, `layout`                 |
| `cta`          | Convert  | `title`, `buttons[]`                 | `description`, `background`                  |
| `pricing`      | Convert  | `plans[].name`, `plans[].price`      | `title`, `plans[].features`                  |
| `contact`      | Convert  | `email` or `showForm`                | `phone`, `address`                           |
| `faq`          | Content  | `items[].question`, `items[].answer` | `title`                                      |
| `content`      | Content  | `title` or `content`                 | `image`, `video`, `layout`                   |
| `grid`         | Layout   | `items[]`                            | `title`, `columns`                           |

## 🤖 Model Guidelines

### What Model Should Generate

1. **Choose section types** based on content context:
   - Landing page? → `hero`, `features`, `cta`
   - About page? → `content`, `team`, `stats`
   - Product page? → `hero`, `features`, `pricing`, `testimonials`

2. **Fill only available data**:
   - Don't generate fake data
   - Skip optional fields if no data
   - Use flexible formats (string or object)

3. **Keep it simple**:
   - Start with minimal props
   - Add more only if data available
   - Website handles missing fields gracefully

### Example Model Prompts

#### For E-commerce Site

```
Generate config.yaml for an e-commerce site selling shoes.
Use sections: hero, features (product benefits), gallery (product images),
testimonials (customer reviews), pricing (product plans), cta (buy now).
Only include data that makes sense for the context.
```

#### For Portfolio Site

```
Generate config.yaml for a designer portfolio.
Use sections: hero (introduction), gallery (projects),
content (about me), testimonials (client feedback), contact.
Keep it minimal and elegant.
```

## 📝 Data Format Guidelines

### Flexible Array Formats

Model dapat generate dalam berbagai format:

```yaml
# Simple string array
logos:
  - "https://logo1.png"
  - "https://logo2.png"

# Object array
logos:
  - src: "https://logo1.png"
    alt: "Company 1"
  - src: "https://logo2.png"
    alt: "Company 2"

# Mixed (both work!)
logos:
  - "https://logo1.png"
  - src: "https://logo2.png"
    alt: "Company 2"
```

### Optional vs Required Fields

```yaml
# ✅ Minimal but valid
- type: hero
  props:
    title: 'Welcome'

# ✅ Rich and detailed
- type: hero
  props:
    title: 'Welcome'
    description: 'Full description'
    buttons:
      - text: 'CTA'
        href: '/signup'
    image: 'hero.jpg'
    layout: 'split'

# ❌ Invalid - no props
- type: hero

# ❌ Invalid - no type
- props:
    title: 'Welcome'
```

## 🔧 API Integration

### Option 1: Direct Push

Model generates YAML → Push to repo → Auto-deploy

```bash
# Model output
cat > config/config.yaml << EOF
site:
  name: "Generated Site"
pages:
  - slug: "/"
    sections:
      - type: hero
        props:
          title: "Auto-generated"
EOF

# Push to repo
git add config/config.yaml
git commit -m "Update config"
git push
```

### Option 2: API Endpoint

Create endpoint for model to POST config:

```typescript
// app/api/update-config/route.ts
export async function POST(request: Request) {
  const config = await request.json();

  // Validate
  const validation = validatePageConfig(config.pages[0].sections);

  if (!validation.valid) {
    return Response.json({ error: 'Invalid config' }, { status: 400 });
  }

  // Write to file
  await fs.writeFile('config/config.yaml', yaml.dump(config));

  return Response.json({ success: true });
}
```

### Option 3: Database-Driven

Store config in database → Load dynamically:

```typescript
// lib/config-loader.ts
export async function loadConfig() {
  // Try database first
  const dbConfig = await db.config.findFirst();
  if (dbConfig) return dbConfig;

  // Fallback to file
  return loadYamlConfig();
}
```

## ✅ Validation Tools

### Before Push - Validate

```bash
# Run validation script
node scripts/validate-configs.js

# Or use API
curl -X POST http://localhost:3000/api/validate \
  -H "Content-Type: application/json" \
  -d @config/config.yaml
```

### After Deploy - Check

```bash
# Get available sections
curl http://localhost:3000/api/registry

# Check site is live
curl http://localhost:3000
```

## 🚨 Error Handling

### Model-side

```python
# Example: Python model
def generate_config(context):
    config = {
        "pages": [{
            "slug": "/",
            "sections": []
        }]
    }

    # Add hero if title available
    if context.get("title"):
        config["pages"][0]["sections"].append({
            "type": "hero",
            "props": {
                "title": context["title"],
                # Only add if available
                **({"description": context["description"]}
                   if context.get("description") else {})
            }
        })

    return config
```

### Website-side

Website automatically handles:

- ✅ Missing fields → Skip
- ✅ Unknown section types → Warning (dev), skip (prod)
- ✅ Empty arrays → Skip section
- ✅ Invalid data → Use fallbacks

## 📊 Monitoring

### Log Analysis

```typescript
// Check what sections are being used
const usage = analyzeConfigUsage(sections);
console.log('Most used sections:', usage.sectionTypes);
console.log('Most used props:', usage.commonProps);
```

### Health Check

```typescript
// Generate health report
const report = createConfigHealthReport(sections);
console.log(report);
// → Shows validation issues, usage stats
```

## 🎓 Best Practices

### For Model Development

1. **Start simple**: Test with minimal configs first
2. **Validate output**: Run validation before push
3. **Handle missing data**: Don't generate fake data
4. **Use context**: Choose sections based on content type
5. **Test edge cases**: Empty arrays, missing props, etc.

### For Website Maintenance

1. **Monitor logs**: Check for unknown section types
2. **Update registry**: Add new sections as needed
3. **Version configs**: Track config changes
4. **Test thoroughly**: Use different config scenarios

## 🔗 Example Workflows

### Workflow 1: Manual Generation

```bash
# 1. Generate config with model
python generate_config.py --context "e-commerce" > config/config.yaml

# 2. Validate
node scripts/validate-configs.js

# 3. Test locally
npm run dev

# 4. Deploy
git push
```

### Workflow 2: Automated Pipeline

```yaml
# .github/workflows/update-config.yml
name: Update Config
on:
  repository_dispatch:
    types: [update-config]

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Write new config
        run: echo "${{ github.event.client_payload.config }}" > config/config.yaml
      - name: Validate
        run: node scripts/validate-configs.js
      - name: Commit
        run: |
          git add config/config.yaml
          git commit -m "Update config [skip ci]"
          git push
```

### Workflow 3: Real-time Updates

```typescript
// Model triggers webhook
await fetch('https://site.com/api/update-config', {
  method: 'POST',
  body: JSON.stringify(generatedConfig),
});

// Website updates immediately (no git needed)
```

## 📞 Support & Debug

### Common Issues

**Issue**: Section not rendering

- Check section type is valid: `/api/registry`
- Verify props structure
- Check browser console (dev mode)

**Issue**: Missing content

- Verify field names match documentation
- Check data types (string vs object)
- Use dev tools to inspect props

**Issue**: Styling not applied

- Check theme colors in site config
- Verify Tailwind classes
- Check CSS variables

### Debug Tools

```typescript
// In browser console (dev mode)
import { debugSection } from '@/lib/dev-utils';
debugSection(section); // Detailed section info

import { logRegistryInfo } from '@/lib/dev-utils';
logRegistryInfo(); // Show all available sections
```

## 🎉 Success Checklist

- [ ] Model generates valid YAML structure
- [ ] Config passes validation
- [ ] Website renders without errors
- [ ] All sections display correctly
- [ ] Missing fields handled gracefully
- [ ] Deployment pipeline works
- [ ] Monitoring/logging in place

---

**Ready to integrate!** 🚀

For more details, see:

- `docs/DYNAMIC-SECTIONS.md` - Complete documentation
- `DYNAMIC-SECTIONS-QUICKSTART.md` - Quick reference
