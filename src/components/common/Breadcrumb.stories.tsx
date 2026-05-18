import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Breadcrumb } from './Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Common/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    items: [
      { label: 'Início', href: '/' },
      { label: 'Estratégia', href: '/docs/estrategia' },
      { label: 'Auditoria de Mercado', current: true },
    ],
  },
}

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Diretrizes', href: '/docs' },
      { label: 'Marca', current: true },
    ],
  },
}

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Início', current: true }],
  },
}

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Início', href: '/' },
      { label: 'Comunicação', href: '/docs/comunicacao' },
      { label: 'Tom e Voz', current: true },
    ],
    separator: '›',
  },
}

export const AllSections: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Breadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Estratégia', href: '/docs/estrategia' }, { label: 'Posicionamento', current: true }]} />
      <Breadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Marca', href: '/docs/marca' }, { label: 'Núcleo da Marca', current: true }]} />
      <Breadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Comunicação', href: '/docs/comunicacao' }, { label: 'Tom e Voz', current: true }]} />
      <Breadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Identidade', href: '/docs/identidade' }, { label: 'Manual Visual', current: true }]} />
    </div>
  ),
}
