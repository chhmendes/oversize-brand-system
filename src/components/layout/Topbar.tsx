import type { ReactNode } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface TopbarProps {
  breadcrumb?: ReactNode
  onMenuClick?: () => void
}

export function Topbar({ breadcrumb, onMenuClick }: TopbarProps) {
  return (
    <header className="flex h-12 w-full flex-shrink-0 items-center justify-between border-b border-gray-100 bg-white px-4 dark:border-white/10 dark:bg-[#3C3C3C] md:px-6">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 md:hidden"
          aria-label="Abrir menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <line x1="2" y1="4.5" x2="16" y2="4.5" />
            <line x1="2" y1="9" x2="16" y2="9" />
            <line x1="2" y1="13.5" x2="16" y2="13.5" />
          </svg>
        </button>
        <div className="text-sm text-gray-400">{breadcrumb}</div>
      </div>
      <ThemeToggle />
    </header>
  )
}
