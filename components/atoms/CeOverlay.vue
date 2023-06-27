<template>
  <div
    class="fixed w-full h-full bg-kh-grey left-0 top-0 opacity-60 ce-overlay"
    :style="style"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CeOverlay',
  props: {
    zIndex: {
      type: Number,
      default: 9000,
    },
  },
  setup(props) {
    const style = computed(() => ({ 'z-index': props.zIndex }))
    return { style }
  },
})
</script>
