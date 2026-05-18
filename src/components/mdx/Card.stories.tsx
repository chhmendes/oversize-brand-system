import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Card, CardGrid } from './Card'

const meta: Meta<typeof Card> = {
  title: 'MDX/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    href: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    title: 'Posicionamento',
    description: 'Como a Oversize ocupa seu território estratégico no mercado de consultoria de marca.',
  },
}

export const WithLink: Story = {
  args: {
    title: 'Tom e Voz',
    description: 'Os princípios de comunicação que guiam como a Oversize fala com seus clientes.',
    href: '/docs/comunicacao/14-tom-voz',
  },
}

export const WithChildren: Story = {
  args: {
    title: 'Estratégia Estruturada',
    description: 'Metodologia proprietária da Oversize com 12 passos.',
    children: (
      <div className="mt-3 flex gap-2">
        <span className="rounded-sm bg-gray-100 px-2 py-1 text-xs text-gray-600">metodologia</span>
        <span className="rounded-sm bg-[#F5E3E7] px-2 py-1 text-xs text-[#B51F3A]">exclusivo</span>
      </div>
    ),
  },
}

export const GridThreeColumns: StoryObj = {
  render: () => (
    <CardGrid columns={3}>
      <Card title="Auditoria de Mercado" description="Mapeamento do ecossistema competitivo." href="/docs/estrategia/01-auditoria-mercado" />
      <Card title="Auditoria de Público" description="Compreensão profunda do cliente ideal." href="/docs/estrategia/02-auditoria-publico" />
      <Card title="Auditoria de Negócio" description="Diagnóstico interno da empresa." href="/docs/estrategia/03-auditoria-negocio" />
      <Card title="Benchmarking" description="Análise comparativa com referências do mercado." href="/docs/estrategia/04-benchmarking" />
      <Card title="Posicionamento" description="Território estratégico da marca." href="/docs/estrategia/05-posicionamento" />
      <Card title="Golden Circle" description="Por quê, como e o quê da Oversize." href="/docs/estrategia/06-golden-circle" />
    </CardGrid>
  ),
}

export const GridTwoColumns: StoryObj = {
  render: () => (
    <CardGrid columns={2}>
      <Card title="Manual Verbal" description="Diretrizes de escrita e tom de voz." />
      <Card title="Manual Visual" description="Sistema visual e identidade gráfica." />
    </CardGrid>
  ),
}
