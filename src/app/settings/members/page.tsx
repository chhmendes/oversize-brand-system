'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { RoleBadge } from '@/components/common/RoleBadge'
import { listUsers, updateUserRole, deleteUser } from '@/app/actions/users'

interface Member {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: 'admin' | 'staff'
  created_at: string
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function getInitial(name: string | null, email: string): string {
  const source = name ?? email
  return source[0].toUpperCase()
}

export default function MembersPage() {
  const { user } = useAuth()
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const result = await listUsers()
      if ('error' in result && result.error) {
        setError(typeof result.error === 'string' ? result.error : 'Erro ao carregar membros')
      } else if ('data' in result && result.data) {
        setMembers(result.data as Member[])
      }
      setLoading(false)
    }
    load()
  }, [])

  async function handleRoleChange(userId: string, newRole: 'admin' | 'staff') {
    const result = await updateUserRole(userId, newRole)
    if ('error' in result && result.error) return
    setMembers((prev) =>
      prev.map((m) => (m.id === userId ? { ...m, role: newRole } : m))
    )
  }

  async function handleDelete(userId: string) {
    if (!window.confirm('Tem certeza que deseja remover este membro?')) return
    const result = await deleteUser(userId)
    if ('error' in result && result.error) return
    setMembers((prev) => prev.filter((m) => m.id !== userId))
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--fg-1)',
            margin: 0,
            marginBottom: '6px',
          }}
        >
          Membros
        </h1>
        <p
          style={{
            fontSize: '13px',
            color: 'var(--fg-3)',
            margin: 0,
          }}
        >
          Gerencie os membros e seus níveis de acesso
        </p>
      </div>

      {loading && (
        <div style={{ color: 'var(--fg-3)', fontSize: '14px' }}>Carregando...</div>
      )}

      {error && (
        <div
          style={{
            color: 'var(--ov-red)',
            fontSize: '13px',
            padding: '12px 16px',
            border: '1px solid var(--ov-red-tint)',
            borderRadius: '4px',
            background: 'var(--ov-red-tint)',
          }}
        >
          {error}
        </div>
      )}

      {!loading && !error && (
        <div
          style={{
            border: '1px solid var(--border-1)',
            borderRadius: '4px',
            background: 'var(--bg-1)',
            overflow: 'hidden',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}
          >
            <thead>
              <tr style={{ background: 'var(--bg-2)' }}>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--fg-3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    borderBottom: '1px solid var(--border-1)',
                  }}
                >
                  Membro
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--fg-3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    borderBottom: '1px solid var(--border-1)',
                  }}
                >
                  Role
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--fg-3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    borderBottom: '1px solid var(--border-1)',
                  }}
                >
                  Desde
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--fg-3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    borderBottom: '1px solid var(--border-1)',
                  }}
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member.id}
                  style={{ borderBottom: '1px solid var(--border-1)' }}
                >
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'var(--ov-graphite)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          color: '#FFFFFF',
                          fontSize: '13px',
                          fontWeight: 700,
                        }}
                      >
                        {getInitial(member.full_name, member.email)}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: 'var(--fg-1)',
                            lineHeight: 1.3,
                          }}
                        >
                          {member.full_name ?? member.email.split('@')[0]}
                        </div>
                        <div
                          style={{
                            fontSize: '11px',
                            color: 'var(--fg-3)',
                            lineHeight: 1.3,
                          }}
                        >
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <RoleBadge role={member.role} />
                  </td>
                  <td
                    style={{
                      padding: '12px 16px',
                      fontSize: '12px',
                      color: 'var(--fg-3)',
                    }}
                  >
                    {formatDate(member.created_at)}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <select
                        value={member.role}
                        onChange={(e) =>
                          handleRoleChange(member.id, e.target.value as 'admin' | 'staff')
                        }
                        style={{
                          fontSize: '12px',
                          padding: '4px 8px',
                          border: '1px solid var(--border-1)',
                          borderRadius: '4px',
                          background: 'var(--bg-1)',
                          color: 'var(--fg-2)',
                          cursor: 'pointer',
                          outline: 'none',
                        }}
                      >
                        <option value="admin">admin</option>
                        <option value="staff">staff</option>
                      </select>

                      {user?.id !== member.id && (
                        <button
                          onClick={() => handleDelete(member.id)}
                          title="Remover membro"
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#B51F3A',
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="1,3.5 13,3.5" />
                            <path d="M5,3.5V2.5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V3.5" />
                            <path d="M2.5,3.5l.75,8a1,1,0,0,0,1,.75h5.5a1,1,0,0,0,1-.75l.75-8" />
                            <line x1="5.5" y1="6.5" x2="5.5" y2="10" />
                            <line x1="8.5" y1="6.5" x2="8.5" y2="10" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
