# Project Context: Dynamic Website Builder

## Purpose

**Digital Agency Dynamic Platform** - A Server-Driven UI (SDUI) website builder that enables non-technical users to create and deploy fully functional, production-ready websites through JSON/YAML configuration files.

### Goals
- **Zero Hardcoding Philosophy**: All content, colors, layouts, and behavior driven by configuration
- **Optional-First Design**: Every field is optional by default with graceful degradation
- **Two-Role Architecture**: API Specialists design configs, Template Architects build the engine
- **Instant Deployment**: CI/CD pipeline auto-deploys on configuration push
- **Production Quality**: Enterprise-grade performance, accessibility, and SEO

## Tech Stack

### Core Framework
- **Next.js 14**: App Router with React Server Components
- **TypeScript 5+**: Strict mode with comprehensive type safety
- **Tailwind CSS 3+**: Utility-first styling with CSS Variables for theming

### Component Libraries
- **Lucide React**: Icon system (primary)
- **Heroicons**: Alternative icon system
- **Framer Motion**: Animation library (optional)

### Data & Validation
- **Zod**: Runtime schema validation for configurations
- **JSON Schema**: Configuration documentation and IDE support
- **YAML**: Human-friendly configuration format

### Development Tools
- **ESLint**: Code quality with custom rules for optional chaining
- **Prettier**: Code formatting (2-space indent, single quotes)
- **Vitest**: Unit and integration testing
- **Playwright**: E2E testing

### Deployment
- **Vercel**: Hosting platform (recommended)
- **GitHub Actions**: CI/CD pipeline
- **Vercel Edge Config**: Configuration storage and versioning

## Project Conventions

### Code Style

#### Naming Conventions
```typescript
// Components: PascalCase
export function HeroSection({ section }: Props) { }

// Props interfaces: ComponentName + Props suffix
interface HeroSectionProps { }

// Configuration types: ComponentName + Section suffix
interface HeroSection extends BaseSection { }

// Utility functions: camelCase
function safeMap<T>(items?: T[]): T[] { }

// Constants: SCREAMING_SNAKE_CASE
const DEFAULT_THEME_COLOR = '#000000';

// Files: kebab-case
// hero-section.tsx, conditional-rendering.ts
```

#### TypeScript Conventions
```typescript
// ✅ All fields optional except critical IDs
interface ComponentSection {
  type: string;           // Required: identifies component
  id?: string;            // Optional: for anchor links
  props?: {               // Optional: entire props object
    title?: string;       // Optional: all content fields
    items?: Array<{       // Optional: collections
      id: string;         // Required: for React keys
      text?: string;      // Optional: nested fields
    }>;
  };
}

// ✅ Use optional chaining extensively
{section?.props?.title && <h2>{section.props.title}</h2>}

// ✅ Use nullish coalescing for defaults
const columns = props?.columns ?? 3;

// ❌ Avoid non-null assertions
const title = props!.title!;  // NEVER do this

// ✅ Early returns for missing content
if (!props?.items || props.items.length === 0) return null;
```

#### Formatting Rules (Prettier)
- **Indent**: 2 spaces
- **Quotes**: Single quotes for strings
- **Semicolons**: Always
- **Line Length**: 100 characters
- **Trailing Commas**: ES5 style
- **Arrow Functions**: Always use parentheses

### Architecture Patterns

#### 1. Server-Driven UI (SDUI) Pattern
```typescript
// Configuration drives rendering
const config = await fetchPageConfig(slug);
const sections = config.sections || [];

return (
  <main>
    {sections.map((section) => (
      <ComponentRenderer key={section.id || section.type} section={section} />
    ))}
  </main>
);
```

#### 2. Component Renderer Pattern
```typescript
// Single entry point for all atomic components
export function ComponentRenderer({ section }: { section: BaseSection }) {
  switch (section.type) {
    case 'hero': return <HeroSection section={section as HeroSection} />;
    case 'features': return <FeaturesSection section={section as FeaturesSection} />;
    // ... other components
    default: return null;
  }
}
```

