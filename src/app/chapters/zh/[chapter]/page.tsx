import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import Container from '@/components/Container';
import Prose from '@/components/Prose';
import TermHighlight from '@/components/TermHighlight';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import PDFDownload from '@/components/PDFDownload';
import ChapterTOC from '@/components/ChapterTOC';
import { ChapterMeta, getChapterContent, getChaptersByLang } from '@/data/chapters';
import { extractHeadings } from '@/lib/extractHeadings';

interface ChapterPageProps {
  params: Promise<{
    chapter: string;
  }>;
}

export async function generateStaticParams() {
  const chaptersZh = getChaptersByLang('zh');
  return chaptersZh
    .filter(chapter => chapter.status === 'complete')
    .map(chapter => ({
      chapter: chapter.id,
    }));
}

export async function generateMetadata({ params }: ChapterPageProps) {
  const { chapter: chapterId } = await params;
  const chaptersZh = getChaptersByLang('zh');
  const chapter = chaptersZh.find(c => c.id === chapterId);
  if (!chapter) {
    return { title: 'Chapter Not Found' };
  }
  return {
    title: `Chapter ${chapter.number}: ${chapter.titleZh} | Climate Leadership`,
    description: chapter.titleEn,
  };
}

/**
 * Custom Markdown components that wrap text-containing elements with TermHighlight
 * This enables auto-highlighting of terms in chapter content
 */
type MarkdownComponentProps = {
  children?: React.ReactNode;
  [key: string]: unknown;
};

const createHighlightedComponent = (Tag: React.ElementType) => {
  const Component = ({ children, ...props }: MarkdownComponentProps) => {
    return (
      <Tag {...props}>
        <TermHighlight>{children}</TermHighlight>
      </Tag>
    );
  };
  Component.displayName = `Highlighted(${typeof Tag === 'string' ? Tag : 'Component'})`;
  return Component as React.ComponentType<any>;
};

const markdownComponents = {
  p: createHighlightedComponent('p'),
  li: createHighlightedComponent('li'),
  h1: createHighlightedComponent('h1'),
  h2: createHighlightedComponent('h2'),
  h3: createHighlightedComponent('h3'),
  h4: createHighlightedComponent('h4'),
  h5: createHighlightedComponent('h5'),
  h6: createHighlightedComponent('h6'),
  blockquote: createHighlightedComponent('blockquote'),
  td: createHighlightedComponent('td'),
  th: createHighlightedComponent('th'),
  em: createHighlightedComponent('em'),
  strong: createHighlightedComponent('strong'),
};

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapter: chapterId } = await params;
  const chaptersZh = getChaptersByLang('zh');
  const chapter = chaptersZh.find(c => c.id === chapterId);
  const content = getChapterContent('zh', chapterId);
  const headings = extractHeadings(content);

  // Find previous and next chapters
  const currentIndex = chaptersZh.findIndex(c => c.id === chapterId);
  const prevChapter = currentIndex > 0 ? chaptersZh[currentIndex - 1] : null;
  const nextChapter = currentIndex < chaptersZh.length - 1 ? chaptersZh[currentIndex + 1] : null;

  return (
    <Container size="md">
      {/* Language Switcher */}
      <LanguageSwitcher currentLang="zh" chapterId={chapterId} />

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

        {/* Table of Contents */}
        <ChapterTOC headings={headings} />

        {/* Chapter Content */}
        <Prose>
          <div className="chapter-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeSlug]}
              components={markdownComponents}
            >
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

        {/* PDF Download */}
        <PDFDownload />
      </div>
    </Container>
  );
}
