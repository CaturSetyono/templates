// Simple test script to validate YAML config loading
// Run with: node scripts/test-config.js

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

console.log('🧪 Testing YAML Configuration Loading\n');
console.log('='.repeat(50));

try {
  // Load the YAML file
  const configPath = path.join(__dirname, '..', 'config', 'example-site.yaml');
  console.log('📁 Reading config from:', configPath);

  const fileContents = fs.readFileSync(configPath, 'utf8');
  const config = yaml.load(fileContents);

  // Test 1: Site config exists
  console.log('\n✅ Test 1: Site Config');
  console.log('  Name:', config.site?.name || 'NOT FOUND');
  console.log('  Description:', config.site?.description || 'NOT FOUND');

  // Test 2: Theme config
  console.log('\n✅ Test 2: Theme Colors');
  console.log('  Primary:', config.site?.theme?.primary || 'NOT FOUND');
  console.log('  Secondary:', config.site?.theme?.secondary || 'NOT FOUND');
  console.log('  Accent:', config.site?.theme?.accent || 'NOT FOUND');

  // Test 3: Pages
  console.log('\n✅ Test 3: Pages');
  console.log('  Total pages:', config.pages?.length || 0);

  if (config.pages && config.pages.length > 0) {
    const homePage = config.pages[0];
    console.log('  First page slug:', homePage.slug);
    console.log('  First page title:', homePage.title);
    console.log('  Sections count:', homePage.sections?.length || 0);

    // Test 4: Sections detail
    console.log('\n✅ Test 4: Sections Detail');
    homePage.sections?.forEach((section, index) => {
      console.log(`  ${index + 1}. Type: ${section.type.padEnd(15)} ID: ${section.id || 'none'}`);

      // Count props items
      if (section.props?.items) {
        console.log(`     └─ Items: ${section.props.items.length}`);
      } else if (section.props?.members) {
        console.log(`     └─ Members: ${section.props.members.length}`);
      } else if (section.props?.buttons) {
        console.log(`     └─ Buttons: ${section.props.buttons.length}`);
      }
    });
  }

  // Test 5: Validation
  console.log('\n✅ Test 5: Validation');
  const errors = [];

  if (!config.site) errors.push('Missing site config');
  if (!config.site?.name) errors.push('Missing site name');
  if (!config.site?.theme) errors.push('Missing theme config');
  if (!config.pages || config.pages.length === 0) errors.push('No pages defined');

  if (errors.length > 0) {
    console.log('  ❌ Validation errors:');
    errors.forEach((err) => console.log('    -', err));
  } else {
    console.log('  ✅ All validations passed!');
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary:');
  console.log('  Site:', config.site?.name);
  console.log('  Pages:', config.pages?.length || 0);
  console.log('  Total Sections:', config.pages?.[0]?.sections?.length || 0);
  console.log('\n✅ Config loaded successfully!');
} catch (error) {
  console.error('\n❌ Error loading config:');
  console.error(error.message);
  process.exit(1);
}
