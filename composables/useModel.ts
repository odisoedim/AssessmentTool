import { computed } from '@nuxtjs/composition-api'

export const useModel = <T>(get: () => T, set: (v: T) => void) =>
  computed({
    get,
    set,
  })
