<template>
  <h1
    class="
      font-Rubik font-light
      text-4.5xl text-kh-grey
      tracking-06
      leading-11
      ce-heading1
    "
  >
    <slot></slot>
  </h1>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CeHeading1',
})
</script>
