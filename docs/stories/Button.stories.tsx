import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@ds/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
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
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width'
    },
    children: {
      control: 'text',
      description: 'The button text'
    }
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    children: 'Button'
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button'
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button'
  }
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete'
  }
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button'
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button'
  }
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled'
  }
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
};

