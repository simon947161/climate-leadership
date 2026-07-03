import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * Container component - constrains max-width and centers content
 * 
 * Size options:
 * - sm: 640px (small conten)
 * - md: 768px (medium content)
 * - lg: 1024px (large content)
 * - xl: 1200px (full page, default)
 * - full: 100% (no max-width)
 */
export default function Container({ 
  children, 
  className = '', 
  size = 'xl' 
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-[640px]',
    md: 'max-w-[768px]',
    lg: 'max-w-[1024px]',
    xl: 'max-w-[1200px]',
    full: 'max-w-full',
  };

  return (
    <div className={`mx-auto px-4 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}
