import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@ds/web-components';

const meta: Meta = {
  title: 'Components/Card',
  tags: ['autodocs'],
  render: (args) => html`
    <ds-card variant=${args.variant} padding=${args.padding} ?interactive=${args.interactive}>
      ${args.content}
    </ds-card>
  `,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['elevated', 'outlined', 'filled'],
      description: 'The visual style variant of the card'
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      description: 'The padding inside the card'
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the card is clickable'
    }
  },
  args: {
    variant: 'elevated',
    padding: 'md',
    interactive: false,
    content: 'Card content goes here'
  }
};

export default meta;
type Story = StoryObj;

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    content: html`
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Elevated Card</h3>
      <p style="margin: 0; color: #71717a;">This card has a shadow for depth.</p>
    `
  }
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    content: html`
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Outlined Card</h3>
      <p style="margin: 0; color: #71717a;">This card has a border instead of shadow.</p>
    `
  }
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    content: html`
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Filled Card</h3>
      <p style="margin: 0; color: #71717a;">This card has a subtle background color.</p>
    `
  }
};

export const Interactive: Story = {
  args: {
    variant: 'elevated',
    interactive: true,
    content: html`
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Interactive Card</h3>
      <p style="margin: 0; color: #71717a;">Hover and click on this card!</p>
    `
  }
};

export const WithHeaderAndFooter: Story = {
  render: () => html`
    <ds-card variant="elevated" padding="none" style="max-width: 400px;">
      <div slot="header">
        <h3 style="margin: 0; font-size: 18px; font-weight: 600;">Card Title</h3>
      </div>
      <div style="padding: 16px;">
        <p style="margin: 0; color: #71717a;">
          This card has a header, content, and footer section. Each section is properly
          separated with borders.
        </p>
      </div>
      <div slot="footer" style="display: flex; gap: 8px; justify-content: flex-end;">
        <ds-button variant="ghost" size="sm">Cancel</ds-button>
        <ds-button variant="primary" size="sm">Save</ds-button>
      </div>
    </ds-card>
  `
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      <ds-card variant="elevated">
        <h4 style="margin: 0 0 8px 0;">Elevated</h4>
        <p style="margin: 0; font-size: 14px; color: #71717a;">With shadow</p>
      </ds-card>
      <ds-card variant="outlined">
        <h4 style="margin: 0 0 8px 0;">Outlined</h4>
        <p style="margin: 0; font-size: 14px; color: #71717a;">With border</p>
      </ds-card>
      <ds-card variant="filled">
        <h4 style="margin: 0 0 8px 0;">Filled</h4>
        <p style="margin: 0; font-size: 14px; color: #71717a;">With background</p>
      </ds-card>
    </div>
  `
};

export const ProductCard: Story = {
  render: () => html`
    <ds-card variant="elevated" padding="none" interactive style="max-width: 300px;">
      <img
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
        alt="Product"
        style="width: 100%; height: 200px; object-fit: cover;"
      />
      <div style="padding: 16px;">
        <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Product Name</h3>
        <p style="margin: 0 0 16px 0; font-size: 14px; color: #71717a;">
          A brief description of the product goes here.
        </p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 20px; font-weight: 700; color: #3b82f6;">$99.00</span>
          <ds-button variant="primary" size="sm">Add to Cart</ds-button>
        </div>
      </div>
    </ds-card>
  `
};

