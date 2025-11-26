import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@ds/web-components';

const meta: Meta = {
  title: 'Components/Input',
  tags: ['autodocs'],
  render: (args) => html`
    <ds-input
      .value=${args.value}
      type=${args.type}
      placeholder=${args.placeholder}
      label=${args.label}
      helper=${args.helper}
      error=${args.error}
      size=${args.size}
      ?disabled=${args.disabled}
      ?required=${args.required}
      ?readonly=${args.readonly}
    ></ds-input>
  `,
  argTypes: {
    value: {
      control: 'text',
      description: 'The input value'
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'The input type'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    label: {
      control: 'text',
      description: 'Label text'
    },
    helper: {
      control: 'text',
      description: 'Helper text displayed below the input'
    },
    error: {
      control: 'text',
      description: 'Error message'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled'
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required'
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the input is read-only'
    }
  },
  args: {
    value: '',
    type: 'text',
    placeholder: 'Enter text...',
    label: '',
    helper: '',
    error: '',
    size: 'md',
    disabled: false,
    required: false,
    readonly: false
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text...'
  }
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email'
  }
};

export const WithHelper: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helper: 'Must be at least 8 characters'
  }
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'invalid-email',
    error: 'Please enter a valid email address'
  }
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
    required: true
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this',
    disabled: true
  }
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <ds-input size="sm" label="Small" placeholder="Small input"></ds-input>
      <ds-input size="md" label="Medium" placeholder="Medium input"></ds-input>
      <ds-input size="lg" label="Large" placeholder="Large input"></ds-input>
    </div>
  `
};

export const FormExample: Story = {
  render: () => html`
    <form style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <ds-input label="First Name" placeholder="John" required></ds-input>
      <ds-input label="Last Name" placeholder="Doe" required></ds-input>
      <ds-input label="Email" type="email" placeholder="john@example.com" required></ds-input>
      <ds-input
        label="Password"
        type="password"
        placeholder="••••••••"
        helper="Minimum 8 characters"
        required
      ></ds-input>
      <ds-button type="submit" variant="primary">Submit</ds-button>
    </form>
  `
};

