import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../styles/shared.js';

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * A card component for grouping content
 *
 * @slot - The card content
 * @slot header - Card header content
 * @slot footer - Card footer content
 *
 * @csspart card - The card container
 * @csspart header - The header section
 * @csspart content - The content section
 * @csspart footer - The footer section
 */
@customElement('ds-card')
export class DsCard extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .card {
        display: flex;
        flex-direction: column;
        border-radius: var(--ds-borderRadius-lg, 12px);
        overflow: hidden;
        background: var(--ds-color-semantic-surface, white);
        font-family: var(--ds-typography-fontFamily-sans, Inter, sans-serif);
        transition: all var(--ds-transition-normal, 200ms ease);
      }

      /* Variants */
      .card.elevated {
        box-shadow: var(
          --ds-shadow-md,
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -2px rgba(0, 0, 0, 0.1)
        );
      }

      .card.elevated:hover {
        box-shadow: var(
          --ds-shadow-lg,
          0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -4px rgba(0, 0, 0, 0.1)
        );
      }

      .card.outlined {
        border: 1px solid var(--ds-color-semantic-border, #e4e4e7);
      }

      .card.filled {
        background: var(--ds-color-neutral-50, #fafafa);
      }

      /* Interactive */
      .card.interactive {
        cursor: pointer;
      }

      .card.interactive:hover {
        transform: translateY(-2px);
      }

      .card.interactive:active {
        transform: translateY(0);
      }

      /* Padding */
      .content.none {
        padding: 0;
      }

      .content.sm {
        padding: var(--ds-spacing-3, 12px);
      }

      .content.md {
        padding: var(--ds-spacing-4, 16px);
      }

      .content.lg {
        padding: var(--ds-spacing-6, 24px);
      }

      /* Header */
      .header {
        padding: var(--ds-spacing-4, 16px);
        border-bottom: 1px solid var(--ds-color-semantic-border, #e4e4e7);
      }

      .header:empty {
        display: none;
      }

      /* Footer */
      .footer {
        padding: var(--ds-spacing-4, 16px);
        border-top: 1px solid var(--ds-color-semantic-border, #e4e4e7);
        background: var(--ds-color-neutral-50, #fafafa);
      }

      .footer:empty {
        display: none;
      }

      /* Focus styles for interactive cards */
      .card.interactive:focus-visible {
        outline: 2px solid var(--ds-color-primary-500, #3b82f6);
        outline-offset: 2px;
      }
    `
  ];

  /**
   * The card variant
   */
  @property({ type: String, reflect: true })
  variant: CardVariant = 'elevated';

  /**
   * The card padding
   */
  @property({ type: String, reflect: true })
  padding: CardPadding = 'md';

  /**
   * Whether the card is interactive (clickable)
   */
  @property({ type: Boolean, reflect: true })
  interactive = false;

  override render() {
    const cardClasses = {
      card: true,
      [this.variant]: true,
      interactive: this.interactive
    };

    const contentClasses = {
      content: true,
      [this.padding]: true
    };

    return html`
      <div
        part="card"
        class=${classMap(cardClasses)}
        tabindex=${this.interactive ? '0' : '-1'}
        role=${this.interactive ? 'button' : 'article'}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <div part="header" class="header">
          <slot name="header"></slot>
        </div>
        <div part="content" class=${classMap(contentClasses)}>
          <slot></slot>
        </div>
        <div part="footer" class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  private _handleClick() {
    if (this.interactive) {
      this.dispatchEvent(
        new CustomEvent('ds-click', {
          bubbles: true,
          composed: true
        })
      );
    }
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      this._handleClick();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-card': DsCard;
  }
}

