<script setup lang="ts">
import { computed, type Component } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const cardVariants = cva(
  ['rounded-lg overflow-hidden transition-all duration-150'],
  {
    variants: {
      variant: {
        elevated: 'bg-white shadow-md hover:shadow-lg',
        outlined: 'bg-white border border-neutral-200',
        filled: 'bg-neutral-100',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
      interactive: {
        true: 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'elevated',
      padding: 'md',
      interactive: false,
    },
  }
);

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface Props {
  /** The element or component to render as */
  as?: string | Component;
  /** The card variant */
  variant?: CardVariant;
  /** The card padding */
  padding?: CardPadding;
  /** Whether the card is interactive (clickable) */
  interactive?: boolean;
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  variant: 'elevated',
  padding: 'md',
  interactive: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const slots = defineSlots<{
  default?: () => any;
  header?: () => any;
  footer?: () => any;
}>();

const hasHeaderOrFooter = computed(() => Boolean(slots.header || slots.footer));
const isInteractive = computed(() => props.interactive);

const paddingClass = computed(() => {
  const map: Record<CardPadding, string> = {
    none: '',
    sm: 'px-3',
    md: 'px-4',
    lg: 'px-6',
  };
  return map[props.padding];
});

const cardClasses = computed(() =>
  cn(
    cardVariants({
      variant: props.variant,
      padding: hasHeaderOrFooter.value ? 'none' : props.padding,
      interactive: isInteractive.value,
    }),
    props.class
  )
);

const headerClasses = computed(() =>
  cn(
    'border-b border-neutral-200',
    paddingClass.value,
    props.padding === 'sm' ? 'py-2' : props.padding === 'lg' ? 'py-4' : 'py-3'
  )
);

const bodyClasses = computed(() => {
  if (!hasHeaderOrFooter.value) return '';
  return cn(
    paddingClass.value,
    props.padding === 'sm' ? 'py-3' : props.padding === 'lg' ? 'py-6' : 'py-4'
  );
});

const footerClasses = computed(() =>
  cn(
    'border-t border-neutral-200',
    paddingClass.value,
    props.padding === 'sm' ? 'py-2' : props.padding === 'lg' ? 'py-4' : 'py-3'
  )
);

function handleClick(event: MouseEvent) {
  if (isInteractive.value) {
    emit('click', event);
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (isInteractive.value && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    emit('click', event as unknown as MouseEvent);
  }
}
</script>

<template>
  <component
    :is="as"
    :class="cardClasses"
    :role="isInteractive ? 'button' : undefined"
    :tabindex="isInteractive ? 0 : undefined"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <div v-if="$slots.header" :class="headerClasses">
      <slot name="header" />
    </div>

    <div :class="bodyClasses">
      <slot />
    </div>

    <div v-if="$slots.footer" :class="footerClasses">
      <slot name="footer" />
    </div>
  </component>
</template>

