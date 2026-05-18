'use client';

import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  title?: string;
  description?: string;
  label?: string;
  image?: string;
  accent?: boolean;
}

export function Card({
  children,
  className = '',
  href,
  title,
  description,
  label,
  image,
  accent = false,
}: CardProps) {
  const cardContent = (
    <div className="h-full flex flex-col">
      {image && (
        <div className="w-full h-40 overflow-hidden mb-4 rounded-[4px]"
          style={{ background: 'var(--ov-ash-soft)' }}>
          <img
            src={image}
            alt={title || ''}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {label && (
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] mb-1"
          style={{ color: 'var(--ov-red)' }}>
          {label}
        </span>
      )}

      {title && (
        <h3 className="text-lg font-bold lowercase leading-snug mb-2"
          style={{ color: 'var(--fg-1)', letterSpacing: '-0.01em', fontFamily: 'var(--font-display)' }}>
          {title}
        </h3>
      )}

      {description && (
        <p className="text-sm flex-grow"
          style={{ color: 'var(--fg-3)', lineHeight: 1.5 }}>
          {description}
        </p>
      )}

      {children && (
        <div className="text-sm mt-2" style={{ color: 'var(--fg-2)' }}>
          {children}
        </div>
      )}
    </div>
  );

  const base = [
    'rounded-[8px] p-5 border-2 transition-all duration-[120ms]',
    accent
      ? 'bg-[var(--ov-red)] text-white border-[var(--ov-red-deep)]'
      : 'bg-[var(--bg-1)] border-[var(--ov-graphite-deep)]',
  ].join(' ');

  const shadow = accent
    ? '6px 6px 0 0 #8E1A2E'
    : '6px 6px 0 0 #222222';

  const hoverShadow = accent
    ? '6px 6px 0 0 #B51F3A'
    : '6px 6px 0 0 #B51F3A';

  if (href) {
    return (
      <a
        href={href}
        className={`block no-underline text-inherit ${base} ${className}`}
        style={{ boxShadow: shadow, marginRight: '6px', marginBottom: '6px' }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = hoverShadow;
          (e.currentTarget as HTMLElement).style.borderColor = '#B51F3A';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = shadow;
          (e.currentTarget as HTMLElement).style.borderColor = accent ? '#8E1A2E' : '#222222';
        }}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div
      className={`${base} ${className}`}
      style={{ boxShadow: shadow, marginRight: '6px', marginBottom: '6px' }}
    >
      {cardContent}
    </div>
  );
}

interface CardGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
}

export function CardGrid({ children, columns = 3 }: CardGridProps) {
  const gridClass: Record<1 | 2 | 3 | 4, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridClass[columns]} gap-6 my-8`}>
      {children}
    </div>
  );
}
