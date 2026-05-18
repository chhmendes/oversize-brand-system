'use client'

import { AssetPageTemplate } from '@/components/assets/AssetPageTemplate'

const EMPTY_ICON = (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <circle cx="8" cy="9.5" r="1.75" fill="currentColor" stroke="none" />
    <circle cx="16" cy="9.5" r="1.75" fill="currentColor" stroke="none" />
    <circle cx="12" cy="15.5" r="1.75" fill="currentColor" stroke="none" />
  </svg>
)

function resolveFileType(file: File): string {
  if (file.type.startsWith('image/')) return 'image'
  if (file.type === 'application/pdf') return 'pdf'
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (ext === 'ase' || ext === 'clr' || ext === 'aco') return 'palette'
  return 'file'
}

export default function CoresPage() {
  return (
    <AssetPageTemplate
      title="Paleta de Cores"
      subtitle="Fichas e referências das cores oficiais da marca"
      accept=".pdf,.png,.jpg,.jpeg,.ase,.clr,.aco"
      searchPlaceholder="Buscar arquivos de cor..."
      emptyLabel="Nenhuma paleta adicionada ainda"
      emptyIcon={EMPTY_ICON}
      resolveFileType={resolveFileType}
      category="cores"
    />
  )
}
