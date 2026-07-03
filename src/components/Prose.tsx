import React from 'react';

interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Prose component - applies typography styles for article/chapter content
 * 
 * Wraps content with the `.prose` class defined in globals.css
 * Use this component for chapter content, blog posts, or any long-form text
 */
export default function Prose({ 
  children, 
  className = '' 
}: ProseProps) {
  return (
    <div className={`prose ${className}`}>
      {children}
    </div>
  );
}
