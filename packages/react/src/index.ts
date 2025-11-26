import { createComponent, type EventName } from '@lit/react';
import React from 'react';

// Import web components
import {
  DsButton as DsButtonElement,
  DsInput as DsInputElement,
  DsCard as DsCardElement,
  type ButtonVariant,
  type ButtonSize,
  type InputSize,
  type InputType,
  type CardVariant,
  type CardPadding
} from '@ds/web-components';

// Re-export types
export type { ButtonVariant, ButtonSize, InputSize, InputType, CardVariant, CardPadding };

/**
 * React wrapper for ds-button web component
 */
export const DsButton = createComponent({
  tagName: 'ds-button',
  elementClass: DsButtonElement,
  react: React,
  events: {
    onClick: 'click' as EventName<MouseEvent>
  }
});

/**
 * React wrapper for ds-input web component
 */
export const DsInput = createComponent({
  tagName: 'ds-input',
  elementClass: DsInputElement,
  react: React,
  events: {
    onDsInput: 'ds-input' as EventName<CustomEvent<{ value: string }>>,
    onDsChange: 'ds-change' as EventName<CustomEvent<{ value: string }>>
  }
});

/**
 * React wrapper for ds-card web component
 */
export const DsCard = createComponent({
  tagName: 'ds-card',
  elementClass: DsCardElement,
  react: React,
  events: {
    onDsClick: 'ds-click' as EventName<CustomEvent>
  }
});

// Type definitions for the wrapped components
export type DsButtonProps = React.ComponentProps<typeof DsButton>;
export type DsInputProps = React.ComponentProps<typeof DsInput>;
export type DsCardProps = React.ComponentProps<typeof DsCard>;

