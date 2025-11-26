import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, Button } from '@ds/react';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['elevated', 'outlined', 'filled'],
      description: 'The visual style variant of the card'
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      description: 'The padding size of the card'
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the card is interactive (clickable)'
    }
  },
  args: {
    variant: 'elevated',
    padding: 'md',
    interactive: false
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600 }}>Card Title</h3>
        <p style={{ margin: 0, color: '#71717a' }}>This is an elevated card with a shadow.</p>
      </div>
    )
  }
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600 }}>Card Title</h3>
        <p style={{ margin: 0, color: '#71717a' }}>This is an outlined card with a border.</p>
      </div>
    )
  }
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600 }}>Card Title</h3>
        <p style={{ margin: 0, color: '#71717a' }}>This is a filled card with a background.</p>
      </div>
    )
  }
};

export const Interactive: Story = {
  args: {
    variant: 'elevated',
    interactive: true,
    onClick: () => alert('Card clicked!'),
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600 }}>Interactive Card</h3>
        <p style={{ margin: 0, color: '#71717a' }}>Click me! I have hover and click effects.</p>
      </div>
    )
  }
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card
      variant="outlined"
      header={<h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Card Header</h3>}
      footer={
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="ghost" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Save</Button>
        </div>
      }
    >
      <p style={{ margin: 0, color: '#71717a' }}>
        This card has a header and footer section with proper borders.
      </p>
    </Card>
  )
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Card variant="elevated" style={{ width: '200px' }}>
        <h4 style={{ margin: '0 0 4px 0' }}>Elevated</h4>
        <p style={{ margin: 0, fontSize: '14px', color: '#71717a' }}>With shadow</p>
      </Card>
      <Card variant="outlined" style={{ width: '200px' }}>
        <h4 style={{ margin: '0 0 4px 0' }}>Outlined</h4>
        <p style={{ margin: 0, fontSize: '14px', color: '#71717a' }}>With border</p>
      </Card>
      <Card variant="filled" style={{ width: '200px' }}>
        <h4 style={{ margin: '0 0 4px 0' }}>Filled</h4>
        <p style={{ margin: 0, fontSize: '14px', color: '#71717a' }}>With background</p>
      </Card>
    </div>
  )
};

export const AllPaddings: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'start' }}>
      <Card variant="outlined" padding="none">
        <div style={{ padding: '8px', background: '#f0f0f0' }}>padding: none</div>
      </Card>
      <Card variant="outlined" padding="sm">padding: sm</Card>
      <Card variant="outlined" padding="md">padding: md</Card>
      <Card variant="outlined" padding="lg">padding: lg</Card>
    </div>
  )
};

