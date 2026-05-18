'use client';

import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface NavigationProps {
  breadcrumbs?: BreadcrumbItem[];
  previousPage?: {
    label: string;
    href: string;
  };
  nextPage?: {
    label: string;
    href: string;
  };
  tableOfContents?: {
    title: string;
    id: string;
  }[];
}

export function Navigation({
  breadcrumbs = [],
  previousPage,
  nextPage,
  tableOfContents = [],
}: NavigationProps) {
  return (
    <nav className="space-y-6 py-6">
      {/* Breadcrumb */}
      {breadcrumbs.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-[#B51F3A] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
              {index < breadcrumbs.length - 1 && <span>/</span>}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Table of Contents */}
      {tableOfContents.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-700 uppercase">
            On this page
          </h3>
          <ul className="space-y-1">
            {tableOfContents.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="
                    text-sm text-gray-600 hover:text-[#B51F3A]
                    transition-colors block py-1
                  "
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Previous/Next Navigation */}
      {(previousPage || nextPage) && (
        <div className="
          flex gap-4 pt-6 border-t border-gray-300
          justify-between
        ">
          {previousPage ? (
            <Link
              href={previousPage.href}
              className="
                flex items-center gap-2 text-sm text-gray-600
                hover:text-[#B51F3A] transition-colors
              "
            >
              <span>←</span>
              <span>{previousPage.label}</span>
            </Link>
          ) : (
            <div />
          )}

          {nextPage ? (
            <Link
              href={nextPage.href}
              className="
                flex items-center gap-2 text-sm text-gray-600
                hover:text-[#B51F3A] transition-colors text-right
              "
            >
              <span>{nextPage.label}</span>
              <span>→</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}
    </nav>
  );
}
