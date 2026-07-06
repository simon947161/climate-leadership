import React from 'react';
import Container from '@/components/Container';
import { terms, categoryInfo, type TermCategory } from '@/data/terms';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glossary | Climate Leadership',
  description: 'Key terminology and concepts in Climate Leadership in Global Environmental Governance, covering author concepts, EU policy, climate science, and technical terms.',
};

// English category labels (derived from category keys; Chinese labels in source are mojibake)
const CATEGORY_LABELS: Record<TermCategory, { en: string; zh: string }> = {
  author_concept: { en: "Author's Concepts", zh: '作者概念' },
  eu_policy: { en: 'EU Policy', zh: '欧盟政策' },
  climate_science: { en: 'Climate Science', zh: '气候科学' },
  technical: { en: 'Technical Terms', zh: '技术术语' },
};

const CATEGORY_ORDER: TermCategory[] = [
  'author_concept',
  'eu_policy',
  'climate_science',
  'technical',
];

export default function GlossaryPage() {
  // Group terms by category
  const grouped = CATEGORY_ORDER.reduce<Record<TermCategory, typeof terms>>(
    (acc, cat) => {
      acc[cat] = terms.filter((t) => t.category === cat);
      return acc;
    },
    {} as Record<TermCategory, typeof terms>
  );

  return (
    <Container size="lg">
      <div className="py-10">
        {/* Page Header */}
        <header className="mb-10">
          <p className="text-sm font-medium text-gray-500 mb-2 tracking-widest uppercase">
            Terminology / 术语表
          </p>
          <h1 className="mb-4">Glossary</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Key terminology and concepts in{' '}
            <em>Climate Leadership in Global Environmental Governance</em>.
            Each entry provides a definition, related terms, and links to the
            chapters where the concept is discussed.
          </p>
          <p className="text-base text-gray-500 max-w-2xl mt-3">
            <em>全球环境治理中的气候领导力</em>
            中的核心术语与概念。每一词条提供定义、相关术语及其所属章节。
          </p>
        </header>

        {/* Category Sections */}
        <div className="space-y-12">
          {CATEGORY_ORDER.map((category) => {
            const categoryTerms = grouped[category];
            if (categoryTerms.length === 0) return null;

            const info = categoryInfo[category];
            const labels = CATEGORY_LABELS[category];

            return (
              <section key={category}>
                {/* Category Header */}
                <div className="mb-6 flex items-center gap-3">
                  <span
                    className="inline-block px-3 py-1 text-sm font-medium text-white rounded"
                    style={{ backgroundColor: info.color }}
                  >
                    {labels.en}
                  </span>
                  <span className="text-sm text-gray-400">{labels.zh}</span>
                  <span className="ml-auto text-sm text-gray-400">
                    {categoryTerms.length}{' '}
                    {categoryTerms.length === 1 ? 'term' : 'terms'}
                  </span>
                </div>

                {/* Term Cards */}
                <div className="space-y-4">
                  {categoryTerms.map((term) => (
                    <div
                      key={term.id}
                      className="border border-gray-200 rounded-lg p-5 bg-white hover:border-gray-300 transition-colors"
                    >
                      {/* Term Title Row */}
                      <div className="flex items-start gap-3 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="font-semibold text-base text-primary">
                              {term.nameZh}
                            </span>
                            <span className="text-sm text-gray-500">
                              {term.nameEn}
                            </span>
                          </div>
                          {term.abbr && (
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-mono bg-gray-100 text-gray-600 rounded border border-gray-200">
                              {term.abbr}
                            </span>
                          )}
                        </div>
                        <span
                          className="inline-block px-2 py-0.5 text-xs font-medium text-white rounded flex-shrink-0"
                          style={{ backgroundColor: info.color }}
                        >
                          {labels.en}
                        </span>
                      </div>

                      {/* Definition */}
                      <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                        {term.definition}
                      </p>

                      {/* Related Terms */}
                      {term.relatedTerms && term.relatedTerms.length > 0 && (
                        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="text-xs text-gray-400 flex-shrink-0">
                            Related:
                          </span>
                          {term.relatedTerms.map((relatedId) => {
                            const relatedTerm = terms.find(
                              (t) => t.id === relatedId
                            );
                            if (!relatedTerm) return null;
                            return (
                              <a
                                key={relatedId}
                                href={`#${relatedId}`}
                                className="text-xs text-primary hover:underline"
                              >
                                {relatedTerm.nameZh}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
