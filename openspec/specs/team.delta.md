# Spec Delta: Team Component

**Component Type:** `team`  
**Category:** Atomic Component  
**Version:** 1.0.0  
**Status:** Proposed

---

## Overview

The Team component showcases team members, leadership, or staff with photos, roles, bios, and social media links. It supports multiple layouts and card styles for presenting people in an organized, professional manner.

---

## Configuration Schema

### TypeScript Interface

```typescript
interface TeamSection extends BaseSection {
  type: "team";
  props: {
    // Section Header
    title?: string;
    subtitle?: string;
    description?: string;

    // Layout
    layout: "grid" | "carousel" | "list";
    columns?: 2 | 3 | 4; // For grid layout

    // Team Members
    members: Array<{
      id: string;
      name: string;
      role: string;
      bio?: string;
      image: {
        url: string;
        alt: string;
      };
      social?: {
        linkedin?: string;
        twitter?: string;
        github?: string;
        email?: string;
        website?: string;
        [key: string]: string | undefined;
      };
      highlighted?: boolean; // For leadership/key members
    }>;

    // Card Style
    cardStyle?: "standard" | "minimal" | "hover-reveal" | "split";
    imageShape?: "circle" | "square" | "rounded";

    // Display Options
    showBio?: boolean;
    showSocial?: boolean;
    bioLength?: "short" | "medium" | "full"; // Character limits

    // Spacing
    gap?: "sm" | "md" | "lg";
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
      "const": "team"
    },
    "props": {
      "type": "object",
      "required": ["members", "layout"],
      "properties": {
        "title": { "type": "string", "maxLength": 100 },
        "subtitle": { "type": "string", "maxLength": 150 },
        "description": { "type": "string", "maxLength": 300 },
        "layout": {
          "type": "string",
          "enum": ["grid", "carousel", "list"]
        },
        "columns": {
          "type": "number",
          "enum": [2, 3, 4]
        },
        "members": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "object",
            "required": ["id", "name", "role", "image"],
            "properties": {
              "id": { "type": "string" },
              "name": { "type": "string", "maxLength": 100 },
              "role": { "type": "string", "maxLength": 100 },
              "bio": { "type": "string", "maxLength": 500 },
              "image": {
                "type": "object",
                "required": ["url", "alt"],
                "properties": {
                  "url": { "type": "string", "format": "uri" },
                  "alt": { "type": "string" }
                }
              },
              "social": {
                "type": "object",
                "properties": {
                  "linkedin": { "type": "string", "format": "uri" },
                  "twitter": { "type": "string", "format": "uri" },
                  "github": { "type": "string", "format": "uri" },
                  "email": { "type": "string", "format": "email" },
                  "website": { "type": "string", "format": "uri" }
                }
              },
              "highlighted": { "type": "boolean" }
            }
          }
        },
        "cardStyle": {
          "type": "string",
          "enum": ["standard", "minimal", "hover-reveal", "split"]
        },
        "imageShape": {
          "type": "string",
          "enum": ["circle", "square", "rounded"]
        },
        "showBio": { "type": "boolean" },
        "showSocial": { "type": "boolean" },
        "bioLength": {
          "type": "string",
          "enum": ["short", "medium", "full"]
        },
        "gap": {
          "type": "string",
          "enum": ["sm", "md", "lg"]
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

### 1. Grid Layout

- Multi-column grid (2, 3, or 4 columns)
- Equal-sized cards
- Best for: Full team pages, departments

### 2. Carousel Layout

- Swipeable slider
- Navigation arrows and dots
- Best for: Leadership teams, featured members

### 3. List Layout

- Horizontal cards with image on side
- More detailed information
- Best for: Small teams, executive profiles

---

## Card Style Variants

### 1. Standard

- Image at top
- Name, role, bio below
- Social icons at bottom
- Clean, professional look

### 2. Minimal

- Image only
- Name and role on hover
- Compact design

### 3. Hover Reveal

- Image with gradient overlay
- Bio and social appear on hover
- Modern, interactive

### 4. Split

- Image and info side-by-side
- More horizontal space
- Best for list layout

---

## Social Media Integration

### Supported Platforms

```typescript
const socialIcons = {
  linkedin: <LinkedInIcon />,
  twitter: <TwitterIcon />,
  github: <GitHubIcon />,
  email: <MailIcon />,
  website: <GlobeIcon />,
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
  youtube: <YouTubeIcon />,
};
```

### Social Link Rendering

```typescript
{
  showSocial && member.social && (
    <div className="social-links">
      {Object.entries(member.social).map(
        ([platform, url]) =>
          url && (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on ${platform}`}
            >
              {socialIcons[platform]}
            </a>
          )
      )}
    </div>
  );
}
```

---

## Bio Length Options

| Setting    | Character Limit | Use Case               |
| ---------- | --------------- | ---------------------- |
| **short**  | 80 characters   | Grid with many members |
| **medium** | 150 characters  | Standard team pages    |
| **full**   | 500 characters  | Leadership profiles    |

Bios are automatically truncated with "..." if they exceed the limit.

---

## Component Behavior

### Responsive Breakpoints

| Layout       | Mobile (<640px) | Tablet (640-1024px) | Desktop (>1024px) |
| ------------ | --------------- | ------------------- | ----------------- |
| **Grid**     | 1 column        | 2 columns           | As configured     |
| **Carousel** | 1 slide         | 2 slides            | 3 slides          |
| **List**     | Stacked         | Stacked             | Side-by-side      |

### Highlighted Members

Members with `highlighted: true` can have:

- Different background color
- Border accent
- "Featured" badge
- Larger card size

### Image Optimization

- **Aspect Ratio:** 1:1 (square) for consistency
- **Lazy Loading:** All images except first row
- **Fallback:** Initials avatar if image fails
- **Dimensions:** Recommend 400x400px minimum

### Theme Integration

```css
.team-card {
  background: var(--color-card-background);
  border-color: var(--color-border);
}

.team-card--highlighted {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
}

.team-member__name {
  color: var(--color-text);
}

.team-member__role {
  color: var(--color-primary);
}

.team-member__bio {
  color: var(--color-text-secondary);
}

.social-link {
  color: var(--color-text-secondary);
}

.social-link:hover {
  color: var(--color-primary);
}
```

---

## Example Configurations

### Example 1: Standard Grid Team

```yaml
type: team
props:
  title: "Meet Our Team"
  subtitle: "The people behind the magic"
  layout: grid
  columns: 3
  cardStyle: standard
  imageShape: circle
  showBio: true
  showSocial: true
  bioLength: medium
  members:
    - id: "member-1"
      name: "Sarah Johnson"
      role: "CEO & Founder"
      bio: "With 15+ years in digital strategy, Sarah leads our vision for innovative web solutions."
      image:
        url: "https://cdn.example.com/team/sarah.jpg"
        alt: "Sarah Johnson headshot"
      social:
        linkedin: "https://linkedin.com/in/sarahjohnson"
        twitter: "https://twitter.com/sarahj"
        email: "sarah@example.com"
      highlighted: true

    - id: "member-2"
      name: "Michael Chen"
      role: "Lead Developer"
      bio: "Full-stack expert specializing in React and Node.js. Passionate about clean code."
      image:
        url: "https://cdn.example.com/team/michael.jpg"
        alt: "Michael Chen headshot"
      social:
        github: "https://github.com/mchen"
        linkedin: "https://linkedin.com/in/michaelchen"

    - id: "member-3"
      name: "Emily Rodriguez"
      role: "Design Director"
      bio: "Award-winning designer with a keen eye for user experience and visual storytelling."
      image:
        url: "https://cdn.example.com/team/emily.jpg"
        alt: "Emily Rodriguez headshot"
      social:
        linkedin: "https://linkedin.com/in/emilyrodriguez"
        website: "https://emilyrodriguez.design"
```

### Example 2: Minimal Hover Cards

```yaml
type: team
props:
  title: "Our Leadership"
  layout: grid
  columns: 4
  cardStyle: hover-reveal
  imageShape: rounded
  showSocial: true
  gap: md
  members:
    - id: "lead-1"
      name: "David Kim"
      role: "CTO"
      image:
        url: "https://cdn.example.com/team/david.jpg"
        alt: "David Kim"
      social:
        linkedin: "https://linkedin.com/in/davidkim"

    - id: "lead-2"
      name: "Jessica Martinez"
      role: "CMO"
      image:
        url: "https://cdn.example.com/team/jessica.jpg"
        alt: "Jessica Martinez"
      social:
        linkedin: "https://linkedin.com/in/jessicamartinez"
```

### Example 3: List Layout with Full Bios

```yaml
type: team
props:
  title: "Executive Team"
  description: "Experienced leaders driving our company forward"
  layout: list
  cardStyle: split
  imageShape: square
  showBio: true
  showSocial: true
  bioLength: full
  members:
    - id: "exec-1"
      name: "Robert Anderson"
      role: "Chief Executive Officer"
      bio: "Robert brings over 20 years of experience in technology and business leadership. Before joining our company, he served as VP of Digital Innovation at Fortune 500 companies. He holds an MBA from Stanford and is passionate about building products that make a difference."
      image:
        url: "https://cdn.example.com/team/robert.jpg"
        alt: "Robert Anderson"
      social:
        linkedin: "https://linkedin.com/in/robertanderson"
        twitter: "https://twitter.com/robanderson"
        email: "robert@example.com"
```

### Example 4: Carousel for Small Team

```yaml
type: team
props:
  title: "Core Team"
  layout: carousel
  cardStyle: standard
  imageShape: circle
  showBio: true
  bioLength: short
  members:
    - id: "core-1"
      name: "Alex Thompson"
      role: "Product Manager"
      bio: "Leading product strategy and roadmap execution"
      image:
        url: "https://cdn.example.com/team/alex.jpg"
        alt: "Alex Thompson"
      social:
        linkedin: "https://linkedin.com/in/alexthompson"

    - id: "core-2"
      name: "Maria Garcia"
      role: "Senior Designer"
      bio: "Creating beautiful, user-centered designs"
      image:
        url: "https://cdn.example.com/team/maria.jpg"
        alt: "Maria Garcia"
      social:
        linkedin: "https://linkedin.com/in/mariagarcia"
```

---

## Component Implementation

### File Structure

```
src/components/atomic/Team/
  ├── Team.tsx              # Main component
  ├── TeamCard.tsx          # Card variants
  ├── TeamCarousel.tsx      # Carousel layout
  ├── TeamList.tsx          # List layout
  ├── SocialLinks.tsx       # Social icons
  └── Team.test.tsx         # Tests
```

### Bio Truncation

```typescript
function truncateBio(bio: string, length: "short" | "medium" | "full"): string {
  const limits = { short: 80, medium: 150, full: 500 };
  const limit = limits[length];

  if (bio.length <= limit) return bio;

  return bio.slice(0, limit).trim() + "...";
}
```

### Avatar Fallback

```typescript
function AvatarFallback({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return <div className="avatar-fallback">{initials}</div>;
}
```

---

## Validation Rules

### Required Fields

- ✅ `members` (minimum 1 member)
- ✅ `layout` (one of defined types)
- ✅ Each member must have `id`, `name`, `role`, `image`

### Optional Fields

- Bio (recommended for full team pages)
- Social links
- Highlighted flag

### Business Rules

- If `layout: grid`, `columns` is required
- If `layout: carousel`, recommended 3-8 members
- If `showBio: false`, `bioLength` is ignored
- If `showSocial: false`, social links not rendered
- Default `imageShape: circle` if not specified
- Default `gap: md` if not specified

---

## Accessibility

- ✅ Images have descriptive alt text
- ✅ Social links have `aria-label` with name and platform
- ✅ Keyboard navigation for carousel
- ✅ Focus indicators on interactive elements
- ✅ Semantic HTML with `<article>` for members
- ✅ Proper heading hierarchy

### Screen Reader Example

```html
<article aria-label="Team member: Sarah Johnson">
  <img src="..." alt="Sarah Johnson headshot" />
  <h3>Sarah Johnson</h3>
  <p aria-label="Role">CEO & Founder</p>
  <p aria-label="Biography">With 15+ years...</p>
  <div aria-label="Social media links">
    <a href="..." aria-label="Sarah Johnson on LinkedIn">...</a>
  </div>
</article>
```

---

## Performance Considerations

- **Image Loading:** Lazy load all except first 3-6
- **Carousel:** Virtualization for large teams (>20)
- **Social Icons:** Tree-shaking unused icons
- **Bio Truncation:** Memoized to avoid re-renders

---

## Testing Strategy

### Unit Tests

- Bio truncation logic
- Avatar fallback generation
- Social link rendering
- Highlighted member styling

### Integration Tests

- Carousel navigation
- Responsive layout switching
- Image loading and errors
- Social link clicks

### Visual Tests

- All card styles
- Image shapes
- Hover states
- Carousel controls

---

## Migration Notes

### Adding New Social Platform

1. Add platform to social type in TypeScript
2. Import icon component
3. Add to `socialIcons` mapping
4. Update documentation

### Custom Card Styles

1. Add style to enum
2. Create variant in `TeamCard.tsx`
3. Define CSS classes
4. Add example configuration

---

## Related Components

- **Image:** Next.js Image with fallback
- **Icon:** Social media icons
- **Carousel:** Swiper or embla-carousel
- **Card:** Base card component

---

## Changelog

### v1.0.0 (2025-12-06)

- Initial specification
- 3 layout variants (grid, carousel, list)
- 4 card styles (standard, minimal, hover-reveal, split)
- 3 image shapes (circle, square, rounded)
- Social media integration (8 platforms)
- Bio length control (short, medium, full)
- Highlighted member support
- Avatar fallback for missing images
- Responsive behavior
