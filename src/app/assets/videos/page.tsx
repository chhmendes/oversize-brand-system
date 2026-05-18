import { AssetPageTemplate } from '@/components/assets/AssetPageTemplate'

const EMPTY_ICON = (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" />
  </svg>
)

export default function VideosPage() {
  return (
    <AssetPageTemplate
      title="Vídeos"
      subtitle="Arquivos de vídeo, motion e animações da marca"
      accept="video/*"
      searchPlaceholder="Buscar vídeos..."
      emptyLabel="Nenhum vídeo adicionado ainda"
      emptyIcon={EMPTY_ICON}
      category="videos"
    />
  )
}
