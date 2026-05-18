import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    hardShadow: { control: 'boolean' },
    isLoading:  { control: 'boolean' },
    fullWidth:  { control: 'boolean' },
    disabled:   { control: 'boolean' },
    children:   { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', children: 'go oversize' },
}

export const PrimaryWithShadow: Story = {
  name: 'Primary + Hard Shadow',
  args: { variant: 'primary', size: 'md', children: 'go oversize', hardShadow: true },
}

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', children: 'continuar' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md', children: 'saiba mais' },
}

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: 'ação' },
}

export const Large: Story = {
  args: { variant: 'primary', size: 'lg', children: 'entrar' },
}

export const Loading: Story = {
  args: { variant: 'primary', size: 'md', isLoading: true, children: 'salvando…' },
}

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', disabled: true, children: 'indisponível' },
}

export const FullWidth: Story = {
  args: { variant: 'primary', size: 'md', fullWidth: true, children: 'entrar' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Button variant="primary" hardShadow>primary</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="ghost">ghost</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      <Button size="sm">pequeno</Button>
      <Button size="md">médio</Button>
      <Button size="lg">grande</Button>
    </div>
  ),
}

export const OnDark: Story = {
  parameters: { backgrounds: { default: 'graphite' } },
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Button variant="primary" hardShadow>go oversize</Button>
      <Button variant="ghost">saiba mais</Button>
    </div>
  ),
}
