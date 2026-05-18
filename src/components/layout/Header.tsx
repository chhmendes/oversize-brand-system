'use client';

import React, { useState } from 'react';

interface HeaderProps {
  onAppsClick?: () => void;
  title?: string;
}

export function Header({ onAppsClick, title }: HeaderProps) {
  const [isAppsMenuOpen, setIsAppsMenuOpen] = useState(false);

  const handleAppsClick = () => {
    setIsAppsMenuOpen(!isAppsMenuOpen);
    onAppsClick?.();
  };

  return (
    <header className="
      fixed top-0 right-0 z-50
      flex items-center gap-4 p-6
    ">
      {title && (
        <h1 className="text-sm font-medium text-gray-700">
          {title}
        </h1>
      )}

      <button
        onClick={handleAppsClick}
        aria-label="Apps menu"
        className="
          w-12 h-12 rounded-md bg-[#B51F3A] text-white
          flex items-center justify-center
          hover:bg-[#D42848] transition-colors duration-200
          shadow-md hover:shadow-lg
          text-lg font-semibold
        "
      >
        ⚙️
      </button>

      {isAppsMenuOpen && (
        <div className="
          absolute top-16 right-0 bg-white
          border border-gray-300 rounded-md
          shadow-lg min-w-48
        ">
          <nav className="py-2">
            <a
              href="#"
              className="
                block px-4 py-2 text-sm text-gray-700
                hover:bg-gray-50 transition-colors
              "
            >
              Brand Guidelines
            </a>
            <a
              href="#"
              className="
                block px-4 py-2 text-sm text-gray-700
                hover:bg-gray-50 transition-colors
              "
            >
              Design System
            </a>
            <a
              href="#"
              className="
                block px-4 py-2 text-sm text-gray-700
                hover:bg-gray-50 transition-colors
              "
            >
              Resources
            </a>
            <hr className="my-2" />
            <a
              href="#"
              className="
                block px-4 py-2 text-sm text-gray-700
                hover:bg-gray-50 transition-colors
              "
            >
              Settings
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
