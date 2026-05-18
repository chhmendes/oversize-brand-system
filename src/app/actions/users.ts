'use server'

import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

async function getCallerProfile() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  return data
}

export async function listUsers() {
  const profile = await getCallerProfile()
  if (profile?.role !== 'admin') return { error: 'Unauthorized' }

  const adminClient = createAdminClient()
  const { data: authUsers, error: authError } =
    await adminClient.auth.admin.listUsers()
  if (authError) return { error: authError.message }

  const { data: profiles, error: profilesError } = await adminClient
    .from('profiles')
    .select('id, full_name, avatar_url, role, created_at')
  if (profilesError) return { error: profilesError.message }

  const profileMap = new Map(
    (profiles ?? []).map((p: { id: string; full_name: string | null; avatar_url: string | null; role: string; created_at: string }) => [p.id, p])
  )

  const users = authUsers.users.map((u) => {
    const p = profileMap.get(u.id)
    return {
      id: u.id,
      email: u.email ?? '',
      full_name: p?.full_name ?? null,
      avatar_url: p?.avatar_url ?? null,
      role: p?.role ?? 'staff',
      created_at: p?.created_at ?? u.created_at,
    }
  })

  return { data: users }
}

export async function updateUserRole(
  userId: string,
  role: 'admin' | 'staff'
) {
  const profile = await getCallerProfile()
  if (profile?.role !== 'admin') return { error: 'Unauthorized' }

  const adminClient = createAdminClient()
  const { error } = await adminClient
    .from('profiles')
    .update({ role })
    .eq('id', userId)

  if (error) return { error: error.message }
  return { success: true }
}

export async function deleteUser(userId: string) {
  const profile = await getCallerProfile()
  if (profile?.role !== 'admin') return { error: 'Unauthorized' }

  const adminClient = createAdminClient()
  const { error } = await adminClient.auth.admin.deleteUser(userId)
  if (error) return { error: error.message }
  return { success: true }
}
