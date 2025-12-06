# Spec Delta: Footer Component

**Component Type:** `footer` (Layout Component)  
**Category:** Navigation/Layout  
**Version:** 2.0.0  
**Status:** Proposed

---

## Overview

The Footer component provides site-wide footer with **3 layout variants** and **optional sections** including newsletter, contact info, link columns, social media, and copyright. All fields are optional for maximum flexibility.

---

## Core Principle: Optional-First Design

```typescript
// ✅ Valid minimal footer
{
  footer: {
    copyright: "© 2025 Company";
  }
}

// ✅ Valid empty footer (renders minimal structure)
{
  footer: {
  }
}

// ✅ Valid null footer (no footer rendered)
{
  footer: null;
}
```

---

## Configuration Schema

### TypeScript Interface

```typescript
interface FooterConfig {
  // Layout Type
  layout?: "columns" | "centered" | "minimal"; // Default: 'columns'

  // Logo Section
  logo?: {
    image?: string;
    text?: string;
    description?: string; // Tagline under logo
  };

  // Link Sections (for columns layout)
  sections?: Array<{
    title?: string;
    links?: Array<{
      text: string;
      href: string;
      external?: boolean;
    }>;
  }>;

  // Newsletter Form
  newsletter?: {
    enabled?: boolean; // Must be true to render
    title?: string;
    description?: string;
    placeholder?: string; // Default: "Enter your email"
    buttonText?: string; // Default: "Subscribe"
    action?: string; // Form submit endpoint
  };

  // Contact Information
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
    hours?: string;
  };

  // Social Media Links
  social?: {
    [platform: string]: string;
  };

  // Copyright & Legal
  copyright?: string; // e.g., "© 2025 Company Name"
  legalLinks?: Array<{
    text: string;
    href: string;
  }>;

  // Styling
  background?: string; // Theme color or custom
  divider?: boolean; // Show top border
}
```

---

## Layout Variants

### 1. Columns Layout (Default)

Multi-column footer with logo, link sections, newsletter, and bottom bar.

```yaml
footer:
  layout: columns
  logo:
    text: "Company"
    description: "Building the future"
  sections:
    - title: "Product"
      links:
        - text: "Features"
          href: "/features"
        - text: "Pricing"
          href: "/pricing"
    - title: "Company"
      links:
        - text: "About"
          href: "/about"
        - text: "Contact"
          href: "/contact"
  newsletter:
    enabled: true
    title: "Stay Updated"
  copyright: "© 2025 Company"
```

**Rendering:**

```
┌────────────────────────────────────────┐
│ [Logo]        Product    Company       │
│ Description   Features   About         │
│               Pricing    Contact       │
│                                        │
│ Newsletter Form                        │
├────────────────────────────────────────┤
│ © 2025 Company    Privacy | Terms      │
└────────────────────────────────────────┘
```

### 2. Centered Layout

Single-column, centered footer for minimal sites.

```yaml
footer:
  layout: centered
  logo:
    text: "Brand"
  social:
    twitter: "https://twitter.com/brand"
    linkedin: "https://linkedin.com/company/brand"
  copyright: "© 2025 Brand"
```

**Rendering:**

```
┌────────────────────────────────────────┐
│           [Logo]                       │
│      [Social Icons]                    │
│    © 2025 Brand                        │
│    Privacy | Terms                     │
└────────────────────────────────────────┘
```

### 3. Minimal Layout

Ultra-compact footer with copyright and optional legal links only.

```yaml
footer:
  layout: minimal
  copyright: "© 2025 Company"
  legalLinks:
    - text: "Privacy"
      href: "/privacy"
    - text: "Terms"
      href: "/terms"
```

**Rendering:**

```
┌────────────────────────────────────────┐
│ © 2025 Company    Privacy | Terms      │
└────────────────────────────────────────┘
```

---

## Conditional Rendering Logic

### Footer Root

