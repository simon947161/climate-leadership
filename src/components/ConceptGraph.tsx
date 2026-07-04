'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// ─── Data Types ────────────────────────────────────────────────────────────────

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  shortLabel: string;
  group: number;
  description: string;
  color: string;
  borderColor: string;
  chapterLink: string;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  label: string;
  curvature?: number;
}

// ─── Static Data ───────────────────────────────────────────────────────────────

const NODES: GraphNode[] = [
  {
    id: 'tteg',
    label: 'TTEG',
    shortLabel: 'TTEG',
    group: 3,
    description:
      'Thermal-Time-Environment Governance. A theory that governs ecological systems using natural cycles (thermal, temporal, environmental) rather than political or quarterly cycles.',
    color: '#2D7D8A',
    borderColor: '#1D5D6A',
    chapterLink: '/chapters/en/chapter-5',
  },
  {
    id: 'czrm',
    label: 'CZRM',
    shortLabel: 'CZRM',
    group: 2,
    description:
      'Climatic-Zonal Responsibility Mechanism. A governance framework that assigns differentiated responsibilities to regions based on their position in the global climate system — upstream, midstream, or downstream.',
    color: '#1A3A5C',
    borderColor: '#0A2A4C',
    chapterLink: '/chapters/en/chapter-4',
  },
  {
    id: 'ai-esg',
    label: 'AI-ESG',
    shortLabel: 'AI-ESG',
    group: 4,
    description:
      'AI-Enhanced ESG Evaluation System. Combines satellite remote sensing, community validation, and large-scale AI models to provide transparent, multi-dimensional ecological assessment.',
    color: '#C8A26A',
    borderColor: '#A8824A',
    chapterLink: '/chapters/en/chapter-8',
  },
  {
    id: 'rwa',
    label: 'RWA',
    shortLabel: 'RWA',
    group: 5,
    description:
      'Real World Assets (Tokenized). Ecological assets mapped by CZRM, verified by AI-ESG, and represented as digital tokens — creating a bridge between physical ecology and financial systems.',
    color: '#7A9A6A',
    borderColor: '#5A7A4A',
    chapterLink: '/chapters/en/chapter-7',
  },
  {
    id: 'ecological-chain',
    label: 'Ecological Chain',
    shortLabel: 'Ecological\nChain',
    group: 1,
    description:
      'The global network of ecological systems that sustains life on Earth — including carbon cycles, biodiversity, hydrology, and climate regulation.',
    color: '#E8F0E0',
    borderColor: '#1A3A5C',
    chapterLink: '/chapters/en/chapter-10',
  },
];

const LINKS: GraphLink[] = [
  {
    source: 'tteg',
    target: 'czrm',
    label: 'Theoretical Framework',
    curvature: 0.2,
  },
  {
    source: 'tteg',
    target: 'ecological-chain',
    label: 'Governs By',
    curvature: -0.15,
  },
  {
    source: 'ecological-chain',
    target: 'rwa',
    label: 'Asset Base',
    curvature: 0.1,
  },
  {
    source: 'tteg',
    target: 'ai-esg',
    label: 'Metrics From',
    curvature: 0.25,
  },
  {
    source: 'ai-esg',
    target: 'rwa',
    label: 'Verifies',
    curvature: -0.1,
  },
  {
    source: 'czrm',
    target: 'rwa',
    label: 'Maps Assets',
    curvature: 0.15,
  },
];

// ─── Color Palette ─────────────────────────────────────────────────────────────

