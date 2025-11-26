<script setup lang="ts">
import { computed, useId } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputVariants = cva(
  [
    'w-full rounded-md border bg-white',
    'font-normal text-neutral-900',
    'placeholder:text-neutral-400',
    'transition-all duration-150',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-100',
  ],
  {
    variants: {
      size: {
        sm: 'px-3 py-1.5 text-sm min-h-[32px]',
        md: 'px-4 py-2 text-base min-h-[40px]',
        lg: 'px-4 py-3 text-lg min-h-[48px]',
      },
      hasError: {
        true: 'border-error-500 focus:ring-error-500 focus:border-error-500',
        false: 'border-neutral-200',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
    },
  }
);

const labelVariants = cva('block font-medium text-neutral-700 mb-1.5', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type InputSize = 'sm' | 'md' | 'lg';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

interface Props {
  /** v-model binding */
  modelValue?: string;
  /** The input type */
  type?: InputType;
  /** The input size */
  size?: InputSize;
  /** Label text for the input */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text displayed below the input */
  helper?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Whether the input is readonly */
  readonly?: boolean;
  /** Input name attribute */
  name?: string;
  /** Custom id */
  id?: string;
  /** Additional CSS classes */
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  size: 'md',
  disabled: false,
  required: false,
  readonly: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  input: [event: Event];
  change: [event: Event];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const generatedId = useId();
const inputId = computed(() => props.id || generatedId);
const helperId = computed(() => `${inputId.value}-helper`);
const errorId = computed(() => `${inputId.value}-error`);
const hasError = computed(() => Boolean(props.error));

const describedBy = computed(() => {
  const ids: string[] = [];
  if (props.helper && !hasError.value) ids.push(helperId.value);
  if (hasError.value) ids.push(errorId.value);
  return ids.length > 0 ? ids.join(' ') : undefined;
});

const inputClasses = computed(() =>
  cn(
    inputVariants({ size: props.size, hasError: hasError.value }),
    props.class
  )
);

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
  emit('input', event);
}

function handleChange(event: Event) {
  emit('change', event);
}

function handleFocus(event: FocusEvent) {
  emit('focus', event);
}

function handleBlur(event: FocusEvent) {
  emit('blur', event);
}
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      :class="labelVariants({ size })"
    >
      {{ label }}
      <span v-if="required" class="text-error-500 ml-0.5" aria-hidden="true">*</span>
    </label>

    <div class="relative">
      <slot name="start-adornment">
        <div
          v-if="$slots['start-adornment']"
          class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
        >
          <slot name="start-adornment" />
        </div>
      </slot>

      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :readonly="readonly"
        :name="name"
        :aria-invalid="hasError"
        :aria-describedby="describedBy"
        :class="inputClasses"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <div
        v-if="$slots['end-adornment']"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
      >
        <slot name="end-adornment" />
      </div>
    </div>

    <p
      v-if="helper && !hasError"
      :id="helperId"
      class="mt-1.5 text-sm text-neutral-500"
    >
      {{ helper }}
    </p>

    <p
      v-if="hasError"
      :id="errorId"
      class="mt-1.5 text-sm text-error-500"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>

