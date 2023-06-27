import { ref } from '@nuxtjs/composition-api'

export const useRequestAsyncMock = () => {
  const result = jest.fn()
  const error = jest.fn()
  const loading = jest.fn()
  const onSuccess = jest.fn()
  const onFail = jest.fn()
  const onFinal = jest.fn()
  const mockSuccess = <T>(data: T) => {
    result.mockReturnValue(data)
    error.mockReturnValue(ref())
  }
  const mockFail = (errorMsg: string = 'mock fail') => {
    result.mockReturnValue(ref(null))
    error.mockReturnValue(new Error(errorMsg))
  }
  return {
    mock: () => ({
      result: result(),
      error: error(),
      loading: loading(),
      onSuccess,
      onFail,
      onFinal,
    }),
    mockSuccess,
    mockFail,
  }
}
