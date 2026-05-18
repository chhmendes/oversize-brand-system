import type { Preview } from '@storybook/nextjs-vite'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white',          value: '#ffffff' },
        { name: 'ash-soft',       value: '#FAFAFA' },
        { name: 'ash',            value: '#D9D9D9' },
        { name: 'graphite',       value: '#3C3C3C' },
        { name: 'graphite-deep',  value: '#222222' },
        { name: 'red',            value: '#B51F3A' },
      ],
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
