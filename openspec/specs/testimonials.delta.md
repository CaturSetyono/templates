# Spec Delta: Testimonials Component

**Component Type:** `testimonials`  
**Category:** Atomic Component  
**Version:** 1.0.0  
**Status:** Proposed

---

## Overview

The Testimonials component displays customer reviews, client feedback, or user testimonials in an engaging format. It supports star ratings, avatars, company logos, and multiple layout options including carousels and grids.

---

## Configuration Schema

### TypeScript Interface

```typescript
interface TestimonialsSection extends BaseSection {
  type: "testimonials";
  props: {
    // Section Header
    title?: string;
    subtitle?: string;
    description?: string;

    // Layout
    layout: "grid" | "carousel" | "masonry" | "featured";
    columns?: 2 | 3; // For grid/masonry layouts

    // Testimonials
    items: Array<{
      id: string;
      quote: string;
      author: {
        name: string;
        role?: string;
        company?: string;
        avatar?: {
          url: string;
          alt: string;
        };
      };
      rating?: number; // 1-5 stars
      date?: string; // ISO date or formatted string
      logo?: {
        url: string;
        alt: string;
      };
      featured?: boolean; // Highlight specific testimonial
      source?: "google" | "trustpilot" | "yelp" | "custom";
      link?: {
        href: string;
        text?: string;
      };
    }>;

    // Display Options
    showRating?: boolean;
    showDate?: boolean;
    showLogo?: boolean;
    quoteLength?: "short" | "medium" | "long"; // Character limits

    // Card Style
    cardStyle?: "default" | "minimal" | "bordered" | "elevated" | "quote-style";

    // Carousel Options (if layout: carousel)
    carousel?: {
      autoplay?: boolean;
      interval?: number; // milliseconds
      showControls?: boolean;
      showDots?: boolean;
      slidesPerView?: 1 | 2 | 3;
    };

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
      "const": "testimonials"
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
          "enum": ["grid", "carousel", "masonry", "featured"]
        },
        "columns": {
          "type": "number",
          "enum": [2, 3]
        },
        "items": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "object",
            "required": ["id", "quote", "author"],
            "properties": {
              "id": { "type": "string" },
              "quote": { "type": "string", "maxLength": 1000 },
              "author": {
                "type": "object",
                "required": ["name"],
                "properties": {
                  "name": { "type": "string", "maxLength": 100 },
                  "role": { "type": "string", "maxLength": 100 },
                  "company": { "type": "string", "maxLength": 100 },
                  "avatar": {
                    "type": "object",
                    "required": ["url", "alt"],
                    "properties": {
                      "url": { "type": "string", "format": "uri" },
                      "alt": { "type": "string" }
                    }
                  }
                }
              },
              "rating": {
                "type": "number",
                "minimum": 1,
                "maximum": 5
              },
              "date": { "type": "string" },
              "logo": {
                "type": "object",
                "required": ["url", "alt"],
                "properties": {
                  "url": { "type": "string", "format": "uri" },
                  "alt": { "type": "string" }
                }
              },
              "featured": { "type": "boolean" },
              "source": {
                "type": "string",
                "enum": ["google", "trustpilot", "yelp", "custom"]
              },
              "link": {
                "type": "object",
                "required": ["href"],
                "properties": {
                  "href": { "type": "string", "format": "uri" },
                  "text": { "type": "string" }
                }
              }
            }
          }
        },
        "showRating": { "type": "boolean" },
        "showDate": { "type": "boolean" },
        "showLogo": { "type": "boolean" },
        "quoteLength": {
          "type": "string",
          "enum": ["short", "medium", "long"]
        },
        "cardStyle": {
          "type": "string",
          "enum": ["default", "minimal", "bordered", "elevated", "quote-style"]
        },
        "carousel": {
          "type": "object",
          "properties": {
            "autoplay": { "type": "boolean" },
            "interval": {
              "type": "number",
              "minimum": 1000,
              "maximum": 10000
            },
            "showControls": { "type": "boolean" },
            "showDots": { "type": "boolean" },
            "slidesPerView": {
              "type": "number",
              "enum": [1, 2, 3]
            }
          }
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

- Equal-height cards in columns
- Clean, organized presentation
- Best for: Multiple testimonials, comparison

### 2. Carousel Layout

- Swipeable slider with controls
- Auto-play optional
- Best for: Limited space, featured reviews

### 3. Masonry Layout

- Pinterest-style layout
- Different heights based on content
- Best for: Varying quote lengths, visual interest

### 4. Featured Layout

- One large featured testimonial
- Smaller testimonials below
- Best for: Highlighting key review, homepage

---

## Card Style Variants

### 1. Default

- Quote with background card
- Author info below
- Rating stars at top
- Professional, clean

### 2. Minimal

- Quote with subtle border
- No background
- Compact design

### 3. Bordered

- Solid border around card
- Accent color on left/top
- Clear separation

### 4. Elevated

- Elevated shadow
- Hover lift effect
- Modern, engaging

### 5. Quote Style

- Large quotation marks
- Quote as focal point
- Author info smaller
- Editorial feel

---

## Rating System

### Star Display

```typescript
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="star-rating" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "star-filled" : "star-empty"}
          aria-hidden="true"
        >
          {star <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}
