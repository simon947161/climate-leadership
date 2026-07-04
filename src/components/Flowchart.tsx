'use client';

import { useEffect, useRef, useId } from 'react';

interface FlowchartProps {
  chart: string;
  caption?: string;
  className?: string;
}

export default function Flowchart({ chart, caption, className = '' }: FlowchartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId().replace(/[:.]/g, '-');
  const hasRendered = useRef(false);

  useEffect(() => {
    // Only run once
    if (hasRendered.current) return;
    hasRendered.current = true;

    let cancelled = false;

    (async () => {
      const mermaid = await import('mermaid');

      mermaid.default.initialize({
        startOnLoad: false,
        theme: 'default',
        themeVariables: {
          primaryColor: '#1A3A5C',
          primaryTextColor: '#ffffff',
          primaryBorderColor: '#1A3A5C',
          lineColor: '#2D7D8A',
          secondaryColor: '#F0F4F8',
          tertiaryColor: '#F8F9FA',
          mainBkg: '#ffffff',
          nodeBorder: '#1A3A5C',
          clusterBkg: '#F8F9FA',
          clusterBorder: '#D1D5DB',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '14px',
        },
      });

      if (cancelled) return;

      try {
        const { svg } = await mermaid.default.render(`mermaid-${id}`, chart);
        if (containerRef.current && !cancelled) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
        if (containerRef.current && !cancelled) {
          containerRef.current.innerHTML = `<pre class="text-red-500 text-sm">Mermaid render failed: ${(err as Error).message}</pre>`;
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <div className={`flowchart-wrapper my-6 ${className}`}>
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden"
        style={{ touchAction: 'pan-x' }}
        aria-label={caption || 'Flowchart diagram'}
      />
      {caption && (
        <p className="text-sm text-gray-500 text-center mt-2 italic">{caption}</p>
      )}
    </div>
  );
}
