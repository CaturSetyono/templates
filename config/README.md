# Configuration File Documentation

## Overview

This documentation describes the structure and schema of the YAML configuration files used to define website content, styling, and layout. These configuration files drive the dynamic rendering system of the web builder.

## File Structure

Each configuration file follows this structure:

```yaml
site:
  name: string
  description: string
  theme:
    primary: string (hex color)
    secondary: string (hex color)
    accent: string (hex color)
  navigation: {...}
  footer: {...}

sections:
  - type: string
    ...properties
```

---

## Site Configuration

### `site.name`

- **Type**: `string`
- **Required**: Yes
- **Description**: The brand name or website title
- **Example**: `"CloudFlow"`, `"Bella Italia"`

### `site.description`

- **Type**: `string`
- **Required**: Yes
- **Description**: Brief description of the website/business
- **Example**: `"Modern SaaS platform for team collaboration"`

### `site.theme`

Theme colors that define the visual identity of the site.

#### Properties:

- **`primary`** (string): Main brand color in hex format (e.g., `"#3b82f6"`)
- **`secondary`** (string): Secondary accent color in hex format (e.g., `"#8b5cf6"`)
- **`accent`** (string): Contrast color for emphasis in hex format (e.g., `"#0f172a"`)

**Example**:

```yaml
theme:
  primary: '#3b82f6' # Blue 500
  secondary: '#8b5cf6' # Violet 500
  accent: '#0f172a' # Slate 900
```

---

## Navigation Configuration

### `site.navigation`

Defines the header navigation menu structure.

#### Properties:

##### `logo` (object)

- **`text`** (string): Logo text to display

##### `links` (array of objects)

Navigation menu items. Each link object has:

- **`text`** (string): Display text for the link
- **`href`** (string): URL or anchor link (e.g., `"/about"`, `"#features"`)
- **`children`** (array, optional): Dropdown menu items with same structure

##### `cta` (object)

Call-to-action button in navigation:

- **`text`** (string): Button text
- **`href`** (string): Button destination URL

**Example**:

```yaml
navigation:
  logo:
    text: 'CloudFlow'
  links:
    - text: 'Features'
      href: '#features'
    - text: 'Pricing'
      href: '#pricing'
    - text: 'Resources'
      href: '#'
      children:
        - text: 'Documentation'
          href: '/docs'
        - text: 'API Reference'
          href: '/api'
        - text: 'Blog'
          href: '/blog'
    - text: 'About'
      href: '/about'
  cta:
    text: 'Start Free Trial'
    href: '/signup'
```

---

## Footer Configuration

### `site.footer`

Defines the footer content and structure.

#### Properties:

##### `logo` (object)

- **`text`** (string): Footer logo text

##### `tagline` (string)

- Brief company tagline or mission statement

##### `copyright` (string)

- Copyright notice text

##### `sections` (array of objects)

Footer column sections. Each section has:

- **`title`** (string): Section heading
- **`links`** (array): Links in this section
  - **`text`** (string): Link text
  - **`href`** (string): Link URL

**Example**:

```yaml
footer:
  logo:
    text: 'CloudFlow'
  tagline: 'Streamline your workflow with intelligent automation.'
  copyright: '© 2025 CloudFlow Inc. All rights reserved.'
  sections:
    - title: 'Product'
      links:
        - text: 'Features'
          href: '#features'
        - text: 'Pricing'
          href: '#pricing'
    - title: 'Company'
      links:
        - text: 'About Us'
          href: '/about'
        - text: 'Careers'
          href: '/careers'
```

---

## Sections

The `sections` array defines the page content blocks. Each section has a `type` and type-specific properties.

### Common Section Properties

Most sections support these optional properties:

- **`title`** (string): Section heading
- **`subtitle`** (string): Section subheading/description

---

## Section Types

### 1. Hero Section

**Type**: `"hero"`

The main banner section, typically at the top of the page.

#### Properties:

