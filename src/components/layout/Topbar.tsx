import type { ReactNode } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface TopbarProps {
  breadcrumb?: ReactNode
}

export function Topbar({ breadcrumb }: TopbarProps) {
  return (
    <header className="flex h-12 w-full flex-shrink-0 items-center justify-between border-b border-gray-100 bg-white px-6 dark:border-white/10 dark:bg-[#3C3C3C]">
      <div className="text-sm text-gray-400">{breadcrumb}</div>
      <ThemeToggle />
    </header>
  )
}
