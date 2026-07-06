import React from 'react';
import type { TocEntry } from '@/lib/extractHeadings';

interface ChapterTOCProps {
  headings: TocEntry[];
}

export default function ChapterTOC({ headings }: ChapterTOCProps) {
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg"
    >
      <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">
        On this page / 本页内容
      </p>
      <ul className="space-y-1.5">
        {headings.map((heading, i) => (
          <li key={i} className={heading.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${heading.slug}`}
              className={`
                block text-sm text-gray-700 hover:text-primary transition-colors
                ${heading.level === 2 ? 'font-medium' : 'font-normal'}
                ${heading.level === 3 ? 'before:content-["–"] before:mr-2 before:text-gray-400' : ''}
              `}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
