/**
 * Development utilities for section registry and config inspection
 */

import { sectionRegistry } from './section-registry';
import type { BaseSection } from '@/types';

/**
 * Get all available section types
 */
export function getAvailableSections() {
  return sectionRegistry.getAllMetadata();
}

/**
 * Check if a section type is registered
 */
export function isSectionTypeValid(type: string): boolean {
  return sectionRegistry.has(type);
}

/**
 * Get sections by category
 */
export function getSectionsByCategory(category: string) {
  return sectionRegistry.getByCategory(category as any);
}

/**
 * Validate a section config
 */
export function validateSection(section: any): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if section exists
  if (!section) {
    errors.push('Section is null or undefined');
    return { valid: false, errors, warnings };
  }

  // Check type
  if (!section.type) {
    errors.push('Section type is required');
  } else if (!isSectionTypeValid(section.type)) {
    errors.push(`Unknown section type: "${section.type}"`);
    warnings.push(`Available types: ${sectionRegistry.getAllTypes().join(', ')}`);
  }

  // Check props
  if (!section.props || typeof section.props !== 'object') {
    warnings.push('Section has no props or props is not an object');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate entire page config
 */
export function validatePageConfig(sections: BaseSection[]): {
  valid: boolean;
  totalSections: number;
  validSections: number;
  invalidSections: number;
  details: Array<{
    index: number;
    type: string;
    valid: boolean;
    errors: string[];
    warnings: string[];
  }>;
} {
  const details = sections.map((section, index) => ({
    index,
    type: section?.type || 'unknown',
    ...validateSection(section),
  }));

  const validSections = details.filter((d) => d.valid).length;

  return {
    valid: validSections === sections.length,
    totalSections: sections.length,
    validSections,
    invalidSections: sections.length - validSections,
    details,
  };
}

/**
 * Analyze config field usage
 */
export function analyzeConfigUsage(sections: BaseSection[]): {
  sectionTypes: Record<string, number>;
  totalProps: number;
  commonProps: Record<string, number>;
} {
  const sectionTypes: Record<string, number> = {};
  const commonProps: Record<string, number> = {};
  let totalProps = 0;

  sections.forEach((section) => {
    // Count section types
    const type = section?.type || 'unknown';
    sectionTypes[type] = (sectionTypes[type] || 0) + 1;

    // Count props
    if (section.props) {
      const propKeys = Object.keys(section.props);
      totalProps += propKeys.length;

      propKeys.forEach((key) => {
        commonProps[key] = (commonProps[key] || 0) + 1;
      });
    }
  });

  return {
    sectionTypes,
    totalProps,
    commonProps,
  };
}

/**
 * Generate section registry documentation
 */
export function generateRegistryDocs(): string {
  const sections = getAvailableSections();
  const byCategory: Record<string, typeof sections> = {};

  sections.forEach((section) => {
    const category = section.category || 'other';
    if (!byCategory[category]) {
      byCategory[category] = [];
    }
    byCategory[category].push(section);
  });

  let docs = '# Available Sections\n\n';

  Object.entries(byCategory).forEach(([category, items]) => {
    docs += `## ${category.charAt(0).toUpperCase() + category.slice(1)}\n\n`;
    items.forEach((item) => {
      docs += `### ${item.type}\n`;
      docs += `**Display Name:** ${item.displayName}\n`;
      if (item.description) {
        docs += `**Description:** ${item.description}\n`;
      }
      docs += '\n';
    });
  });

  return docs;
}

/**
 * Log section registry info (dev only)
 */
export function logRegistryInfo() {
  if (process.env.NODE_ENV !== 'development') return;

  console.group('🎨 Section Registry Info');
  console.log('Total sections:', sectionRegistry.getAllTypes().length);
  console.log('Available types:', sectionRegistry.getAllTypes());

  const metadata = getAvailableSections();
  const byCategory = metadata.reduce(
    (acc, section) => {
      const cat = section.category || 'other';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  console.table(byCategory);
  console.groupEnd();
}

/**
 * Debug section rendering
 */
export function debugSection(section: BaseSection) {
  if (process.env.NODE_ENV !== 'development') return;

  console.group(`🔍 Section Debug: ${section.type}`);
  console.log('Section ID:', section.id || 'none');
  console.log('Props:', section.props);

  const validation = validateSection(section);
  console.log('Valid:', validation.valid);
  if (validation.errors.length > 0) {
    console.error('Errors:', validation.errors);
  }
  if (validation.warnings.length > 0) {
    console.warn('Warnings:', validation.warnings);
  }

  console.groupEnd();
}

/**
 * Create a config health report
 */
export function createConfigHealthReport(sections: BaseSection[]): string {
  const validation = validatePageConfig(sections);
  const usage = analyzeConfigUsage(sections);

  let report = '# Config Health Report\n\n';
  report += `## Overview\n`;
  report += `- Total Sections: ${validation.totalSections}\n`;
  report += `- Valid Sections: ${validation.validSections}\n`;
  report += `- Invalid Sections: ${validation.invalidSections}\n`;
  report += `- Health Score: ${Math.round((validation.validSections / validation.totalSections) * 100)}%\n\n`;

  report += `## Section Types Usage\n`;
  Object.entries(usage.sectionTypes).forEach(([type, count]) => {
    report += `- ${type}: ${count}\n`;
  });

  report += `\n## Common Props\n`;
  const sortedProps = Object.entries(usage.commonProps)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);
  sortedProps.forEach(([prop, count]) => {
    report += `- ${prop}: used ${count} times\n`;
  });

  if (validation.invalidSections > 0) {
    report += `\n## Issues Found\n`;
    validation.details
      .filter((d) => !d.valid)
      .forEach((detail) => {
        report += `\n### Section ${detail.index} (${detail.type})\n`;
        detail.errors.forEach((err) => {
          report += `- ❌ ${err}\n`;
        });
        detail.warnings.forEach((warn) => {
          report += `- ⚠️ ${warn}\n`;
        });
      });
  }

  return report;
}
