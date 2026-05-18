import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input, Textarea } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    helpText: { control: 'text' },
    success: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
  },
}

export const WithHelp: Story = {
  args: {
    label: 'Senha',
    type: 'password',
    placeholder: '••••••••',
    helpText: 'Mínimo de 8 caracteres.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    error: 'Email inválido.',
    value: 'email-invalido',
  },
}

export const Success: Story = {
  args: {
    label: 'Nome',
    placeholder: 'Seu nome',
    success: true,
    value: 'Christian Mendes',
  },
}

export const Required: Story = {
  args: {
    label: 'Campo obrigatório',
    placeholder: 'Preencha',
    required: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Campo desativado',
    value: 'Não editável',
    disabled: true,
  },
}

export const TextareaDefault: StoryObj<typeof Textarea> = {
  render: () => (
    <Textarea
      label="Mensagem"
      placeholder="Descreva o que você precisa…"
      helpText="Seja específico sobre o contexto da marca."
    />
  ),
}

export const TextareaWithError: StoryObj<typeof Textarea> = {
  render: () => (
    <Textarea
      label="Mensagem"
      placeholder="Descreva o que você precisa…"
      error="Campo obrigatório."
    />
  ),
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <Input label="Padrão" placeholder="Placeholder" />
      <Input label="Com erro" error="Mensagem de erro." value="valor errado" />
      <Input label="Sucesso" success value="valor correto" />
      <Input label="Desativado" value="Não editável" disabled />
    </div>
  ),
}
