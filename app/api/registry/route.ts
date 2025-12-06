/**
 * API Endpoint: Get Section Registry Info or Page Data
 * GET /api/registry?slug=/blog
 *
 * Returns information about all registered sections or specific page data from config
 * Only available in development mode
 */

import { NextResponse } from 'next/server';
import { getAvailableSections } from '@/lib/dev-utils';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  // If slug is provided, return page data from config
  if (slug) {
    try {
      const configPath = path.join(process.cwd(), 'config', 'config.yaml');
      const configContent = fs.readFileSync(configPath, 'utf-8');
      const config: any = yaml.load(configContent);

      // Find the page with matching slug
      const page = config.pages?.find((p: any) => p.slug === slug);

      if (!page) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 });
      }

      // Return page data without sections (for dedicated pages like blog, about, etc)
      const { sections, ...pageData } = page;

      return NextResponse.json(pageData);
    } catch (error) {
      return NextResponse.json(
        {
          error: error instanceof Error ? error.message : 'Failed to load config',
        },
        { status: 500 }
      );
    }
  }

  // Original registry endpoint
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'This endpoint is only available in development mode' },
      { status: 403 }
    );
  }

  try {
    const sections = getAvailableSections();

    // Group by category
    const byCategory: Record<string, typeof sections> = {};
    sections.forEach((section) => {
      const category = section.category || 'other';
      if (!byCategory[category]) {
        byCategory[category] = [];
      }
      byCategory[category].push(section);
    });

    return NextResponse.json({
      success: true,
      data: {
        total: sections.length,
        sections,
        byCategory,
        types: sections.map((s) => s.type),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
