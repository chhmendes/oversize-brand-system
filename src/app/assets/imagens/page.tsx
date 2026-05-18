import { AssetPageTemplate } from '@/components/assets/AssetPageTemplate'

const EMPTY_ICON = (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
)

export default function ImagensPage() {
  return (
    <AssetPageTemplate
      title="Imagens"
      subtitle="Fotos, ilustrações e elementos visuais da marca"
      accept="image/*"
      searchPlaceholder="Buscar imagens..."
      emptyLabel="Nenhuma imagem adicionada ainda"
      emptyIcon={EMPTY_ICON}
      category="imagens"
    />
  )
}
