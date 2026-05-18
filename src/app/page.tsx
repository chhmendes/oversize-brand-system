'use client'

import Image from 'next/image'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { navigationConfig } from '@/config/navigation.config'

export default function HomePage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white dark:bg-[#3C3C3C]">
      <Sidebar items={navigationConfig} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <main
          className="flex flex-1 items-center justify-center overflow-y-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
        >
          <Image
            src="/brand/bem-vindo-dark.png"
            alt="Bem-vindo ao Brand System Oversize"
            width={1280}
            height={640}
            className="hidden max-h-full max-w-full object-contain dark:block"
            priority
          />
          <Image
            src="/brand/bem-vindo-light.png"
            alt="Bem-vindo ao Brand System Oversize"
            width={1280}
            height={640}
            className="block max-h-full max-w-full object-contain dark:hidden"
            priority
          />
        </main>
      </div>
    </div>
  )
}
