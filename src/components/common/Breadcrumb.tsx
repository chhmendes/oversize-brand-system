'use client';

import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItemData {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItemData[];
  separator?: React.ReactNode;
}

export function Breadcrumb({
  items,
  separator = '/',
}: BreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm text-gray-600"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {item.href && !item.current ? (
              <Link
                href={item.href}
                className="
                  text-[#B51F3A] hover:text-[#D42848]
                  hover:underline transition-colors
                "
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  item.current
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-600'
                }
                aria-current={item.current ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}

            {!isLast && (
              <span className="text-gray-400 mx-1">
                {separator}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

// Breadcrumb with schema markup
interface BreadcrumbWithSchemaProps {
  items: BreadcrumbItemData[];
}

export function BreadcrumbWithSchema({
  items,
}: BreadcrumbWithSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      <Breadcrumb items={items} />
    </>
  );
}
