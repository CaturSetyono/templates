/**
 * Test Script - Validate Config Files
 * Run: node scripts/validate-configs.js
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const configDir = path.join(__dirname, '../config');

// Mock implementations for testing
const mockSafeAccess = {
  safeString: (val, fallback = '') => (typeof val === 'string' ? val : fallback),
  safeArray: (val) => (Array.isArray(val) ? val : []),
  hasContent: (val) => {
    if (!val) return false;
    if (typeof val === 'string') return val.trim().length > 0;
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === 'object') return Object.keys(val).length > 0;
    return true;
  },
};

const validSectionTypes = [
  'hero',
  'features',
  'stats',
  'team',
  'testimonials',
  'grid',
  'cta',
  'pricing',
  'faq',
  'contact',
  'gallery',
  'logo-cloud',
  'content',
];

function validateSection(section, index) {
  const issues = [];

  if (!section.type) {
    issues.push(`Section ${index}: Missing type`);
  } else if (!validSectionTypes.includes(section.type)) {
    issues.push(`Section ${index}: Unknown type "${section.type}"`);
  }

  if (!section.props || typeof section.props !== 'object') {
    issues.push(`Section ${index}: Missing or invalid props`);
  }

  return issues;
}

function validateConfig(filePath) {
  console.log(`\n📋 Validating: ${path.basename(filePath)}`);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const config = yaml.load(content);

    if (!config.pages || !Array.isArray(config.pages)) {
      console.log('❌ No pages array found');
      return false;
    }

    let totalSections = 0;
    let validSections = 0;
    const allIssues = [];

    config.pages.forEach((page, pageIndex) => {
      if (!page.sections || !Array.isArray(page.sections)) {
        allIssues.push(`Page ${pageIndex}: No sections array`);
        return;
      }

      page.sections.forEach((section, sectionIndex) => {
        totalSections++;
        const issues = validateSection(section, sectionIndex);

        if (issues.length === 0) {
          validSections++;
        } else {
          allIssues.push(...issues);
        }
      });
    });

    console.log(`✅ Total sections: ${totalSections}`);
    console.log(`✅ Valid sections: ${validSections}`);

    if (allIssues.length > 0) {
      console.log(`⚠️  Issues found (${allIssues.length}):`);
      allIssues.forEach((issue) => console.log(`   - ${issue}`));
      return false;
    } else {
      console.log('🎉 All sections valid!');
      return true;
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return false;
  }
}

function main() {
  console.log('🔍 Config Validation Tool\n');
  console.log(`Valid section types: ${validSectionTypes.join(', ')}\n`);

  const files = fs.readdirSync(configDir).filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'));

  if (files.length === 0) {
    console.log('No config files found in config/');
    return;
  }

  let validCount = 0;
  files.forEach((file) => {
    const isValid = validateConfig(path.join(configDir, file));
    if (isValid) validCount++;
  });

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📊 Summary: ${validCount}/${files.length} configs valid`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
}

main();
