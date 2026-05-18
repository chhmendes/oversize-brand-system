'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { NavigationItem } from '@/types/content'
import { useAuth } from '@/context/AuthContext'

const ICONS: Record<string, React.ReactNode> = {
  estrategia: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="2.5" />
      <circle cx="8" cy="8" r="6" />
      <line x1="8" y1="1" x2="8" y2="4.5" />
      <line x1="8" y1="11.5" x2="8" y2="15" />
      <line x1="1" y1="8" x2="4.5" y2="8" />
      <line x1="11.5" y1="8" x2="15" y2="8" />
    </svg>
  ),
  marca: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 1h8v14l-4-3-4 3V1z" />
    </svg>
  ),
  comunicacao: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 1H3a1 1 0 00-1 1v7a1 1 0 001 1h3l2 3 2-3h3a1 1 0 001-1V2a1 1 0 00-1-1z" />
    </svg>
  ),
  identidade: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="8,1 15,4.5 8,8 1,4.5" />
      <polyline points="1,8 8,11.5 15,8" />
      <polyline points="1,11.5 8,15 15,11.5" />
    </svg>
  ),
}

function ChevronRight({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? 'rotate-90' : 'rotate-0'}`}
    >
      <polyline points="3,1.5 9,6 3,10.5" />
    </svg>
  )
}

interface SidebarProps {
  items: NavigationItem[]
}

export function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const { displayName, initials, profile, isAdmin } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Open the section containing the active page; never auto-close manually opened ones
  useEffect(() => {
    setOpenSections((prev) => {
      const next = { ...prev }
      let changed = false
      items.forEach((item) => {
        if (item.children) {
          const hasActive = item.children.some(
            (child) => child.href && pathname === child.href,
          )
          if (hasActive && !prev[item.title]) {
            next[item.title] = true
            changed = true
          }
        }
      })
      return changed ? next : prev
    })
  }, [pathname, items])

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  const isActive = (href?: string) => {
    if (!mounted || !href) return false
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <aside className="flex h-screen w-[280px] flex-shrink-0 flex-col border-r bg-white dark:bg-[#3C3C3C]" style={{ borderColor: 'var(--border-1)' }}>
      {/* Logo */}
      <div className="flex-shrink-0 border-b px-5 py-3" style={{ borderColor: 'var(--border-1)' }}>
        <Link href="/">
          <Image
            src="/brand/logo-original.png"
            alt="Oversize"
            width={88}
            height={88}
            className="dark:hidden"
            priority
          />
          <Image
            src="/brand/logo-gray-on-dark.png"
            alt="Oversize"
            width={88}
            height={88}
            className="hidden dark:block"
            priority
          />
        </Link>
      </div>

      {/* Nav */}
      <nav
        className="flex-1 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
      >
        {items.map((item) => {
          if (!item.children) return null
          const isOpen = openSections[item.title] ?? false
          const sectionHasActive = mounted && item.children.some((child) => isActive(child.href))

          return (
            <div key={item.title}>
              {/* Section header */}
              <button
                onClick={() => toggleSection(item.title)}
                className="flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors duration-150 hover:bg-[#FAFAFA] dark:hover:bg-white/5"
              >
                <span
                  className="flex-shrink-0"
                  style={{ color: sectionHasActive || isOpen ? 'var(--ov-red)' : 'var(--fg-3)' }}
                >
                  {item.icon ? ICONS[item.icon] : null}
                </span>
                <span
                  className="flex-1 text-[11px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: sectionHasActive || isOpen ? 'var(--fg-1)' : 'var(--fg-2)' }}
                >
                  {item.title}
                </span>
                <span style={{ color: 'var(--fg-3)' }}>
                  <ChevronRight open={isOpen} />
                </span>
              </button>

              {/* Children — max-height transition */}
              <div
                className="overflow-hidden transition-all duration-200 ease-in-out"
                style={{ maxHeight: isOpen ? '640px' : '0px' }}
              >
                <div className="pb-1">
                  {item.children.map((child) => {
                    const active = isActive(child.href)
                    return (
                      <Link
                        key={child.title}
                        href={child.href!}
                        className={`flex items-center border-l-2 py-1.5 pl-11 pr-5 text-xs transition-colors duration-150 ${
                          active
                            ? 'border-l-[#B51F3A] font-semibold'
                            : 'border-l-transparent hover:bg-[#FAFAFA] dark:hover:bg-white/5'
                        }`}
                        style={{
                          color: active ? 'var(--ov-red)' : 'var(--fg-3)',
                          backgroundColor: active ? 'var(--ov-red-tint)' : undefined,
                        }}
                      >
                        {child.title}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </nav>

      {/* Configurações — apenas admin */}
      {isAdmin && (
        <Link
          href="/settings/members"
          className="flex items-center gap-3 border-t px-5 py-2.5 transition-colors duration-150 hover:bg-[#FAFAFA] dark:hover:bg-white/5"
          style={{ borderColor: 'var(--border-1)' }}
        >
          <span style={{ color: 'var(--fg-3)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="8" r="2.5" />
              <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M11.89 4.11l1.06-1.06M3.05 12.95l1.06-1.06" />
            </svg>
          </span>
          <span className="text-xs font-medium" style={{ color: 'var(--fg-2)' }}>
            Configurações
          </span>
        </Link>
      )}

      {/* Perfil */}
      <div className="flex h-14 flex-shrink-0 items-center gap-3 border-t px-5" style={{ borderColor: 'var(--border-1)' }}>
        <div
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm"
          style={{ background: 'var(--ov-graphite)' }}
        >
          <span className="text-xs font-black lowercase text-white">{initials}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold leading-none" style={{ color: 'var(--fg-1)' }}>
            {displayName}
          </span>
          <span className="mt-0.5 text-[10px] leading-none" style={{ color: 'var(--fg-3)' }}>
            {profile?.role === 'admin' ? 'Admin' : 'Staff'}
          </span>
        </div>
      </div>
    </aside>
  )
}
