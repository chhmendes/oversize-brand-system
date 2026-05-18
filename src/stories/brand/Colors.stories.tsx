import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta = {
  title: 'Brand/Colors',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

const Swatch = ({ name, hex, role }: { name: string; hex: string; role: string }) => (
  <div style={{ marginRight: 6, marginBottom: 6 }}>
    <div
      style={{
        width: 96,
        height: 72,
        background: hex,
        border: '2px solid #222222',
        borderRadius: 8,
        boxShadow: '6px 6px 0 0 #222222',
        marginBottom: 8,
      }}
    />
    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 12, color: 'var(--fg-1)', margin: 0 }}>
      {name}
    </p>
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', margin: '2px 0 0' }}>
      {hex}
    </p>
    <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--fg-3)', margin: '2px 0 0' }}>
      {role}
    </p>
  </div>
)

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 48 }}>
    <h2 style={{
      fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 32,
      letterSpacing: '-0.02em', textTransform: 'lowercase',
      color: 'var(--fg-1)', margin: '0 0 20px',
    }}>
      {title}
    </h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {children}
    </div>
  </div>
)

export const Palette: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-body)', padding: 8 }}>
      <Section title="core three">
        <Swatch name="red" hex="#B51F3A" role="brand accent · one per screen" />
        <Swatch name="graphite" hex="#3C3C3C" role="primary dark surface" />
        <Swatch name="ash" hex="#D9D9D9" role="neutral light surface" />
        <Swatch name="white" hex="#FFFFFF" role="page background" />
        <Swatch name="black" hex="#0A0A0A" role="deepest dark" />
      </Section>

      <Section title="red scale">
        <Swatch name="red-tint" hex="#F5E3E7" role="soft wash" />
        <Swatch name="red" hex="#B51F3A" role="default" />
        <Swatch name="red-bright" hex="#D42848" role="hover" />
        <Swatch name="red-deep" hex="#8E1A2E" role="pressed" />
      </Section>

      <Section title="graphite scale">
        <Swatch name="ash-soft" hex="#ECECEC" role="subtle divide" />
        <Swatch name="ash" hex="#D9D9D9" role="light surface" />
        <Swatch name="ash-deep" hex="#BFBFBF" role="quiet border" />
        <Swatch name="graphite-soft" hex="#555555" role="borders on dark" />
        <Swatch name="graphite" hex="#3C3C3C" role="primary" />
        <Swatch name="graphite-deep" hex="#222222" role="deepest" />
      </Section>

      <Section title="semantic · foreground">
        <Swatch name="fg-1" hex="#222222" role="primary text on light" />
        <Swatch name="fg-2" hex="#3C3C3C" role="secondary text" />
        <Swatch name="fg-3" hex="#7A7A7A" role="tertiary / muted" />
        <Swatch name="fg-brand" hex="#B51F3A" role="brand accent text" />
      </Section>

      <Section title="semantic · background">
        <Swatch name="bg-1" hex="#FFFFFF" role="page" />
        <Swatch name="bg-2" hex="#FAFAFA" role="subtle panel" />
        <Swatch name="bg-3" hex="#ECECEC" role="card on light" />
        <Swatch name="bg-dark-1" hex="#3C3C3C" role="primary dark" />
        <Swatch name="bg-dark-2" hex="#222222" role="deepest dark" />
        <Swatch name="bg-accent" hex="#B51F3A" role="red fill" />
      </Section>

      <Section title="status">
        <Swatch name="success" hex="#2D7D46" role="positive" />
        <Swatch name="warning" hex="#D69F1E" role="caution" />
        <Swatch name="danger" hex="#B51F3A" role="error (= brand red)" />
        <Swatch name="info" hex="#2E6FB7" role="informational" />
      </Section>
    </div>
  ),
}

export const Rule: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-body)', padding: 8, maxWidth: 640 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 32, letterSpacing: '-0.02em', textTransform: 'lowercase', color: 'var(--fg-1)', margin: '0 0 16px' }}>
        one red per screen
      </h2>
      <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.6, marginBottom: 32 }}>
        Red is the exclamation point. Use it on one focal element per screen. Everything else is graphite, ash, or white.
      </p>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, background: '#FFFFFF', border: '2px solid #222222', borderRadius: 8, padding: 24, boxShadow: '6px 6px 0 0 #222222' }}>
          <span style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7A7A7A', marginBottom: 8 }}>correto</span>
          <div style={{ width: 48, height: 8, background: '#B51F3A', borderRadius: 2, marginBottom: 8 }} />
          <div style={{ width: '100%', height: 8, background: '#D9D9D9', borderRadius: 2, marginBottom: 6 }} />
          <div style={{ width: '80%', height: 8, background: '#D9D9D9', borderRadius: 2 }} />
        </div>
        <div style={{ flex: 1, background: '#FFFFFF', border: '2px solid #222222', borderRadius: 8, padding: 24, boxShadow: '6px 6px 0 0 #222222', opacity: 0.5 }}>
          <span style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B51F3A', marginBottom: 8 }}>evitar</span>
          <div style={{ width: 48, height: 8, background: '#B51F3A', borderRadius: 2, marginBottom: 8 }} />
          <div style={{ width: '100%', height: 8, background: '#B51F3A', borderRadius: 2, marginBottom: 6 }} />
          <div style={{ width: '80%', height: 8, background: '#B51F3A', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  ),
}
