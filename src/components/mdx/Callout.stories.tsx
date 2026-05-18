import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Callout } from './Callout'

const meta: Meta<typeof Callout> = {
  title: 'MDX/Callout',
  component: Callout,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'warning', 'success', 'error'],
    },
    title: { control: 'text' },
    icon: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Callout>

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Nota',
    children: 'A Oversize não é uma agência. É uma consultoria de estratégia e marca com foco em sistemas de comunicação.',
  },
}

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Atenção',
    children: 'Não use a marca em contextos que contradizem os valores da Oversize: superficialidade, urgência artificial ou promessas vagas.',
  },
}

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Correto',
    children: 'Use o logotipo sempre em lowercase, com tracking negativo de -0.03em e peso black.',
  },
}

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Evite',
    children: 'Não distorça, recolora ou adicione sombra ao logotipo da Oversize.',
  },
}

export const WithoutTitle: Story = {
  args: {
    type: 'info',
    children: 'Esta é uma observação sobre o conteúdo desta seção.',
  },
}

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Callout type="info" title="Informação">Nota sobre o sistema de marca.</Callout>
      <Callout type="warning" title="Atenção">Cuidado com uso indevido de elementos.</Callout>
      <Callout type="success" title="Correto">Aplicação aprovada pelo padrão de marca.</Callout>
      <Callout type="error" title="Evite">Esta aplicação fere as diretrizes visuais.</Callout>
    </div>
  ),
}
