'use client'

import { AssetPageTemplate } from '@/components/assets/AssetPageTemplate'

const EMPTY_ICON = (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="11" y2="17" />
  </svg>
)

function resolveFileType(file: File): string {
  if (file.type === 'application/pdf') return 'pdf'
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (['pptx', 'ppt', 'key'].includes(ext)) return 'presentation'
  if (['docx', 'doc'].includes(ext)) return 'document'
  return 'file'
}

export default function DocumentosPage() {
  return (
    <AssetPageTemplate
      title="Documentos"
      subtitle="PDFs, apresentações e arquivos de referência"
      accept=".pdf,.pptx,.ppt,.key,.docx,.doc"
      searchPlaceholder="Buscar documentos..."
      emptyLabel="Nenhum documento adicionado ainda"
      emptyIcon={EMPTY_ICON}
      resolveFileType={resolveFileType}
      category="documentos"
    />
  )
}
