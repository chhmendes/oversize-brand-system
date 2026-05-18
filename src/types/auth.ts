export type UserRole = 'admin' | 'staff'

export interface UserProfile {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  created_at: string
  updated_at: string
}
