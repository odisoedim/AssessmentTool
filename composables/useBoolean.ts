import { ref, Ref } from '@nuxtjs/composition-api'
export const useBoolean = (init = false) => useBooleanWrap(ref(init))

export interface UseBoolean {
  set: (value?: boolean) => boolean
  bool: Ref<boolean>
  toggle: () => boolean
  close: () => boolean
  open: () => boolean
}

export const useBooleanWrap: (wrap: Ref<boolean>) => UseBoolean = (
  wrap: Ref<boolean>
) => {
  const open = () => (wrap.value = true)
  const close = () => (wrap.value = false)
  const toggle = () => (wrap.value = !wrap.value)
  const set = (value = false) => (wrap.value = value)
  return { bool: wrap, open, close, toggle, set }
}
