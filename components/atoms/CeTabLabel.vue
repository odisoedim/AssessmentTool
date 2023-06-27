<template>
  <span
    class="font-NotoSans text-xl text-kh-grey tracking-02 leading-[27px] ce-tab-label"
    :class="classList"
  >
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CeTabLabel',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return {
      classList: computed(() => {
        return props.active ? 'font-bold' : 'font-normal'
      }),
    }
  },
})
</script>
