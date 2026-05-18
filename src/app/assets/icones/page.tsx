'use client'

import { AssetPageTemplate } from '@/components/assets/AssetPageTemplate'

const EMPTY_ICON = (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

function resolveFileType(file: File): string {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (ext === 'svg') return 'svg'
  if (file.type.startsWith('image/')) return 'image'
  return 'file'
}

export default function IconesPage() {
  return (
    <AssetPageTemplate
      title="Ícones"
      subtitle="Ícones e elementos gráficos da identidade visual"
      accept=".svg,.png,.ico,.icns"
      searchPlaceholder="Buscar ícones..."
      emptyLabel="Nenhum ícone adicionado ainda"
      emptyIcon={EMPTY_ICON}
      resolveFileType={resolveFileType}
      category="icones"
    />
  )
}
