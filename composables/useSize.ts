import { computed } from '@nuxtjs/composition-api'
import { transCssSize } from '~/util/cssSize'

export const useSize = <
  P extends { width: string | number; height: string | number }
>(
  props: P
) => {
  return computed(() => {
    const { width, height } = props
    return {
      width: transCssSize(width),
      height: transCssSize(height),
    }
  })
}
