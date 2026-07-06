/**
 * Extract H2 and H3 headings from Markdown text.
 * Used to build the in-chapter Table of Contents.
 */

export interface TocEntry {
  level: 2 | 3;
  text: string;
  slug: string;
}

/**
 * Convert heading text to a URL-safe slug.
 * Handles both English and CJK (Chinese/Japanese/Korean) text.
 */
function slugify(text: string): string {
  return text
    // 1. Remove common inline-markdown syntax (bold, italic, code spans)
    .replace(/\*\*(.+?)\*\*/g, '$1')   // **bold**
    .replace(/\*(.+?)\*/g, '$1')       // *italic*
    .replace(/__(.+?)__/g, '$1')       // __bold__
    .replace(/_(.+?)_/g, '$1')          // _italic_
    .replace(/`(.+?)`/g, '$1')         // `code`
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // [text](url)
    .trim()
    // 2. Convert to lowercase
    .toLowerCase()
    // 3. Replace spaces/hyphens with hyphens
    .replace(/[\s\—–—]+/g, '-')        // any space-like or em-dash chars → hyphen
    .replace(/-+/g, '-')               // collapse multiple hyphens
    .replace(/^-|-$/g, '');            // trim leading/trailing hyphens
}

/**
 * Extract headings from raw Markdown content.
 * Returns H2 and H3 headings with their text and generated slugs.
 */
export function extractHeadings(markdown: string): TocEntry[] {
  const lines = markdown.split('\n');
  const headings: TocEntry[] = [];

  for (const line of lines) {
    // Match ## or ### followed by space
    const h2Match = line.match(/^#{2}\s+(.+)$/);
    const h3Match = line.match(/^#{3}\s+(.+)$/);

    if (h2Match) {
      const text = h2Match[1].trim();
      if (text) {
        headings.push({ level: 2, text, slug: slugify(text) });
      }
    } else if (h3Match) {
      const text = h3Match[1].trim();
      if (text) {
        headings.push({ level: 3, text, slug: slugify(text) });
      }
    }
  }

  return headings;
}
