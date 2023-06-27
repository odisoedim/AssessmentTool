<template>
  <h5
    class="font-Rubik tracking-03 text-kh-grey font-medium leading-6.5 ce-heading5"
  >
    <slot></slot>
  </h5>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CeHeading5',
})
</script>
