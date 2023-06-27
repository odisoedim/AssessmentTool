<template>
  <svg-icon
    :name="withoutPadding ? `${name}-24` : name"
    class="inline stroke-current"
    :style="style"
    :class="className"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { IconVariant } from '~/type/iconVariant'

export default defineComponent({
  name: 'CeIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 1,
    },
    withoutPadding: {
      type: Boolean,
      required: false,
    },
    theme: {
      type: String as PropType<IconVariant>,
      default: '',
    },
    strokeWidth: {
      type: Number,
      default: 2,
    },
  },
  setup(props) {
    const type: Record<IconVariant, string> = {
      primary: 'text-kh-primary',
      gray: 'text-kh-grey',
      yellow: 'text-kh-yellow',
      white: 'text-white',
    }
    const style = computed(() => {
      const sizeByPx = `${props.size * (props.withoutPadding ? 24 : 36)}px`
      return {
        width: sizeByPx,
        height: sizeByPx,
        'stroke-width': props.strokeWidth,
      }
    })
    return {
      style,
      className: computed(() => {
        return type[props.theme]
      }),
    }
  },
})
</script>
