'use client';

import React, { useState } from 'react';
import { Term, categoryInfo } from '@/data/terms';

interface TermTooltipProps {
  term: Term;
  isFirstAppearance: boolean;
  children: React.ReactNode;
}

/**
 * TermTooltip - Wraps a term span and shows definition on hover
 * 
 * This is a Client Component because it needs to handle hover state
 */
export default function TermTooltip({ term, isFirstAppearance, children }: TermTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const categoryColor = categoryInfo[term.category].color;
  const categoryLabel = categoryInfo[term.category].label;

  return (
    <span className="relative inline-block">
      <span
        className={`term-highlight ${isFirstAppearance ? 'first-appearance' : ''}`}
        style={{
          borderBottom: `2px dotted ${categoryColor}`,
          backgroundColor: isVisible ? `${categoryColor}20` : undefined,
        }}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        tabIndex={0}
        role="button"
        aria-describedby={`term-${term.id}-tooltip`}
      >
        {children}
      </span>
      
      {isVisible && (
        <span
          id={`term-${term.id}-tooltip`}
          role="tooltip"
          className="absolute z-50 left-0 top-full mt-2 w-80 max-w-sm p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg text-left"
          style={{ pointerEvents: 'none' }}
        >
          {/* Category Badge */}
          <span
            className="inline-block px-2 py-0.5 rounded text-xs font-medium text-white mb-2"
            style={{ backgroundColor: categoryColor }}
          >
            {categoryLabel}
          </span>
          
          {/* Term Name */}
          <span className="block font-semibold text-primary mb-1">
            {term.nameZh}
          </span>
          <span className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
            {term.nameEn}
          </span>
          
          {/* Definition */}
          <span className="block text-sm text-gray-800 dark:text-gray-200">
            {term.definition}
          </span>
          
          {/* Arrow */}
          <span
            className="absolute -top-2 left-4 w-4 h-4 bg-white dark:bg-gray-800 border-t border-l border-gray-200 dark:border-gray-700 transform rotate-45"
            aria-hidden="true"
          />
        </span>
      )}
    </span>
  );
}