#### 3. Optional-First Rendering Pattern
```typescript
// Template for all components
export function Component({ section }: { section: ComponentSection }) {
  const props = section?.props;
  
  // 1. Early return if no renderable content
  if (!props || !hasMinimumContent(props)) {
    return null;
  }
  
  return (
    <section id={section.id} className={cn('component', props.className)}>
      {/* 2. Conditional rendering for every field */}
      {props.title && <h2>{props.title}</h2>}
      
      {/* 3. Safe array operations */}
      {props.items && props.items.length > 0 && (
        <div>
          {props.items.map((item) => item.text && (
            <div key={item.id}>{item.text}</div>
          ))}
        </div>
      )}
    </section>
  );
}
```

#### 4. Theme Injection Pattern
```typescript
// CSS Variables for dynamic theming
const themeVars = {
  '--color-primary': config.theme?.primary || '#000000',
  '--color-secondary': config.theme?.secondary || '#666666',
};

<div style={themeVars}>
  {/* All components use var(--color-primary) */}
</div>
```

#### 5. Atomic Component Design
- **Self-Contained**: Each component has single responsibility
- **Zero Dependencies**: Components don't import each other
- **Composable**: Assembled via ComponentRenderer
- **Testable**: Can be tested in isolation

### Testing Strategy

#### Unit Tests (Vitest)
```typescript
// Test every component with 3 scenarios:
describe('HeroSection', () => {
  it('renders with full props', () => {
    const section = { type: 'hero', props: { title: 'Test', buttons: [...] } };
    render(<HeroSection section={section} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('renders with minimal props', () => {
    const section = { type: 'hero', props: { title: 'Test' } };
    render(<HeroSection section={section} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('returns null with empty props', () => {
    const section = { type: 'hero', props: {} };
    const { container } = render(<HeroSection section={section} />);
    expect(container.firstChild).toBeNull();
  });
});
```

#### Integration Tests
- Test ComponentRenderer with various section combinations
- Test theme injection with different color configurations
- Test responsive behavior at breakpoints (mobile, tablet, desktop)

#### E2E Tests (Playwright)
- Test full page rendering from configuration
- Test navigation flows (navbar, footer links)
- Test interactive elements (forms, accordions, modals)
- Test accessibility with screen readers

#### Testing Checklist (per component)
- [ ] Renders with full props
- [ ] Renders with minimal props
- [ ] Returns null with empty/undefined props
- [ ] Handles missing nested properties safely
- [ ] Theme colors applied correctly
- [ ] Responsive at all breakpoints (sm, md, lg, xl)
- [ ] Keyboard navigation works
- [ ] Screen reader compatible (ARIA labels)
- [ ] No console errors or warnings

### Git Workflow

#### Branching Strategy
```
main                    # Production-ready code
├── develop             # Integration branch
    ├── feature/*       # New features (feature/hero-component)
    ├── fix/*           # Bug fixes (fix/navbar-mobile-menu)
    ├── docs/*          # Documentation (docs/update-readme)
    └── refactor/*      # Code improvements (refactor/conditional-utils)
```

#### Commit Conventions (Conventional Commits)
```bash
# Format: <type>(<scope>): <description>

# Types:
feat: Add new component or feature
fix: Bug fix
docs: Documentation changes
style: Code formatting (no logic change)
refactor: Code restructuring (no behavior change)
test: Add or update tests
chore: Build, dependencies, tooling

# Examples:
feat(hero): add full-height layout variant
fix(navbar): resolve mobile menu z-index issue
docs(specs): update conditional rendering guide
refactor(utils): extract safe array operations
test(pricing): add toggle interaction tests
```

#### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New component
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactoring

## Testing Checklist
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Accessibility tested

