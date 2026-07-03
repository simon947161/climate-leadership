import Container from '@/components/Container';
import Section from '@/components/Section';
import { chaptersZh } from '@/data/chapters';

export const metadata = {
  title: '章节目录 | Climate Leadership',
  description: '《全球环境治理中的气候领导力》中文版章节目录',
};

export default function ChaptersDirectoryPage() {
  const completedChapters = chaptersZh.filter(ch => ch.status === 'complete');
  const pendingChapters = chaptersZh.filter(ch => ch.status === 'pending');

  return (
    <Container size="md">
      <Section spacing="lg">
        <header className="mb-8">
          <h1>章节目录</h1>
          <p className="text-lg text-gray-600">
            《全球环境治理中的气候领导力》中文版
          </p>
        </header>

        {/* Completed Chapters */}
        {completedChapters.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4">已发布章节</h2>
            <div className="space-y-4">
              {completedChapters.map(chapter => (
                <a
                  key={chapter.id}
                  href={`/chapters/zh/${chapter.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Chapter {chapter.number}
                      </p>
                      <h3 className="text-lg font-semibold mb-1">
                        {chapter.titleZh}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {chapter.titleEn}
                      </p>
                    </div>
                    {chapter.wordCount && (
                      <span className="text-sm text-gray-500">
                        {chapter.wordCount} 字
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Pending Chapters */}
        {pendingChapters.length > 0 && (
          <section>
            <h2 className="mb-4">待发布章节</h2>
            <div className="space-y-4">
              {pendingChapters.map(chapter => (
                <div
                  key={chapter.id}
                  className="block p-4 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Chapter {chapter.number}
                      </p>
                      <h3 className="text-lg font-semibold mb-1 text-gray-500">
                        {chapter.titleZh}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {chapter.titleEn}
                      </p>
                    </div>
                    <span className="text-sm text-gray-400 italic">
                      Pending
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Back to Home */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <a href="/" className="text-primary hover:underline">
            ← 返回首页
          </a>
        </div>
      </Section>
    </Container>
  );
}
