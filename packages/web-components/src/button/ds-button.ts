import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles, disabledStyles } from '../styles/shared.js';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * A customizable button component
 *
 * @slot - The button content
 * @slot prefix - Content to render before the main content
 * @slot suffix - Content to render after the main content
 *
 * @csspart button - The button element
 *
 * @fires click - Fired when the button is clicked
 */
@customElement('ds-button')
export class DsButton extends LitElement {
  static override styles = [
    baseStyles,
    disabledStyles,
    css`
      :host {
        display: inline-block;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--ds-spacing-2, 8px);
        font-family: var(--ds-typography-fontFamily-sans, Inter, sans-serif);
        font-weight: var(--ds-typography-fontWeight-medium, 500);
        border-radius: var(--ds-borderRadius-md, 8px);
        cursor: pointer;
        transition: all var(--ds-transition-fast, 150ms ease);
        border: 2px solid transparent;
        text-decoration: none;
        white-space: nowrap;
        width: 100%;
      }

      /* Sizes */
      button.sm {
        padding: var(--ds-spacing-1, 4px) var(--ds-spacing-3, 12px);
        font-size: var(--ds-typography-fontSize-sm, 14px);
        min-height: 32px;
      }

      button.md {
        padding: var(--ds-spacing-2, 8px) var(--ds-spacing-4, 16px);
        font-size: var(--ds-typography-fontSize-base, 16px);
        min-height: 40px;
      }

      button.lg {
        padding: var(--ds-spacing-3, 12px) var(--ds-spacing-6, 24px);
        font-size: var(--ds-typography-fontSize-lg, 18px);
        min-height: 48px;
      }

      /* Primary variant */
      button.primary {
        background: var(--ds-color-primary-500, #3b82f6);
        color: white;
      }

      button.primary:hover:not(:disabled) {
        background: var(--ds-color-primary-600, #2563eb);
      }

      button.primary:active:not(:disabled) {
        background: var(--ds-color-primary-700, #1d4ed8);
      }

      /* Secondary variant */
      button.secondary {
        background: var(--ds-color-secondary-500, #a855f7);
        color: white;
      }

      button.secondary:hover:not(:disabled) {
        background: var(--ds-color-secondary-600, #9333ea);
      }

      button.secondary:active:not(:disabled) {
        background: var(--ds-color-secondary-700, #7e22ce);
      }

      /* Outline variant */
      button.outline {
        background: transparent;
        border-color: var(--ds-color-primary-500, #3b82f6);
        color: var(--ds-color-primary-500, #3b82f6);
      }

      button.outline:hover:not(:disabled) {
        background: var(--ds-color-primary-50, #eff6ff);
      }

      button.outline:active:not(:disabled) {
        background: var(--ds-color-primary-100, #dbeafe);
      }

      /* Ghost variant */
      button.ghost {
        background: transparent;
        color: var(--ds-color-neutral-700, #3f3f46);
      }

      button.ghost:hover:not(:disabled) {
        background: var(--ds-color-neutral-100, #f4f4f5);
      }

      button.ghost:active:not(:disabled) {
        background: var(--ds-color-neutral-200, #e4e4e7);
      }

      /* Destructive variant */
      button.destructive {
        background: var(--ds-color-error-500, #ef4444);
        color: white;
      }

      button.destructive:hover:not(:disabled) {
        background: var(--ds-color-error-700, #b91c1c);
      }

      /* Focus styles */
      button:focus-visible {
        outline: 2px solid var(--ds-color-primary-500, #3b82f6);
        outline-offset: 2px;
      }

      /* Disabled styles */
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Full width */
      :host([fullwidth]) {
        display: block;
      }

      /* Loading state */
      .loading-spinner {
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spin 0.75s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `
  ];

  /**
   * The button variant
   */
  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'primary';

  /**
   * The button size
   */
  @property({ type: String, reflect: true })
  size: ButtonSize = 'md';

  /**
   * Whether the button is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the button is in a loading state
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * The button type (for form submission)
   */
  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  override render() {
    const classes = {
      [this.variant]: true,
      [this.size]: true
    };

    return html`
      <button
        part="button"
        class=${classMap(classes)}
        ?disabled=${this.disabled || this.loading}
        type=${this.type}
        @click=${this._handleClick}
      >
        ${this.loading
          ? html`<span class="loading-spinner" aria-hidden="true"></span>`
          : html`<slot name="prefix"></slot>`}
        <slot></slot>
        <slot name="suffix"></slot>
      </button>
    `;
  }

  private _handleClick(e: MouseEvent) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-button': DsButton;
  }
}

