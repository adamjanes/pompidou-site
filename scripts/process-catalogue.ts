#!/usr/bin/env tsx
/**
 * Process catalogue script
 * Reads tool markdown files from source catalogue and processes them
 * Run via: npm run process-catalogue
 */

import fs from 'fs';
import path from 'path';
import { getAllTools, getToolStats } from '../src/lib/content-loader';

const OUTPUT_DIR = path.join(process.cwd(), 'content');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'tools.json');

/**
 * Ensure output directory exists
 */
function ensureDirectories() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

/**
 * Process and write all tools
 */
function processTools() {
  console.log('📚 Loading tools from catalogue...');
  const tools = getAllTools();

  if (tools.length === 0) {
    console.error('❌ No tools found! Check catalogue path.');
    process.exit(1);
  }

  console.log(`✓ Loaded ${tools.length} tools\n`);

  // Get statistics
  const stats = getToolStats();

  // Write combined output
  console.log(`💾 Writing to ${OUTPUT_FILE}...`);
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify({ tools, stats }, null, 2),
    'utf-8'
  );

  console.log(`✓ Wrote combined output: ${OUTPUT_FILE}\n`);

  // Display statistics
  console.log('📊 Statistics:');
  console.log(`   Total tools: ${stats.total}`);
  console.log('\n   By Phase:');
  Object.entries(stats.byPhase).forEach(([phase, count]) => {
    console.log(`   - ${phase}: ${count}`);
  });
  console.log('\n   By Status:');
  Object.entries(stats.byStatus).forEach(([status, count]) => {
    console.log(`   - ${status}: ${count}`);
  });
  console.log('\n   By Category:');
  Object.entries(stats.byCategory).forEach(([category, count]) => {
    console.log(`   - ${category}: ${count}`);
  });

  // Show sample tools
  console.log('\n🔍 Sample tools:');
  tools.slice(0, 3).forEach(tool => {
    console.log(`\n   ${tool.name} (${tool.status})`);
    console.log(`   Phase: ${tool.phase} | Category: ${tool.category}`);
    if (tool.tagline) {
      console.log(`   ${tool.tagline}`);
    }
  });

  return { tools, stats };
}

/**
 * Main processing function
 */
async function main() {
  console.log('🔨 Processing Pompidou catalogue...\n');

  try {
    ensureDirectories();
    const result = processTools();

    console.log('\n✅ Done!\n');
    return result;
  } catch (error) {
    console.error('❌ Error processing catalogue:', error);
    process.exit(1);
  }
}

// Run if executed directly
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

export { main as processCatalogue };
