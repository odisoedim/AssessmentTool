import { Ref, ref, unref } from '@nuxtjs/composition-api'

export const usePage = (
  init = 0,
  max?: Ref<number> | number,
  min?: Ref<number> | number
) => {
  const pageIndex = ref(init)
  const nextPage = () =>
    unref(pageIndex) < unref(max || Infinity) && pageIndex.value++
  const prevPage = () =>
    unref(pageIndex) > unref(min || -Infinity) && pageIndex.value--
  const clear = () => (pageIndex.value = 0)
  return {
    pageIndex,
    nextPage,
    prevPage,
    clear,
  }
}
