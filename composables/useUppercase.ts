import { computed, Ref, unref } from '@nuxtjs/composition-api'

export const useUppercase = (str: Ref<string> | string) =>
  computed(() => {
    const _str = unref(str)
    if (_str.length) {
      return `${_str[0].toUpperCase()}${_str.slice(1)}`
    } else {
      return ''
    }
  })
