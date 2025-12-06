import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import type { SiteConfig } from '@/types';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dynamic Website Builder',
  description: 'Server-Driven UI website builder with Next.js 14',
};

// Load site configuration
async function loadSiteConfig(): Promise<SiteConfig | null> {
  try {
    const configPath = path.join(process.cwd(), 'config', 'config.yaml');
    const fileContents = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(fileContents) as any;
    console.log('Site Config Loaded:', JSON.stringify(config.site, null, 2));
    return config.site || null;
  } catch (error) {
    console.error('Failed to load site config:', error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await loadSiteConfig();
  const theme = siteConfig?.theme;

  const themeStyles = theme
    ? ({
      '--color-primary': theme.primary,
      '--color-secondary': theme.secondary,
      '--color-accent': theme.accent,
    } as React.CSSProperties)
    : {};

  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className} style={themeStyles}>
        <ThemeProvider>
          <Navbar config={siteConfig?.navigation} />
          {children}
          <Footer config={siteConfig?.footer} />
        </ThemeProvider>
      </body>
    </html>
  );
}
