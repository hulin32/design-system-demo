import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { baseStyles } from '../styles/shared.js';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

/**
 * A customizable input component
 *
 * @slot prefix - Content to render before the input
 * @slot suffix - Content to render after the input
 *
 * @csspart input - The input element
 * @csspart label - The label element
 * @csspart helper - The helper text element
 *
 * @fires ds-input - Fired when the input value changes
 * @fires ds-change - Fired when the input loses focus after value change
 */
@customElement('ds-input')
export class DsInput extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .input-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--ds-spacing-1, 4px);
      }

      label {
        font-family: var(--ds-typography-fontFamily-sans, Inter, sans-serif);
        font-size: var(--ds-typography-fontSize-sm, 14px);
        font-weight: var(--ds-typography-fontWeight-medium, 500);
        color: var(--ds-color-neutral-700, #3f3f46);
      }

      .input-container {
        display: flex;
        align-items: center;
        gap: var(--ds-spacing-2, 8px);
        background: var(--ds-color-semantic-surface, white);
        border: 1px solid var(--ds-color-semantic-border, #e4e4e7);
        border-radius: var(--ds-borderRadius-md, 8px);
        transition: all var(--ds-transition-fast, 150ms ease);
      }

      .input-container:focus-within {
        border-color: var(--ds-color-primary-500, #3b82f6);
        box-shadow: 0 0 0 3px var(--ds-color-primary-100, #dbeafe);
      }

      .input-container.error {
        border-color: var(--ds-color-error-500, #ef4444);
      }

      .input-container.error:focus-within {
        box-shadow: 0 0 0 3px var(--ds-color-error-50, #fef2f2);
      }

      .input-container.disabled {
        background: var(--ds-color-neutral-100, #f4f4f5);
        cursor: not-allowed;
      }

      input {
        flex: 1;
        border: none;
        background: transparent;
        font-family: var(--ds-typography-fontFamily-sans, Inter, sans-serif);
        color: var(--ds-color-semantic-text, #18181b);
        outline: none;
        width: 100%;
      }

      input::placeholder {
        color: var(--ds-color-semantic-textMuted, #71717a);
      }

      input:disabled {
        cursor: not-allowed;
        color: var(--ds-color-neutral-400, #a1a1aa);
      }

      /* Sizes */
      .input-container.sm {
        padding: var(--ds-spacing-1, 4px) var(--ds-spacing-2, 8px);
      }

      .input-container.sm input {
        font-size: var(--ds-typography-fontSize-sm, 14px);
      }

      .input-container.md {
        padding: var(--ds-spacing-2, 8px) var(--ds-spacing-3, 12px);
      }

      .input-container.md input {
        font-size: var(--ds-typography-fontSize-base, 16px);
      }

      .input-container.lg {
        padding: var(--ds-spacing-3, 12px) var(--ds-spacing-4, 16px);
      }

      .input-container.lg input {
        font-size: var(--ds-typography-fontSize-lg, 18px);
      }

      .helper-text {
        font-family: var(--ds-typography-fontFamily-sans, Inter, sans-serif);
        font-size: var(--ds-typography-fontSize-xs, 12px);
        color: var(--ds-color-semantic-textMuted, #71717a);
      }

      .helper-text.error {
        color: var(--ds-color-error-500, #ef4444);
      }

      .required-indicator {
        color: var(--ds-color-error-500, #ef4444);
        margin-left: var(--ds-spacing-1, 4px);
      }

      ::slotted([slot='prefix']),
      ::slotted([slot='suffix']) {
        display: flex;
        align-items: center;
        color: var(--ds-color-neutral-500, #71717a);
      }
    `
  ];

  /**
   * The input value
   */
  @property({ type: String })
  value = '';

  /**
   * The input type
   */
  @property({ type: String })
  type: InputType = 'text';

  /**
   * The input placeholder
   */
  @property({ type: String })
  placeholder = '';

  /**
   * The input label
   */
  @property({ type: String })
  label = '';

  /**
   * Helper text to display below the input
   */
  @property({ type: String })
  helper = '';

  /**
   * Error message to display
   */
  @property({ type: String })
  error = '';

  /**
   * The input size
   */
  @property({ type: String, reflect: true })
  size: InputSize = 'md';

  /**
   * Whether the input is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the input is required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether the input is readonly
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * The input name (for form submission)
   */
  @property({ type: String })
  name = '';

  /**
   * Autocomplete attribute
   */
  @property({ type: String })
  autocomplete = '';

  /**
   * Pattern for validation
   */
  @property({ type: String })
  pattern?: string;

  /**
   * Minimum length
   */
  @property({ type: Number })
  minlength?: number;

  /**
   * Maximum length
   */
  @property({ type: Number })
  maxlength?: number;

  @query('input')
  private _input!: HTMLInputElement;

  override render() {
    const containerClasses = {
      'input-container': true,
      [this.size]: true,
      error: !!this.error,
      disabled: this.disabled
    };

    return html`
      <div class="input-wrapper">
        ${this.label
          ? html`
              <label part="label">
                ${this.label}
                ${this.required
                  ? html`<span class="required-indicator" aria-hidden="true">*</span>`
                  : ''}
              </label>
            `
          : ''}

        <div class=${classMap(containerClasses)}>
          <slot name="prefix"></slot>
          <input
            part="input"
            type=${this.type}
            .value=${live(this.value)}
            placeholder=${ifDefined(this.placeholder || undefined)}
            ?disabled=${this.disabled}
            ?required=${this.required}
            ?readonly=${this.readonly}
            name=${ifDefined(this.name || undefined)}
            autocomplete=${ifDefined(this.autocomplete || undefined)}
            pattern=${ifDefined(this.pattern)}
            minlength=${ifDefined(this.minlength)}
            maxlength=${ifDefined(this.maxlength)}
            aria-invalid=${this.error ? 'true' : 'false'}
            @input=${this._handleInput}
            @change=${this._handleChange}
          />
          <slot name="suffix"></slot>
        </div>

        ${this.error || this.helper
          ? html`
              <span part="helper" class="helper-text ${this.error ? 'error' : ''}">
                ${this.error || this.helper}
              </span>
            `
          : ''}
      </div>
    `;
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent('ds-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    );
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent('ds-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Focus the input
   */
  override focus() {
    this._input?.focus();
  }

  /**
   * Blur the input
   */
  override blur() {
    this._input?.blur();
  }

  /**
   * Select all text in the input
   */
  select() {
    this._input?.select();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-input': DsInput;
  }
}

