import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Tabs, VerticalTabs } from './Tabs'

const sampleTabs = [
  {
    id: 'visao',
    label: 'Visão Geral',
    content: (
      <div className="text-sm text-gray-600">
        <p>A Oversize é uma consultoria de estratégia e marca que opera na interseção entre posicionamento, comunicação e sistemas de comunicação.</p>
      </div>
    ),
  },
  {
    id: 'missao',
    label: 'Missão',
    content: (
      <div className="text-sm text-gray-600">
        <p>Ajudar negócios a transformar conhecimento em estratégia e sistemas de comunicação que ampliam sua percepção de valor.</p>
      </div>
    ),
  },
  {
    id: 'valores',
    label: 'Valores',
    content: (
      <div className="text-sm text-gray-600">
        <p>Clareza, estrutura, profundidade e execução com intenção.</p>
      </div>
    ),
  },
  {
    id: 'desativado',
    label: 'Em breve',
    content: <div />,
    disabled: true,
  },
]

const meta: Meta<typeof Tabs> = {
  title: 'Common/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  args: {
    tabs: sampleTabs,
  },
}

export const DefaultSecondTab: Story = {
  args: {
    tabs: sampleTabs,
    defaultTabId: 'missao',
  },
}

export const Vertical: StoryObj<typeof VerticalTabs> = {
  render: () => (
    <div className="h-48">
      <VerticalTabs tabs={sampleTabs} />
    </div>
  ),
}