```

### Rating Sources

Display source logo for credibility:

- **Google:** Google logo + star count
- **Trustpilot:** Trustpilot logo + star count
- **Yelp:** Yelp logo + star count
- **Custom:** No logo, just stars

---

## Quote Length Management

| Setting    | Character Limit | Use Case                  |
| ---------- | --------------- | ------------------------- |
| **short**  | 120 characters  | Grid with many items      |
| **medium** | 250 characters  | Standard testimonials     |
| **long**   | 500 characters  | Featured/detailed reviews |

Long quotes can have "Read More" functionality:

```typescript
const [expanded, setExpanded] = useState(false);

const displayQuote = expanded ? quote : truncateQuote(quote, quoteLength);
```

---

## Component Behavior

### Responsive Breakpoints

| Layout       | Mobile (<640px) | Tablet (640-1024px) | Desktop (>1024px)   |
| ------------ | --------------- | ------------------- | ------------------- |
| **Grid**     | 1 column        | 2 columns           | As configured       |
| **Carousel** | 1 slide         | 1-2 slides          | As configured       |
| **Masonry**  | 1 column        | 2 columns           | As configured       |
| **Featured** | Stacked         | Featured on top     | Featured left/right |

### Carousel Behavior

- **Autoplay:** Rotates every X seconds
- **Controls:** Previous/Next arrows
- **Dots:** Indicator dots for slide position
- **Touch:** Swipe support on mobile
- **Pause on Hover:** Stops autoplay when hovering

### Theme Integration

```css
.testimonial-card {
  background: var(--color-card-background);
  border-color: var(--color-border);
}

.testimonial-quote {
  color: var(--color-text);
  font-style: italic;
}

.testimonial-author {
  color: var(--color-text);
  font-weight: var(--font-semibold);
}

.testimonial-role {
  color: var(--color-text-secondary);
}