## Screenshots (if UI changes)
[Add screenshots]
```

## Domain Context

### Core Concepts

#### 1. Atomic Components (15 total)
**Navigation**: Navbar, Footer  
**Core**: Hero, Features, Stats, Team, Testimonials, Grid  
**Conversion**: CTA, Contact Form, Pricing  
**Content**: Blog, FAQ, Gallery, Timeline, Video  
**Branding**: Partners/Logos

#### 2. Configuration-Driven Architecture
- **API Specialist Role**: Designs JSON/YAML configurations without coding
- **Template Architect Role**: Builds component engine that interprets configs
- **Zero Hardcoding**: No text, colors, or layouts in component code
- **Optional-First**: All fields optional with sensible structural defaults

#### 3. Layout Variants
Components support multiple layouts via `layout` prop:
- Hero: `centered`, `split`, `minimal`, `full-height`
- Features: `grid`, `cards`
- Pricing: `2`, `3`, `4` columns
- FAQ: `single`, `two-column`

#### 4. Theme System
CSS Variables injected at root:
- `--color-primary`: Main brand color
- `--color-secondary`: Accent color
- `--color-accent`: Third brand color
- Components use `var()` references, never hardcoded colors

### Configuration File Structure
```yaml
site:
  name: "Company Name"
  theme:
    primary: "#hex"
    secondary: "#hex"
  navigation: { ... }
  footer: { ... }

pages:
  - slug: "/"
    sections:
      - type: "hero"
        id: "home-hero"
        props: { ... }
      - type: "features"
        props: { ... }
```

## Important Constraints

### Technical Constraints
1. **Browser Support**: Last 2 versions of major browsers (Chrome, Firefox, Safari, Edge)
2. **Performance Budget**:
   - First Contentful Paint (FCP): < 1.8s
   - Largest Contentful Paint (LCP): < 2.5s
   - Time to Interactive (TTI): < 3.8s
   - Lighthouse Score: > 90
3. **Bundle Size**: Initial JS bundle < 150KB gzipped
4. **Image Optimization**: All images via Next.js Image component with lazy loading

### Design Constraints
1. **Responsive Breakpoints** (Tailwind defaults):
   - `sm`: 640px
   - `md`: 768px
   - `lg`: 1024px
   - `xl`: 1280px
   - `2xl`: 1536px
2. **Accessibility**: WCAG 2.1 Level AA compliance
3. **Typography**: System font stack for performance
4. **Animation**: Respect `prefers-reduced-motion`

### Business Constraints
1. **Configuration Validation**: All configs validated before deployment
2. **Backward Compatibility**: Old configs must work with new component versions
3. **No Breaking Changes**: New features must be additive (optional fields)
4. **Documentation**: Every new field requires schema documentation

## External Dependencies

### Required Services
- **Vercel/Netlify**: Hosting and edge functions
- **GitHub/GitLab**: Version control and CI/CD
- **CDN**: Image and asset delivery (Cloudflare, Vercel CDN)

### Optional Integrations
- **CMS**: Headless CMS for config management (Contentful, Sanity)
- **Analytics**: Vercel Analytics, Google Analytics
- **Form Handling**: Formspree, SendGrid (for contact forms)
- **Video**: YouTube API, Vimeo API (for video embeds)
- **Search**: Algolia (for FAQ/blog search)

### API Contracts

#### Configuration API
```typescript
// GET /api/config/:slug
{
  "site": { ... },
  "page": {
    "slug": "/",
    "sections": [ ... ]
  }
}
```

#### Validation API
```typescript
// POST /api/validate
Request: { config: {...} }
Response: { 
  valid: boolean,
  errors?: Array<{ path: string, message: string }>
}
```

## Development Workflow

### Local Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Build for production
npm run build

# Preview production build
npm run start
```

### Configuration Development Cycle
1. Edit YAML config in `config/` directory
2. Config auto-validates on save (ESLint + Zod)
3. Hot reload reflects changes instantly
4. Test with minimal → full props progression
5. Commit config with conventional commit message
6. PR auto-deploys preview environment
7. Merge triggers production deployment

### Component Development Cycle
1. Create spec in `openspec/specs/` (OpenSpec format)
2. Generate TypeScript interface from spec
3. Implement component with optional-first pattern
4. Write unit tests (3 scenarios minimum)
5. Add to ComponentRenderer switch
6. Test with sample YAML payload
7. Document in component library (Storybook optional)

---

**Last Updated**: December 6, 2025  
**Version**: 2.0.0  
**Maintainers**: Template Architects Team
