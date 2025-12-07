import { ComponentRenderer } from '@/components/component-renderer';
import { SkeletonView } from '@/components/skeleton-view';
import { ConfigWatcher } from '@/components/config-watcher';
import type { PageConfig, SiteConfig } from '@/types';
import { generateThemeVars } from '@/lib/utils';
import { loadSiteConfig, loadPageConfig } from '@/lib/config-loader';

async function getPageConfig(slug: string): Promise<PageConfig | null> {
  return loadPageConfig(slug);
}

async function getSiteConfig(): Promise<SiteConfig | null> {
  return loadSiteConfig();
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

