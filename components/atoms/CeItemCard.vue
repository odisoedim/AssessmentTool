<template>
  <div class="p-4 shadow-normal bg-white rounded">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CeItemCard',
})
</script>
