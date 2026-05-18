'use client';

import React from 'react';

interface QuoteProps {
  children: React.ReactNode;
  author?: string;
  source?: string;
  highlight?: boolean;
}

export function Quote({
  children,
  author,
  source,
  highlight = false,
}: QuoteProps) {
  return (
    <blockquote className={`
      my-6 px-4 py-4 border-l-4 border-[#B51F3A]
      ${highlight ? 'bg-[#F5E3E7]' : 'bg-gray-50'}
    `}>
      <p className={`
        text-lg italic
        ${highlight ? 'text-[#3A0E12]' : 'text-gray-800'}
        leading-relaxed
      `}>
        "{children}"
      </p>

      {(author || source) && (
        <div className="mt-4 text-sm text-gray-600">
          {author && <p className="font-semibold">— {author}</p>}
          {source && <p className="text-xs italic">{source}</p>}
        </div>
      )}
    </blockquote>
  );
}

// Voice example component
interface VoiceExampleProps {
  type: 'correct' | 'incorrect' | 'example';
  children: React.ReactNode;
  label?: string;
}

export function VoiceExample({
  type,
  children,
  label,
}: VoiceExampleProps) {
  const config = {
    correct: {
      icon: '✓',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      textColor: 'text-green-900',
      label: label || 'Correct',
    },
    incorrect: {
      icon: '✕',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
      textColor: 'text-red-900',
      label: label || 'Avoid',
    },
    example: {
      icon: '→',
      bgColor: 'bg-[#F5E3E7]',
      borderColor: 'border-blue-300',
      textColor: 'text-[#3A0E12]',
      label: label || 'Example',
    },
  };

  const typeConfig = config[type];

  return (
    <div className={`
      my-4 px-4 py-4 rounded-lg border-l-4
      ${typeConfig.bgColor} ${typeConfig.borderColor}
    `}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-lg ${typeConfig.textColor}`}>
          {typeConfig.icon}
        </span>
        <h4 className={`
          text-sm font-semibold ${typeConfig.textColor}
        `}>
          {typeConfig.label}
        </h4>
      </div>

      <p className={`
        text-sm ${typeConfig.textColor}
        leading-relaxed
      `}>
        {children}
      </p>
    </div>
  );
}
