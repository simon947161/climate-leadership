import React from 'react';
import Container from './Container';

interface LanguageSwitcherProps {
  currentLang: 'zh' | 'en';
  chapterId?: string;
}

/**
 * LanguageSwitcher - Switches between Chinese and English versions
 * 
 * Placed at the top of chapter pages and chapter list page
 */
export default function LanguageSwitcher({ currentLang, chapterId }: LanguageSwitcherProps) {
  const basePath = chapterId 
    ? `/chapters/${currentLang === 'zh' ? 'en' : 'zh'}/${chapterId}`
    : `/chapters/${currentLang === 'zh' ? 'en' : 'zh'}`;
  
  return (
    <Container size="md">
      <div className="flex justify-end py-2">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <a
            href={currentLang === 'zh' ? basePath : `/chapters/zh${chapterId ? `/${chapterId}` : ''}`}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
              currentLang === 'zh'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-primary border-gray-200 hover:bg-gray-100'
            }`}
            aria-current={currentLang === 'zh' ? 'page' : undefined}
          >
            中文
          </a>
          <a
            href={currentLang === 'en' ? basePath : `/chapters/en${chapterId ? `/${chapterId}` : ''}`}
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
