# Spec Delta: Navbar Component

**Component Type:** `navbar` (Layout Component)  
**Category:** Navigation  
**Version:** 2.0.0  
**Status:** Proposed

---

## Overview

The Navbar component provides dynamic site navigation with support for dropdowns, CTA buttons, search functionality, and social links. **All fields are optional** to support zero-config deployment and graceful degradation.

---

## Core Principle: Optional-First Design

```typescript
// ✅ Valid minimal navbar
{
  navbar: {
    logo: {
      text: "Brand";
    }
  }
}

// ✅ Valid empty navbar (renders default structure)
{
  navbar: {
  }
}

// ✅ Valid null navbar (no navbar rendered)
{
  navbar: null;
}
```

---

## Configuration Schema

### TypeScript Interface

```typescript
interface NavigationConfig {
  navbar?: {
    // Logo Section
    logo?: {
      image?: string; // Logo image URL
      text?: string; // Logo text fallback
      href?: string; // Link destination (default: "/")
    };

    // Navigation Links
    links?: Array<{
      text: string; // Required: link label
      href?: string; // Optional: link destination
      dropdown?: Array<{
        // Optional: dropdown items
        text: string;
        href: string;
        description?: string; // Optional: subtitle
        icon?: string; // Optional: icon name
      }>;
    }>;

    // Call to Action
    cta?: {
      text?: string;
      href?: string;
      variant?: "primary" | "secondary" | "outline";
    };

    // Search Functionality
    search?: {
      enabled?: boolean; // Must be true to render
      placeholder?: string; // Default: "Search..."
      action?: string; // Search endpoint
    };

    // Social Links
    social?: {
      [platform: string]: string; // Any platform: URL
    };

    // Behavior Options
    sticky?: boolean; // Sticky on scroll
    transparent?: boolean; // Transparent overlay
    hideOnScroll?: boolean; // Hide when scrolling down

    // Mobile Settings
    mobile?: {
      breakpoint?: number; // Default: 768px
      showLogo?: boolean; // Default: true
    };
  };
}
```

### JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "navbar": {
      "type": ["object", "null"],
      "properties": {
        "logo": {
          "type": "object",
          "properties": {
            "image": { "type": "string", "format": "uri" },
            "text": { "type": "string", "maxLength": 50 },
            "href": { "type": "string" }
          }
        },
        "links": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["text"],
            "properties": {
              "text": { "type": "string" },
              "href": { "type": "string" },
              "dropdown": {
                "type": "array",
                "items": {
                  "type": "object",
                  "required": ["text", "href"],
                  "properties": {
                    "text": { "type": "string" },
                    "href": { "type": "string" },
                    "description": { "type": "string" },
                    "icon": { "type": "string" }
                  }
                }
              }
            }
          }
        },
        "cta": {
          "type": "object",
          "properties": {
            "text": { "type": "string" },
            "href": { "type": "string" },
            "variant": {
              "type": "string",
              "enum": ["primary", "secondary", "outline"]
            }
          }
        },
        "search": {
          "type": "object",
          "properties": {
            "enabled": { "type": "boolean" },
            "placeholder": { "type": "string" },
            "action": { "type": "string" }
          }
        },
        "social": {
          "type": "object",
          "additionalProperties": { "type": "string", "format": "uri" }
        },
        "sticky": { "type": "boolean" },
        "transparent": { "type": "boolean" },
        "hideOnScroll": { "type": "boolean" },
        "mobile": {
          "type": "object",
          "properties": {
            "breakpoint": { "type": "number" },
            "showLogo": { "type": "boolean" }
          }
        }
      }
    }
  }
}
```

---

## Conditional Rendering Logic

### Logo Rendering

```typescript
// Only render if logo exists
{
  navbar?.logo && (
    <Link href={navbar.logo.href || "/"}>
      {navbar.logo.image && (
        <img src={navbar.logo.image} alt="Logo" className="h-8" />
      )}
      {navbar.logo.text && (
        <span className="font-bold">{navbar.logo.text}</span>
      )}
      {/* If both missing, render nothing */}
      {!navbar.logo.image && !navbar.logo.text && null}
    </Link>
  );
}
```

### Links Rendering

```typescript
// Only render links section if links exist
{
  navbar?.links && navbar.links.length > 0 && (
    <nav className="nav-links">
      {navbar.links.map((link, idx) => (
        <div key={idx}>
          {/* Simple link */}
          {!link.dropdown && link.href && (
            <Link href={link.href}>{link.text}</Link>
          )}

          {/* Dropdown link */}
          {link.dropdown && (
            <Dropdown trigger={link.text} items={link.dropdown} />
          )}
        </div>
      ))}
    </nav>
  );
}
```

### Search Bar Rendering

```typescript
// Only render if explicitly enabled
{
  navbar?.search?.enabled === true && (
    <SearchBar
      placeholder={navbar.search.placeholder || "Search..."}
      action={navbar.search.action}
    />
  );
}
```

### CTA Button Rendering

```typescript
// Only render if CTA has text or href
{
  navbar?.cta && (navbar.cta.text || navbar.cta.href) && (
    <Button
      href={navbar.cta.href || "#"}
      variant={navbar.cta.variant || "primary"}
    >
      {navbar.cta.text || "Get Started"}
    </Button>
  );
}
```

### Social Links Rendering

```typescript
// Only render if social object has entries
{
  navbar?.social && Object.keys(navbar.social).length > 0 && (
    <div className="social-links">
      {Object.entries(navbar.social).map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${platform}`}
        >
          <Icon name={platform} />
        </a>
      ))}
    </div>
  );
}
```

---

## Dropdown Menu System

### Multi-Level Support

```typescript
interface DropdownItem {
  text: string;
  href: string;
  description?: string;
  icon?: string;
  children?: DropdownItem[]; // Nested dropdowns
}
```

### Keyboard Navigation

- **Tab:** Focus next item
- **Shift+Tab:** Focus previous item
- **Enter/Space:** Activate link
- **Escape:** Close dropdown
- **Arrow Down:** Next dropdown item
- **Arrow Up:** Previous dropdown item
- **Arrow Right:** Open sub-dropdown (if exists)
- **Arrow Left:** Close sub-dropdown

### Accessibility

```html
<div class="dropdown" role="navigation">
  <button
    aria-haspopup="true"
    aria-expanded="false"
    aria-controls="dropdown-menu-1"
  >
    Products
  </button>

  <div id="dropdown-menu-1" role="menu" aria-label="Products menu" hidden>
    <a href="/product-1" role="menuitem">Product 1</a>
    <a href="/product-2" role="menuitem">Product 2</a>
  </div>
</div>
```

---

## Mobile Responsive Behavior

### Breakpoint: 768px (default)

**Desktop (≥768px):**

- Horizontal layout
- Inline links
- Dropdown on hover/click
- Search bar inline
- Social links visible

**Mobile (<768px):**

- Hamburger menu icon
- Slide-in menu panel
- Vertical stacked links
- Dropdowns expand inline
- Search bar in menu (optional)

### Mobile Menu Animation

```css
.mobile-menu {
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
}

.mobile-menu.open {
  transform: translateX(0);
}
```

---

## Sticky Navbar Behavior

```typescript
useEffect(() => {
  if (!navbar?.sticky) return;

  const handleScroll = () => {
    const scrolled = window.scrollY > 20;
    setIsSticky(scrolled);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [navbar?.sticky]);

// CSS classes
className={cn(
  'navbar',
  navbar?.sticky && isSticky && 'navbar-sticky',
  navbar?.transparent && !isSticky && 'navbar-transparent'
)}
```

---

## Theme Integration

```css
.navbar {
  background: var(--color-navbar-bg, var(--color-background));
  border-bottom: 1px solid var(--color-border);
}

.navbar-transparent {
  background: transparent;
  border-bottom: none;
}

.navbar-sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-link {
  color: var(--color-text);
}

.nav-link:hover {
  color: var(--color-primary);
}

.dropdown {
  background: var(--color-dropdown-bg, var(--color-card-background));
  border: 1px solid var(--color-border);
}
```

---

## Example Configurations

### Example 1: Minimal Navbar

```yaml
navbar:
  logo:
    text: "MyBrand"
  links:
    - text: "Home"
      href: "/"
    - text: "About"
      href: "/about"
```

### Example 2: Full-Featured Navbar

```yaml
navbar:
  logo:
    image: "https://cdn.example.com/logo.svg"
    text: "TechCorp"
    href: "/"
  links:
    - text: "Products"
      dropdown:
        - text: "Product A"
          href: "/products/a"
          description: "Our flagship product"
          icon: "star"
        - text: "Product B"
          href: "/products/b"
          description: "Enterprise solution"
          icon: "building"
    - text: "Solutions"
      dropdown:
        - text: "For Startups"
          href: "/solutions/startups"
        - text: "For Enterprise"
          href: "/solutions/enterprise"
    - text: "Pricing"
      href: "/pricing"
    - text: "About"
      href: "/about"
    - text: "Contact"
      href: "/contact"
  cta:
    text: "Get Started"
    href: "/signup"
    variant: primary
  search:
    enabled: true
    placeholder: "Search products..."
    action: "/search"
  social:
    twitter: "https://twitter.com/techcorp"
    linkedin: "https://linkedin.com/company/techcorp"
    github: "https://github.com/techcorp"
  sticky: true
  transparent: false
```

### Example 3: Transparent Overlay Navbar

```yaml
navbar:
  logo:
    image: "https://cdn.example.com/logo-white.svg"
  links:
    - text: "Features"
      href: "#features"
    - text: "Testimonials"
      href: "#testimonials"
  cta:
    text: "Sign Up"
    href: "/signup"
  transparent: true
  sticky: true
```

### Example 4: Search-Focused Navbar

```yaml
navbar:
  logo:
    text: "SearchApp"
  search:
    enabled: true
    placeholder: "What are you looking for?"
    action: "/search"
  links:
    - text: "Help"
      href: "/help"
```

---

## Component Implementation

### File Structure

```
src/components/layout/Navbar/
  ├── Navbar.tsx            # Main component
  ├── NavbarLogo.tsx        # Logo renderer
  ├── NavbarLinks.tsx       # Links list
  ├── Dropdown.tsx          # Dropdown menu
  ├── SearchBar.tsx         # Search input
  ├── MobileMenu.tsx        # Mobile hamburger
  ├── SocialLinks.tsx       # Social icons
  └── Navbar.test.tsx       # Tests
```

### Main Component Logic

```typescript
export function Navbar({ config }: { config?: NavigationConfig["navbar"] }) {
  // Early return if no navbar config
  if (config === null || config === undefined) {
    return null;
  }

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Sticky scroll behavior
  useEffect(() => {
    if (!config?.sticky) return;

    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [config?.sticky]);

  // If navbar exists but has no content, render default structure
  const hasContent =
    config?.logo || config?.links || config?.cta || config?.search;

  if (!hasContent) {
    return null; // Graceful degradation
  }

  return (
    <nav
      className={cn(
        "navbar",
        config?.sticky && isSticky && "navbar-sticky",
        config?.transparent && !isSticky && "navbar-transparent"
      )}
    >
      <div className="navbar-container">
        {/* Logo */}
        {config?.logo && <NavbarLogo {...config.logo} />}

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {config?.links && <NavbarLinks links={config.links} />}
          {config?.search?.enabled && <SearchBar {...config.search} />}
          {config?.cta && <Button {...config.cta} />}
          {config?.social && <SocialLinks social={config.social} />}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <MenuIcon />
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        config={config}
      />
    </nav>
  );
}
```

---

## Validation Rules

### Critical Fields

- None! All fields are optional

### Recommended Fields

- At least one of: `logo`, `links`, or `cta`
- If `search.enabled: true`, consider providing `action`

### Business Rules

- If `logo.image` and `logo.text` both missing, don't render logo
- If `dropdown` exists, `href` on parent link is optional
- If `sticky: true`, navbar becomes fixed on scroll
- If `transparent: true`, background is transparent until scroll (if sticky)

---

## Performance Considerations

- **Lazy Load:** Dropdown content rendered on demand
- **Debounced Search:** Search input debounced 300ms
- **Scroll Throttle:** Sticky listener throttled to 16ms (60fps)
- **Mobile Menu:** Rendered but hidden with CSS (no conditional render for smooth animation)

---

## Accessibility Checklist

- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation for all links/dropdowns
- ✅ Focus trap in mobile menu
- ✅ `aria-expanded` states on dropdowns
- ✅ Skip to main content link
- ✅ Color contrast >4.5:1
- ✅ Touch targets >44px on mobile

---

## Migration Notes

### Adding Navbar to Existing Site

```yaml
# Before (v1.0 - no navbar)
pages:
  - path: "/"
    sections: [...]

# After (v2.0 - with navbar)
navigation:
  navbar:
    logo:
      text: "Brand"
    links:
      - text: "Home"
        href: "/"

pages:
  - path: "/"
    sections: [...]
```

No breaking changes - navbar is purely additive.

---

## Related Components

- **Footer:** Site-wide footer
- **Button:** CTA button component
- **SearchBar:** Search input component
- **Icon:** Social and UI icons

---

## Changelog

### v2.0.0 (2025-12-06)

- Initial navbar specification
- Optional-first design
- Dropdown menu support (multi-level)
- Search bar integration
- Social links
- CTA button
- Sticky/transparent modes
- Mobile hamburger menu
- Keyboard navigation
- Fully accessible
