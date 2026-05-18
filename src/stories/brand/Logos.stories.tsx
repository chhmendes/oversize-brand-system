import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta = {
  title: 'Brand/Logos',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

interface LogoCardProps {
  src: string
  name: string
  usage: string
  bg: string
  border?: string
}

const LogoCard = ({ src, name, usage, bg, border }: LogoCardProps) => (
  <div style={{ marginRight: 6, marginBottom: 6 }}>
    <div style={{
      background: bg,
      border: `2px solid ${border ?? '#222222'}`,
      borderRadius: 8,
      boxShadow: '6px 6px 0 0 #222222',
      padding: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    }}>
      <img src={src} alt={name} style={{ width: 120, height: 'auto', display: 'block' }} />
    </div>
    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13, color: 'var(--fg-1)', margin: 0 }}>
      {name}
    </p>
    <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-3)', margin: '3px 0 0' }}>
      {usage}
    </p>
  </div>
)

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ fontFamily: 'var(--font-body)', padding: 8 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 32, letterSpacing: '-0.02em', textTransform: 'lowercase', color: 'var(--fg-1)', margin: '0 0 24px' }}>
        logo · variantes
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        <LogoCard
          src="/brand/logo-original.png"
          name="original"
          usage="uso primário · fundo branco"
          bg="#FFFFFF"
        />
        <LogoCard
          src="/brand/logo-red-on-gray.png"
          name="red on gray"
          usage="fundo cinza claro"
          bg="#D9D9D9"
        />
        <LogoCard
          src="/brand/logo-gray-on-light.png"
          name="gray on light"
          usage="monocromático · fundo claro"
          bg="#ECECEC"
        />
        <LogoCard
          src="/brand/logo-gray-on-dark.png"
          name="gray on dark"
          usage="fundo escuro / graphite"
          bg="#3C3C3C"
          border="#555555"
        />
        <LogoCard
          src="/brand/logo-gray-on-red.png"
          name="gray on red"
          usage="hero · fundo vermelho"
          bg="#B51F3A"
          border="#8E1A2E"
        />
      </div>

      <div style={{ marginTop: 48, padding: 24, background: 'var(--bg-2)', border: '2px solid var(--border-1)', borderRadius: 8 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ov-red)', margin: '0 0 8px' }}>
          regra
        </p>
        <p style={{ fontSize: 14, color: 'var(--fg-2)', margin: 0, lineHeight: 1.6 }}>
          Nunca reduzir o wordmark abaixo de 48px de largura.
          Não distorcer, recortar ou recolorir fora das variantes acima.
          O logo não é um ícone — para favicons e avatares use a letra inicial.
        </p>
      </div>
    </div>
  ),
}

export const OnDark: Story = {
  name: 'On Dark Backgrounds',
  parameters: { backgrounds: { default: 'graphite' } },
  render: () => (
    <div style={{ display: 'flex', gap: 32, padding: 8 }}>
      <img src="/brand/logo-gray-on-dark.png" alt="logo gray on dark" style={{ width: 160, height: 'auto' }} />
      <img src="/brand/logo-gray-on-red.png" alt="logo gray on red" style={{ width: 160, height: 'auto' }} />
    </div>
  ),
}

export const OnRed: Story = {
  name: 'On Red Background',
  parameters: { backgrounds: { default: 'red' } },
  render: () => (
    <div style={{ padding: 8 }}>
      <img src="/brand/logo-gray-on-red.png" alt="logo gray on red" style={{ width: 160, height: 'auto' }} />
    </div>
  ),
}
