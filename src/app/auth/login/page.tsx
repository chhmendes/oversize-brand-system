'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError('Email ou senha incorretos')
      setLoading(false)
      return
    }

    router.push('/docs/estrategia/01-auditoria-mercado')
  }

  return (
    <div className="flex h-full w-full">
      <style>{`
        @keyframes gradientLoop {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-bg {
          background: linear-gradient(135deg, #B51F3A, #3C3C3C, #0A0A0A, #8E1A2E, #222222);
          background-size: 400% 400%;
          animation: gradientLoop 10s ease infinite;
        }
      `}</style>

      {/* Painel esquerdo — formulário */}
      <div className="relative flex w-full flex-col justify-center px-10 py-12 md:w-[40%]">
        {/* Logo */}
        <div className="mb-12">
          <span className="font-black lowercase tracking-[-0.03em] text-[#B51F3A]" style={{ fontSize: '26px' }}>
            oversize
          </span>
        </div>

        {/* Form */}
        <div className="w-full max-w-sm">
          <h1 className="mb-1 text-2xl font-semibold text-gray-900">Entrar</h1>
          <p className="mb-8 text-sm text-gray-400">Acesse as diretrizes de marca</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-300 focus:border-[#B51F3A] focus:ring-1 focus:ring-[#F5E3E7]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-300 focus:border-[#B51F3A] focus:ring-1 focus:ring-[#F5E3E7]"
              />
            </div>

            {error && (
              <p className="text-xs text-[#B51F3A]">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-sm bg-[#B51F3A] py-3 text-sm font-bold lowercase text-white transition-colors hover:bg-[#D42848] active:bg-[#8E1A2E] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-5 flex flex-col items-center gap-2">
            <Link
              href="/auth/forgot-password"
              className="text-xs text-gray-300 hover:text-gray-400 cursor-pointer transition-colors"
            >
              Esqueceu a senha?
            </Link>
            <p className="text-xs text-gray-300">
              Não tem conta?{' '}
              <Link href="/auth/signup" className="text-[#B51F3A] hover:text-[#D42848] transition-colors font-medium">
                Criar conta
              </Link>
            </p>
          </div>
        </div>

        {/* Rodapé */}
        <span className="absolute bottom-8 left-10 text-xs text-gray-200">
          © 2026 Oversize
        </span>
      </div>

      {/* Painel direito — gradient */}
      <div className="gradient-bg hidden flex-1 md:block" />
    </div>
  )
}
