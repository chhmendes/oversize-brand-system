'use client'

import { useState } from 'react'

export interface AssetItem {
  id: string
  name: string
  type: string
  size: string
  uploadedAt: string
  previewUrl?: string
  storage_path?: string
  public_url?: string
}

interface AssetCardProps extends AssetItem {
  onDelete: (id: string) => void
  canDelete?: boolean
}

function FileIcon({ type }: { type: string }) {
  if (type === 'image' || type === 'svg') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    )
  }
  if (type === 'video') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    )
  }
  if (type === 'audio') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    )
  }
  if (type === 'pdf') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="11" y2="17" />
      </svg>
    )
  }
  if (type === 'font') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="4" x2="20" y2="4" />
        <line x1="12" y1="4" x2="12" y2="20" />
        <line x1="7" y1="20" x2="17" y2="20" />
      </svg>
    )
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  )
}

function ExtBadge({ name }: { name: string }) {
  const ext = name.split('.').pop()?.toUpperCase()
  if (!ext) return null
  return (
    <span
      style={{
        position: 'absolute',
        top: '8px',
        left: '8px',
        fontSize: '9px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        padding: '2px 6px',
        borderRadius: 'var(--r-1)',
        background: 'rgba(0,0,0,0.55)',
        color: '#fff',
        lineHeight: '1.4',
        pointerEvents: 'none',
      }}
    >
      {ext}
    </span>
  )
}

export function AssetCard({ id, name, type, size, uploadedAt, previewUrl, onDelete, canDelete = false }: AssetCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: '1px solid var(--border-1)',
        borderRadius: 'var(--r-2)',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: hovered ? 'var(--sh-2)' : 'var(--sh-1)',
        transition: 'box-shadow 0.15s ease, border-color 0.15s ease',
        borderColor: hovered ? 'var(--border-2)' : 'var(--border-1)',
        background: 'var(--bg-1)',
      }}
    >
      {/* Preview */}
      <div
        style={{
          background: previewUrl ? 'transparent' : 'var(--bg-2)',
          height: '130px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span style={{ color: 'var(--fg-3)' }}>
            <FileIcon type={type} />
          </span>
        )}
        <ExtBadge name={name} />
      </div>

      {/* Info */}
      <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border-1)' }}>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--fg-1)',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            lineHeight: '1.3',
          }}
        >
          {name}
        </p>
        <p
          style={{
            fontSize: '10px',
            color: 'var(--fg-3)',
            margin: '3px 0 0',
            lineHeight: '1.3',
          }}
        >
          {size} · {uploadedAt}
        </p>
      </div>

      {/* Delete on hover */}
      {hovered && canDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(id)
          }}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '24px',
            height: '24px',
            borderRadius: 'var(--r-1)',
            border: 'none',
            background: 'rgba(255,255,255,0.9)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--fg-3)',
            boxShadow: 'var(--sh-1)',
            transition: 'color 100ms',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--ov-red)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-3)'
          }}
          aria-label="Remover arquivo"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="2" y1="2" x2="10" y2="10" />
            <line x1="10" y1="2" x2="2" y2="10" />
          </svg>
        </button>
      )}
    </div>
  )
}
