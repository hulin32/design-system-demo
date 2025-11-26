import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@ds/react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'The input type'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input'
    },
    label: {
      control: 'text',
      description: 'Label text for the input'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    helper: {
      control: 'text',
      description: 'Helper text displayed below the input'
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the input'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled'
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required'
    }
  },
  args: {
    type: 'text',
    size: 'md',
    label: 'Label',
    placeholder: 'Enter text...',
    disabled: false,
    required: false
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email'
  }
};

export const WithHelper: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helper: "We'll never share your email with anyone"
  }
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address'
  }
};

export const Required: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    required: true
  }
};

export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    disabled: true
  }
};

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password'
  }
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  )
};

