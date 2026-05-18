'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  {
    label: 'Logotipos',
    href: '/assets/logotipos',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="6" r="3" />
        <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" />
      </svg>
    ),
  },
  {
    label: 'Cores',
    href: '/assets/cores',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="6" />
        <path d="M8 2a6 6 0 0 1 0 12" fill="currentColor" stroke="none" opacity="0.25" />
        <circle cx="5" cy="6" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="11" cy="6" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="8" cy="10.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Tipografia',
    href: '/assets/tipografia',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="3" x2="13" y2="3" />
        <line x1="8" y1="3" x2="8" y2="13" />
        <line x1="5" y1="13" x2="11" y2="13" />
      </svg>
    ),
  },
  {
    label: 'Imagens',
    href: '/assets/imagens',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="12" height="12" rx="1" />
        <circle cx="5.5" cy="5.5" r="1" />
        <polyline points="14 10 10.5 6.5 3 14" />
      </svg>
    ),
  },
  {
    label: 'Vídeos',
    href: '/assets/videos',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="15 8 10 11 10 5 15 8" />
        <rect x="1" y="4" width="9" height="8" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Áudios',
    href: '/assets/audios',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 14V3l8-2v11" />
        <circle cx="5" cy="14" r="2" />
        <circle cx="13" cy="12" r="2" />
      </svg>
    ),
  },
  {
    label: 'Documentos',
    href: '/assets/documentos',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6L9 1z" />
        <polyline points="9 1 9 6 14 6" />
        <line x1="6" y1="9" x2="10" y2="9" />
        <line x1="6" y1="12" x2="10" y2="12" />
      </svg>
    ),
  },
  {
    label: 'Ícones',
    href: '/assets/icones',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="8 1 10.2 5.5 15 6.2 11.5 9.6 12.4 14.4 8 12.1 3.6 14.4 4.5 9.6 1 6.2 5.8 5.5 8 1" />
      </svg>
    ),
  },
]

export function AssetSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <aside
      className="flex h-screen w-[240px] flex-shrink-0 flex-col border-r bg-white dark:bg-[#333333]"
      style={{ borderColor: 'var(--border-1)' }}
    >
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

      {/* Back link */}
      <div className="flex-shrink-0 border-b px-5 py-2.5" style={{ borderColor: 'var(--border-1)' }}>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs transition-colors duration-150 hover:text-[var(--ov-red)]"
          style={{ color: 'var(--fg-3)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="8,1.5 3,6 8,10.5" />
          </svg>
          voltar
        </Link>
      </div>

      {/* Nav */}
      <nav
        className="flex-1 overflow-y-auto py-2 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
      >
        <p
          className="px-5 pb-1 pt-2"
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--fg-3)',
          }}
        >
          Ativos de Marca
        </p>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 border-l-2 py-2 pl-5 pr-4 text-[13px] transition-colors duration-150 ${
                active
                  ? 'border-l-[var(--ov-red)] font-semibold'
                  : 'border-l-transparent hover:bg-[#FAFAFA] dark:hover:bg-white/5'
              }`}
              style={{
                color: active ? 'var(--ov-red)' : 'var(--fg-2)',
                backgroundColor: active ? 'var(--ov-red-tint)' : undefined,
                fontWeight: active ? 600 : 500,
              }}
            >
              <span style={{ color: active ? 'var(--ov-red)' : 'var(--fg-3)', flexShrink: 0 }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Profile */}
      <div
        className="flex h-14 flex-shrink-0 items-center gap-3 border-t px-5"
        style={{ borderColor: 'var(--border-1)' }}
      >
        <div
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm"
          style={{ background: 'var(--ov-graphite)' }}
        >
          <span className="text-xs font-black lowercase text-white">c</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold leading-none" style={{ color: 'var(--fg-1)' }}>
            Christian
          </span>
          <span className="mt-0.5 text-[10px] leading-none" style={{ color: 'var(--fg-3)' }}>
            Admin
          </span>
        </div>
      </div>
    </aside>
  )
}
