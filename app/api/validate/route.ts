/**
 * API Endpoint: Validate Config
 * POST /api/validate
 *
 * Validates a page configuration
 * Only available in development mode
 */

import { NextRequest, NextResponse } from 'next/server';
import { validatePageConfig, createConfigHealthReport } from '@/lib/dev-utils';
import type { BaseSection } from '@/types';

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'This endpoint is only available in development mode' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const sections = body.sections as BaseSection[];

    if (!Array.isArray(sections)) {
      return NextResponse.json(
        { error: 'Invalid request body. Expected { sections: [...] }' },
        { status: 400 }
      );
    }

    const validation = validatePageConfig(sections);
    const healthReport = createConfigHealthReport(sections);

    return NextResponse.json({
      success: true,
      data: {
        validation,
        healthReport,
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
