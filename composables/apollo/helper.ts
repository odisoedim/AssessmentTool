import type { GraphQLError } from 'graphql/error'
import { createSignalIfSupported } from '@apollo/client'
import { ref, ssrRef } from '@nuxtjs/composition-api'

export type GraphqlError = Error | ReadonlyArray<GraphQLError> | null

export function useAbortController() {
  const controller = ref<AbortController | boolean>()
  const signal = ref<AbortSignal | boolean>()
  const check = () =>
    controller.value && (controller.value as AbortController).abort()
  const remove = () => (controller.value = false)
  const create = () => {
    if (process.client) {
      const canceler = createSignalIfSupported()
      controller.value = canceler.controller
      signal.value = canceler.signal
    }
  }
  const getSignal = () => signal.value
  return {
    getSignal,
    create,
    check,
    remove,
  }
}

export const useError = () => {
  const error = ref<GraphqlError>()
  const setError = (e?: GraphqlError) => (error.value = e)
  return { error, setError }
}
export const useErrorAsync = (key: string) => {
  const error = ssrRef<GraphqlError | null | undefined>(null, `${key}_error`)
  const setError = (e?: GraphqlError) => (error.value = e)
  return { error, setError }
}

export const useLoadingAsync = (key: string) => {
  const loading = ssrRef<boolean>(false, `${key}_loading`)
  const setLoading = (e: boolean) => (loading.value = e)
  return { loading, setLoading }
}
