import { ComponentRenderer } from '@/components/component-renderer';
import { SkeletonView } from '@/components/skeleton-view';
import { ConfigWatcher } from '@/components/config-watcher';
import type { PageConfig, SiteConfig, BaseSection } from '@/types';
import { generateThemeVars } from '@/lib/utils';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Load configuration from YAML file
interface YAMLConfig {
  site: SiteConfig;
  pages?: PageConfig[];
  sections?: BaseSection[]; // New structure: direct sections
}

async function loadConfig(): Promise<YAMLConfig | null> {
  const configPath = path.join(process.cwd(), 'config', 'config.yaml');

  try {
    if (fs.existsSync(configPath)) {
      const fileContents = fs.readFileSync(configPath, 'utf8');
      const config = yaml.load(fileContents) as YAMLConfig;
      return config;
    }
  } catch (error) {
    console.error('Error loading config:', error);
  }
  return null;
}

async function getPageConfig(slug: string): Promise<PageConfig | null> {
  const config = await loadConfig();
  if (!config) return null;

  // Support old structure with pages array
  if (config.pages && Array.isArray(config.pages)) {
    const page = config.pages.find((p) => p.slug === slug);
    return page || null;
  }

  // Support new structure with direct sections (for home page)
  if (config.sections && slug === '/') {
    return {
      slug: '/',
      title: 'Home',
      description: config.site.description || '',
      sections: config.sections
    };
  }

  return null;
}

async function getSiteConfig(): Promise<SiteConfig | null> {
  const config = await loadConfig();
  return config ? config.site : null;
}

export default async function HomePage() {
  const siteConfig = await getSiteConfig();
  const pageConfig = await getPageConfig('/');

  // If no config is found, show the skeleton view with the watcher
  if (!siteConfig || !pageConfig) {
    return (
      <>
        <ConfigWatcher />
        <SkeletonView />
      </>
    );
  }

  const themeVars = generateThemeVars(siteConfig.theme);

  return (
    <main className="min-h-screen" style={themeVars}>
      <ConfigWatcher />
      {/* Render page sections from YAML config */}
      {pageConfig?.sections && pageConfig.sections.length > 0 ? (
        <div>
          {pageConfig.sections.map((section, index) => (
            <ComponentRenderer key={section.id || `section-${index}`} section={section} />
          ))}
        </div>
      ) : (
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">{siteConfig.name}</h1>
          <p className="text-xl text-gray-600 mb-8">
            {siteConfig.description || 'Welcome to our website'}
          </p>
          <p className="text-gray-500">No sections configured for this page.</p>
        </div>
      )}
    </main>
  );
}

