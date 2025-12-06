# Dynamic Website Builder

A Server-Driven UI (SDUI) website builder built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see your website.

## 📁 Project Structure

```
web-builder/
├── app/                      # Next.js 14 App Router
│   ├── layout.tsx           # Root layout with theme injection
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── atomic/              # Atomic components (Hero, Features, etc.)
│   └── component-renderer.tsx  # Component routing logic
├── lib/
│   ├── utils.ts             # Utility functions for optional-first rendering
│   └── cn.ts                # Tailwind class name merger
├── types/
│   └── index.ts             # TypeScript interfaces for all components
├── config/                  # Configuration files (YAML/JSON)
├── openspec/                # OpenSpec documentation
│   ├── changes/             # Proposals and task breakdowns
│   ├── specs/               # Component specifications
│   └── project.md           # Project conventions
└── package.json
```

## 🎨 Architecture

### Server-Driven UI (SDUI)
All content, layouts, and styling are driven by configuration files. No hardcoded content in components.

### Optional-First Design
Every field is optional by default with graceful degradation. Components return `null` if no minimum content is available.

### Component Pattern
```typescript
export function Component({ section }: Props) {
  const props = section?.props;
  
  // Early return if no renderable content
  if (!props || !hasMinimumContent(props)) {
    return null;
  }
  
  return (
    <section>
      {props.title && <h2>{props.title}</h2>}
      {/* Conditional rendering for all fields */}
    </section>
  );
}
```

## 📚 Documentation

- **[OpenSpec Specifications](./openspec/)** - Complete technical specifications
- **[Project Conventions](./openspec/project.md)** - Coding standards and patterns
- **[v2.0 Proposal](./openspec/changes/proposal-v2.0.md)** - Latest feature expansion

## 🧩 Available Components (v1.0)

- **Hero** - Landing sections with CTAs (4 layouts)
- **Features** - Feature grids with icons (2-4 columns)
- **Stats** - Metrics with animations (4 layouts)
- **Team** - Team member showcases (3 layouts)
- **Testimonials** - Customer reviews (4 layouts)
- **Grid** - Portfolio/project grids with filtering

## 🛠️ Tech Stack

- **Next.js 14** - App Router with React Server Components
- **TypeScript 5+** - Strict mode with comprehensive types
- **Tailwind CSS 3+** - Utility-first styling with CSS Variables
- **Lucide React** - Icon system
- **Zod** - Runtime validation
- **Vitest** - Unit testing
- **Playwright** - E2E testing

## 📝 Configuration Example

```yaml
site:
  name: "My Website"
  theme:
    primary: "#0066cc"
    secondary: "#666666"

pages:
  - slug: "/"
    sections:
      - type: hero
        props:
          title: "Welcome"
          buttons:
            - text: "Get Started"
              href: "/signup"
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e
```

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Lint code
- `npm run format` - Format with Prettier
- `npm run type-check` - TypeScript type checking

## 🤝 Contributing

See [project conventions](./openspec/project.md) for coding standards, git workflow, and architecture patterns.

## 📄 License

MIT License - see LICENSE file for details

---

**Version:** 2.0.0  
**Last Updated:** December 6, 2025
