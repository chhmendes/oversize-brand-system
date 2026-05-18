'use client'

import { useRef } from 'react'

interface AssetUploadBarProps {
  onSearch: (query: string) => void
  onUpload: (files: FileList) => void
  accept?: string
  searchPlaceholder?: string
}

export function AssetUploadBar({
  onSearch,
  onUpload,
  accept,
  searchPlaceholder = 'Buscar...',
}: AssetUploadBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
      {/* Search */}
      <div style={{ flex: 1, position: 'relative' }}>
        <span
          style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--fg-3)',
            pointerEvents: 'none',
            display: 'flex',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="7" cy="7" r="5" />
            <line x1="11.5" y1="11.5" x2="15" y2="15" />
          </svg>
        </span>
        <input
          type="text"
          placeholder={searchPlaceholder}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            width: '100%',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body-s)',
            padding: '10px 14px 10px 42px',
            border: '1px solid var(--border-1)',
            borderRadius: 'var(--r-2)',
            color: 'var(--fg-1)',
            background: 'var(--bg-1)',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 120ms, box-shadow 120ms',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--ov-red)'
            e.currentTarget.style.boxShadow = '0 0 0 2px var(--ov-red-tint)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
      </div>

      {/* Upload */}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files?.length) {
            onUpload(e.target.files)
            e.target.value = ''
          }
        }}
      />
      <button
        onClick={() => inputRef.current?.click()}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: 'var(--fw-bold)',
          letterSpacing: '0.02em',
          padding: '10px 20px',
          borderRadius: 'var(--r-1)',
          background: 'var(--ov-red)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          textTransform: 'lowercase',
          transition: 'background 120ms',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--ov-red-bright)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--ov-red)'
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="11" x2="7" y2="3" />
          <polyline points="3,7 7,3 11,7" />
        </svg>
        upload
      </button>
    </div>
  )
}
