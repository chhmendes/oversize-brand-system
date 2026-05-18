'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error: signUpError, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // If session is immediately available, redirect; otherwise ask to confirm email
    if (data.session) {
      router.push('/docs/estrategia/01-auditoria-mercado')
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
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

        <div className="relative flex w-full flex-col justify-center px-10 py-12 md:w-[40%]">
          <div className="mb-12">
            <span className="font-black lowercase tracking-[-0.03em] text-[#B51F3A]" style={{ fontSize: '26px' }}>
              oversize
            </span>
          </div>

          <div className="w-full max-w-sm">
            <h1 className="mb-1 text-2xl font-semibold text-gray-900">Conta criada</h1>
            <p className="mb-8 text-sm text-gray-500">
              Enviamos um link de confirmação para <strong>{email}</strong>. Verifique sua caixa de entrada para ativar sua conta.
            </p>
            <Link
              href="/auth/login"
              className="inline-block w-full rounded-sm bg-[#B51F3A] py-3 text-center text-sm font-bold lowercase text-white transition-colors hover:bg-[#D42848] active:bg-[#8E1A2E]"
            >
              Voltar ao login
            </Link>
          </div>

          <span className="absolute bottom-8 left-10 text-xs text-gray-200">
            © 2026 Oversize
          </span>
        </div>

        <div className="gradient-bg hidden flex-1 md:block" />
      </div>
    )
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
          <h1 className="mb-1 text-2xl font-semibold text-gray-900">Criar conta</h1>
          <p className="mb-8 text-sm text-gray-400">Solicite acesso às diretrizes de marca</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Nome completo</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Seu nome"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-300 focus:border-[#B51F3A] focus:ring-1 focus:ring-[#F5E3E7]"
              />
            </div>

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

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Confirmar senha</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-gray-300">
            Já tem conta?{' '}
            <Link href="/auth/login" className="text-[#B51F3A] hover:text-[#D42848] transition-colors font-medium">
              Entrar
            </Link>
          </p>
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
