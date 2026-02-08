/**
 * Markdown processing utilities
 * Parses frontmatter and transforms content
 */

import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

/**
 * Personal reference patterns to strip/replace
 */
const PERSONAL_REFERENCES = [
  { pattern: /Adam'?s?\s+system/gi, replacement: 'your system' },
  { pattern: /Adam'?s?\s+dev\s+system/gi, replacement: 'your dev system' },
  { pattern: /Adam'?s?\s+development\s+system/gi, replacement: 'your development system' },
  { pattern: /Adam'?s?\s+workflow/gi, replacement: 'your workflow' },
  { pattern: /Adam'?s?\s+setup/gi, replacement: 'your setup' },
  { pattern: /Adam'?s?\s+environment/gi, replacement: 'your environment' },
  { pattern: /Adam'?s?\s+toolchain/gi, replacement: 'your toolchain' },
  { pattern: /Adam'?s?\s+stack/gi, replacement: 'your stack' },
  { pattern: /\bI\s+use/gi, replacement: 'You can use' },
  { pattern: /\bI\s+have/gi, replacement: 'You can have' },
  { pattern: /\bI\s+need/gi, replacement: 'You need' },
  { pattern: /\bI\s+want/gi, replacement: 'You want' },
  { pattern: /\bmy\s+/gi, replacement: 'your ' },
  { pattern: /\bI've\b/gi, replacement: "You've" },
  { pattern: /\bI'm\b/gi, replacement: "You're" },
  { pattern: /\bI'll\b/gi, replacement: "You'll" },
  { pattern: /\bWe\s+/gi, replacement: 'You ' },
  { pattern: /\bour\s+/gi, replacement: 'your ' },
  { pattern: /\bOur\s+/gi, replacement: 'Your ' },
  // Catch possessive forms not covered by specific patterns
  { pattern: /\bAdam's\b/gi, replacement: "the developer's" },
  // Catch bare name
  { pattern: /\bAdam\b/gi, replacement: 'the developer' },
];

/**
 * Transform content to strip personal references
 */
export function transformContent(content: string): string {
  let transformed = content;

  for (const { pattern, replacement } of PERSONAL_REFERENCES) {
    transformed = transformed.replace(pattern, replacement);
  }

  return transformed;
}

/**
 * Parse metadata table from markdown
 * Extracts the table at the beginning of the file with | Field | Value | format
 */
function parseMetadataTable(content: string): { metadata: Record<string, any>; contentWithoutTable: string } {
  const metadata: Record<string, any> = {};

  // Match the table format: | Field | Value |
  // Updated regex to match tables that may not have trailing newline on last row
  const tableRegex = /^\|[\s]*Field[\s]*\|[\s]*Value[\s]*\|[\s]*\n\|[-:\s|]+\|[\s]*\n((?:\|[^\n]+\|[\s]*\n?)+)/im;
  const match = content.match(tableRegex);

  if (!match) {
    return { metadata, contentWithoutTable: content };
  }

  const tableRows = match[1].trim().split('\n');
  const contentWithoutTable = content.replace(match[0], '').trim();

  for (const row of tableRows) {
    const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell.length > 0);
    if (cells.length >= 2) {
      const field = cells[0].toLowerCase();
      const value = cells[1];

      // Map field names to frontmatter keys
      if (field === 'status') {
        // Remove star marker and normalize
        const statusValue = value.replace(/★/g, '').replace(/[^\w\s]/g, '').trim().toUpperCase();

        // Map to enum values
        if (statusValue === 'CHOSEN' || statusValue.includes('CHOSEN')) {
          metadata.status = 'CHOSEN';
        } else if (statusValue === 'REJECTED' || statusValue.includes('REJECT')) {
          metadata.status = 'REJECTED';
        } else {
          // Default to CANDIDATE for "Watching", "Evaluated", etc.
          metadata.status = 'CANDIDATE';
        }
      } else if (field === 'category') {
        metadata.category = value;
      } else if (field === 'holy grail phase') {
        // Extract phase number from "1-Spec", "2-Task", etc.
        const phaseMatch = value.match(/(\d+)-(\w+)/);
        if (phaseMatch) {
          const phaseMap: Record<string, string> = {
            'spec': 'spec-it',
            'task': 'task-it',
            'build': 'build-it',
            'run': 'build-it', // Execution phase
            'verify': 'verify-it',
            'learn': 'learn-it',
          };
          const phaseName = phaseMatch[2].toLowerCase();
          metadata.phase = phaseMap[phaseName] || 'platform';
        } else if (value.toLowerCase().includes('supporting') || value.toLowerCase().includes('platform')) {
          metadata.phase = 'platform';
        }
      } else if (field === 'github') {
        // Extract repo name from markdown link format
        const linkMatch = value.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          metadata.repo = linkMatch[2];
          metadata.github = linkMatch[1];
        } else {
          metadata.github = value;
        }
      } else if (field === 'stars') {
        const starsNum = value.replace(/,/g, '');
        metadata.stars = parseInt(starsNum, 10) || 0;
      } else if (field === 'install') {
        metadata.install = value.replace(/`/g, '');
      } else if (field === 'last commit') {
        metadata.lastCommit = value;
      } else if (field === 'docs') {
        metadata.docs = value;
      } else {
        metadata[field] = value;
      }
    }
  }

  return { metadata, contentWithoutTable };
}

/**
 * Extract title from markdown content
 */
function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '';
}

/**
 * Extract scores table from markdown
 */
function extractScores(content: string): Record<string, number> | undefined {
  const scoresSection = content.match(/###\s+Scores\s*\n\n([\s\S]+?)(?=\n###|\n##|$)/i);
  if (!scoresSection) return undefined;

  const scores: Record<string, number> = {};
  const rows = scoresSection[1].split('\n').filter(line => line.includes('|'));

  for (const row of rows) {
    // Skip header and separator rows
    if (row.includes('Criterion') || row.includes('---')) continue;

    const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell.length > 0);
    if (cells.length >= 3) {
      const criterion = cells[0].toLowerCase();
      const score = parseFloat(cells[2]);

      if (!isNaN(score) && criterion !== 'composite') {
        scores[criterion] = score;
      } else if (criterion === 'composite') {
        scores.overall = score;
      }
    }
  }

  return Object.keys(scores).length > 0 ? scores : undefined;
}

/**
 * Extract pros/cons/alternatives from markdown sections
 */
function extractListSection(content: string, sectionName: string): string[] | undefined {
  const regex = new RegExp(`###\\s+${sectionName}\\s*\\n\\n([\\s\\S]+?)(?=\\n###|\\n##|$)`, 'i');
  const match = content.match(regex);
  if (!match) return undefined;

  const items: string[] = [];
  const lines = match[1].split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
      const item = trimmed.substring(1).trim();
      // Remove bold markers
      const cleaned = item.replace(/\*\*/g, '');
      if (cleaned) items.push(cleaned);
    }
  }

  return items.length > 0 ? items : undefined;
}

/**
 * Parse markdown file with table-based metadata
 */
export function parseMarkdown(fileContent: string) {
  // First try traditional frontmatter
  const matterResult = matter(fileContent);

  // If no frontmatter found, parse the table format
  if (Object.keys(matterResult.data).length === 0) {
    const title = extractTitle(fileContent);
    const { metadata, contentWithoutTable } = parseMetadataTable(fileContent);

    // Extract additional metadata from content
    const scores = extractScores(fileContent);
    const pros = extractListSection(fileContent, 'Strengths');
    const cons = extractListSection(fileContent, 'Weaknesses');

    // Combine all metadata
    const frontmatter = {
      name: title,
      ...metadata,
      ...(scores && { scores }),
      ...(pros && { pros }),
      ...(cons && { cons }),
    };

    return {
      frontmatter,
      content: contentWithoutTable,
      transformedContent: transformContent(fileContent),
    };
  }

  // Traditional frontmatter case
  return {
    frontmatter: matterResult.data,
    content: matterResult.content,
    transformedContent: transformContent(matterResult.content),
  };
}

/**
 * Convert markdown to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(markdown);

  return result.toString();
}

/**
 * Extract excerpt from markdown (first paragraph)
 */
export function extractExcerpt(content: string, maxLength: number = 200): string {
  // Remove frontmatter if present
  const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Remove markdown headings
  const withoutHeadings = withoutFrontmatter.replace(/^#+\s+.+$/gm, '');

  // Split into lines and skip markdown tables (lines starting with |)
  const lines = withoutHeadings.split('\n');
  const nonTableLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    // Skip table rows (lines starting with |) and empty lines
    if (trimmed && !trimmed.startsWith('|')) {
      nonTableLines.push(line);
    }
  }

  // Get first paragraph (first block of text)
  const firstParagraph = nonTableLines
    .join('\n')
    .trim()
    .split('\n\n')[0]
    ?.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
    ?.replace(/[*_`]/g, '') // Remove formatting
    ?.trim();

  if (!firstParagraph) return '';

  if (firstParagraph.length <= maxLength) {
    return firstParagraph;
  }

  return firstParagraph.substring(0, maxLength).trim() + '...';
}

/**
 * Parse evaluation scores from frontmatter
 */
export function parseScores(frontmatter: any): Record<string, number> | undefined {
  if (!frontmatter.scores) return undefined;

  const scores: Record<string, number> = {};

  for (const [key, value] of Object.entries(frontmatter.scores)) {
    if (typeof value === 'number') {
      scores[key] = value;
    } else if (typeof value === 'string') {
      const parsed = parseFloat(value);
      if (!isNaN(parsed)) {
        scores[key] = parsed;
      }
    }
  }

  return Object.keys(scores).length > 0 ? scores : undefined;
}

/**
 * Parse array fields from frontmatter
 */
export function parseArrayField(value: any): string[] | undefined {
  if (Array.isArray(value)) {
    return value.filter(v => typeof v === 'string');
  }
  if (typeof value === 'string') {
    return [value];
  }
  return undefined;
}
