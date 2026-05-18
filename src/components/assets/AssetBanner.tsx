'use client'

interface AssetBannerProps {
  title: string
  subtitle: string
}

export function AssetBanner({ title, subtitle }: AssetBannerProps) {
  return (
    <div
      className="animate-gradient"
      style={{
        background: 'linear-gradient(135deg, #B51F3A 0%, #3C3C3C 30%, #8E1A2E 60%, #1A1A1A 100%)',
        backgroundSize: '400% 400%',
        padding: '48px 40px',
        borderRadius: 0,
      }}
    >
      <p
        style={{
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
          margin: '0 0 10px',
        }}
      >
        Ativos de Marca
      </p>
      <h1
        style={{
          fontSize: 'var(--fs-h2)',
          fontWeight: 'var(--fw-bold)',
          color: '#FFFFFF',
          letterSpacing: 'var(--tr-tight)',
          lineHeight: 'var(--lh-snug)',
          margin: 0,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: 'var(--fs-body-s)',
          color: 'rgba(255,255,255,0.6)',
          marginTop: '8px',
          marginBottom: 0,
          lineHeight: 'var(--lh-normal)',
        }}
      >
        {subtitle}
      </p>
    </div>
  )
}