```typescript
export function Footer({ config }: { config?: FooterConfig }) {
  // Null check - don't render footer
  if (config === null || config === undefined) {
    return null;
  }

  // Check if footer has any content
  const hasContent =
    config.copyright ||
    config.logo ||
    config.sections ||
    config.newsletter ||
    config.contact ||
    config.social;

  if (!hasContent) {
    return null; // Graceful degradation
  }

  // Render based on layout
  const layout = config.layout || "columns";

  switch (layout) {
    case "minimal":
      return <FooterMinimal config={config} />;
    case "centered":
      return <FooterCentered config={config} />;
    case "columns":
    default:
      return <FooterColumns config={config} />;
  }
}
```

### Logo Section

```typescript
{
  config?.logo && (config.logo.image || config.logo.text) && (
    <div className="footer-logo">
      {config.logo.image && (
        <img src={config.logo.image} alt="Logo" className="h-10" />
      )}
      {config.logo.text && (
        <span className="font-bold text-xl">{config.logo.text}</span>
      )}
      {config.logo.description && (
        <p className="text-sm text-gray-600">{config.logo.description}</p>
      )}
    </div>
  );
}
```

### Link Sections

```typescript
{
  config?.sections && config.sections.length > 0 && (
    <div className="footer-sections">
      {config.sections.map((section, idx) => (
        <div key={idx} className="footer-section">
          {section.title && (
            <h3 className="font-semibold mb-3">{section.title}</h3>
          )}
          {section.links && section.links.length > 0 && (
            <ul className="space-y-2">
              {section.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
```

### Newsletter Form

```typescript
{
  config?.newsletter?.enabled === true && (
    <div className="footer-newsletter">
      {config.newsletter.title && (
        <h3 className="font-semibold mb-2">{config.newsletter.title}</h3>
      )}
      {config.newsletter.description && (
        <p className="text-sm mb-4">{config.newsletter.description}</p>
      )}
      <form
        action={config.newsletter.action || "/api/newsletter"}
        method="POST"
        className="flex gap-2"
      >
        <input
          type="email"
          name="email"
          placeholder={config.newsletter.placeholder || "Enter your email"}
          required
          className="flex-1"
        />
        <button type="submit">
          {config.newsletter.buttonText || "Subscribe"}
        </button>
      </form>
    </div>
  );
}
```

### Contact Info

```typescript
{
  config?.contact && (
    <div className="footer-contact">
      {config.contact.email && (
        <a href={`mailto:${config.contact.email}`}>
          <MailIcon /> {config.contact.email}
        </a>
      )}
      {config.contact.phone && (
        <a href={`tel:${config.contact.phone}`}>
          <PhoneIcon /> {config.contact.phone}
        </a>
      )}
      {config.contact.address && (
        <address className="not-italic">
          <MapIcon /> {config.contact.address}
        </address>
      )}
      {config.contact.hours && (
        <p>
          <ClockIcon /> {config.contact.hours}
        </p>
      )}
    </div>
  );
}
```

### Social Links

```typescript
{
  config?.social && Object.keys(config.social).length > 0 && (
    <div className="footer-social">
      {Object.entries(config.social).map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${platform}`}
          className="hover:text-primary transition-colors"
        >
          <Icon name={platform} size={20} />
        </a>
      ))}
    </div>
  );
}
```

### Copyright & Legal

```typescript
<div className="footer-bottom">
  {config?.copyright && (
    <p className="text-sm text-gray-600">{config.copyright}</p>
  )}

  {config?.legalLinks && config.legalLinks.length > 0 && (
    <div className="flex gap-4">
      {config.legalLinks.map((link, idx) => (
        <a
          key={idx}
          href={link.href}
          className="text-sm text-gray-600 hover:text-primary"
        >
          {link.text}
        </a>
      ))}
    </div>
  )}
</div>
```

---

## Theme Integration

```css
.footer {
  background: var(--color-footer-bg, var(--color-background));
  color: var(--color-text);
  border-top: 1px solid var(--color-border);
}

