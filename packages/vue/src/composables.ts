import { ref } from 'vue';

/**
 * Composable for handling button loading state
 *
 * @example
 * ```vue
 * <script setup>
 * import { useButtonLoading, Button } from '@ds/vue';
 *
 * const { loading, withLoading } = useButtonLoading();
 *
 * const handleSubmit = withLoading(async () => {
 *   await someAsyncOperation();
 * });
 * </script>
 *
 * <template>
 *   <Button :loading="loading" @click="handleSubmit">Submit</Button>
 * </template>
 * ```
 */
export function useButtonLoading() {
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