.star-filled {
  color: var(--color-rating, #ffc107);
}

.testimonial--featured {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
}
```

---

## Example Configurations

### Example 1: Grid with Ratings

```yaml
type: testimonials
props:
  title: "What Our Clients Say"
  subtitle: "Trusted by businesses worldwide"
  layout: grid
  columns: 3
  cardStyle: elevated
  showRating: true
  showLogo: true
  gap: md
  items:
    - id: "test-1"
      quote: "This platform transformed how we build websites. Deploy time went from days to minutes!"
      author:
        name: "John Smith"
        role: "CTO"
        company: "TechCorp Inc"
        avatar:
          url: "https://cdn.example.com/avatars/john.jpg"
          alt: "John Smith"
      rating: 5
      logo:
        url: "https://cdn.example.com/logos/techcorp.png"
        alt: "TechCorp logo"
      source: google

    - id: "test-2"
      quote: "Incredible flexibility without sacrificing quality. Our clients love the results."
      author:
        name: "Sarah Lee"
        role: "Creative Director"
        company: "Design Studio"
        avatar:
          url: "https://cdn.example.com/avatars/sarah.jpg"
          alt: "Sarah Lee"
      rating: 5
      source: trustpilot

    - id: "test-3"
      quote: "Best decision we made this year. The team is responsive and the platform is rock-solid."
      author:
        name: "Michael Chen"
        role: "Founder"
        company: "StartupXYZ"
        avatar:
          url: "https://cdn.example.com/avatars/michael.jpg"
          alt: "Michael Chen"
      rating: 5
      date: "2025-11-15"
```

### Example 2: Carousel with Autoplay

```yaml
type: testimonials
props:
  title: "Customer Reviews"
  layout: carousel
  cardStyle: quote-style
  showRating: true
  quoteLength: medium
  carousel:
    autoplay: true
    interval: 5000
    showControls: true
    showDots: true
    slidesPerView: 1
  items:
    - id: "review-1"
      quote: "I've worked with many agencies, but none compare to the speed and quality here. Highly recommend!"
      author:
        name: "Emma Watson"
        role: "Marketing Manager"
        company: "GlobalBrand"
      rating: 5

    - id: "review-2"
      quote: "From concept to launch in record time. The server-driven approach is genius."
      author:
        name: "David Park"
        role: "Product Owner"
      rating: 5
```

### Example 3: Featured Testimonial

```yaml
type: testimonials
props:
  title: "Success Stories"
  layout: featured
  cardStyle: bordered
  showRating: true
  showDate: true
  items:
    - id: "featured-1"
      quote: "Working with this platform has been a game-changer for our business. We can now deploy customized websites for clients in a fraction of the time it used to take. The flexibility and ease of use are unmatched. Our team loves it, and more importantly, our clients are thrilled with the results."
      author:
        name: "Jennifer Martinez"
        role: "CEO"
        company: "Digital Agency Pro"
        avatar:
          url: "https://cdn.example.com/avatars/jennifer.jpg"
          alt: "Jennifer Martinez"
      rating: 5
      date: "2025-12-01"
      logo:
        url: "https://cdn.example.com/logos/agency-pro.png"
        alt: "Digital Agency Pro logo"
      featured: true

    - id: "other-1"
      quote: "Fast, reliable, and exactly what we needed."
      author:
        name: "Tom Wilson"
        role: "Developer"
      rating: 5

    - id: "other-2"
      quote: "Support team is fantastic. Issues resolved in minutes."
      author:
        name: "Lisa Brown"
        role: "Project Manager"
      rating: 5
```

### Example 4: Masonry Layout

```yaml
type: testimonials
props:
  title: "Client Feedback"
  layout: masonry
  columns: 3
  cardStyle: minimal
  showRating: false
  quoteLength: long
  items:
    - id: "feedback-1"
      quote: "Simple yet powerful. Love it!"
      author:
        name: "Alex Turner"
        role: "Freelancer"

    - id: "feedback-2"
      quote: "The configuration-driven approach means we can onboard new clients without writing a single line of code. It's been a massive productivity boost for our agency."
      author:
        name: "Rachel Green"
        role: "Operations Manager"
        company: "WebWorks"

    - id: "feedback-3"
      quote: "Great platform with excellent documentation. Highly recommended."
      author:
        name: "Chris Evans"
        role: "Tech Lead"
```

---

## Component Implementation

### File Structure

```
src/components/atomic/Testimonials/
  ├── Testimonials.tsx          # Main component
  ├── TestimonialCard.tsx       # Card variants
  ├── TestimonialCarousel.tsx   # Carousel layout
  ├── TestimonialMasonry.tsx    # Masonry layout
  ├── StarRating.tsx            # Rating component
  └── Testimonials.test.tsx     # Tests
```

### Quote Truncation

```typescript
function truncateQuote(
  quote: string,
  length: "short" | "medium" | "long"
): string {
  const limits = { short: 120, medium: 250, long: 500 };
  const limit = limits[length];

  if (quote.length <= limit) return quote;

  // Truncate at last complete word
  const truncated = quote.slice(0, limit);
  const lastSpace = truncated.lastIndexOf(" ");

  return truncated.slice(0, lastSpace) + "...";
}
```

### Source Logo Rendering

```typescript
const sourceLogo = {
  google: "/icons/google-logo.svg",
  trustpilot: "/icons/trustpilot-logo.svg",
  yelp: "/icons/yelp-logo.svg",
  custom: null,
};

{
  item.source && sourceLogo[item.source] && (
    <img
      src={sourceLogo[item.source]}
      alt={`${item.source} review`}
      className="source-logo"
    />
  );
}
```

---

## Validation Rules

### Required Fields

- ✅ `items` (minimum 1 testimonial)
- ✅ `layout` (one of defined types)
- ✅ Each item must have `id`, `quote`, `author.name`

### Optional Fields

- Rating (5 stars if not provided, when showRating: true)
- Avatar
- Company logo
- Date

### Business Rules

- If `showRating: true` but rating not provided, don't show stars
- If `layout: grid` or `masonry`, `columns` is required
- If `layout: carousel`, `carousel` config recommended
- If rating < 4, consider not displaying (quality control)
- Default `quoteLength: medium` if not specified
- Default `carousel.interval: 5000` if autoplay enabled

---

## Accessibility

- ✅ Quotes have proper semantic markup (`<blockquote>`)
- ✅ Author info uses `<cite>` element
- ✅ Star ratings have `aria-label` (e.g., "5 out of 5 stars")
- ✅ Carousel has keyboard navigation (arrow keys)
- ✅ Carousel has play/pause button for autoplay
- ✅ Images have descriptive alt text
- ✅ Focus management in carousel

### Screen Reader Example

```html
<blockquote>
  <p>"This platform transformed how we build websites."</p>
  <footer>
    <div aria-label="5 out of 5 stars">★★★★★</div>
    <cite>
      <span>John Smith</span>
      <span>, CTO at TechCorp Inc</span>
    </cite>
  </footer>
</blockquote>
```

---

## Performance Considerations

- **Image Loading:** Lazy load avatars and logos
- **Carousel:** Lazy load off-screen slides
- **Masonry:** Use CSS Grid or lightweight library
- **Animation:** RequestAnimationFrame for smooth carousel
- **Truncation:** Memoize truncated quotes

---

## SEO Considerations

- **Structured Data:** Add JSON-LD schema for reviews
- **Rich Snippets:** Enable star ratings in search results
- **Author Attribution:** Proper citation markup
- **Aggregate Rating:** Calculate and display overall rating

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": 5
  },
  "author": {
    "@type": "Person",
    "name": "John Smith"
  },
  "reviewBody": "This platform transformed..."
}
```

---

## Testing Strategy

### Unit Tests

- Quote truncation logic
- Star rating rendering
- Avatar fallback
- Source logo mapping

### Integration Tests

- Carousel navigation and autoplay
- Read more/less functionality
- Responsive layout switching
- Image loading

### Visual Tests

- All card styles
- All layouts
- Rating display variations
- Featured testimonial styling

---

## Migration Notes

### Adding New Review Source

1. Add source to enum in TypeScript
2. Add logo image to `/public/icons/`
3. Update `sourceLogo` mapping
4. Update documentation

### Custom Card Styles

1. Add style to enum
2. Create variant in `TestimonialCard.tsx`
3. Define CSS classes
4. Add example configuration

---

## Related Components

- **StarRating:** Reusable rating component
- **Image:** Avatar and logo rendering
- **Carousel:** Base carousel component
- **Card:** Base card component

---

## Changelog

### v1.0.0 (2025-12-06)

- Initial specification
- 4 layout variants (grid, carousel, masonry, featured)
- 5 card styles (default, minimal, bordered, elevated, quote-style)
- Star rating system (1-5 stars)
- Review source badges (Google, Trustpilot, Yelp)
- Quote length management (short, medium, long)
- Featured testimonial support
- Carousel with autoplay
- Avatar and company logo display
- Date display option
- Responsive behavior
