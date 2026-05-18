import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta = {
  title: 'Brand/Spacing & Surfaces',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

const Divider = () => (
  <hr style={{ border: 'none', borderTop: '1px solid var(--border-1)', margin: '40px 0' }} />
)

export const SpacingScale: Story = {
  name: 'Spacing Scale',
  render: () => (
    <div style={{ fontFamily: 'var(--font-body)', padding: 8, maxWidth: 600 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 32, letterSpacing: '-0.02em', textTransform: 'lowercase', color: 'var(--fg-1)', margin: '0 0 24px' }}>
        spacing · 4px base
      </h2>
      {[
        { token: '--sp-1', px: 4 },
        { token: '--sp-2', px: 8 },
        { token: '--sp-3', px: 12 },
        { token: '--sp-4', px: 16 },
        { token: '--sp-5', px: 24 },
        { token: '--sp-6', px: 32 },
        { token: '--sp-7', px: 48 },
        { token: '--sp-8', px: 64 },
        { token: '--sp-9', px: 96 },
        { token: '--sp-10', px: 128 },
      ].map(({ token, px }) => (
        <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)', width: 72, flexShrink: 0 }}>
            {token}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)', width: 36, flexShrink: 0 }}>
            {px}px
          </span>
          <div style={{ height: 20, width: px, background: 'var(--ov-red)', borderRadius: 2, flexShrink: 0 }} />
        </div>
      ))}
    </div>
  ),
}

export const RadiiAndShadows: Story = {
  name: 'Radii & Shadows',
  render: () => (
    <div style={{ fontFamily: 'var(--font-body)', padding: 8 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 32, letterSpacing: '-0.02em', textTransform: 'lowercase', color: 'var(--fg-1)', margin: '0 0 32px' }}>
        radii
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginBottom: 48 }}>
        {[
          { token: '--r-0', r: 0, label: 'sharp' },
          { token: '--r-1', r: 2, label: 'micro' },
          { token: '--r-2', r: 4, label: 'input' },
          { token: '--r-3', r: 8, label: 'card' },
          { token: '--r-4', r: 12, label: 'panel' },
          { token: '--r-pill', r: 999, label: 'tag / avatar' },
        ].map(({ token, r, label }) => (
          <div key={token} style={{ textAlign: 'center' }}>
            <div style={{
              width: 80, height: 80,
              background: 'var(--ov-ash-soft)',
              border: '2px solid var(--ov-graphite-deep)',
              borderRadius: r,
              marginBottom: 8,
            }} />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', margin: 0 }}>{token}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-2)', margin: '2px 0 0' }}>{label}</p>
          </div>
        ))}
      </div>

      <Divider />

      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 32, letterSpacing: '-0.02em', textTransform: 'lowercase', color: 'var(--fg-1)', margin: '0 0 32px' }}>
        shadows
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
        <div>
          <div style={{ width: 120, height: 80, background: '#FFFFFF', border: '2px solid #222222', borderRadius: 8, boxShadow: '6px 6px 0 0 #222222', marginRight: 6, marginBottom: 18 }} />
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', margin: 0 }}>--sh-hard</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-2)', margin: '2px 0 0' }}>offset graphite · signature</p>
        </div>
        <div>
          <div style={{ width: 120, height: 80, background: '#222222', border: '2px solid #8E1A2E', borderRadius: 8, boxShadow: '6px 6px 0 0 #B51F3A', marginRight: 6, marginBottom: 18 }} />
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', margin: 0 }}>--sh-hard-red</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-2)', margin: '2px 0 0' }}>offset red · dark surfaces</p>
        </div>
        <div>
          <div style={{ width: 120, height: 80, background: '#FFFFFF', border: '1px solid #D9D9D9', borderRadius: 8, boxShadow: '0 1px 2px rgba(10,10,10,.06)', marginRight: 6, marginBottom: 18 }} />
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', margin: 0 }}>--sh-1</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-2)', margin: '2px 0 0' }}>soft lift · use sparingly</p>
        </div>
        <div>
          <div style={{ width: 120, height: 80, background: '#FFFFFF', border: '1px solid #D9D9D9', borderRadius: 8, boxShadow: '0 4px 12px rgba(10,10,10,.08)', marginRight: 6, marginBottom: 18 }} />
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', margin: 0 }}>--sh-2</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--fg-2)', margin: '2px 0 0' }}>elevated panel · rare</p>
        </div>
      </div>
    </div>
  ),
}

export const Borders: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-body)', padding: 8 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 32, letterSpacing: '-0.02em', textTransform: 'lowercase', color: 'var(--fg-1)', margin: '0 0 32px' }}>
        borders
      </h2>
      <p style={{ fontSize: 14, color: 'var(--fg-2)', maxWidth: 480, lineHeight: 1.6, marginBottom: 32 }}>
        2px borders in graphite or red. Hairlines feel too timid for this brand. Never less than 1px and only on truly secondary elements.
      </p>
      <div style={{ display: 'flex', gap: 24 }}>
        {[
          { label: 'border-1 (ash)', color: '#D9D9D9', size: 1 },
          { label: 'border-2 (ash-deep)', color: '#BFBFBF', size: 1 },
          { label: 'graphite · 2px', color: '#222222', size: 2 },
          { label: 'red accent · 2px', color: '#B51F3A', size: 2 },
        ].map(({ label, color, size }) => (
          <div key={label}>
            <div style={{ width: 80, height: 80, background: 'var(--bg-1)', border: `${size}px solid ${color}`, borderRadius: 8, marginBottom: 8 }} />
            <p style={{ fontSize: 11, color: 'var(--fg-3)', margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  ),
}
