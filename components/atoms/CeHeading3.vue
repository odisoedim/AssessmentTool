<template>
  <h3
    class="font-Rubik text-1.5xl tracking-02 font-normal ce-heading3 text-kh-grey"
  >
    <slot></slot>
  </h3>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CeHeading3',
})
</script>
