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
  // {
  //   id: 'chapter-2',
  //   number: 2,
  //   titleZh: '全球气候区的责任与权利分布',
  //   titleEn: 'The Distribution of Responsibility and Rights Across Global Climate Zones',
  //   status: 'pending',
  // },
];

export const chaptersEn: ChapterMeta[] = [
  // TODO: Add English chapters when available
];
