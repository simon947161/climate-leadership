import React from 'react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getChaptersByLang } from '@/data/chapters';

export async function generateMetadata() {
  return {
    title: 'Chapters | Climate Leadership',
    description: 'Read the chapters of Climate Leadership in Global Environmental Governance',
  };
}

export default async function ChaptersPage() {
  const chaptersEn = getChaptersByLang('en');

  return (
    <Container size="md">
      {/* Language Switcher */}
      <LanguageSwitcher currentLang="en" />
      
      <div className="py-8">
        <header className="mb-12">
          <h1 className="mb-4">Chapters</h1>
          <p className="text-lg text-gray-600">
            Read the chapters of <em>Climate Leadership in Global Environmental Governance</em>
          </p>
        </header>

        <div className="space-y-6">
          {chaptersEn.map((chapter) => (
            <Section key={chapter.id} className={chapter.status === 'complete' ? '' : 'bg-gray-50'}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-sm text-gray-600">
                    Chapter {chapter.number}
                  </span>
                  <h2 className="mt-1 mb-2">
                    {chapter.status === 'complete' ? (
                      <a
                        href={`/chapters/en/${chapter.id}`}
                        className="text-primary hover:underline"
                      >
                        {chapter.titleEn}
                      </a>
                    ) : (
                      <span className="text-gray-400">{chapter.titleEn}</span>
                    )}
                  </h2>
                  <p className="text-gray-600">{chapter.titleZh}</p>
                  
                  {chapter.status === 'pending' && (
                    <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                      🟡 English translation coming soon
                    </span>
                  )}
                  
                  {chapter.translationStatus === 'machine-draft' && (
                    <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200">
                      Machine draft · Author review needed
                    </span>
                  )}
                </div>
                
                <div className="flex-shrink-0 ml-4">
                  {chapter.status === 'complete' ? (
                    <a
                      href={`/chapters/en/${chapter.id}`}
                      className="btn btn-primary"
                    >
                      Read →
                    </a>
                  ) : (
                    <span className="btn btn-disabled">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </Container>
  );
}
