import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Sidebar } from './Sidebar'
import { navigationConfig } from '@/config/navigation.config'

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/docs/estrategia/01-auditoria-mercado',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  args: {
    items: navigationConfig,
  },
}

export const ActiveMarca: Story = {
  args: {
    items: navigationConfig,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/docs/marca/09-nucleo-marca',
      },
    },
  },
}

export const ActiveComunicacao: Story = {
  args: {
    items: navigationConfig,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/docs/comunicacao/14-tom-voz',
      },
    },
  },
}

export const ActiveIdentidade: Story = {
  args: {
    items: navigationConfig,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/docs/identidade/18-manual-verbal',
      },
    },
  },
}
