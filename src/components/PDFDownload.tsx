import React from 'react';

interface PDFDownloadProps {
  lang?: 'zh' | 'en' | 'both';
  className?: string;
}

/**
 * PDFDownload - Button/link to download the full book
 *
 * Links to the Word document (.docx) file in the public folder.
 * Supports both Chinese and English versions.
 */
export default function PDFDownload({
  lang = 'zh',
  className = ''
}: PDFDownloadProps) {
  const fileMap = {
    zh: {
      href: '/climate-leadership-zh.docx',
      label: '下载全书（中文版）',
      filename: 'climate-leadership-zh.docx',
    },
    en: {
      href: '/climate-leadership-en.docx',
      label: 'Download Full Book (English)',
      filename: 'climate-leadership-en.docx',
    },
  };

  const showZh = lang === 'zh' || lang === 'both';
  const showEn = lang === 'en' || lang === 'both';

  return (
    <div className={`pdf-download ${className}`}>
      <h3 className="text-lg font-semibold mb-4">全书下载</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        {showZh && (
          <a
            href={fileMap.zh.href}
            download={fileMap.zh.filename}
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
            {fileMap.zh.label}
          </a>
        )}
        {showEn && (
          <a
            href={fileMap.en.href}
            download={fileMap.en.filename}
            className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
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
            {fileMap.en.label}
          </a>
        )}
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Word 文档（.docx格式，可用 Microsoft Word 或 WPS 打开）
      </p>
    </div>
  );
}
