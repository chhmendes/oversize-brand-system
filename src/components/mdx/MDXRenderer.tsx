'use client';

import React from 'react';

interface MDXRendererProps {
  source: string;
  metadata?: Record<string, any>;
  components?: Record<string, React.ComponentType<any>>;
}

export function MDXRenderer({
  source,
  metadata,
  components = {},
}: MDXRendererProps) {
  // This component serves as a wrapper for MDX content
  // In a real implementation, this would use next-mdx-remote or similar
  // For now, it provides the structure for MDX rendering

  return (
    <article className="
      prose prose-lg max-w-4xl
      prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
      prose-p:text-gray-700 prose-p:leading-relaxed
      prose-a:text-[#B51F3A] prose-a:hover:underline
      prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
      prose-pre:bg-gray-900 prose-pre:text-gray-50
      prose-blockquote:border-l-4 prose-blockquote:border-[#B51F3A] prose-blockquote:pl-4
      prose-img:rounded-lg prose-img:shadow-md
      space-y-6
    ">
      {metadata && (
        <div className="mb-8 pb-6 border-b border-gray-300">
          {metadata.title && (
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {metadata.title}
            </h1>
          )}
          {metadata.description && (
            <p className="text-lg text-gray-600">
              {metadata.description}
            </p>
          )}
          {metadata.author && (
            <div className="text-sm text-gray-500 mt-4">
              By <strong>{metadata.author}</strong>
              {metadata.lastUpdate && ` • Updated ${metadata.lastUpdate}`}
            </div>
          )}
        </div>
      )}

      {/* Render components passed in */}
      {Object.keys(components).length > 0 && (
        <div className="custom-components">
          {/* Custom components would be rendered here */}
        </div>
      )}

      {/* Raw source would be rendered here with proper MDX compiler */}
      <div className="mdx-content" suppressHydrationWarning>
        {source && (
          <p className="text-gray-600 italic">
            [MDX content would render here with next-mdx-remote]
          </p>
        )}
      </div>
    </article>
  );
}
