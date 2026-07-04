import Container from '@/components/Container';
import Section from '@/components/Section';
import PDFDownload from '@/components/PDFDownload';

export default function Home() {
  return (
    <Container size="lg">
      <Section spacing="lg">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <h1 className="mb-4">
            全球环境治理中的气候领导力
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Climate Leadership in Global Environmental Governance
          </p>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            一个基于热-时治理理论（TTEG）的研究平台
          </p>
        </header>

        {/* Key Concepts */}
        <Section spacing="md">
          <h2 className="text-center mb-8">核心概念</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="concept-card">
              <h3 className="text-lg font-semibold mb-2">CZRM</h3>
              <p className="text-sm text-gray-600 mb-2">Climatic-Zonal Responsibility Mechanism</p>
              <p className="text-sm">
                基于全球气候带分布的责任分配机制
              </p>
            </div>
            <div className="concept-card">
              <h3 className="text-lg font-semibold mb-2">TTEG</h3>
              <p className="text-sm text-gray-600 mb-2">Thermal-Time-Environment Governance</p>
              <p className="text-sm">
                热-时-环境治理理论框架
              </p>
            </div>
            <div className="concept-card">
              <h3 className="text-lg font-semibold mb-2">2-8-70 架构</h3>
              <p className="text-sm text-gray-600 mb-2">文明结构认知模型</p>
              <p className="text-sm">
                双核文明体、制度集群与广泛地带的共生秩序
              </p>
            </div>
          </div>
        </Section>

        {/* Call to Action */}
        <Section spacing="md">
          <div className="text-center">
            <a
              href="/chapters/zh"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors mr-4"
            >
              阅读章节（中文）
            </a>
            <a
              href="/chapters/en"
              className="inline-block border border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors mr-4"
            >
              Read Chapters (English)
            </a>
            <a
              href="/design-system"
              className="inline-block border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              设计系统
            </a>
          </div>
        </Section>

        {/* PDF Download */}
        <Section spacing="sm">
          <PDFDownload lang="both" />
        </Section>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>基于 Next.js + Vercel 部署 | 视觉设计：Design01</p>
        </footer>
      </Section>
    </Container>
  );
}
