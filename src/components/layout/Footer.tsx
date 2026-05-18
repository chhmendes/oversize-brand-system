'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  showLinks?: boolean;
}

export function Footer({ showLinks = true }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="
      mt-12 py-8 px-6
      border-t border-gray-300
      bg-white text-gray-600
    ">
      {showLinks && (
        <div className="mb-6 flex gap-6 flex-wrap">
          <Link
            href="/"
            className="text-sm hover:text-[#B51F3A] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/docs"
            className="text-sm hover:text-[#B51F3A] transition-colors"
          >
            Documentation
          </Link>
          <Link
            href="/about"
            className="text-sm hover:text-[#B51F3A] transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm hover:text-[#B51F3A] transition-colors"
          >
            Contact
          </Link>
        </div>
      )}

      <div className="flex items-center justify-between pt-6 border-t border-gray-300">
        <p className="text-xs text-gray-500">
          © {currentYear} Oversize Brand System. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            className="text-xs hover:text-[#B51F3A] transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            aria-label="LinkedIn"
            className="text-xs hover:text-[#B51F3A] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
