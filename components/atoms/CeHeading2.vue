<template>
  <h2 class="font-Rubik text-2.5xl text-kh-grey tracking-01 ce-heading2">
    <slot></slot>
  </h2>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CeHeading2',
})
</script>
