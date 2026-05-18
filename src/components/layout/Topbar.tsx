import type { ReactNode } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface TopbarProps {
  breadcrumb?: ReactNode
}

export function Topbar({ breadcrumb }: TopbarProps) {
  return (
    <header className="flex h-12 w-full flex-shrink-0 items-center justify-between border-b border-gray-100 bg-white px-6 dark:border-white/10 dark:bg-[#3C3C3C]">
      <div className="text-sm text-gray-400">{breadcrumb}</div>
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <button
          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-white/5 dark:hover:text-gray-300"
          aria-label="Apps"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            <circle cx="8" cy="2" r="1.5" fill="currentColor" />
            <circle cx="14" cy="2" r="1.5" fill="currentColor" />
            <circle cx="2" cy="8" r="1.5" fill="currentColor" />
            <circle cx="8" cy="8" r="1.5" fill="currentColor" />
            <circle cx="14" cy="8" r="1.5" fill="currentColor" />
            <circle cx="2" cy="14" r="1.5" fill="currentColor" />
            <circle cx="8" cy="14" r="1.5" fill="currentColor" />
            <circle cx="14" cy="14" r="1.5" fill="currentColor" />
          </svg>
        </button>
      </div>
    </header>
  )
}
