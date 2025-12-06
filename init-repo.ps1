# Script untuk inisialisasi repository dan commit file per file

# Initialize git repository
Write-Host "Initializing git repository..." -ForegroundColor Green
git init

# Create and add README.md
Write-Host "Creating README.md..." -ForegroundColor Green
echo "# templates" > README.md
git add README.md
git commit -m "Initial commit: Add README.md"

# Set main branch
Write-Host "Setting main branch..." -ForegroundColor Green
git branch -M main

# Add remote origin
Write-Host "Adding remote origin..." -ForegroundColor Green
git remote add origin https://github.com/CaturSetyono/templates.git

# Commit files one by one with descriptive messages

# Root configuration files
Write-Host "Committing root configuration files..." -ForegroundColor Cyan
git add LICENSE
git commit -m "Add MIT License file"

git add next-env.d.ts
git commit -m "Add Next.js TypeScript environment definitions"

git add next.config.js
git commit -m "Add Next.js configuration"

git add package.json
git commit -m "Add package.json with project dependencies"

git add postcss.config.js
git commit -m "Add PostCSS configuration for Tailwind"

git add tailwind.config.ts
git commit -m "Add Tailwind CSS configuration"

git add tsconfig.json
git commit -m "Add TypeScript configuration"

git add switch-theme.ps1
git commit -m "Add PowerShell script for theme switching"

# App directory - main pages
Write-Host "Committing app directory files..." -ForegroundColor Cyan
git add app/globals.css
git commit -m "Add global CSS styles"

git add app/layout.tsx
git commit -m "Add root layout component"

git add app/page.tsx
git commit -m "Add home page component"

git add app/about/page.tsx
git commit -m "Add about page"

git add app/blog/page.tsx
git commit -m "Add blog page"

git add app/docs/page.tsx
git commit -m "Add documentation page"

git add app/signup/page.tsx
git commit -m "Add signup page"

git add app/status/page.tsx
git commit -m "Add status page"

git add app/test/page.tsx
git commit -m "Add test page"

# App API routes
Write-Host "Committing API routes..." -ForegroundColor Cyan
git add app/api/page.tsx
git commit -m "Add API documentation page"

git add app/api/registry/route.ts
git commit -m "Add component registry API endpoint"

git add app/api/validate/route.ts
git commit -m "Add config validation API endpoint"

git add app/api/config/check/route.ts
git commit -m "Add config check API endpoint"

# Components - main
Write-Host "Committing main components..." -ForegroundColor Cyan
git add components/component-renderer.tsx
git commit -m "Add dynamic component renderer"

git add components/config-watcher.tsx
git commit -m "Add config file watcher component"

git add components/footer.tsx
git commit -m "Add footer component"

git add components/navbar.tsx
git commit -m "Add navbar component"

git add components/skeleton-view.tsx
git commit -m "Add skeleton loading view component"

git add components/theme-provider.tsx
git commit -m "Add theme provider component"

# Components - atomic sections
Write-Host "Committing atomic section components..." -ForegroundColor Cyan
git add components/atomic/hero-section.tsx
git commit -m "Add hero section component"

git add components/atomic/logo-cloud-section.tsx
git commit -m "Add logo cloud section component"

git add components/atomic/features-section.tsx
git commit -m "Add features section component"

git add components/atomic/stats-section.tsx
git commit -m "Add stats section component"

git add components/atomic/testimonials-section.tsx
git commit -m "Add testimonials section component"

git add components/atomic/pricing-section.tsx
git commit -m "Add pricing section component"

git add components/atomic/team-section.tsx
git commit -m "Add team section component"

git add components/atomic/gallery-section.tsx
git commit -m "Add gallery section component"

git add components/atomic/content-section.tsx
git commit -m "Add content section component"

git add components/atomic/grid-section.tsx
git commit -m "Add grid section component"

git add components/atomic/faq-section.tsx
git commit -m "Add FAQ section component"

git add components/atomic/cta-section.tsx
git commit -m "Add CTA section component"

git add components/atomic/contact-section.tsx
git commit -m "Add contact section component"

git add components/atomic/navbar.tsx
git commit -m "Add atomic navbar component"

# Components - UI
Write-Host "Committing UI components..." -ForegroundColor Cyan
git add components/ui/theme-toggle.tsx
git commit -m "Add theme toggle UI component"

# Config files
Write-Host "Committing configuration files..." -ForegroundColor Cyan
git add config/config.yaml
git commit -m "Add main configuration file"

