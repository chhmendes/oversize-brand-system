'use client'

import { useState, useCallback, useRef, useEffect, type ReactNode } from 'react'
import { AssetBanner } from './AssetBanner'
import { AssetCard, type AssetItem } from './AssetCard'
import { AssetUploadBar } from './AssetUploadBar'
import { uploadAsset, listAssets, deleteAsset, formatBytes, type StorageAsset } from '@/lib/storage'
import { useAuth } from '@/context/AuthContext'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })
}

function defaultResolveType(file: File): string {
  if (file.type.startsWith('image/')) return 'image'
  if (file.type.startsWith('video/')) return 'video'
  if (file.type.startsWith('audio/')) return 'audio'
  if (file.type === 'application/pdf') return 'pdf'
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (ext === 'svg') return 'svg'
  if (['otf', 'ttf', 'woff', 'woff2'].includes(ext)) return 'font'
  return file.type.split('/')[0] || 'file'
}

function storageAssetToItem(asset: StorageAsset, resolveType: (f: File) => string): AssetItem {
  const fakeFile = { name: asset.name, type: asset.mime_type ?? '', size: 0 } as File
  return {
    id: asset.id,
    name: asset.name,
    type: resolveType(fakeFile),
    size: formatBytes(asset.size_bytes),
    uploadedAt: formatDate(asset.created_at),
    previewUrl: asset.mime_type?.startsWith('image/') ? asset.public_url : undefined,
    storage_path: asset.storage_path,
    public_url: asset.public_url,
  }
}

export interface AssetPageConfig {
  title: string
  subtitle: string
  accept: string
  searchPlaceholder: string
  emptyLabel: string
  emptyIcon: ReactNode
  category: string
  resolveFileType?: (file: File) => string
}

export function AssetPageTemplate({
  title,
  subtitle,
  accept,
  searchPlaceholder,
  emptyLabel,
  emptyIcon,
  category,
  resolveFileType = defaultResolveType,
}: AssetPageConfig) {
  const { isAdmin } = useAuth()
  const [assets, setAssets] = useState<AssetItem[]>([])
  const [storageMap, setStorageMap] = useState<Map<string, StorageAsset>>(new Map())
  const [searchQuery, setSearchQuery] = useState('')
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(true)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const dragCounter = useRef(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    listAssets(category)
      .then((storageAssets) => {
        if (cancelled) return
        const map = new Map<string, StorageAsset>()
        storageAssets.forEach((sa) => map.set(sa.id, sa))
        setStorageMap(map)
        setAssets(storageAssets.map((sa) => storageAssetToItem(sa, resolveFileType)))
      })
      .catch(() => {
        if (!cancelled) setAssets([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [category, resolveFileType])

  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      setUploadError(null)
      const fileArray = Array.from(files)
      for (const file of fileArray) {
        try {
          const storageAsset = await uploadAsset(file, category)
          const item = storageAssetToItem(storageAsset, resolveFileType)
          setStorageMap((prev) => new Map(prev).set(storageAsset.id, storageAsset))
          setAssets((prev) => [item, ...prev])
        } catch {
          setUploadError(`Erro ao enviar "${file.name}". Tente novamente.`)
        }
      }
    },
    [category, resolveFileType],
  )

  async function handleDelete(id: string) {
    const storageAsset = storageMap.get(id)
    if (!storageAsset) return
    try {
      await deleteAsset(storageAsset)
      setStorageMap((prev) => {
        const next = new Map(prev)
        next.delete(id)
        return next
      })
      setAssets((prev) => prev.filter((a) => a.id !== id))
    } catch {
      setUploadError('Erro ao deletar arquivo. Tente novamente.')
    }
  }

  const filtered = assets.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div
      style={{ position: 'relative', minHeight: '100%' }}
      onDragEnter={(e) => {
        e.preventDefault()
        dragCounter.current++
        setDragging(true)
      }}
      onDragLeave={() => {
        dragCounter.current--
        if (dragCounter.current === 0) setDragging(false)
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        dragCounter.current = 0
        setDragging(false)
        if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files)
      }}
    >
      {dragging && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            background: 'rgba(181,31,58,0.06)',
            border: '2px dashed var(--ov-red)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'var(--bg-1)',
              border: '1px solid var(--ov-red)',
              borderRadius: 'var(--r-2)',
              padding: '20px 40px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ov-red)', margin: 0 }}>
              Solte os arquivos aqui
            </p>
            <p style={{ fontSize: '13px', color: 'var(--fg-3)', margin: '4px 0 0' }}>
              {title.toLowerCase()}
            </p>
          </div>
        </div>
      )}

      <AssetBanner title={title} subtitle={subtitle} />

      <div style={{ padding: '32px 40px' }}>
        {uploadError && (
          <div
            style={{
              marginBottom: '16px',
              padding: '10px 16px',
              borderRadius: 'var(--r-1)',
              background: 'rgba(181,31,58,0.08)',
              border: '1px solid var(--ov-red)',
              fontSize: '13px',
              color: 'var(--ov-red)',
            }}
          >
            {uploadError}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <span style={{ fontSize: '12px', color: 'var(--fg-3)', fontWeight: 500 }}>
            {loading
              ? 'Carregando...'
              : assets.length === 0
                ? 'Nenhum arquivo'
                : `${assets.length} ${assets.length === 1 ? 'arquivo' : 'arquivos'}`}
          </span>
        </div>

        <AssetUploadBar
          onSearch={setSearchQuery}
          onUpload={(files) => processFiles(files)}
          accept={accept}
          searchPlaceholder={searchPlaceholder}
        />

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontSize: 'var(--fs-body-s)', color: 'var(--fg-3)', margin: 0 }}>
              Carregando...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <span
              style={{
                color: 'var(--fg-3)',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              {emptyIcon}
            </span>
            <p style={{ fontSize: 'var(--fs-body-s)', color: 'var(--fg-3)', margin: '0 0 6px' }}>
              {assets.length === 0 ? emptyLabel : 'Nenhum resultado encontrado'}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--fg-3)', margin: 0 }}>
              {assets.length === 0
                ? 'Clique em upload ou arraste arquivos aqui'
                : 'Tente outro termo de busca'}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '16px',
            }}
          >
            {filtered.map((a) => (
              <AssetCard key={a.id} {...a} onDelete={handleDelete} canDelete={isAdmin} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
