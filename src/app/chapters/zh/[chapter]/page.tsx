import React from 'react';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Container from '@/components/Container';
import Prose from '@/components/Prose';
import { ChapterMeta, chaptersZh } from '@/data/chapters';

interface ChapterPageProps {
  params: Promise<{
    chapter: string;
  }>;
}

export async function generateStaticParams() {
  return chaptersZh
    .filter(chapter => chapter.status === 'complete')
    .map(chapter => ({
      chapter: chapter.id,
    }));
}

export async function generateMetadata({ params }: ChapterPageProps) {
  const { chapter: chapterId } = await params;
  const chapter = chaptersZh.find(c => c.id === chapterId);
  if (!chapter) {
    return { title: 'Chapter Not Found' };
  }
  return {
    title: `Chapter ${chapter.number}: ${chapter.titleZh} | Climate Leadership`,
    description: chapter.titleEn,
  };
}

async function getChapterContent(chapterId: string | undefined): Promise<string> {
  if (!chapterId) {
    return '# Chapter Not Found\n\nNo chapter ID was provided.';
  }
  
  const filePath = path.join(
    process.cwd(),
    'data',
    'chapters',
    'zh',
    `${chapterId}.md`
  );
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error(`Error reading chapter file: ${filePath}`, error);
    return `# Chapter Not Found\n\nThe chapter file "${chapterId}.md" could not be loaded.`;
  }
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapter: chapterId } = await params;
  const chapter = chaptersZh.find(c => c.id === chapterId);
  const content = await getChapterContent(chapterId);
  
  // Find previous and next chapters
  const currentIndex = chaptersZh.findIndex(c => c.id === chapterId);
  const prevChapter = currentIndex > 0 ? chaptersZh[currentIndex - 1] : null;
  const nextChapter = currentIndex < chaptersZh.length - 1 ? chaptersZh[currentIndex + 1] : null;

  return (
    <Container size="md">
      <div className="py-8">
        {/* Chapter Header */}
        <header className="mb-8">
          {chapter ? (
            <>
              <p className="text-sm text-gray-600 mb-2">
                Chapter {chapter.number}
              </p>
              <h1 className="mb-2">{chapter.titleZh}</h1>
              <p className="text-lg text-gray-600">{chapter.titleEn}</p>
            </>
          ) : (
            <h1>Chapter Not Found</h1>
          )}
        </header>

        {/* Chapter Content */}
        <Prose>
          <div className="chapter-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {content}
            </ReactMarkdown>
          </div>
        </Prose>

        {/* Chapter Navigation */}
        <nav className="flex justify-between mt-12 pt-8 border-t border-gray-200">
          {prevChapter ? (
            <a
              href={`/chapters/zh/${prevChapter.id}`}
              className="text-primary hover:underline"
            >
              ← {prevChapter.titleZh}
            </a>
          ) : (
            <div />
          )}
          {nextChapter ? (
            <a
              href={`/chapters/zh/${nextChapter.id}`}
              className="text-primary hover:underline"
            >
              {nextChapter.titleZh} →
            </a>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </Container>
  );
}
