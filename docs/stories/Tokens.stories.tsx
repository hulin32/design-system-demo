import type { Meta, StoryObj } from '@storybook/react';
import { colors, spacing, typography, borderRadius, shadows } from '@ds/react';

const meta: Meta = {
  title: 'Design Tokens',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
  <div style={{ textAlign: 'center' }}>
    <div
      style={{
        width: 60,
        height: 60,
        background: color,
        borderRadius: 8,
        border: '1px solid #e4e4e7'
      }}
    />
    <span style={{ fontSize: 12 }}>{name}</span>
  </div>
);

const ColorScale = ({ name, scale }: { name: string; scale: Record<string, string> }) => (
  <div style={{ marginBottom: 24 }}>
    <h3>{name}</h3>
    <div style={{ display: 'flex', gap: 8 }}>
      {Object.entries(scale).map(([shade, color]) => (
        <ColorSwatch key={shade} color={color} name={shade} />
      ))}
    </div>
  </div>
);

export const Colors: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: 24 }}>Color Tokens</h2>
      <ColorScale name="Primary" scale={colors.primary} />
      <ColorScale name="Secondary" scale={colors.secondary} />
      <ColorScale name="Neutral" scale={colors.neutral} />
      
      <h3>Semantic</h3>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <ColorSwatch color={colors.success['500']} name="Success" />
        <ColorSwatch color={colors.warning['500']} name="Warning" />
        <ColorSwatch color={colors.error['500']} name="Error" />
      </div>
    </div>
  )
};

export const Spacing: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: 24 }}>Spacing Tokens</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {Object.entries(spacing).map(([name, value]) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <code style={{ width: 120 }}>spacing['{name}']</code>
            <div
              style={{
                width: parseInt(value),
                height: 24,
                background: colors.primary['500'],
                borderRadius: 4
              }}
            />
            <span style={{ color: '#71717a' }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
};

export const Typography: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: 24 }}>Typography Tokens</h2>

      <h3>Font Sizes</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
        {Object.entries(typography.fontSize).map(([name, value]) => (
          <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <code style={{ width: 180 }}>fontSize.{name}</code>
            <span style={{ fontSize: value }}>
              The quick brown fox ({value})
            </span>
          </div>
        ))}
      </div>

      <h3>Font Weights</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {Object.entries(typography.fontWeight).map(([name, value]) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <code style={{ width: 180 }}>fontWeight.{name}</code>
            <span style={{ fontWeight: value }}>
              The quick brown fox ({value})
            </span>
          </div>
        ))}
      </div>
    </div>
  )
};

export const BorderRadius: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: 24 }}>Border Radius Tokens</h2>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {Object.entries(borderRadius).map(([name, value]) => (
          <div key={name} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 80,
                height: 80,
                background: colors.primary['500'],
                borderRadius: value
              }}
            />
            <div style={{ marginTop: 8 }}>
              <code style={{ fontSize: 12 }}>{name}</code>
              <div style={{ fontSize: 11, color: '#71717a' }}>{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export const Shadows: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: 24 }}>Shadow Tokens</h2>
      <div style={{ display: 'flex', gap: 32 }}>
        {Object.entries(shadows).map(([name, value]) => (
          <div key={name} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 100,
                height: 100,
                background: 'white',
                borderRadius: 8,
                boxShadow: value
              }}
            />
            <code style={{ marginTop: 8, display: 'block', fontSize: 12 }}>{name}</code>
          </div>
        ))}
      </div>
    </div>
  )
};

