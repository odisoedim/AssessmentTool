import { computed, useRoute } from '@nuxtjs/composition-api'

export const useParamsId = () => {
  const route = useRoute()
  return computed(() => route.value.params.id)
}
