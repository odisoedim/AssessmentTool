import {
  GraphqlError,
  useError,
  useErrorAsync,
  useLoadingAsync,
} from '@use/apollo'
import { useBoolean } from '@use/useBoolean'
import { onMounted, Ref, ref, useAsync } from '@nuxtjs/composition-api'

export interface RequestOptions<Result> {
  success?: (res: Result) => void
  fail?: (error: GraphqlError) => void
  final?: () => void
}

export const useRequest = <Result>(
  fetchFn: () => Promise<Result>,
  options: RequestOptions<Result> & { immediate?: boolean } = {}
) => {
  const { error, setError } = useError()
  const { bool: loading, set: setLoading } = useBoolean()
  const success: RequestOptions<Result>['success'][] = []
  const fail: RequestOptions<Result>['fail'][] = [(err) => console.error(err)]
  const final: RequestOptions<Result>['final'][] = []
  const result: Ref<Result | null> = ref(null)
  options.success && success.push(options.success)
  options.fail && fail.push(options.fail)
  options.final && final.push(options.final)
  const immediate = options.immediate === undefined ? true : options.immediate
  const fetch = async () => {
    setLoading(true)
    try {
      const data = await fetchFn()
      success.forEach((fn) => typeof fn === 'function' && fn(data))
      setError()
      result.value = data
    } catch (e) {
      fail.forEach((fn) => typeof fn === 'function' && fn(e))
      result.value = null
      setError(e)
    } finally {
      setLoading(false)
      final.forEach((fn) => typeof fn === 'function' && fn())
    }
  }
  onMounted(async () => {
    if (immediate) {
      await fetch()
    }
  })
  return {
    result,
    error,
    loading,
    fetch,
    onSuccess: (fn: RequestOptions<Result>['success']) => success.push(fn),
    onFail: (fn: RequestOptions<Result>['fail']) => fail.push(fn),
    onFinal: (fn: RequestOptions<Result>['final']) => fail.push(fn),
  }
}

export const useRequestAsync = <Result>(
  key: string,
  fetchFn: () => Promise<Result>,
  options: RequestOptions<Result> = {}
) => {
  const { error, setError } = useErrorAsync(key)
  const { loading, setLoading } = useLoadingAsync(key)
  const success: RequestOptions<Result>['success'][] = [options.success]
  const fail: RequestOptions<Result>['fail'][] = [(err) => console.error(err)]
  const final: RequestOptions<Result>['final'][] = [options.final]
  const result = useAsync(async () => {
    setLoading(true)
    try {
      const data = await fetchFn()
      success.forEach((fn) => typeof fn === 'function' && fn(data))
      setError()
      return data
    } catch (e) {
      fail.forEach((fn) => typeof fn === 'function' && fn(e))
      setError(e)
      return null
    } finally {
      setLoading(false)
      final.forEach((fn) => typeof fn === 'function' && fn())
    }
  }, key)
  return {
    result,
    error,
    loading,
    onSuccess: (fn: RequestOptions<Result>['success']) => success.push(fn),
    onFail: (fn: RequestOptions<Result>['fail']) => fail.push(fn),
    onFinal: (fn: RequestOptions<Result>['final']) => fail.push(fn),
  }
}