- **`alignment`** (string): Content alignment - `"left"`, `"center"`, or `"right"`
- **`title`** (string, required): Main headline
- **`subtitle`** (string): Supporting text
- **`cta`** (object): Call-to-action buttons
  - **`primary`** (object): Main CTA button
    - `text` (string): Button text
    - `href` (string): Button URL
  - **`secondary`** (object, optional): Secondary button
    - `text` (string): Button text
    - `href` (string): Button URL
- **`image`** (object, optional): Hero image
  - `src` (string): Image URL
  - `alt` (string): Alt text for accessibility

**Example**:

```yaml
- type: 'hero'
  alignment: 'center'
  title: 'Collaborate Smarter, Work Faster'
  subtitle: 'CloudFlow brings your team together with powerful tools.'
  cta:
    primary:
      text: 'Start Free Trial'
      href: '/signup'
    secondary:
      text: 'Watch Demo'
      href: '#demo'
  image:
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200'
    alt: 'Team collaboration'
```

---

### 2. Logo Cloud Section

**Type**: `"logo-cloud"`

Displays a row of company/partner logos.

#### Properties:

- **`title`** (string): Section title
- **`logos`** (array of objects, required): Logo list
  - **`name`** (string): Company name
  - **`src`** (string): Logo image URL

**Example**:

```yaml
- type: 'logo-cloud'
  title: 'Trusted by innovative teams worldwide'
  logos:
    - name: 'TechCorp'
      src: 'https://via.placeholder.com/150x50/3b82f6/ffffff?text=TechCorp'
    - name: 'DataFlow'
      src: 'https://via.placeholder.com/150x50/3b82f6/ffffff?text=DataFlow'
```

---

### 3. Features Section

**Type**: `"features"`

Showcases product features or benefits.

#### Properties:

- **`layout`** (string): Display layout - `"grid"` or `"alternate"`
  - `grid`: Features in a grid layout
  - `alternate`: Features in alternating left/right layout with more detail
- **`title`** (string): Section title
- **`subtitle`** (string): Section subtitle
- **`items`** (array of objects, required): Feature list
  - **`icon`** (string): Emoji or icon
  - **`title`** (string): Feature name
  - **`description`** (string): Feature description

**Example**:

```yaml
- type: 'features'
  layout: 'grid'
  title: 'Everything you need to succeed'
  subtitle: 'Powerful features designed for modern teams'
  items:
    - icon: '🚀'
      title: 'Lightning Fast'
      description: 'Built for speed with cutting-edge technology.'
    - icon: '🔒'
      title: 'Enterprise Security'
      description: 'Bank-level encryption and compliance.'
```

---

### 4. Stats Section

**Type**: `"stats"`

Displays key metrics or achievements.

#### Properties:

- **`title`** (string): Section title
- **`items`** (array of objects, required): Statistics list
  - **`value`** (string): The metric value (e.g., "50K+", "99.9%")
  - **`label`** (string): Metric description

**Example**:

```yaml
- type: 'stats'
  title: 'Proven results that speak for themselves'
  items:
    - value: '50K+'
      label: 'Active Teams'
    - value: '99.9%'
      label: 'Uptime SLA'
    - value: '2M+'
      label: 'Tasks Completed'
```

---

### 5. Testimonials Section

**Type**: `"testimonials"`

Customer reviews and testimonials.

#### Properties:

- **`title`** (string): Section title
- **`subtitle`** (string): Section subtitle
- **`items`** (array of objects, required): Testimonial list
  - **`quote`** (string): Testimonial text
  - **`author`** (string): Person's name
  - **`role`** (string): Person's job title
  - **`company`** (string): Company name (optional)
  - **`avatar`** (string): Avatar image URL

**Example**:

```yaml
- type: 'testimonials'
  title: 'Loved by teams around the world'
  subtitle: 'See what our customers have to say'
  items:
    - quote: 'CloudFlow transformed how our team works.'
      author: 'Sarah Chen'
      role: 'VP of Engineering'
      company: 'TechCorp'
      avatar: 'https://i.pravatar.cc/150?img=1'
```

---

### 6. Pricing Section

**Type**: `"pricing"`

