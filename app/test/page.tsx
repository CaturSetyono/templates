import { ComponentRenderer } from '@/components/component-renderer';
import type { PageConfig, SiteConfig } from '@/types';
import { generateThemeVars } from '@/lib/utils';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Load YAML configuration file
async function loadYamlConfig(): Promise<{ site: SiteConfig; pages: PageConfig[] }> {
  try {
    const configPath = path.join(process.cwd(), 'config', 'example-site.yaml');
    const fileContents = fs.readFileSync(configPath, 'utf8');
    const data = yaml.load(fileContents) as any;

    return {
      site: data.site,
      pages: data.pages,
    };
  } catch (error) {
    console.error('Error loading YAML config:', error);
    return {
      site: {
        name: 'Default Site',
        theme: {
          primary: '#0066cc',
          secondary: '#666666',
          accent: '#f59e0b',
        },
      },
      pages: [],
    };
  }
}

export default async function TestPage() {
  const { site, pages } = await loadYamlConfig();
  const homePage = pages.find((page) => page.slug === '/');

  const themeVars = generateThemeVars(site.theme || {});

  return (
    <main className="min-h-screen bg-gray-50" style={themeVars}>
      {/* Debug Info */}
      <div className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">🧪 Test Page - Config dari YAML</h1>
          <p className="text-blue-100">Site: {site.name}</p>
        </div>
      </div>

      {/* Render sections from YAML */}
      {homePage?.sections?.map((section, index) => (
        <ComponentRenderer key={section.id || `section-${index}`} section={section} />
      ))}

      {/* Debug Panel */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">📊 Debug Information</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Site Config:</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
                {JSON.stringify(site, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Page Sections ({homePage?.sections?.length || 0}):
              </h3>
              <div className="space-y-2">
                {homePage?.sections?.map((section, index) => (
                  <div key={index} className="bg-gray-100 p-3 rounded">
                    <p className="font-mono text-sm">
                      <span className="font-bold">Type:</span> {section.type}
                      {section.id && <span className="text-gray-600"> | ID: {section.id}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Full Page Config:</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm max-h-96">
                {JSON.stringify(homePage, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
