import fs from 'fs';
import path from 'path';

export interface ChapterMeta {
  id: string;
  number: number;
  titleZh: string;
  titleEn: string;
  status: 'complete' | 'pending';
  wordCount?: number;
}

export const chaptersZh: ChapterMeta[] = [
  {
    id: 'chapter-1',
    number: 1,
    titleZh: '引言 | 未来的判断力',
    titleEn: 'Introduction | The Judgment of the Future',
    status: 'complete',
    wordCount: 1800,
  },
  // TODO: Add remaining chapters as they are converted
];

export const chaptersEn: ChapterMeta[] = [
  {
    id: 'chapter-1',
    number: 1,
    titleZh: '引言 | 未来的判断力',
    titleEn: 'Introduction | The Judgment of the Future',
    status: 'pending', // English translation not yet available
    wordCount: 0,
  },
];

/**
 * Get chapter content by language and chapter ID
 */
export function getChapterContent(lang: 'zh' | 'en', chapterId: string): string {
  const dir = lang === 'zh' ? 'zh' : 'en';
  const filePath = path.join(
    process.cwd(),
    'data',
    'chapters',
    dir,
    `${chapterId}.md`
  );
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error(`Error reading chapter file: ${filePath}`, error);
    return `# Chapter Not Found\n\nThe chapter file "${chapterId}.md" (${lang}) could not be loaded.`;
  }
}

/**
 * Get chapter metadata by language
 */
export function getChaptersByLang(lang: 'zh' | 'en'): ChapterMeta[] {
  return lang === 'zh' ? chaptersZh : chaptersEn;
}