Displays pricing plans/tiers.

#### Properties:

- **`title`** (string): Section title
- **`subtitle`** (string): Section subtitle
- **`items`** (array of objects, required): Pricing plan list
  - **`name`** (string): Plan name
  - **`price`** (string): Price amount (e.g., "$9", "Custom")
  - **`period`** (string): Billing period (e.g., "/month", "/year", "")
  - **`description`** (string): Plan description
  - **`features`** (array of strings): List of features included
  - **`cta`** (object): Call-to-action button
    - `text` (string): Button text
    - `href` (string): Button URL
  - **`highlighted`** (boolean): Whether to highlight this plan

**Example**:

```yaml
- type: 'pricing'
  title: 'Simple, transparent pricing'
  subtitle: 'Choose the perfect plan for your team'
  items:
    - name: 'Professional'
      price: '$29'
      period: '/user/month'
      description: 'For growing teams that need more power'
      features:
        - 'Unlimited users'
        - '100 GB storage'
        - 'Advanced integrations'
        - 'Priority support'
      cta:
        text: 'Start Free Trial'
        href: '/signup?plan=pro'
      highlighted: true
```

---

### 7. Team Section

**Type**: `"team"`

Displays team members or staff.

#### Properties:

- **`title`** (string): Section title
- **`subtitle`** (string): Section subtitle
- **`members`** (array of objects, required): Team member list
  - **`name`** (string): Member name
  - **`role`** (string): Job title/position
  - **`bio`** (string): Short biography
  - **`image`** (string): Profile photo URL

**Example**:

```yaml
- type: 'team'
  title: 'Meet Our Team'
  subtitle: 'Passionate people behind your dining experience'
  members:
    - name: 'Marco Rossi'
      role: 'Executive Chef'
      bio: 'Trained in Rome, Marco brings 20 years of expertise.'
      image: 'https://i.pravatar.cc/300?img=12'
```

---

### 8. Gallery Section

**Type**: `"gallery"`

Image gallery grid.

#### Properties:

- **`title`** (string): Section title
- **`subtitle`** (string): Section subtitle
- **`images`** (array of objects, required): Image list
  - **`src`** (string): Image URL
  - **`alt`** (string): Alt text for accessibility

**Example**:

```yaml
- type: 'gallery'
  title: 'Taste of Italy'
  subtitle: 'A visual journey through our culinary creations'
  images:
    - src: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600'
      alt: 'Pasta dish'
    - src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600'
      alt: 'Pizza margherita'
```

---

### 9. Content Section

**Type**: `"content"`

Text content with optional side image.

#### Properties:

- **`title`** (string): Section title
- **`subtitle`** (string): Section subtitle
- **`content`** (string): Main text content (supports markdown)
- **`image`** (object, optional): Side image
  - **`src`** (string): Image URL
  - **`alt`** (string): Alt text
  - **`position`** (string): Image position - `"left"` or `"right"`

**Example**:

```yaml
- type: 'content'
  title: 'Programs Designed for You'
  subtitle: 'Whatever your fitness goal, we have a program'
  content: |
    At FitFusion, we believe fitness is personal.

    **Strength Training** - Build muscle and increase power.
    **Cardio & HIIT** - Burn calories and boost endurance.
  image:
    src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800'
    alt: 'Fitness training session'
    position: 'right'
```

---

### 10. Grid Section

**Type**: `"grid"`

Generic grid layout for cards or categories.

#### Properties:

- **`title`** (string): Section title
- **`subtitle`** (string): Section subtitle
- **`items`** (array of objects, required): Grid items
  - **`title`** (string): Item title
  - **`description`** (string): Item description
  - **`image`** (string): Item image URL
  - **`link`** (string): Item link URL

**Example**:

```yaml
- type: 'grid'
  title: 'Shop by Category'
  subtitle: "Find exactly what you're looking for"
  items:
    - title: "Women's Collection"
      description: 'Elegant dresses, tops, and more'
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400'
      link: '/shop/women'
```

---

### 11. FAQ Section

