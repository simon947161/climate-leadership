import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Container from '@/components/Container';
import Prose from '@/components/Prose';
import TermHighlight from '@/components/TermHighlight';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import PDFDownload from '@/components/PDFDownload';
import { ChapterMeta, getChapterContent, getChaptersByLang } from '@/data/chapters';

interface ChapterPageProps {
  params: Promise<{
    chapter: string;
  }>;
}

export async function generateStaticParams() {
  const chaptersEn = getChaptersByLang('en');
  return chaptersEn
    .filter(chapter => chapter.status === 'complete')
    .map(chapter => ({
      chapter: chapter.id,
    }));
}

export async function generateMetadata({ params }: ChapterPageProps) {
  const { chapter: chapterId } = await params;
  const chaptersEn = getChaptersByLang('en');
  const chapter = chaptersEn.find(c => c.id === chapterId);
  if (!chapter) {
    return { title: 'Chapter Not Found' };
  }
  return {
    title: `Chapter ${chapter.number}: ${chapter.titleEn} | Climate Leadership`,
    description: chapter.titleZh,
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapter: chapterId } = await params;
  const chaptersEn = getChaptersByLang('en');
  const chapter = chaptersEn.find(c => c.id === chapterId);
  const content = getChapterContent('en', chapterId);
  
  // Find previous and next chapters
  const currentIndex = chaptersEn.findIndex(c => c.id === chapterId);
  const prevChapter = currentIndex > 0 ? chaptersEn[currentIndex - 1] : null;
  const nextChapter = currentIndex < chaptersEn.length - 1 ? chaptersEn[currentIndex + 1] : null;

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

  return (
    <Container size="md">
      {/* Language Switcher */}
      <LanguageSwitcher currentLang="en" chapterId={chapterId} />
      
      <div className="py-8">
        {/* Chapter Header */}
        <header className="mb-8">
          {chapter ? (
            <>
              <p className="text-sm text-gray-600 mb-2">
                Chapter {chapter.number}
              </p>
              <h1 className="mb-2">{chapter.titleEn}</h1>
              <p className="text-lg text-gray-600">{chapter.titleZh}</p>
              
              {/* Status Badge */}
              {chapter.status === 'pending' && (
                <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                  🟡 English translation coming soon
                </span>
              )}
            </>
          ) : (
            <h1>Chapter Not Found</h1>
          )}
        </header>

        {/* Chapter Content */}
        <Prose>
          <div className="chapter-content">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeHighlight]}
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
              href={`/chapters/en/${prevChapter.id}`}
              className="text-primary hover:underline"
            >
              ← {prevChapter.titleEn}
            </a>
          ) : (
            <div />
          )}
          {nextChapter ? (
            <a
              href={`/chapters/en/${nextChapter.id}`}
              className="text-primary hover:underline"
            >
              {nextChapter.titleEn} →
            </a>
          ) : (
            <div />
          )}
        </nav>
        
        {/* PDF Download */}
        <PDFDownload lang="en" />
      </div>
    </Container>
  );
}
