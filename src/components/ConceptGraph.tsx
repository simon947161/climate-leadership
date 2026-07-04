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
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  label: string;
  curvature?: number;
}

// ─── Static Data ───────────────────────────────────────────────────────────────

const NODES: GraphNode[] = [
  {
    id: 'ecological-chain',
    label: 'Ecological Chain',
    shortLabel: 'Ecological Chain',
    group: 1,
    description: 'The global network of ecological systems that sustains life on Earth — including carbon cycles, biodiversity, hydrology, and climate regulation.',
    color: '#E8F0E0',
    borderColor: '#1A3A5C',
  },
  {
    id: 'czzm',
    label: 'CZRM',
    shortLabel: 'CZRM',
    group: 2,
    description: 'Climatic-Zonal Responsibility Mechanism. A governance framework that assigns differentiated responsibilities to regions based on their position in the global climate system — upstream, midstream, or downstream.',
    color: '#1A3A5C',
    borderColor: '#0A2A4C',
  },
  {
    id: 'tteg',
    label: 'TTEG',
    shortLabel: 'TTEG',
    group: 3,
    description: 'Thermal-Time-Environment Governance. A theory that governs ecological systems using natural cycles (thermal, temporal, environmental) rather than political or quarterly cycles.',
    color: '#2D7D8A',
    borderColor: '#1D5D6A',
  },
  {
    id: 'ai-esg',
    label: 'AI-ESG',
    shortLabel: 'AI-ESG',
    group: 4,
    description: 'AI-Enhanced ESG Evaluation System. Combines satellite remote sensing, community validation, and large-scale AI models to provide transparent, multi-dimensional ecological assessment.',
    color: '#C8A26A',
    borderColor: '#A8824A',
  },
  {
    id: 'rwa',
    label: 'RWA',
    shortLabel: 'RWA',
    group: 5,
    description: 'Real World Assets (Tokenized). Ecological assets mapped by CZRM, verified by AI-ESG, and represented as digital tokens — creating a bridge between physical ecology and financial systems.',
    color: '#7A9A6A',
    borderColor: '#5A7A4A',
  },
];

const LINKS: GraphLink[] = [
  {
    source: 'tteg',
    target: 'czzm',
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
    source: 'czzm',
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

  useEffect(() => {
    if (!svgRef.current) return;

    const container = svgRef.current.parentElement;
    if (!container) return;

    // Responsive dimensions
    const width = container.clientWidth || 800;
    const height = Math.max(480, Math.min(width * 0.65, 640));

    // Clear previous render
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);

    // ── Defs (arrowhead marker) ──────────────────────────────────────────────
    const defs = svg.append('defs');

    defs
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 44) // tip offset so arrow doesn't overlap node
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#8FAAB8');

    defs
      .append('marker')
      .attr('id', 'arrowhead-light')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 44)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#A8C4CC');

    // ── Zoom/Pan ─────────────────────────────────────────────────────────────
    const g = svg.append('g');

    svg.call(
      d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.5, 2.5])
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
          .distance(220)
          .strength(0.8)
      )
      .force('charge', d3.forceManyBody<GraphNode>().strength(-900))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'collision',
        d3.forceCollide<GraphNode>().radius(80)
      );

    // ── Draw Links ────────────────────────────────────────────────────────────
    const linkGroup = g.append('g').attr('class', 'links');

    const linkEl = linkGroup
      .selectAll<SVGPathElement, GraphLink>('path')
      .data(links)
      .join('path')
      .attr('class', 'link')
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
      .attr('class', 'link-label')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', 11)
      .attr('font-family', 'var(--font-heading), Georgia, serif')
      .attr('fill', '#5A7A8A')
      .attr('background', 'white')
      .text((d) => d.label);

    // ── Draw Nodes ────────────────────────────────────────────────────────────
    const nodeGroup = g.append('g').attr('class', 'nodes');

    const nodeEl = nodeGroup
      .selectAll<SVGGElement, GraphNode>('g')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .style('cursor', 'grab');

    // Node circle
    nodeEl
      .append('circle')
      .attr('r', 38)
      .attr('fill', (d) => GROUP_COLORS[d.group].fill)
      .attr('stroke', (d) => GROUP_COLORS[d.group].border)
      .attr('stroke-width', 2.5)
      .attr('filter', 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))');

    // Node label (short name)
    nodeEl
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('y', 0)
      .attr('font-size', 13)
      .attr('font-weight', '700')
      .attr('font-family', 'var(--font-heading), Georgia, serif')
      .attr('fill', (d) => GROUP_COLORS[d.group].text)
      .attr('pointer-events', 'none')
      .text((d) => d.shortLabel);

    // ── Tooltip ───────────────────────────────────────────────────────────────
    const tooltip = d3
      .select(container)
      .selectAll<HTMLDivElement, unknown>('.graph-tooltip')
      .data([null])
      .join('div')
      .attr('class', 'graph-tooltip')
      .style('position', 'absolute')
      .style('pointer-events', 'none')
      .style('opacity', '0')
      .style('background', '#FFFFFF')
      .style('border', '1px solid #DDE1E6')
      .style('border-radius', '8px')
      .style('padding', '12px 16px')
      .style('max-width', '260px')
      .style('font-size', '13px')
      .style('line-height', '1.5')
      .style('color', '#1A3A5C')
      .style('box-shadow', '0 4px 12px rgba(0,0,0,0.12)')
      .style('transition', 'opacity 0.2s');

    nodeEl
      .on('mouseover', function (event: MouseEvent, d: GraphNode) {
        d3.select(this).select('circle').attr('stroke-width', 4);
        tooltip
          .style('opacity', '1')
          .html(
            `<strong style="font-size:14px;font-family:var(--font-heading,Georgia,serif)">${d.label}</strong><br/><span style="color:#4A5A6A">${d.description}</span>`
          );
      })
      .on('mousemove', function (event: MouseEvent) {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const tooltipX = x + 16;
        const tooltipY = y - 16;
        tooltip
          .style('left', `${Math.min(tooltipX, container.clientWidth - 280)}px`)
          .style('top', `${Math.max(tooltipY - 60, 8)}px`);
      })
      .on('mouseout', function () {
        d3.select(this).select('circle').attr('stroke-width', 2.5);
        tooltip.style('opacity', '0');
      });

    // ── Drag ──────────────────────────────────────────────────────────────────
    const drag = d3
      .drag<SVGGElement, GraphNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    nodeEl.call(drag);

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
        const dr = Math.sqrt(dx * dx + dy * dy) / curvature || 0;
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
      const newHeight = Math.max(480, Math.min(newWidth * 0.65, 640));
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
    <div className="relative" style={{ width: '100%', minHeight: 480 }}>
      <svg
        ref={svgRef}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        aria-label="Concept Map: CZRM, TTEG, AI-ESG, RWA, and Ecological Chain"
      />
    </div>
  );
}