const GROUP_COLORS: Record<number, { fill: string; border: string; text: string }> = {
  1: { fill: '#E8F0E0', border: '#1A3A5C', text: '#1A3A5C' },
  2: { fill: '#1A3A5C', border: '#0A2A4C', text: '#FFFFFF' },
  3: { fill: '#2D7D8A', border: '#1D5D6A', text: '#FFFFFF' },
  4: { fill: '#C8A26A', border: '#A8824A', text: '#FFFFFF' },
  5: { fill: '#7A9A6A', border: '#5A7A4A', text: '#FFFFFF' },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ConceptGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const isMobile =
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    if (!svgRef.current) return;

    const container = svgRef.current.parentElement;
    if (!container) return;

    // Responsive dimensions
    const width = container.clientWidth || 800;
    const height = Math.max(400, Math.min(width * 0.6, 560));

    // Clear previous render
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);

    // Prevent scroll interference during touch interactions
    svg.style('touch-action', 'manipulation');

    // ── Defs (arrowhead marker) ──────────────────────────────────────────────
    const defs = svg.append('defs');

    defs
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 44)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#8FAAB8');

    // ── Zoom/Pan (use dbl-click zoom instead of scroll zoom for mobile compat)
    const g = svg.append('g');

    svg.call(
      d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.6, 2.0])
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        })
    );

    // ── Clone data for simulation ────────────────────────────────────────────
    const nodes: GraphNode[] = NODES.map((n) => ({ ...n }));
    const links: GraphLink[] = LINKS.map((l) => {
      const srcId = typeof l.source === 'string' ? l.source : (l.source as GraphNode).id;
      const tgtId = typeof l.target === 'string' ? l.target : (l.target as GraphNode).id;
      return {
        ...l,
        source: nodes.find((n) => n.id === srcId)!,
        target: nodes.find((n) => n.id === tgtId)!,
      };
    });

    // ── Force Simulation ──────────────────────────────────────────────────────
    const simulation = d3
      .forceSimulation<GraphNode>(nodes)
      .force(
        'link',
        d3
          .forceLink<GraphNode, GraphLink>(links)
          .id((d) => d.id)
          .distance(180)
          .strength(0.6)
      )
      .force('charge', d3.forceManyBody<GraphNode>().strength(-700))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<GraphNode>().radius(70));

    // ── Draw Links ────────────────────────────────────────────────────────────
    const linkGroup = g.append('g').attr('class', 'links');

    const linkEl = linkGroup
      .selectAll<SVGPathElement, GraphLink>('path')
      .data(links)
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', '#8FAAB8')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '6,4')
      .attr('marker-end', 'url(#arrowhead)');

    // ── Draw Link Labels ───────────────────────────────────────────────────────
    const linkLabelGroup = g.append('g').attr('class', 'link-labels');

    const linkLabelEl = linkLabelGroup
      .selectAll<SVGTextElement, GraphLink>('text')
      .data(links)
      .join('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', 11)
      .attr('font-family', 'var(--font-heading), Georgia, serif')
      .attr('fill', '#5A7A8A')
      .text((d) => d.label);

    // ── Draw Nodes ────────────────────────────────────────────────────────────
    const nodeGroup = g.append('g').attr('class', 'nodes');

    const nodeEl = nodeGroup
      .selectAll<SVGGElement, GraphNode>('g')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .style('cursor', isMobile ? 'pointer' : 'grab');

    // Node circle
    nodeEl
      .append('circle')
      .attr('r', 38)
      .attr('fill', (d) => GROUP_COLORS[d.group].fill)
      .attr('stroke', (d) => GROUP_COLORS[d.group].border)
      .attr('stroke-width', 2.5)
      .attr('filter', 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))');

    // Node label (short name) – two lines for "Ecological\nChain"
    nodeEl
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('y', 0)
      .attr('font-size', 12)
      .attr('font-weight', '700')
      .attr('font-family', 'var(--font-heading), Georgia, serif')
      .attr('fill', (d) => GROUP_COLORS[d.group].text)
      .attr('pointer-events', 'none')
      .each(function (d) {
        const lines = d.shortLabel.split('\n');
        const el = d3.select(this);
        if (lines.length === 1) {
          el.text(lines[0]);
        } else {
          lines.forEach((line, i) => {
            el.append('tspan')
              .attr('x', 0)
              .attr('dy', i === 0 ? '-0.3em' : '1.1em')
              .text(line);
          });
        }
      });

    // ── Tooltip ───────────────────────────────────────────────────────────────
    const tooltip = d3
      .select(container)
      .selectAll<HTMLDivElement, unknown>('.graph-tooltip')
      .data([null])
      .join('div')
      .attr('class', 'graph-tooltip');

    // Style tooltip with CSS classes instead of inline for better mobile
    tooltip
      .style('position', 'absolute')
      .style('pointer-events', 'none')
      .style('opacity', '0')
      .style('background', '#FFFFFF')
      .style('border', '1px solid #DDE1E6')
      .style('border-radius', '8px')
      .style('padding', '10px 14px')
      .style('max-width', '240px')
      .style('font-size', '12px')
      .style('line-height', '1.4')
      .style('color', '#1A3A5C')
      .style('box-shadow', '0 4px 12px rgba(0,0,0,0.12)')
      .style('transition', 'opacity 0.2s')
      .style('z-index', '10');

    // ── Interaction: Navigate on click (or tap on mobile) ──────────────────────
    // Track drag vs click: if mouse/touch moved < 5px, treat as click
    let dragStartX = 0;
    let dragStartY = 0;

    const navigateToChapter = (d: GraphNode) => {
      window.open(d.chapterLink, '_self');
    };

    nodeEl
      .on('mouseover', function (event: MouseEvent, d: GraphNode) {
        if (isMobile) return; // tooltip is hard on mobile
        d3.select(this).select('circle').attr('stroke-width', 4);
        tooltip
          .style('opacity', '1')
          .html(
            `<strong style="font-size:13px;font-family:var(--font-heading,Georgia,serif)">${d.label}</strong><br/><span style="color:#4A5A6A;font-size:11px">${d.description}</span><br/><span style="color:#2D7D8A;font-size:11px;margin-top:4px;display:inline-block">→ Read Chapter</span>`
          );
      })
      .on('mousemove', function (event: MouseEvent) {
        if (isMobile) return;
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        tooltip
          .style('left', `${Math.min(x + 14, container.clientWidth - 260)}px`)
          .style('top', `${Math.max(y - 60, 6)}px`);
      })
      .on('mouseout', function () {
        if (isMobile) return;
        d3.select(this).select('circle').attr('stroke-width', 2.5);
        tooltip.style('opacity', '0');
      });

    // ── Drag (only on non-mobile; on mobile use native scroll) ─────────────────
    if (!isMobile) {
      const drag = d3
        .drag<SVGGElement, GraphNode>()
        .on('start', (event, d) => {
          dragStartX = event.x;
          dragStartY = event.y;
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
          tooltip.style('opacity', '0');
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          const dist = Math.sqrt(
            (event.x - dragStartX) ** 2 + (event.y - dragStartY) ** 2
          );
          if (dist < 5) {
            navigateToChapter(d);
          }
          d.fx = null;
          d.fy = null;
        });

      nodeEl.call(drag);
    } else {
      // Mobile: tap navigates directly, no drag
      nodeEl.on('click', function (_event: unknown, d: GraphNode) {
        navigateToChapter(d);
      });
    }

    // ── Simulation Tick ────────────────────────────────────────────────────────
    simulation.on('tick', () => {
      linkEl.attr('d', (d) => {
        const sx = (d.source as GraphNode).x ?? 0;
        const sy = (d.source as GraphNode).y ?? 0;
        const tx = (d.target as GraphNode).x ?? 0;
        const ty = (d.target as GraphNode).y ?? 0;
        const curvature = d.curvature ?? 0;
        const dx = tx - sx;
        const dy = ty - sy;
        const dr = Math.sqrt(dx * dx + dy * dy) / (curvature || 0.01);
        return `M${sx},${sy}A${dr},${dr} 0 0,1 ${tx},${ty}`;
      });

      linkLabelEl.attr('transform', (d) => {
        const sx = (d.source as GraphNode).x ?? 0;
        const sy = (d.source as GraphNode).y ?? 0;
        const tx = (d.target as GraphNode).x ?? 0;
        const ty = (d.target as GraphNode).y ?? 0;
        return `translate(${(sx + tx) / 2}, ${(sy + ty) / 2})`;
      });

      nodeEl.attr('transform', (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    // ── ResizeObserver ─────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      simulation.stop();
      const newWidth = container.clientWidth || 800;
      const newHeight = Math.max(400, Math.min(newWidth * 0.6, 560));
      svg.attr('width', newWidth).attr('height', newHeight).attr('viewBox', `0 0 ${newWidth} ${newHeight}`);
      simulation.force('center', d3.forceCenter(newWidth / 2, newHeight / 2));
      simulation.alpha(0.3).restart();
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      simulation.stop();
    };
  }, []);

  return (
    <div className="relative" style={{ width: '100%', minHeight: 400 }}>
      <svg
        ref={svgRef}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        aria-label="Concept Map: TTEG, CZRM, AI-ESG, RWA, and Ecological Chain"
        role="img"
      />
    </div>
  );
}
