import React from 'react';
import Container from './Container';

interface PDFDownloadProps {
  href?: string;
  label?: string;
  className?: string;
}

/**
 * PDFDownload - Button/link to download the full book PDF
 * 
 * If href is provided, links to the PDF file.
 * If href is not provided, shows a disabled button or a "coming soon" message.
 */
export default function PDFDownload({ 
  href = '/pdf/climate-leadership-zh.pdf', 
  label = '下载全书 PDF',
  className = '' 
}: PDFDownloadProps) {
  return (
    <Container size="md">
      <div className={`py-4 ${className}`}>
        <a
          href={href}
          download
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
          {label}
        </a>
        <p className="text-sm text-gray-600 mt-2">
          包含全部已发布章节（PDF, ~2MB）
        </p>
      </div>
    </Container>
  );
}
