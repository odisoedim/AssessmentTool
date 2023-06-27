<template>
  <div
    class="
      font-Rubik font-light
      text-4xl text-kh-grey
      tracking-06
      leading-12
      landing-title
    "
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LandingSectionTitle',
})
</script>
