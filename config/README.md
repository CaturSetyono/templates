# Config API Structure Documentation

## Overview

This directory contains configuration files that define the complete structure and content for the web builder application. Each config file follows the same YAML structure but contains different content themes, making it easy to generate new websites for different industries.

## Available Config Files

| File | Theme | Description |
|------|-------|-------------|
| `config.yaml` | **FitLife Pro** | Fitness & Wellness platform |
| `config-ecommerce.yaml` | **ShopHub** | E-commerce & Online Shopping |
| `config-restaurant.yaml` | **TasteBite** | Food Delivery & Restaurant |
| `config-travel.yaml` | **WanderLux** | Travel & Tourism |
| `config-realestate.yaml` | **HomeFinder** | Real Estate & Property |
| `config-saas.yaml` | **CloudFlow** | SaaS & Software Platform |
| `config.example.json` | **CloudFlow** | Example JSON format (same as config-saas.yaml) |

## File Format Support

The application supports **both YAML and JSON** config files with automatic fallback:

### Priority Order
1. **`config.yaml`** - Checked first (YAML format)
2. **`config.json`** - Fallback if YAML not found (JSON format)

### Format Selection
- If both files exist, **YAML takes precedence**
- You can use either format based on your preference
- Both formats support the exact same structure

### Converting Between Formats

**YAML to JSON:**
```bash
node -e "const yaml = require('js-yaml'); const fs = require('fs'); const config = yaml.load(fs.readFileSync('config/config.yaml', 'utf8')); fs.writeFileSync('config/config.json', JSON.stringify(config, null, 2));"
```

**JSON to YAML:**
```bash
node -e "const yaml = require('js-yaml'); const fs = require('fs'); const config = JSON.parse(fs.readFileSync('config/config.json', 'utf8')); fs.writeFileSync('config/config.yaml', yaml.dump(config));"
```

## Configuration Structure

### 1. Site-Level Configuration

```yaml
site:
  name: string                    # Brand name
  description: string             # Site description
  theme:
    primary: string               # Primary color (hex)
    secondary: string             # Secondary color (hex)
    accent: string                # Accent color (hex)
  navigation:
    logo:
      text: string                # Logo text
    links: array                  # Navigation menu items
      - text: string              # Link text
        href: string              # Link URL
        children: array           # Optional dropdown items
    cta:
      text: string                # CTA button text
      href: string                # CTA button URL
  footer:
    logo:
      text: string                # Footer logo text
    tagline: string               # Footer tagline
    copyright: string             # Copyright text
    sections: array               # Footer link sections
      - title: string             # Section title
        links: array              # Section links
    social: array                 # Social media links
      - platform: string          # Platform name
        url: string               # Profile URL
```

### 2. Page Configuration

Each page is defined in the `pages` array with the following structure:

```yaml
pages:
  - slug: string                  # URL path (e.g., '/', '/blog')
    title: string                 # Page title
    description: string           # Page meta description
    sections: array               # Page sections (for home page)
    hero: object                  # Hero section (for other pages)
    # Additional page-specific fields
```

### 3. Section Types

#### Hero Section
```yaml
- type: 'hero'
  id: string
  props:
    layout: string                # Layout type (e.g., 'centered')
    title: string                 # Main heading
    subtitle: string              # Subheading
    buttons: array                # CTA buttons
      - text: string
        href: string
        variant: string           # 'primary' or 'outline'
    trustIndicators: array        # Trust badges
    background:
      gradient: string            # Tailwind gradient classes
    image: string                 # Hero image URL
```

#### Features Section
```yaml
- type: 'features'
  id: string
  props:
    title: string                 # Section title
    subtitle: string              # Section subtitle
    columns: number               # Grid columns (2 or 3)
    items: array                  # Feature items
      - id: string
        title: string
        description: string
        icon:
          value: string           # Emoji or icon
```

#### Stats Section
```yaml
- type: 'stats'
  id: string
  props:
    background: string            # Background color class
    items: array                  # Stat items
      - id: string
        value: string             # Stat value
        label: string             # Stat label
```

#### Testimonials Section
```yaml
- type: 'testimonials'
  id: string
  props:
    title: string                 # Section title
    subtitle: string              # Section subtitle
    trustBadge: string            # Trust indicator text
    items: array                  # Testimonial items
      - id: string
        content: string           # Testimonial text
        rating: number            # 1-5 rating
        author:
          name: string
          role: string
```

### 4. Blog Page Structure

```yaml
- slug: '/blog'
  title: string
  description: string
  hero:
    title: string
    subtitle: string
  categories: array               # Category filter options
  posts: array                    # Blog post items
    - id: number
      title: string
      excerpt: string
      category: string
      date: string
      image: string               # Post image URL
      readTime: string
  newsletter:
    title: string
    description: string
    placeholder: string
    buttonText: string
```

### 5. About Page Structure

```yaml
- slug: '/about'
  title: string
  description: string
  hero:
    title: string
    subtitle: string
  stats: array                    # Quick stats
    - value: string
      label: string
  mission:
    title: string
    description: string
    icon: string
    gradient: string
  vision:
    title: string
    description: string
    icon: string
    gradient: string
  values:
    title: string
    subtitle: string
    items: array
      - title: string
        description: string
        icon: string
  team:
    title: string
    subtitle: string
    members: array
      - name: string
        role: string
        image: string             # Team member photo URL
```

### 6. Docs Page Structure

```yaml
- slug: '/docs'
  title: string
  description: string
  hero:
    title: string
    subtitle: string
  guides: array                   # Documentation guides
    - title: string
      description: string
      icon: string
      topics: array               # Guide topics
```

