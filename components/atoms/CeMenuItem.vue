<template>
  <div
    class="font-NotoSans text-kh-grey tracking-06 text-base"
    :class="active ? 'font-semibold' : 'font-normal'"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CeMenuItem',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
