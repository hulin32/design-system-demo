import { css } from 'lit';

/**
 * Shared base styles for all components
 */
export const baseStyles = css`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  :host([hidden]) {
    display: none !important;
  }
`;

/**
 * Focus ring styles for accessibility
 */
export const focusStyles = css`
  :host(:focus-visible) {
    outline: 2px solid var(--ds-color-primary-500);
    outline-offset: 2px;
  }
`;

/**
 * Disabled state styles
 */
export const disabledStyles = css`
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

