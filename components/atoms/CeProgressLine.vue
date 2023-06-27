<template>
  <div
    class="w-full rounded-full flex overflow-hidden"
    :class="classList"
    :style="{ height: strokeWidth + 'px' }"
  >
    <div
      class="bg-kh-primary rounded-full transition-all duration-[600ms] ease"
      :style="{ width: +progress + '%' }"
    ></div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { PROGRESS_BG_COLOR_TYPE } from '~/type/enum'

export default defineComponent({
  name: 'CeProgressLine',
  props: {
    progress: {
      type: Number,
      default: 0,
    },
    barBackgroundColor: {
      type: String as PropType<PROGRESS_BG_COLOR_TYPE>,
      default: 'primary',
    },
    strokeWidth: {
      type: [Number, String],
      default: 13,
    },
  },
  setup(props) {
    const bgColorList: Record<PROGRESS_BG_COLOR_TYPE, string> = {
      primary: 'bg-kh-primary-50',
      grey: 'bg-kh-blue-grey-300',
    }
    const classList = computed(() => {
      return bgColorList[props.barBackgroundColor]
    })
    return {
      classList,
    }
  },
})
</script>
