import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Timeline } from './Timeline'

const estrategiaSteps = [
  { step: 1, title: 'Auditoria de Mercado', description: 'Mapeamento do ecossistema competitivo e oportunidades.', status: 'completed' as const },
  { step: 2, title: 'Auditoria de Público', description: 'Compreensão profunda do cliente ideal e suas dores.', status: 'completed' as const },
  { step: 3, title: 'Auditoria de Negócio', description: 'Diagnóstico interno: ofertas, processos, diferenciais.', status: 'current' as const },
  { step: 4, title: 'Benchmarking', description: 'Análise comparativa com referências do segmento.', status: 'pending' as const },
  { step: 5, title: 'Posicionamento', description: 'Definição do território estratégico da marca.', status: 'pending' as const },
]

const meta: Meta<typeof Timeline> = {
  title: 'MDX/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Timeline>

export const Vertical: Story = {
  args: {
    items: estrategiaSteps,
    type: 'vertical',
  },
}

export const Horizontal: Story = {
  args: {
    items: estrategiaSteps.slice(0, 4),
    type: 'horizontal',
  },
}

export const AllCompleted: Story = {
  args: {
    items: estrategiaSteps.map(s => ({ ...s, status: 'completed' as const })),
    type: 'vertical',
  },
}

export const AllPending: Story = {
  args: {
    items: estrategiaSteps.map(s => ({ ...s, status: 'pending' as const })),
    type: 'vertical',
  },
}
