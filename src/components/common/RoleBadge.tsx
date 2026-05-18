interface RoleBadgeProps {
  role: 'admin' | 'staff'
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const isAdmin = role === 'admin'

  return (
    <span
      style={{
        display: 'inline-block',
        borderRadius: '4px',
        padding: '2px 8px',
        fontSize: '11px',
        fontWeight: 600,
        textTransform: 'lowercase',
        backgroundColor: isAdmin ? '#B51F3A' : '#F3F4F6',
        color: isAdmin ? '#FFFFFF' : '#6B7280',
      }}
    >
      {role}
    </span>
  )
}
