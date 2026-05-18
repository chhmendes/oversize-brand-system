import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta = {
  title: 'Brand/Typography',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

const Divider = () => (
  <hr style={{ border: 'none', borderTop: '1px solid var(--border-1)', margin: '32px 0' }} />
)

const Label = ({ children }: { children: string }) => (
  <span style={{
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    fontSize: 10,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'var(--ov-red)',
    display: 'block',
    marginBottom: 8,
  }}>
    {children}
  </span>
)

export const Specimen: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-body)', padding: 8, maxWidth: 800 }}>
      <div style={{
        background: 'var(--ov-graphite)',
        padding: '64px 48px 48px',
        marginBottom: 48,
        borderRadius: 2,
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 96,
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
          textTransform: 'lowercase',
          color: '#D9D9D9',
        }}>
          <span style={{ color: '#B51F3A' }}>over</span>size
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: '#7A7A7A', marginTop: 16 }}>
          sansa pro · black 900 · lowercase · -0.03em
        </p>
      </div>

      <Label>display xl — 96px · black 900</Label>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 96, lineHeight: 1.02, letterSpacing: '-0.03em', textTransform: 'lowercase', color: 'var(--fg-1)', marginBottom: 32 }}>
        oversize
      </div>

      <Label>display l — 72px · black 900</Label>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 72, lineHeight: 1.02, letterSpacing: '-0.03em', textTransform: 'lowercase', color: 'var(--fg-1)', marginBottom: 32 }}>
        bigger is the point
      </div>

      <Label>display m — 56px · bold 700</Label>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 56, lineHeight: 1.12, letterSpacing: '-0.03em', textTransform: 'lowercase', color: 'var(--fg-1)', marginBottom: 32 }}>
        go oversize
      </div>

      <Divider />

      <Label>h1 — 40px · bold 700</Label>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, lineHeight: 1.12, letterSpacing: '-0.01em', color: 'var(--fg-1)', margin: '0 0 24px' }}>
        Estratégia Estruturada
      </h1>

      <Label>h2 — 32px · bold 700</Label>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, lineHeight: 1.12, letterSpacing: '-0.01em', color: 'var(--fg-1)', margin: '0 0 24px' }}>
        Posicionamento de Marca
      </h2>

      <Label>h3 — 24px · semibold 600</Label>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 24, lineHeight: 1.12, color: 'var(--fg-1)', margin: '0 0 24px' }}>
        Identidade Visual
      </h3>

      <Label>h4 — 20px · semibold 600</Label>
      <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, lineHeight: 1.35, color: 'var(--fg-1)', margin: '0 0 24px' }}>
        Comunicação e Tom de Voz
      </h4>

      <Divider />

      <Label>body large — 18px · regular 400</Label>
      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 18, lineHeight: 1.6, color: 'var(--fg-2)', margin: '0 0 24px' }}>
        A oversize ajuda empresas a construírem marcas que não passam despercebidas. Trabalho direto, sem enrolação, com resultado que fala por si.
      </p>

      <Label>body — 16px · regular 400</Label>
      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 16, lineHeight: 1.6, color: 'var(--fg-2)', margin: '0 0 24px' }}>
        Posicionamento, identidade visual, comunicação estratégica. Tudo alinhado para que a sua marca seja reconhecida, lembrada e escolhida.
      </p>

      <Label>body small — 14px · regular 400</Label>
      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 14, lineHeight: 1.35, color: 'var(--fg-2)', margin: '0 0 24px' }}>
        Diagnóstico, estratégia, criação e implementação. Etapas claras, entrega consistente.
      </p>

      <Label>caption — 12px · regular 400</Label>
      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 12, lineHeight: 1.35, color: 'var(--fg-3)', margin: '0 0 24px' }}>
        Versão 2026 · Oversize Design System
      </p>

      <Divider />

      <Label>label / tag — 10px · bold 700 · uppercase · +0.12em</Label>
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ov-red)', display: 'block', marginBottom: 24 }}>
        01 / marca · identidade · comunicação
      </span>

      <Label>mono — JetBrains Mono</Label>
      <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--bg-3)', padding: '8px 12px', borderRadius: 4, display: 'inline-block', color: 'var(--fg-1)' }}>
        --ov-red: #B51F3A
      </code>
    </div>
  ),
}

export const Scale: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-body)', padding: 8 }}>
      {[
        { label: 'display xl', size: 96, weight: 900, sample: 'oversize' },
        { label: 'display l', size: 72, weight: 900, sample: 'oversize' },
        { label: 'display m', size: 56, weight: 700, sample: 'oversize' },
        { label: 'h1', size: 40, weight: 700, sample: 'Heading 1' },
        { label: 'h2', size: 32, weight: 700, sample: 'Heading 2' },
        { label: 'h3', size: 24, weight: 600, sample: 'Heading 3' },
        { label: 'h4', size: 20, weight: 600, sample: 'Heading 4' },
        { label: 'body l', size: 18, weight: 400, sample: 'Body large' },
        { label: 'body', size: 16, weight: 400, sample: 'Body regular' },
        { label: 'body s', size: 14, weight: 400, sample: 'Body small' },
        { label: 'caption', size: 12, weight: 400, sample: 'Caption' },
        { label: 'micro', size: 10, weight: 700, sample: 'LABEL TAG' },
      ].map(({ label, size, weight, sample }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: 24, padding: '12px 0', borderBottom: '1px solid var(--border-1)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', width: 72, flexShrink: 0 }}>
            {label}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', width: 36, flexShrink: 0 }}>
            {size}px
          </span>
          <span style={{
            fontFamily: size <= 20 ? 'var(--font-body)' : 'var(--font-display)',
            fontWeight: weight,
            fontSize: size,
            lineHeight: 1,
            color: 'var(--fg-1)',
            textTransform: size > 40 ? 'lowercase' : 'none',
            letterSpacing: size > 40 ? '-0.03em' : size > 20 ? '-0.01em' : size <= 10 ? '0.12em' : '0',
          }}>
            {sample}
          </span>
        </div>
      ))}
    </div>
  ),
}
