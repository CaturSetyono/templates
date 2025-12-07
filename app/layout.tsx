import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import type { SiteConfig } from '@/types';
import { loadSiteConfig } from '@/lib/config-loader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dynamic Website Builder',
  description: 'Server-Driven UI website builder with Next.js 14',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = loadSiteConfig();
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
