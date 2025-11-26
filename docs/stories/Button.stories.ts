import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@ds/web-components';

const meta: Meta = {
  title: 'Components/Button',
  tags: ['autodocs'],
  render: (args) => html`
    <ds-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
    >
      ${args.label}
    </ds-button>
  `,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
      description: 'The visual style variant of the button'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state'
    },
    label: {
      control: 'text',
      description: 'The button text'
    }
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    label: 'Button'
  }
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button'
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    label: 'Outline Button'
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Button'
  }
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    label: 'Delete'
  }
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Button'
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Button'
  }
};

export const Loading: Story = {
  args: {
    loading: true,
    label: 'Loading...'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled'
  }
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
      <ds-button variant="primary">Primary</ds-button>
      <ds-button variant="secondary">Secondary</ds-button>
      <ds-button variant="outline">Outline</ds-button>
      <ds-button variant="ghost">Ghost</ds-button>
      <ds-button variant="destructive">Destructive</ds-button>
    </div>
  `
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <ds-button size="sm">Small</ds-button>
      <ds-button size="md">Medium</ds-button>
      <ds-button size="lg">Large</ds-button>
    </div>
  `
};

