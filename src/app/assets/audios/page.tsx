import { AssetPageTemplate } from '@/components/assets/AssetPageTemplate'

const EMPTY_ICON = (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
)

export default function AudiosPage() {
  return (
    <AssetPageTemplate
      title="Áudios"
      subtitle="Trilhas, jingles e assets sonoros da marca"
      accept="audio/*"
      searchPlaceholder="Buscar áudios..."
      emptyLabel="Nenhum áudio adicionado ainda"
      emptyIcon={EMPTY_ICON}
      category="audios"
    />
  )
}
