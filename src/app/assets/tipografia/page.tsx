'use client'

import { AssetPageTemplate } from '@/components/assets/AssetPageTemplate'

const EMPTY_ICON = (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="4" x2="20" y2="4" />
    <line x1="12" y1="4" x2="12" y2="20" />
    <line x1="7" y1="20" x2="17" y2="20" />
  </svg>
)

function resolveFileType(file: File): string {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (['otf', 'ttf', 'woff', 'woff2'].includes(ext)) return 'font'
  if (file.type === 'application/pdf') return 'pdf'
  return 'file'
}

export default function TipografiaPage() {
  return (
    <AssetPageTemplate
      title="Tipografia"
      subtitle="Fontes, licenças e especificações tipográficas da marca"
      accept=".otf,.ttf,.woff,.woff2,.pdf"
      searchPlaceholder="Buscar fontes e arquivos..."
      emptyLabel="Nenhuma fonte adicionada ainda"
      emptyIcon={EMPTY_ICON}
      resolveFileType={resolveFileType}
      category="tipografia"
    />
  )
}
