import { createClient } from '@/lib/supabase/client'

export interface StorageAsset {
  id: string
  name: string
  storage_path: string
  public_url: string
  mime_type: string | null
  category: string
  size_bytes: number | null
  uploaded_by: string | null
  created_at: string
}

export async function uploadAsset(file: File, category: string): Promise<StorageAsset> {
  const supabase = createClient()
  const uuid = crypto.randomUUID()
  const path = `${category}/${uuid}-${file.name}`

  const { error: uploadError } = await supabase.storage
    .from('brand-assets')
    .upload(path, file)

  if (uploadError) throw uploadError

  const { data: { user } } = await supabase.auth.getUser()

  const { data, error: insertError } = await supabase
    .from('brand_assets')
    .insert({
      name: file.name,
      storage_path: path,
      mime_type: file.type || null,
      category,
      size_bytes: file.size,
      uploaded_by: user?.id ?? null,
    })
    .select()
    .single()

  if (insertError) throw insertError

  const { data: signedData, error: signError } = await supabase.storage
    .from('brand-assets')
    .createSignedUrl(path, 3600)

  if (signError) throw signError

  return {
    ...(data as Omit<StorageAsset, 'public_url'>),
    public_url: signedData.signedUrl,
  }
}

export async function listAssets(category: string): Promise<StorageAsset[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('brand_assets')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) throw error
  if (!data || data.length === 0) return []

  const paths = data.map((row: { storage_path: string }) => row.storage_path)

  const { data: signedUrls, error: signError } = await supabase.storage
    .from('brand-assets')
    .createSignedUrls(paths, 3600)

  if (signError) throw signError

  return data.map((row: StorageAsset, i: number) => ({
    ...row,
    public_url: signedUrls?.[i]?.signedUrl ?? '',
  }))
}

export async function deleteAsset(asset: StorageAsset): Promise<void> {
  const supabase = createClient()

  const { error: storageError } = await supabase.storage
    .from('brand-assets')
    .remove([asset.storage_path])

  if (storageError) throw storageError

  const { error: dbError } = await supabase
    .from('brand_assets')
    .delete()
    .eq('id', asset.id)

  if (dbError) throw dbError
}

export function formatBytes(bytes: number | null): string {
  if (bytes === null) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
