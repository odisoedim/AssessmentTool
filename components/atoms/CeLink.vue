<template>
  <a :target="target" rel="noopener">
    <slot></slot>
  </a>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CeLink',
  props: {
    target: {
      type: String,
      default: '_blank',
    },
  },
})
</script>
