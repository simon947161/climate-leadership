import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Section component - wraps content sections with consistent spacing
 * 
 * Spacing options:
 * - sm: 2rem (32px) vertical padding
 * - md: 3rem (48px) vertical padding (default)
 * - lg: 4rem (64px) vertical padding
 * - xl: 6rem (96px) vertical padding
 */
export default function Section({ 
  children, 
  className = '', 
  spacing = 'md' 
}: SectionProps) {
  const spacingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
  };

  return (
    <section className={`${spacingClasses[spacing]} ${className}`}>
      {children}
    </section>
  );
}
