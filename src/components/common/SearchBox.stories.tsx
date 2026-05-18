import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SearchBox } from './SearchBox'

const sampleResults = [
  { id: '1', title: 'Tom e Voz', description: 'Como a Oversize fala e se comunica', href: '/docs/comunicacao/14-tom-voz', category: 'Comunicação' },
  { id: '2', title: 'Posicionamento', description: 'Território estratégico da marca', href: '/docs/estrategia/05-posicionamento', category: 'Estratégia' },
  { id: '3', title: 'Núcleo da Marca', description: 'Propósito, missão e valores', href: '/docs/marca/09-nucleo-marca', category: 'Marca' },
  { id: '4', title: 'Golden Circle', description: 'Por quê, como e o quê da Oversize', href: '/docs/estrategia/06-golden-circle', category: 'Estratégia' },
  { id: '5', title: 'Manifesto', description: 'A declaração de posição da marca', href: '/docs/comunicacao/17-manifesto', category: 'Comunicação' },
]

const meta: Meta<typeof SearchBox> = {
  title: 'Common/SearchBox',
  component: SearchBox,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    minChars: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof SearchBox>

export const Default: Story = {
  args: {
    placeholder: 'Buscar nas diretrizes…',
    results: sampleResults,
  },
}

export const WithResults: Story = {
  args: {
    placeholder: 'Buscar nas diretrizes…',
    results: sampleResults,
    minChars: 1,
  },
}

export const Empty: Story = {
  args: {
    placeholder: 'Buscar nas diretrizes…',
    results: [],
  },
}
