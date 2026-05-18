import type { UserProfile } from '@/types/auth'

export function isAdmin(profile: UserProfile | null): boolean {
  return profile?.role === 'admin'
}

export function canUpload(profile: UserProfile | null): boolean {
  return profile !== null
}

export function canDelete(profile: UserProfile | null): boolean {
  return profile?.role === 'admin'
}

export function canManageUsers(profile: UserProfile | null): boolean {
  return profile?.role === 'admin'
}
