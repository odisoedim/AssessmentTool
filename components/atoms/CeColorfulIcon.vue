<template>
  <svg-icon
    :name="withoutPadding ? `${name}-24` : name"
    class="inline"
    :style="style"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CeColorfulIcon',
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
  },
  setup(props) {
    const style = computed(() => {
      const sizeByPx = `${props.size * (props.withoutPadding ? 24 : 36)}px`
      return { width: sizeByPx, height: sizeByPx }
    })
    return { style }
  },
})
</script>