.footer-section h3 {
  color: var(--color-text);
}

.footer-section a {
  color: var(--color-text-secondary);
  transition: color 0.2s;
}

.footer-section a:hover {
  color: var(--color-primary);
}

.footer-newsletter input {
  background: var(--color-input-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.footer-newsletter button {
  background: var(--color-primary);
  color: var(--color-primary-text);
}

.footer-bottom {
  border-top: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}
```

---

## Example Configurations

### Example 1: Full Columns Footer

```yaml
footer:
  layout: columns
  logo:
    image: "https://cdn.example.com/logo.svg"
    text: "TechCorp"
    description: "Innovating for tomorrow"
  sections:
    - title: "Product"
      links:
        - text: "Features"
          href: "/features"
        - text: "Pricing"
          href: "/pricing"
        - text: "Customers"
          href: "/customers"
    - title: "Resources"
      links:
        - text: "Blog"
          href: "/blog"
        - text: "Documentation"
          href: "/docs"
        - text: "API"
          href: "/api"
    - title: "Company"
      links:
        - text: "About"
          href: "/about"
        - text: "Careers"
          href: "/careers"
        - text: "Contact"
          href: "/contact"
  newsletter:
    enabled: true
    title: "Subscribe to our newsletter"
    description: "Get the latest updates and news"
    placeholder: "your@email.com"
  contact:
    email: "hello@techcorp.com"
    phone: "+1 (555) 123-4567"
    address: "123 Tech Street, San Francisco, CA"
  social:
    twitter: "https://twitter.com/techcorp"
    linkedin: "https://linkedin.com/company/techcorp"
    github: "https://github.com/techcorp"
  copyright: "© 2025 TechCorp. All rights reserved."
  legalLinks:
    - text: "Privacy Policy"
      href: "/privacy"
    - text: "Terms of Service"
      href: "/terms"
    - text: "Cookie Policy"
      href: "/cookies"
```

### Example 2: Centered Footer

```yaml
footer:
  layout: centered
  logo:
    text: "CreativeAgency"
  social:
    instagram: "https://instagram.com/creativeagency"
    behance: "https://behance.net/creativeagency"
    dribbble: "https://dribbble.com/creativeagency"
  copyright: "© 2025 CreativeAgency"
  legalLinks:
    - text: "Privacy"
      href: "/privacy"
```

### Example 3: Minimal Footer

```yaml
footer:
  layout: minimal
  copyright: "© 2025 MyStartup"
  legalLinks:
    - text: "Privacy"
      href: "/privacy"
    - text: "Terms"
      href: "/terms"
```

---

## Responsive Behavior

| Viewport            | Columns Layout             | Centered Layout  | Minimal Layout |
| ------------------- | -------------------------- | ---------------- | -------------- |
| Mobile (<640px)     | Stack vertically, 1 column | Already centered | Single line    |
| Tablet (640-1024px) | 2 columns                  | Centered         | Single line    |
| Desktop (>1024px)   | 3-4 columns                | Centered         | Single line    |

---

## Accessibility Checklist

- ✅ Semantic HTML (`<footer>`, `<nav>`, `<address>`)
- ✅ ARIA labels on social links
- ✅ Valid email/phone links
- ✅ Keyboard accessible newsletter form
- ✅ External link indicators
- ✅ Color contrast >4.5:1

---

## Performance Considerations

- **Lazy Load:** Social icons lazy loaded
- **Form Validation:** Client-side email validation
- **No Layout Shift:** Fixed height placeholder during load

---

## Related Components

- **Navbar:** Site-wide navigation
- **NewsletterForm:** Reusable form component
- **SocialLinks:** Social icon component

---

## Changelog

### v2.0.0 (2025-12-06)

- Initial footer specification
- 3 layout variants (columns, centered, minimal)
- Optional-first design
- Newsletter form integration
- Contact info display
- Social links
- Legal links
- Fully responsive
- Accessible
