<script setup lang="ts">
import { computed } from 'vue';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-md cursor-pointer',
    'transition-all duration-150',
    'border-2 border-transparent',
    'whitespace-nowrap',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-500 text-white',
          'hover:bg-primary-600',
          'active:bg-primary-700',
        ],
        secondary: [
          'bg-secondary-500 text-white',
          'hover:bg-secondary-600',
          'active:bg-secondary-700',
        ],
        outline: [
          'bg-transparent border-primary-500 text-primary-500',
          'hover:bg-primary-50',
          'active:bg-primary-100',
        ],
        ghost: [
          'bg-transparent text-neutral-700',
          'hover:bg-neutral-100',
          'active:bg-neutral-200',
        ],
        destructive: [
          'bg-error-500 text-white',
          'hover:bg-error-700',
        ],
      },
      size: {
        sm: 'px-3 py-1 text-sm min-h-[32px]',
        md: 'px-4 py-2 text-base min-h-[40px]',
        lg: 'px-6 py-3 text-lg min-h-[48px]',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface Props {
  /** The button variant */
  variant?: ButtonVariant;
  /** The button size */
  size?: ButtonSize;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Whether the button should take full width */
  fullWidth?: boolean;
  /** The button type */
  type?: 'button' | 'submit' | 'reset';
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
  type: 'button',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const isDisabled = computed(() => props.disabled || props.loading);

const classes = computed(() =>
  cn(
    buttonVariants({
      variant: props.variant,
      size: props.size,
      fullWidth: props.fullWidth,
    }),
    props.class
  )
);

function handleClick(event: MouseEvent) {
  if (!isDisabled.value) {
    emit('click', event);
  }
}
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="isDisabled"
    :aria-disabled="isDisabled"
    :aria-busy="loading"
    @click="handleClick"
  >
    <span
      v-if="loading"
      class="inline-block w-[1em] h-[1em] border-2 border-current border-r-transparent rounded-full animate-spin"
      aria-hidden="true"
    />
    <slot v-else name="start-icon" />
    <slot />
    <slot v-if="!loading" name="end-icon" />
  </button>
</template>

