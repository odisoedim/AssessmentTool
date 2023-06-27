<template>
  <p
    class="
      font-Rubik
      text-xs text-kh-grey
      leading-4.5
      tracking-02
      ce-fine-print
    "
  >
    <slot></slot>
  </p>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'CeFinePrint',
})
</script>
