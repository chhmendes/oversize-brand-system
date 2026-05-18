'use client'

import { AssetPageTemplate } from '@/components/assets/AssetPageTemplate'

const EMPTY_ICON = (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" />
  </svg>
)

function resolveFileType(file: File): string {
  if (file.type.startsWith('image/')) return 'image'
  if (file.type === 'application/pdf') return 'pdf'
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (ext === 'svg') return 'svg'
  if (ext === 'ai' || ext === 'eps') return 'vector'
  return 'file'
}

export default function LogotiposPage() {
  return (
    <AssetPageTemplate
      title="Logotipos"
      subtitle="Todas as versões e variações do logotipo da marca"
      accept=".svg,.png,.jpg,.jpeg,.ai,.eps,.pdf"
      searchPlaceholder="Buscar logotipos..."
      emptyLabel="Nenhum logotipo adicionado ainda"
      emptyIcon={EMPTY_ICON}
      resolveFileType={resolveFileType}
      category="logotipos"
    />
  )
}
