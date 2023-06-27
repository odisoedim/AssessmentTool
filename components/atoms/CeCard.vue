<template>
  <div
    class="
      px-16.5
      pt-14.5
      pb-16.5
      bg-kh-blue-grey-100
      rounded-2.5xl
      shadow-card'
    "
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CeCard',
})
</script>
