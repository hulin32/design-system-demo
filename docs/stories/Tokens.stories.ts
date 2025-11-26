import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Design Tokens',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Colors: Story = {
  render: () => html`
    <div>
      <h2 style="margin-bottom: 24px;">Color Tokens</h2>

      <h3>Primary</h3>
      <div style="display: flex; gap: 8px; margin-bottom: 24px;">
        ${[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
          (shade) => html`
            <div style="text-align: center;">
              <div
                style="
                width: 60px;
                height: 60px;
                background: var(--ds-color-primary-${shade});
                border-radius: 8px;
                border: 1px solid #e4e4e7;
              "
              ></div>
              <span style="font-size: 12px;">${shade}</span>
            </div>
          `
        )}
      </div>

      <h3>Secondary</h3>
      <div style="display: flex; gap: 8px; margin-bottom: 24px;">
        ${[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
          (shade) => html`
            <div style="text-align: center;">
              <div
                style="
                width: 60px;
                height: 60px;
                background: var(--ds-color-secondary-${shade});
                border-radius: 8px;
                border: 1px solid #e4e4e7;
              "
              ></div>
              <span style="font-size: 12px;">${shade}</span>
            </div>
          `
        )}
      </div>

      <h3>Neutral</h3>
      <div style="display: flex; gap: 8px; margin-bottom: 24px;">
        ${[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
          (shade) => html`
            <div style="text-align: center;">
              <div
                style="
                width: 60px;
                height: 60px;
                background: var(--ds-color-neutral-${shade});
                border-radius: 8px;
                border: 1px solid #e4e4e7;
              "
              ></div>
              <span style="font-size: 12px;">${shade}</span>
            </div>
          `
        )}
      </div>

      <h3>Semantic</h3>
      <div style="display: flex; gap: 16px; margin-bottom: 24px;">
        ${[
          { name: 'Success', color: 'var(--ds-color-success-500)' },
          { name: 'Warning', color: 'var(--ds-color-warning-500)' },
          { name: 'Error', color: 'var(--ds-color-error-500)' }
        ].map(
          ({ name, color }) => html`
            <div style="text-align: center;">
              <div
                style="
                width: 80px;
                height: 60px;
                background: ${color};
                border-radius: 8px;
              "
              ></div>
              <span style="font-size: 12px;">${name}</span>
            </div>
          `
        )}
      </div>
    </div>
  `
};

export const Spacing: Story = {
  render: () => html`
    <div>
      <h2 style="margin-bottom: 24px;">Spacing Tokens</h2>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${[
          { name: '0', value: '0px' },
          { name: '1', value: '4px' },
          { name: '2', value: '8px' },
          { name: '3', value: '12px' },
          { name: '4', value: '16px' },
          { name: '5', value: '20px' },
          { name: '6', value: '24px' },
          { name: '8', value: '32px' },
          { name: '10', value: '40px' },
          { name: '12', value: '48px' }
        ].map(
          ({ name, value }) => html`
            <div style="display: flex; align-items: center; gap: 16px;">
              <code style="width: 100px;">--ds-spacing-${name}</code>
              <div
                style="
                width: var(--ds-spacing-${name});
                height: 24px;
                background: var(--ds-color-primary-500);
                border-radius: 4px;
              "
              ></div>
              <span style="color: #71717a;">${value}</span>
            </div>
          `
        )}
      </div>
    </div>
  `
};

export const Typography: Story = {
  render: () => html`
    <div>
      <h2 style="margin-bottom: 24px;">Typography Tokens</h2>

      <h3>Font Sizes</h3>
      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px;">
        ${[
          { name: 'xs', value: '12px' },
          { name: 'sm', value: '14px' },
          { name: 'base', value: '16px' },
          { name: 'lg', value: '18px' },
          { name: 'xl', value: '20px' },
          { name: '2xl', value: '24px' },
          { name: '3xl', value: '30px' },
          { name: '4xl', value: '36px' }
        ].map(
          ({ name, value }) => html`
            <div style="display: flex; align-items: baseline; gap: 16px;">
              <code style="width: 180px;">--ds-typography-fontSize-${name}</code>
              <span style="font-size: var(--ds-typography-fontSize-${name});">
                The quick brown fox (${value})
              </span>
            </div>
          `
        )}
      </div>

      <h3>Font Weights</h3>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${[
          { name: 'normal', value: '400' },
          { name: 'medium', value: '500' },
          { name: 'semibold', value: '600' },
          { name: 'bold', value: '700' }
        ].map(
          ({ name, value }) => html`
            <div style="display: flex; align-items: center; gap: 16px;">
              <code style="width: 220px;">--ds-typography-fontWeight-${name}</code>
              <span style="font-weight: var(--ds-typography-fontWeight-${name});">
                The quick brown fox (${value})
              </span>
            </div>
          `
        )}
      </div>
    </div>
  `
};

export const BorderRadius: Story = {
  render: () => html`
    <div>
      <h2 style="margin-bottom: 24px;">Border Radius Tokens</h2>
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        ${[
          { name: 'none', value: '0px' },
          { name: 'sm', value: '4px' },
          { name: 'md', value: '8px' },
          { name: 'lg', value: '12px' },
          { name: 'xl', value: '16px' },
          { name: '2xl', value: '24px' },
          { name: 'full', value: '9999px' }
        ].map(
          ({ name, value }) => html`
            <div style="text-align: center;">
              <div
                style="
                width: 80px;
                height: 80px;
                background: var(--ds-color-primary-500);
                border-radius: var(--ds-borderRadius-${name});
              "
              ></div>
              <div style="margin-top: 8px;">
                <code style="font-size: 12px;">${name}</code>
                <div style="font-size: 11px; color: #71717a;">${value}</div>
              </div>
            </div>
          `
        )}
      </div>
    </div>
  `
};

export const Shadows: Story = {
  render: () => html`
    <div>
      <h2 style="margin-bottom: 24px;">Shadow Tokens</h2>
      <div style="display: flex; gap: 32px;">
        ${['sm', 'md', 'lg', 'xl'].map(
          (name) => html`
            <div style="text-align: center;">
              <div
                style="
                width: 100px;
                height: 100px;
                background: white;
                border-radius: 8px;
                box-shadow: var(--ds-shadow-${name});
              "
              ></div>
              <code style="margin-top: 8px; display: block; font-size: 12px;">${name}</code>
            </div>
          `
        )}
      </div>
    </div>
  `
};

