import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import ConceptGraph from '@/components/ConceptGraph';

export const metadata: Metadata = {
  title: 'Concept Map — Core Framework | Climate Leadership',
  description:
    'The five core concepts of this book: Ecological Chain, CZRM, TTEG, AI-ESG, and RWA — and the relationships between them.',
};

const chapterLinks: { concept: string; label: string; href: string }[] = [
  { concept: 'TTEG', label: 'Chapter 5 — TTEG Theoretical Framework', href: '/chapters/en/chapter-5' },
  { concept: 'CZRM', label: 'Chapter 4 — CZRM Governance Mechanism', href: '/chapters/en/chapter-4' },
  { concept: 'AI-ESG', label: 'Chapter 8 — AI-ESG Evaluation System', href: '/chapters/en/chapter-8' },
  { concept: 'RWA', label: 'Chapter 7 — RWA Tokenized Assets', href: '/chapters/en/chapter-7' },
  { concept: 'Ecological Chain', label: 'Chapter 10 — Ecological Chain', href: '/chapters/en/chapter-10' },
];

export default function ConceptMapPage() {
  return (
    <Container size="lg">
      <div className="py-10">
        {/* Header */}
        <header className="mb-8">
          <p className="text-sm text-gray-500 mb-2 tracking-widest uppercase">Visual Framework</p>
          <h1 className="mb-3">Core Concepts</h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Click any node to jump to its chapter. Hover for a summary. Drag to rearrange.
          </p>
        </header>

        {/* Graph Card */}
        <div className="rounded-xl border border-gray-200 overflow-hidden" style={{ background: '#FAFCFF' }}>
          <ConceptGraph />
        </div>

        {/* ── Explanation Section ── */}
        <div
          className="mt-8 p-6 rounded-xl border border-gray-200 leading-relaxed text-sm"
          style={{ background: '#F8FAFE' }}
        >
          <p className="mb-3">
            <strong>This diagram is not an illustration.</strong> It is the theoretical entry point of this book — a structural map of the five ideas that together form a coherent governance framework for the ecological civilization of the Anthropocene.
          </p>
          <p className="mb-3">
            <strong>TTEG</strong> (Thermal-Time-Environment Governance) provides the foundational logic: that governance should follow the natural cycles of the Earth rather than political calendars. <strong>CZRM</strong> (Climatic-Zonal Responsibility Mechanism) implements this logic spatially, assigning differentiated responsibilities based on a region&apos;s position in the global climate flow. <strong>AI-ESG</strong> provides the measurement layer — a multi-dimensional, transparent evaluation system that blends satellite data, community validation, and AI modeling. <strong>RWA</strong> (Real World Assets) bridges physical ecology and digital finance by tokenizing the assets that CZRM maps and AI-ESG verifies. And <strong>the Ecological Chain</strong> is the substrate — the actual carbon cycles, water systems, and biodiversity networks that all these mechanisms exist to serve.
          </p>
          <p className="mb-0">
            Read the nodes from right to left: the <strong>Ecological Chain</strong> is the foundation, <strong>CZRM</strong> maps it, <strong>AI-ESG</strong> measures it, <strong>RWA</strong> values it, and <strong>TTEG</strong> governs the entire cycle.
          </p>
        </div>

        {/* ── Quick-Reference: Node-to-Chapter Links ── */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>
            Jump to Chapter
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {chapterLinks.map((c) => (
              <Link
                key={c.concept}
                href={c.href}
                className="block px-4 py-3 rounded-lg border border-gray-200 text-sm hover:border-gray-400 transition-colors"
                style={{ background: '#FAFCFF' }}
              >
                <span style={{ color: 'var(--color-primary)' }} className="font-semibold">
                  {c.concept}
                </span>
                <span className="block text-gray-500 text-xs mt-1">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { color: '#1A3A5C', label: 'CZRM', desc: 'Climatic-Zonal Responsibility Mechanism — governance by climate position' },
            { color: '#2D7D8A', label: 'TTEG', desc: 'Thermal-Time-Environment Governance — governance by natural cycles' },
            { color: '#C8A26A', label: 'AI-ESG', desc: 'AI-Enhanced ESG — multi-dimensional ecological evaluation' },
            { color: '#7A9A6A', label: 'RWA', desc: 'Real World Assets (Tokenized) — ecological assets on-chain' },
            { color: '#E8F0E0', label: 'Ecological Chain', desc: 'The global ecological system — carbon, water, biodiversity' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 p-3 rounded-lg border border-gray-100"
            >
              <span
                className="inline-block w-3 h-3 rounded-full mt-0.5 flex-shrink-0"
                style={{
                  background: item.color,
                  border: item.color === '#E8F0E0' ? '1.5px solid #1A3A5C' : 'none',
                }}
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
              { from: 'TTEG', to: 'CZRM', label: '→', note: 'TTEG provides the temporal/spatial logic that CZRM implements' },
              { from: 'TTEG', to: 'Ecological Chain', label: '→', note: 'TTEG governs ecological systems using their natural cycles' },
              { from: 'Ecological Chain', to: 'RWA', label: '→', note: 'Ecological systems provide the physical assets that RWA tokenizes' },
              { from: 'TTEG', to: 'AI-ESG', label: '→', note: 'TTEG governance goals are measured by AI-ESG indicators' },
              { from: 'AI-ESG', to: 'RWA', label: '→', note: 'AI-ESG provides verification and pricing for ecological RWAs' },
              { from: 'CZRM', to: 'RWA', label: '→', note: 'CZRM maps ecological assets globally, creating the asset inventory for RWA' },
            ].map((rel) => (
              <div
                key={`${rel.from}-${rel.to}`}
                className="flex items-start gap-3 text-sm py-2 border-b border-gray-100 last:border-0"
              >
                <span className="font-medium text-primary min-w-[90px]">{rel.from}</span>
                <span className="text-gray-400">{rel.label}</span>
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
