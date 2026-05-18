import type { ReactNode } from 'react'
import { AssetSidebar } from '@/components/assets/AssetSidebar'
import { Topbar } from '@/components/layout/Topbar'

export default function AssetsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white dark:bg-[#333333]">
      <AssetSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main
          className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
