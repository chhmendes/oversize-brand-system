import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { navigationConfig } from '@/config/navigation.config'
import { createClient } from '@/lib/supabase/server'

export default async function SettingsLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/docs/estrategia/01-auditoria-mercado')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    redirect('/docs/estrategia/01-auditoria-mercado')
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <Sidebar items={navigationConfig} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main
          className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
        >
          <div className="mx-auto max-w-3xl px-10 py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
