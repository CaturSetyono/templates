import { NextResponse } from 'next/server';
import { loadConfig } from '@/lib/config-loader';

export async function GET() {
    try {
        const config = await loadConfig();

        if (!config) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Configuration not found',
                    configType: 'none'
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            configType: config.configType || 'json',
            siteName: config.site?.name || 'Unknown',
            pagesCount: config.pages?.length || 0
        });
    } catch (error) {
        console.error('Error checking config:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to load configuration',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
