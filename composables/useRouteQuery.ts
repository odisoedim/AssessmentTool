import { computed, useRoute } from '@nuxtjs/composition-api'

export const useRouteQuery = () => {
  const route = useRoute()
  return computed(() => route.value.query)
}
