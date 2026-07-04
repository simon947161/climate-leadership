import Container from '@/components/Container';
import Section from '@/components/Section';
import Prose from '@/components/Prose';
import Flowchart from '@/components/Flowchart';

export const metadata = {
  title: 'Design System - Climate Leadership',
  description: 'Typography and design system demo for Climate Leadership research platform',
};

export default function DesignSystemPage() {
  return (
    <Container>
      <Section spacing="lg">
        <h1>Design System</h1>
        <p className="text-lg text-gray-600 mb-8">
          Typography and visual specification demo for Climate Leadership in Global Environmental Governance research platform.
        </p>

        {/* ---- Color Scheme ---- */}
        <Section spacing="md">
          <h2>Color Scheme</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div>
              <div className="w-full h-24 bg-[#1A3A5C] rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Primary</p>
              <p className="text-xs text-gray-600">#1A3A5C</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#2D7D8A] rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Accent</p>
              <p className="text-xs text-gray-600">#2D7D8A</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#C8A26A] rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Auxiliary</p>
              <p className="text-xs text-gray-600">#C8A26A</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#F8F9FA] border border-gray-200 rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Background</p>
              <p className="text-xs text-gray-600">#F8F9FA</p>
            </div>
          </div>
        </Section>

        {/* ---- Typography ---- */}
        <Section spacing="md">
          <h2>Typography</h2>
          
          <h3>Headings</h3>
          <div className="mb-8">
            <h1>Heading 1: Climate Governance</h1>
            <h2>Heading 2: Mechanism Design</h2>
            <h3>Heading 3: Conceptual Framework</h3>
            <h4>Heading 4: Sub-section</h4>
          </div>

          <h3>Body Text</h3>
          <Prose>
            <p>
              This is a paragraph demonstrating the body text style. The quick brown fox jumps over the lazy dog. 
              Climate governance requires new theoretical frameworks that integrate thermal dynamics, temporal considerations, 
              and environmental systems.
            </p>
            <p>
              Another paragraph with a <a href="#">link example</a> and some <strong>bold text</strong> and <em>italic text</em>.
            </p>
            <blockquote>
              A blockquote example: &ldquo;The future of climate governance lies in the integration of AI ecosystems 
              and ecological chains.&rdquo;
            </blockquote>
          </Prose>
        </Section>

        {/* ---- Terminology Highlight ---- */}
        <Section spacing="md">
          <h2>Terminology Highlight</h2>
          <p className="mb-4">
            Example sentence with highlighted terminology: The <span className="term-highlight">TTEG</span> theory 
            provides a framework for understanding <span className="term-highlight first-appearance">CZRM</span> in 
            the context of <span className="term-highlight">AI-ESG</span> integration.
          </p>
          <p className="text-sm text-gray-600">
            Hover over the highlighted terms to see the interaction effect.
          </p>
        </Section>

        {/* ---- Concept Card ---- */}
        <Section spacing="md">
          <h2>Concept Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="concept-card">
              <h3 className="text-lg font-semibold mb-2">CZRM</h3>
              <p className="text-sm text-gray-600 mb-2">Climatic-Zonal Responsibility Mechanism</p>
              <p className="text-sm">
                A mechanism for allocating emission reduction responsibilities based on global climatic zone distribution.
              </p>
            </div>
            <div className="concept-card">
              <h3 className="text-lg font-semibold mb-2">TTEG</h3>
              <p className="text-sm text-gray-600 mb-2">Thermal-Time-Environment Governance</p>
              <p className="text-sm">
                A climate governance theoretical framework constructed from three dimensions: Thermal, Time, and Environment.
              </p>
            </div>
          </div>
        </Section>

        {/* ---- Layout Components ---- */}
        <Section spacing="md">
          <h2>Layout Components</h2>
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="mb-4">Container Demo</h3>
            <p className="text-sm text-gray-600">
              This content is wrapped in a Container component with max-width constraint.
            </p>
          </div>
        </Section>

        {/* ---- Mermaid Test ---- */}
        <div id="mermaid-test"><Section spacing="md">
          <h2>Mermaid Test</h2>
          <p className="text-sm text-gray-600 mb-4">
            Flowchart rendering test using the Flowchart component (Batch 7B).
          </p>
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <Flowchart
              chart={`
                graph TD
                  A[Observation] --> B[Analysis]
                  B --> C[Governance Interpretation]
              `}
              caption="Figure 0: Minimal test diagram — Observation → Analysis → Governance Interpretation"
            />
          </div>
        </Section></div>

      </Section>
    </Container>
  );
}
