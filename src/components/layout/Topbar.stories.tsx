import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Topbar } from './Topbar'

const meta: Meta<typeof Topbar> = {
  title: 'Layout/Topbar',
  component: Topbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Topbar>

export const Default: Story = {}

export const WithBreadcrumb: Story = {
  args: {
    breadcrumb: (
      <span className="flex items-center gap-1.5 text-xs text-gray-400">
        <span>Estratégia</span>
        <span>/</span>
        <span className="font-medium text-gray-600">Auditoria de Mercado</span>
      </span>
    ),
  },
}
