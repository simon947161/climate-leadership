import type { Metadata } from 'next';
import Container from '@/components/Container';
import ConceptGraph from '@/components/ConceptGraph';

export const metadata: Metadata = {
  title: 'Concept Map — Core Framework | Climate Leadership',
  description:
    'The five core concepts of this book: Ecological Chain, CZRM, TTEG, AI-ESG, and RWA — and the relationships between them.',
};

export default function ConceptMapPage() {
  return (
    <Container size="lg">
      <div className="py-10">
        {/* Header */}
        <header className="mb-8">
          <p className="text-sm text-gray-500 mb-2 tracking-widest uppercase">Visual Framework</p>
          <h1 className="mb-3">Core Concepts</h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Five interconnected concepts form the theoretical foundation of this book. Hover over each
            node to learn more. Drag nodes to rearrange the map.
          </p>
        </header>

        {/* Graph Card */}
        <div className="rounded-xl border border-gray-200 overflow-hidden" style={{ background: '#FAFCFF' }}>
          <ConceptGraph />
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              color: '#1A3A5C',
              textColor: '#FFFFFF',
              label: 'CZRM',
              desc: 'Climatic-Zonal Responsibility Mechanism — governance by climate position',
            },
            {
              color: '#2D7D8A',
              textColor: '#FFFFFF',
              label: 'TTEG',
              desc: 'Thermal-Time-Environment Governance — governance by natural cycles',
            },
            {
              color: '#C8A26A',
              textColor: '#FFFFFF',
              label: 'AI-ESG',
              desc: 'AI-Enhanced ESG — multi-dimensional ecological evaluation',
            },
            {
              color: '#7A9A6A',
              textColor: '#FFFFFF',
              label: 'RWA',
              desc: 'Real World Assets (Tokenized) — ecological assets on-chain',
            },
            {
              color: '#E8F0E0',
              textColor: '#1A3A5C',
              label: 'Ecological Chain',
              desc: 'The global ecological system — carbon, water, biodiversity',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 p-3 rounded-lg border border-gray-100"
              style={{ background: item.color === '#E8F0E0' ? '#FFFFFF' : 'transparent' }}
            >
              <span
                className="inline-block w-3 h-3 rounded-full mt-0.5 flex-shrink-0"
                style={{ background: item.color, border: item.color === '#E8F0E0' ? '1.5px solid #1A3A5C' : 'none' }}
              />
              <div>
                <span
                  className="font-semibold text-sm"
                  style={{ color: item.color === '#E8F0E0' ? '#1A3A5C' : item.color }}
                >
                  {item.label}
                </span>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Relationships */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>
            Relationships
          </h2>
          <div className="space-y-2">
            {[
              {
                from: 'TTEG',
                to: 'CZRM',
                label: 'Theoretical Framework',
                note: 'TTEG provides the temporal/spatial logic that CZRM implements',
              },
              {
                from: 'TTEG',
                to: 'Ecological Chain',
                label: 'Governs By',
                note: 'TTEG governs ecological systems using their natural cycles',
              },
              {
                from: 'Ecological Chain',
                to: 'RWA',
                label: 'Asset Base',
                note: 'Ecological systems provide the physical assets that RWA maps and tokenizes',
              },
              {
                from: 'TTEG',
                to: 'AI-ESG',
                label: 'Metrics From',
                note: 'TTEG governance goals are measured by AI-ESG indicators',
              },
              {
                from: 'AI-ESG',
                to: 'RWA',
                label: 'Verifies',
                note: 'AI-ESG provides verification and pricing for ecological RWAs',
              },
              {
                from: 'CZRM',
                to: 'RWA',
                label: 'Maps Assets',
                note: 'CZRM maps ecological assets globally, creating the asset inventory for RWA',
              },
            ].map((rel) => (
              <div
                key={`${rel.from}-${rel.to}`}
                className="flex items-start gap-3 text-sm py-2 border-b border-gray-100 last:border-0"
              >
                <span className="font-medium text-primary min-w-[90px]">{rel.from}</span>
                <span className="text-gray-400">→</span>
                <span className="font-medium text-accent min-w-[90px]">{rel.to}</span>
                <span className="text-gray-500">— {rel.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
