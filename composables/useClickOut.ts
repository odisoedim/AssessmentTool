import { onMounted, onUnmounted, Ref } from '@nuxtjs/composition-api'

export const useClickOut = (
  el: Ref<HTMLDivElement | undefined>,
  cb: (e: MouseEvent) => void
) => {
  const fn = (e: MouseEvent) => {
    if (!el.value) return
    const elements = e.path || (e.composedPath && e.composedPath()) || []
    !elements.includes(el.value) && cb(e)
  }
  onMounted(() => window.addEventListener('click', fn))
  onUnmounted(() => window.removeEventListener('click', fn))
  return { fn }
}
