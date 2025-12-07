import { NextRequest, NextResponse } from 'next/server';
import { loadConfig } from '@/lib/config-loader';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        if (!slug) {
            return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
        }

        const config = await loadConfig();

        if (!config || !config.pages) {
            return NextResponse.json({ error: 'Configuration not found' }, { status: 500 });
        }

        // Find the page data for the requested slug
        const pageData = config.pages.find((page: any) => page.slug === slug);

        if (!pageData) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        // Return the page data without the slug and title/description (those are for metadata)
        const { slug: _, title, description, ...data } = pageData;

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error loading page data:', error);
        return NextResponse.json(
            { error: 'Failed to load page data' },
            { status: 500 }
        );
    }
}