**Type**: `"faq"`

Frequently asked questions.

#### Properties:

- **`title`** (string): Section title
- **`items`** (array of objects, required): FAQ list
  - **`question`** (string): The question
  - **`answer`** (string): The answer

**Example**:

```yaml
- type: 'faq'
  title: 'Frequently Asked Questions'
  items:
    - question: 'Do I need experience to join?'
      answer: 'Not at all! We welcome members of all fitness levels.'
    - question: 'What should I bring to my first class?'
      answer: 'Just bring comfortable workout clothes and a water bottle.'
```

---

### 12. CTA Section

**Type**: `"cta"`

Call-to-action section (typically at end of page).

#### Properties:

- **`title`** (string): CTA headline
- **`subtitle`** (string): Supporting text
- **`cta`** (object): Action buttons
  - **`primary`** (object): Main CTA button
    - `text` (string): Button text
    - `href` (string): Button URL
  - **`secondary`** (object, optional): Secondary button
    - `text` (string): Button text
    - `href` (string): Button URL

**Example**:

```yaml
- type: 'cta'
  title: 'Ready to transform your workflow?'
  subtitle: 'Join 50,000+ teams already using CloudFlow'
  cta:
    primary:
      text: 'Start Free Trial'
      href: '/signup'
    secondary:
      text: 'Schedule Demo'
      href: '/demo'
```

---

## Example Templates

The following pre-configured templates are available:

1. **config-saas-tech.yaml** - SaaS/Technology platform (CloudFlow)
2. **config-restaurant.yaml** - Restaurant/Food service (Bella Italia)
3. **config-fitness.yaml** - Fitness/Wellness studio (FitFusion)
4. **config-agency.yaml** - Creative/Digital agency (PixelCraft)
5. **config-ecommerce.yaml** - E-commerce/Fashion store (StyleHub)
6. **config-learnhub.yaml** - Education/Learning platform (LearnHub)

## Best Practices

### Color Selection

- Use hex color codes for consistency
- Ensure sufficient contrast between primary/secondary colors
- Test colors for accessibility (WCAG AA compliance)

### Content Guidelines

- Keep titles concise (5-10 words)
- Subtitles should be 10-20 words
- Feature descriptions: 10-25 words
- Testimonial quotes: 20-50 words

### Image URLs

- Use HTTPS URLs
- Recommended image sizes:
  - Hero images: 1200px+ width
  - Gallery images: 600-800px width
  - Avatars: 150-300px square
  - Logos: 150x50px recommended
- Always include descriptive `alt` text

### Navigation Structure

- Limit top-level links to 5-7 items
- Use dropdowns (`children`) for related content
- Ensure mobile-friendly navigation
- CTA button should stand out

### Section Order Recommendations

1. Hero (always first)
2. Logo Cloud (social proof)
3. Features or Stats
4. Content sections
5. Testimonials
6. Pricing (if applicable)
7. FAQ (if applicable)
8. CTA (always last)

---

## AI Integration Guidelines

When generating or modifying configuration files:

1. **Maintain Structure**: Always follow the schema exactly as documented
2. **Required Fields**: Never omit required properties
3. **Consistent Naming**: Use lowercase kebab-case for file names
4. **Brand Cohesion**: Ensure colors, content, and imagery align with the brand
5. **Section Flow**: Order sections logically for user experience
6. **Content Quality**: Write clear, engaging copy appropriate to the industry
7. **Accessibility**: Include alt text for all images
8. **Links**: Ensure all href values are valid (use # for anchors, / for routes)

---

## Validation

Before deploying a configuration file, verify:

- [ ] All required fields are present
- [ ] Color codes are valid hex format
- [ ] Image URLs are accessible
- [ ] All links have proper href values
- [ ] Section types match available components
- [ ] Content is free of typos and grammatically correct
- [ ] Brand voice is consistent throughout

---

## Support

For questions or issues with configuration files:

- Check the component registry in `lib/section-registry.ts`
- Review existing example configs in the `config/` directory
- Refer to component implementations in `components/atomic/`
