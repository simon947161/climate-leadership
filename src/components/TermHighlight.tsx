import React from 'react';
import { highlightTerms, getTermById } from '@/data/terms';
import TermTooltip from './TermTooltip';

interface TermHighlightProps {
  children: React.ReactNode;
}

/**
 * TermHighlight - Recursively processes React children to highlight terms
 * 
 * This component walks through the React tree and:
 * - For string children, uses highlightTerms() to find and highlight terms
 * - For React element children, recursively processes their children
 * - For array children, processes each element
 * 
 * Used as a wrapper for Markdown content to auto-highlight terminology
 */
export default function TermHighlight({ children }: TermHighlightProps) {
  return <>{processNode(children)}</>;
}

function processNode(node: React.ReactNode): React.ReactNode {
  // Handle null, undefined, boolean, number
  if (node === null || node === undefined || typeof node === 'boolean' || typeof node === 'number') {
    return node;
  }
  
  // Handle string - split into segments and highlight terms
  if (typeof node === 'string') {
    return processString(node);
  }
  
  // Handle array of nodes
  if (Array.isArray(node)) {
    return node.map((child, index) => (
      <React.Fragment key={index}>{processNode(child)}</React.Fragment>
    ));
  }
  
  // Handle React element - recursively process its children
  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;
    const props = element.props;
    
    if (props.children !== undefined) {
      const processedChildren = processNode(props.children);
      return React.cloneElement(element, { ...props, children: processedChildren });
    }
    
    return element;
  }
  
  return node;
}

function processString(text: string): React.ReactNode {
  const segments = highlightTerms(text);
  
  if (segments.length === 1 && segments[0].type === 'text') {
    return text;
  }
  
  return segments.map((segment, index) => {
    if (segment.type === 'text') {
      return <React.Fragment key={`text-${index}`}>{segment.content}</React.Fragment>;
    }
    
    const term = getTermById(segment.termId);
    if (!term) {
      return <React.Fragment key={`term-${index}`}>{segment.content}</React.Fragment>;
    }
    
    return (
      <TermTooltip
        key={`term-${index}`}
        term={term}
        isFirstAppearance={segment.isFirstAppearance}
      >
        {segment.content}
      </TermTooltip>
    );
  });
}
