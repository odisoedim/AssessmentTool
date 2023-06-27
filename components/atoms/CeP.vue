<template>
  <p class="font-light font-Rubik text-base leading-6.5 tracking-02">
    <slot></slot>
  </p>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CeP',
})
</script>
