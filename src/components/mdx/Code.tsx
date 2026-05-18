'use client';

import React, { useState } from 'react';

interface CodeProps {
  children: string;
  className?: string;
  language?: string;
  showLineNumbers?: boolean;
}

export function Code({
  children,
  className = '',
  language = 'javascript',
  showLineNumbers = true,
}: CodeProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = children.split('\n').filter(line => line || children.endsWith('\n'));

  return (
    <div className="
      relative bg-gray-900 text-gray-50 rounded-lg
      overflow-hidden border border-gray-700
      my-4
    ">
      {/* Header */}
      <div className="
        flex items-center justify-between px-4 py-3
        bg-gray-800 border-b border-gray-700
      ">
        <span className="text-xs font-mono text-gray-400">
          {language}
        </span>
        <button
          onClick={copyToClipboard}
          className="
            text-xs px-3 py-1 rounded
            bg-gray-700 hover:bg-gray-600
            text-gray-200 transition-colors
          "
          aria-label="Copy code"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      {/* Code Block */}
      <pre className="
        overflow-x-auto p-4 font-mono text-sm
        leading-relaxed
      ">
        <code className={className}>
          {showLineNumbers ? (
            <div className="flex">
              <div className="
                select-none pr-4 text-gray-500
                border-r border-gray-700
                text-right
              ">
                {lines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div className="pl-4 flex-1">
                {lines.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          ) : (
            children
          )}
        </code>
      </pre>
    </div>
  );
}

// Inline code component
interface InlineCodeProps {
  children: React.ReactNode;
  className?: string;
}

export function InlineCode({ children, className }: InlineCodeProps) {
  return (
    <code className={`
      bg-gray-100 text-gray-900 px-2 py-1 rounded
      font-mono text-sm
      ${className}
    `}>
      {children}
    </code>
  );
}
