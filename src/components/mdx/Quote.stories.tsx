import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Quote, VoiceExample } from './Quote'

const meta: Meta<typeof Quote> = {
  title: 'MDX/Quote',
  component: Quote,
  tags: ['autodocs'],
  argTypes: {
    author: { control: 'text' },
    source: { control: 'text' },
    highlight: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Quote>

export const Default: Story = {
  args: {
    children: 'A Oversize ajuda negócios a transformar conhecimento em estratégia e sistemas de comunicação que ampliam sua percepção de valor.',
  },
}

export const WithAuthor: Story = {
  args: {
    children: 'Clareza é a forma mais alta de respeito pelo cliente.',
    author: 'Christian Mendes',
    source: 'Manifesto Oversize, 2026',
  },
}

export const Highlighted: Story = {
  args: {
    children: 'Não fazemos marketing. Fazemos estratégia que comunica.',
    author: 'Oversize',
    highlight: true,
  },
}

export const VoiceCorrect: StoryObj<typeof VoiceExample> = {
  render: () => (
    <VoiceExample type="correct">
      "A Oversize estrutura a comunicação da sua marca para que ela seja percebida com mais valor."
    </VoiceExample>
  ),
}

export const VoiceIncorrect: StoryObj<typeof VoiceExample> = {
  render: () => (
    <VoiceExample type="incorrect">
      "Somos especialistas em tudo! Resultados garantidos em 30 dias!"
    </VoiceExample>
  ),
}

export const VoiceComparison: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-3">
      <VoiceExample type="correct" label="Use">
        "Estratégia estruturada para negócios que querem ser percebidos com mais valor."
      </VoiceExample>
      <VoiceExample type="incorrect" label="Evite">
        "Agência criativa full service com soluções para tudo!"
      </VoiceExample>
      <VoiceExample type="example" label="Exemplo real">
        "A Oversize não é uma agência. É uma consultoria de posicionamento e sistemas de marca."
      </VoiceExample>
    </div>
  ),
}