### 7. Status/Tracking Page Structure

```yaml
- slug: '/status'
  title: string
  description: string
  hero:
    title: string
    subtitle: string
  searchPlaceholder: string
  searchButton: string
  recentTitle: string
  statuses: array                 # Status items
    - orderId: string
      customer: string
      location: string
      status: string
      estimatedArrival: string
      progress: number            # 0-100
```

### 8. API/Calculator Page Structure

```yaml
- slug: '/api'
  title: string
  description: string
  hero:
    title: string
    subtitle: string
  comingSoon:
    title: string
    description: string
    icon: string
    buttonText: string
    buttonHref: string
```

## How to Use This Config

### For Manual Content Updates

1. Choose the appropriate config file for your industry
2. Choose your preferred format (YAML or JSON)
3. Edit the values to match your brand and content
4. Update colors in the `theme` section
5. Modify text content throughout the file
6. Replace image URLs with your own assets
7. Save as `config.yaml` or `config.json` and the application will automatically use it

### For AI-Generated Configs

When generating a new config file with AI, provide this structure and specify:

1. **Industry/Theme**: What type of business (e.g., "healthcare", "education", "finance")
2. **Brand Name**: The company/product name
3. **Color Scheme**: Primary and secondary colors (or let AI choose)
4. **Key Features**: Main features or services to highlight
5. **Target Audience**: Who the website is for

**Example Prompt for YAML:**
```
Create a config.yaml for a healthcare telemedicine platform called "HealthConnect" 
with a blue and green color scheme, targeting patients seeking remote medical consultations.
```

**Example Prompt for JSON:**
```
Create a config.json for a healthcare telemedicine platform called "HealthConnect" 
with a blue and green color scheme, targeting patients seeking remote medical consultations.
Use JSON format.
```

The AI will generate a complete config file following this exact structure with appropriate content.

## Field Types Reference

| Type | Description | Example |
|------|-------------|---------|
| `string` | Text value | `"Welcome to our site"` |
| `number` | Numeric value | `3`, `100`, `4.5` |
| `array` | List of items | `['item1', 'item2']` |
| `object` | Nested structure | `{ key: value }` |
| `boolean` | True/false | `true`, `false` |

## Color Format

Colors should be specified in hex format:
- `#rgb` or `#rrggbb`
- Example: `#3b82f6` (blue), `#ef4444` (red)

You can also reference Tailwind CSS colors:
- `#3b82f6` = Blue 500
- `#ef4444` = Red 500
- `#10b981` = Emerald 500

## Image URLs

All image URLs should be:
- **Absolute URLs** (starting with `http://` or `https://`)
- **High quality** (recommended minimum 800px width)
- **Optimized** for web (use services like Unsplash with `auto=format&fit=crop&q=80`)

Example: `https://images.unsplash.com/photo-123456?auto=format&fit=crop&q=80&w=1000`

## Best Practices

### Content Writing
- **Titles**: Keep under 60 characters for SEO
- **Descriptions**: 120-160 characters for meta descriptions
- **Headings**: Clear, action-oriented, benefit-focused
- **CTAs**: Use action verbs (Start, Get, Join, Discover)

### Structure
- **Consistency**: All pages should follow the same pattern
- **IDs**: Use unique IDs for all items (f1, f2, s1, s2, etc.)
- **Sections**: Maintain the same section order across configs
- **Navigation**: Keep navigation structure consistent

### Images
- Use consistent aspect ratios within each section
- Prefer landscape orientation for hero images (16:9)
- Use square images for team members (1:1)
- Optimize images for web performance

### Colors
- Ensure sufficient contrast for accessibility
- Use primary color for main CTAs
- Use secondary color for accents and highlights
- Keep accent color for borders and subtle elements

## Validation Checklist

Before using a config file, verify:

- [ ] All required fields are present
- [ ] Color codes are valid hex values
- [ ] Image URLs are accessible
- [ ] All IDs are unique within their sections
- [ ] Navigation links point to valid sections/pages
- [ ] Text content is free of typos
- [ ] Brand name is consistent throughout
- [ ] Social media URLs are correct

## Common Customization Scenarios

### Changing Brand Colors
```yaml
theme:
  primary: '#YOUR_PRIMARY_COLOR'
  secondary: '#YOUR_SECONDARY_COLOR'
  accent: '#1e293b'
```

### Adding a New Feature
```yaml
items:
  - id: 'f7'  # Increment ID
    title: 'New Feature'
    description: 'Description of the new feature'
    icon:
      value: '🎯'
```

### Updating Navigation
```yaml
links:
  - text: 'New Page'
    href: '/new-page'
```

### Changing Hero CTA
```yaml
buttons:
  - text: 'Your CTA Text'
    href: '/your-link'
    variant: 'primary'
```

## Troubleshooting

### Config not loading?
- Check YAML syntax (indentation must be consistent)
- Verify file is saved as `.yaml` extension
- Ensure no special characters in string values

### Colors not applying?
- Verify hex color format (`#rrggbb`)
- Check that colors are in the `theme` section
- Ensure no typos in color codes

### Images not showing?
- Verify URLs are absolute (start with `https://`)
- Check that images are publicly accessible
- Ensure URLs don't have spaces or special characters

### Navigation not working?
- Verify `href` values match section IDs (with `#` prefix)
- Check that page slugs are correct
- Ensure links array is properly formatted

## Support

For questions or issues with config files:
1. Check this documentation first
2. Verify YAML syntax using an online validator
3. Compare with working example configs
4. Review the application logs for error messages

---

**Last Updated**: December 2024  
**Version**: 1.0.0
