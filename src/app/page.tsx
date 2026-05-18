'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { navigationConfig } from '@/config/navigation.config'

const PROMPT_CHIPS = [
  'Como é o tom de voz da Oversize?',
  'Qual é a paleta de cores oficial?',
  'Me explique a Estratégia Estruturada',
]

export default function HomePage() {
  const [prompt, setPrompt] = useState('')

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <Sidebar items={navigationConfig} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <main
          className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
        >

          <div className="w-full max-w-xl">
            <p className="mb-3 text-lg font-semibold text-gray-900">
              O que você quer saber?
            </p>

            {/* Prompt area */}
            <div className="relative">
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Pergunte sobre tom de voz, cores, metodologia, naming..."
                className="w-full resize-none rounded-xl border border-gray-200 px-5 py-4 text-sm text-gray-700 outline-none transition-colors placeholder:text-gray-300 focus:border-[#B51F3A] focus:ring-1 focus:ring-[#F5E3E7]"
              />
              <svg
                className="absolute right-4 top-4 text-gray-200"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9.5 1.5L12.5 4.5L4.5 12.5H1.5V9.5L9.5 1.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Botão */}
            <div className="mt-2 flex justify-end">
              <button className="rounded-sm bg-[#B51F3A] px-4 py-2 text-xs font-bold lowercase text-white transition-colors hover:bg-[#D42848] active:bg-[#8E1A2E]">
                Perguntar
              </button>
            </div>

            {/* Chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {PROMPT_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setPrompt(chip)}
                  className="rounded-sm border px-4 py-2 text-xs font-semibold lowercase transition-colors hover:border-[#B51F3A] hover:text-[#B51F3A]"
                  style={{ borderColor: 'var(--border-1)', color: 'var(--fg-3)', background: 'var(--bg-1)' }}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Nota */}
            <p className="mt-6 text-center text-xs text-gray-300">
              Conexão com IA em breve
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
