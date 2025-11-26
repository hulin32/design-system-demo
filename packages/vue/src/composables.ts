import { ref, onMounted, onUnmounted, type Ref } from 'vue';

/**
 * Composable for listening to ds-input events
 *
 * @example
 * ```vue
 * <script setup>
 * import { useDsInput } from '@ds/vue';
 *
 * const { value, inputRef } = useDsInput('');
 * </script>
 *
 * <template>
 *   <ds-input ref="inputRef" :value="value" />
 * </template>
 * ```
 */
export function useDsInput(initialValue = '') {
  const value = ref(initialValue);
  const inputRef = ref<HTMLElement | null>(null);

  const handleInput = (e: CustomEvent<{ value: string }>) => {
    value.value = e.detail.value;
  };

  const handleChange = (e: CustomEvent<{ value: string }>) => {
    value.value = e.detail.value;
  };

  onMounted(() => {
    if (inputRef.value) {
      inputRef.value.addEventListener('ds-input', handleInput as EventListener);
      inputRef.value.addEventListener('ds-change', handleChange as EventListener);
    }
  });

  onUnmounted(() => {
    if (inputRef.value) {
      inputRef.value.removeEventListener('ds-input', handleInput as EventListener);
      inputRef.value.removeEventListener('ds-change', handleChange as EventListener);
    }
  });

  return {
    value,
    inputRef
  };
}

/**
 * Composable for the ds-button loading state
 *
 * @example
 * ```vue
 * <script setup>
 * import { useDsButtonLoading } from '@ds/vue';
 *
 * const { loading, withLoading } = useDsButtonLoading();
 *
 * const handleClick = withLoading(async () => {
 *   await someAsyncOperation();
 * });
 * </script>
 *
 * <template>
 *   <ds-button :loading="loading" @click="handleClick">Submit</ds-button>
 * </template>
 * ```
 */
export function useDsButtonLoading() {
  const loading = ref(false);

  const withLoading = <T>(fn: () => Promise<T>) => {
    return async () => {
      loading.value = true;
      try {
        return await fn();
      } finally {
        loading.value = false;
      }
    };
  };

  return {
    loading,
    withLoading
  };
}

