<template>
  <h4
    class="font-Rubik text-lg tracking-10 ce-heading4 text-kh-grey leading-5.25"
  >
    <slot></slot>
  </h4>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CeHeading4',
})
</script>
