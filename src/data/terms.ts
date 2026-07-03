import termsData from '../../data/terms/terms.json';

export type TermCategory = 'author_concept' | 'eu_policy' | 'climate_science' | 'technical';

export interface Term {
  id: string;
  category: TermCategory;
  nameZh: string;
  nameEn: string;
  abbr?: string;
  definition: string;
  detailedDefinition: string;
  relatedTerms?: string[];
}

export const terms: Term[] = termsData.terms as Term[];

/**
 * Get a term by its ID
 */
export function getTermById(id: string): Term | undefined {
  return terms.find(term => term.id === id);
}

/**
 * Get terms by category
 */
export function getTermsByCategory(category: TermCategory): Term[] {
  return terms.filter(term => term.category === category);
}

/**
 * Get all terms sorted by Chinese name length (longer first for better matching)
 */
export function getAllTermsSorted(): Term[] {
  return [...terms].sort((a, b) => b.nameZh.length - a.nameZh.length);
}

/**
 * Find a term by its Chinese name, English name, or abbreviation
 */
export function findTerm(query: string): Term | undefined {
  const normalizedQuery = query.trim();
  return terms.find(term => 
    term.nameZh === normalizedQuery ||
    term.nameEn === normalizedQuery ||
    term.abbr === normalizedQuery ||
    term.id === normalizedQuery
  );
}

/**
 * Get category display info
 */
export const categoryInfo: Record<TermCategory, { label: string; color: string }> = {
  author_concept: { label: '作者原创概念', color: 'var(--color-term-author)' },
  eu_policy: { label: '欧盟政策', color: 'var(--color-term-policy)' },
  climate_science: { label: '气候科学', color: 'var(--color-term-science)' },
  technical: { label: '技术/金融', color: 'var(--color-term-technical)' },
};

/**
 * Build a regex pattern that matches any term in the text
 * Returns null if no terms are found
 */
export function buildTermPattern(): RegExp | null {
  if (terms.length === 0) return null;
  
  // Get all possible names (Chinese, English, abbreviation)
  const allNames = new Set<string>();
  terms.forEach(term => {
    allNames.add(term.nameZh);
    if (term.abbr) allNames.add(term.abbr);
    // Add English full name parts
    const englishParts = term.nameEn.split(/[\s()]+/).filter(p => p.length > 2);
    englishParts.forEach(part => allNames.add(part));
  });
  
  // Sort by length (longer first) to ensure longer matches take priority
  const sortedNames = Array.from(allNames).sort((a, b) => b.length - a.length);
  
  if (sortedNames.length === 0) return null;
  
  // Escape special regex characters
  const escapedNames = sortedNames.map(name => 
    name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  
  return new RegExp(`(${escapedNames.join('|')})`, 'g');
}

/**
 * Highlight terms in plain text
 * Returns an array of segments, each marked as text or term reference
 */
export type TextSegment = 
  | { type: 'text'; content: string }
  | { type: 'term'; content: string; termId: string; isFirstAppearance: boolean };

export function highlightTerms(text: string): TextSegment[] {
  const pattern = buildTermPattern();
  if (!pattern) return [{ type: 'text', content: text }];
  
  const segments: TextSegment[] = [];
  const seenTermIds = new Set<string>();
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  
  // Reset regex state
  pattern.lastIndex = 0;
  
  while ((match = pattern.exec(text)) !== null) {
    const matchedText = match[0];
    const matchIndex = match.index;
    
    // Add text before the match
    if (matchIndex > lastIndex) {
      segments.push({
        type: 'text',
        content: text.substring(lastIndex, matchIndex),
      });
    }
    
    // Find which term this is
    const term = findTerm(matchedText);
    if (term) {
      const isFirstAppearance = !seenTermIds.has(term.id);
      if (isFirstAppearance) {
        seenTermIds.add(term.id);
      }
      segments.push({
        type: 'term',
        content: matchedText,
        termId: term.id,
        isFirstAppearance,
      });
    } else {
      segments.push({
        type: 'text',
        content: matchedText,
      });
    }
    
    lastIndex = matchIndex + matchedText.length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      content: text.substring(lastIndex),
    });
  }
  
  return segments;
}
