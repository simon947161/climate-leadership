import fs from 'fs';
import path from 'path';

export interface ChapterMeta {
  id: string;
  number: number;
  titleZh: string;
  titleEn: string;
  status: 'complete' | 'pending';
  wordCount?: number;
  translationStatus?: 'human-reviewed' | 'machine-draft' | 'author-review-needed';
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
  {
    id: 'chapter-2',
    number: 2,
    titleZh: '全球气候区的责任与权利分布',
    titleEn: 'The Distribution of Responsibility and Rights Across Global Climate Zones',
    status: 'complete',
    wordCount: 1710,
  },
  {
    id: 'chapter-3',
    number: 3,
    titleZh: '中欧文明的互补与制度桥梁',
    titleEn: 'The Complementarity of Chinese and European Civilizations & the Institutional Bridge',
    status: 'complete',
    wordCount: 1556,
  },
  {
    id: 'chapter-4',
    number: 4,
    titleZh: 'AI生态治理系统的建构',
    titleEn: 'Constructing the AI-Ecological Governance System',
    status: 'complete',
    wordCount: 1447,
  },
  {
    id: 'chapter-5',
    number: 5,
    titleZh: 'TTEG热-时治理理论的提出与生态链融合路径',
    titleEn: 'TTEG Thermo-Temporal Governance Theory and Its Integration with the Ecological Chain',
    status: 'complete',
    wordCount: 1428,
  },
  {
    id: 'chapter-6',
    number: 6,
    titleZh: '全球气候流动结构与空间治理体系',
    titleEn: 'Global Climate Flow Dynamics and the Architecture of Spatial Governance',
    status: 'complete',
    wordCount: 2325,
  },
  {
    id: 'chapter-7',
    number: 7,
    titleZh: 'RWA驱动的气候金融与公平治理新路径',
    titleEn: 'Climate Finance, RWA, and New Paths to Fair Governance',
    status: 'complete',
    wordCount: 1969,
  },
  {
    id: 'chapter-8',
    number: 8,
    titleZh: '共识机制与AI伦理制度框架',
    titleEn: 'Consensus Mechanisms and the Ethical Framework of AI Governance',
    status: 'complete',
    wordCount: 1851,
  },
  {
    id: 'chapter-9',
    number: 9,
    titleZh: '以NGO为中心的社会组织协同机制',
    titleEn: 'NGO-Centred Social Collaboration Mechanisms',
    status: 'complete',
    wordCount: 1817,
  },
  {
    id: 'chapter-10',
    number: 10,
    titleZh: '系统的觉醒——生态链与未来文明的起点',
    titleEn: 'The Awakening of the System — The Ecological Chain and the Genesis of Future Civilization',
    status: 'complete',
    wordCount: 2203,
  },
  {
    id: 'references',
    number: 0,
    titleZh: '参考文献',
    titleEn: 'References',
    status: 'complete',
    wordCount: 1200,
  },
];

export const chaptersEn: ChapterMeta[] = [
  {
    id: 'chapter-1',
    number: 1,
    titleZh: '引言 | 未来的判断力',
    titleEn: 'Introduction | The Judgment of the Future',
    status: 'complete',
    wordCount: 1400,
    translationStatus: 'machine-draft',
  },
  {
    id: 'chapter-2',
    number: 2,
    titleZh: '全球气候区的责任与权利分布',
    titleEn: 'The Distribution of Responsibility and Rights Across Global Climate Zones',
    status: 'complete',
    wordCount: 5608,
  },
  {
    id: 'chapter-3',
    number: 3,
    titleZh: '中欧文明的互补与制度桥梁',
    titleEn: 'The Complementarity of Chinese and European Civilizations & the Institutional Bridge',
    status: 'complete',
    wordCount: 6553,
  },
  {
    id: 'chapter-4',
    number: 4,
    titleZh: 'AI生态治理系统的建构',
    titleEn: 'Constructing the AI-Ecological Governance System',
    status: 'complete',
    wordCount: 4506,
  },
  {
    id: 'chapter-5',
    number: 5,
    titleZh: 'TTEG热-时治理理论的提出与生态链融合路径',
    titleEn: 'TTEG Thermo-Temporal Governance Theory and Its Integration with the Ecological Chain',
    status: 'complete',
    wordCount: 4928,
  },
  {
    id: 'chapter-6',
    number: 6,
    titleZh: '全球气候流动结构与空间治理体系',
    titleEn: 'Global Climate Flow Dynamics and the Architecture of Spatial Governance',
    status: 'complete',
    wordCount: 3200,
  },
  {
    id: 'chapter-7',
    number: 7,
    titleZh: 'RWA驱动的气候金融与公平治理新路径',
    titleEn: 'Climate Finance, RWA, and New Paths to Fair Governance',
    status: 'complete',
    wordCount: 2800,
  },
  {
    id: 'chapter-8',
    number: 8,
    titleZh: '共识机制与AI伦理制度框架',
    titleEn: 'Consensus Mechanisms and the Ethical Framework of AI Governance',
    status: 'complete',
    wordCount: 2200,
  },
  {
    id: 'chapter-9',
    number: 9,
    titleZh: '以NGO为中心的社会组织协同机制',
    titleEn: 'NGO-Centred Social Collaboration Mechanisms',
    status: 'complete',
    wordCount: 1800,
  },
  {
    id: 'chapter-10',
    number: 10,
    titleZh: '系统的觉醒——生态链与未来文明的起点',
    titleEn: 'The Awakening of the System — The Ecological Chain and the Genesis of Future Civilization',
    status: 'complete',
    wordCount: 3000,
  },
  {
    id: 'references',
    number: 0,
    titleZh: '参考文献',
    titleEn: 'References',
    status: 'complete',
    wordCount: 1200,
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