git add config/config-saas-tech.yaml
git commit -m "Add SaaS/Tech template configuration"

git add config/config-restaurant.yaml
git commit -m "Add restaurant template configuration"

git add config/config-fitness.yaml
git commit -m "Add fitness template configuration"

git add config/config-agency.yaml
git commit -m "Add agency template configuration"

git add config/config-ecommerce.yaml
git commit -m "Add e-commerce template configuration"

git add config/README.md
git commit -m "Add configuration documentation"

# Documentation
Write-Host "Committing documentation files..." -ForegroundColor Cyan
git add docs/README.md
git commit -m "Add main documentation README"

git add docs/INDEX.md
git commit -m "Add documentation index"

git add docs/SETUP.md
git commit -m "Add setup guide"

git add docs/TESTING.md
git commit -m "Add testing documentation"

git add docs/INTEGRATION-GUIDE.md
git commit -m "Add integration guide"

git add docs/QUICK-TEST.md
git commit -m "Add quick test guide"

git add docs/project.md
git commit -m "Add project documentation"

git add docs/AGENTS.md
git commit -m "Add agents documentation"

git add docs/DYNAMIC-SECTIONS.md
git commit -m "Add dynamic sections documentation"

git add docs/DYNAMIC-SECTIONS-QUICKSTART.md
git commit -m "Add dynamic sections quickstart guide"

git add docs/DYNAMIC-SYSTEM-SUMMARY.md
git commit -m "Add dynamic system summary"

# Library utilities
Write-Host "Committing library files..." -ForegroundColor Cyan
git add lib/cn.ts
git commit -m "Add className utility function"

git add lib/dev-utils.ts
git commit -m "Add development utilities"

git add lib/safe-access.ts
git commit -m "Add safe object access utility"

git add lib/section-registry.ts
git commit -m "Add section component registry"

git add lib/themes.ts
git commit -m "Add theme utilities"

git add lib/utils.ts
git commit -m "Add general utility functions"

# Types
Write-Host "Committing type definitions..." -ForegroundColor Cyan
git add types/index.ts
git commit -m "Add main type definitions"

git add types/theme.ts
git commit -m "Add theme type definitions"

# OpenSpec documentation
Write-Host "Committing OpenSpec documentation..." -ForegroundColor Cyan
git add openspec/changes/FINAL-PROPOSAL.md
git commit -m "Add final proposal documentation"

git add openspec/changes/proposal-v2.0.md
git commit -m "Add proposal v2.0 documentation"

git add openspec/changes/proposal.md
git commit -m "Add initial proposal documentation"

git add openspec/changes/tasks-v2.0.md
git commit -m "Add tasks v2.0 documentation"

git add openspec/changes/tasks.md
git commit -m "Add tasks documentation"

git add openspec/changes/archive/proposal-v1.0.md
git commit -m "Add archived proposal v1.0"

git add openspec/specs/features.delta.md
git commit -m "Add features delta specification"

git add openspec/specs/grid.delta.md
git commit -m "Add grid delta specification"

git add openspec/specs/hero.delta.md
git commit -m "Add hero delta specification"

git add openspec/specs/stats.delta.md
git commit -m "Add stats delta specification"

git add openspec/specs/team.delta.md
git commit -m "Add team delta specification"

git add openspec/specs/testimonials.delta.md
git commit -m "Add testimonials delta specification"

git add openspec/specs/components/new-components-v2.md
git commit -m "Add new components v2 specification"

git add openspec/specs/navigation/footer.delta.md
git commit -m "Add footer delta specification"

git add openspec/specs/navigation/navbar.delta.md
git commit -m "Add navbar delta specification"

git add openspec/specs/payloads/agency-portfolio.yaml
git commit -m "Add agency portfolio payload example"

git add openspec/specs/payloads/minimal-corporate.yaml
git commit -m "Add minimal corporate payload example"

git add openspec/specs/payloads/saas-product.yaml
git commit -m "Add SaaS product payload example"

git add openspec/specs/rendering/conditional-rendering.md
git commit -m "Add conditional rendering specification"

# Scripts
Write-Host "Committing scripts..." -ForegroundColor Cyan
git add scripts/test-config.js
git commit -m "Add config testing script"

git add scripts/validate-configs.js
git commit -m "Add config validation script"

# Push to remote
Write-Host "Pushing to remote repository..." -ForegroundColor Green
git push -u origin main

Write-Host "Done! All files committed successfully." -ForegroundColor Green
