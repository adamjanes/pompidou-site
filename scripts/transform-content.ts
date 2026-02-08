/**
 * Content transformation utilities
 * Standalone functions for transforming catalogue content
 */

/**
 * Personal reference patterns to strip/replace
 */
export const PERSONAL_REFERENCES = [
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
 * Validate transformation (check for remaining personal references)
 */
export function validateTransformation(content: string): {
  isClean: boolean;
  remainingReferences: string[];
} {
  const suspectPatterns = [
    /\bAdam\b/gi,
    /\bI\s+(use|have|need|want|am|was)\b/gi,
    /\bmy\s+/gi,
  ];

  const remainingReferences: string[] = [];

  for (const pattern of suspectPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      remainingReferences.push(...matches);
    }
  }

  return {
    isClean: remainingReferences.length === 0,
    remainingReferences: [...new Set(remainingReferences)], // Deduplicate
  };
}
