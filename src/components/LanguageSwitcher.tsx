import React from 'react';
import Container from './Container';

interface LanguageSwitcherProps {
  currentLang: 'zh' | 'en';
  chapterId?: string;
}

/**
 * LanguageSwitcher — bilingual toggle between Chinese and English chapter pages.
 *
 * - The active-language button stays on the current path (shows current page language).
 * - The inactive-language button switches to the equivalent page in the other language.
 * - Works on both chapter pages (chapterId provided) and chapter list pages (no chapterId).
 */
export default function LanguageSwitcher({ currentLang, chapterId }: LanguageSwitcherProps) {
  // Explicit paths for each language
  const zhPath = `/chapters/zh${chapterId ? `/${chapterId}` : ''}`;
  const enPath = `/chapters/en${chapterId ? `/${chapterId}` : ''}`;

  return (
    <Container size="md">
      <div className="flex justify-end py-2">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {/* 中文 button — always links to ZH path */}
          <a
            href={zhPath}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
              currentLang === 'zh'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-primary border-gray-200 hover:bg-gray-100'
            }`}
            aria-current={currentLang === 'zh' ? 'page' : undefined}
          >
            中文
          </a>
          {/* English button — always links to EN path */}
          <a
            href={enPath}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg border-t border-b border-r ${
              currentLang === 'en'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-primary border-gray-200 hover:bg-gray-100'
            }`}
            aria-current={currentLang === 'en' ? 'page' : undefined}
          >
            English
          </a>
        </div>
      </div>
    </Container>
  );
}
