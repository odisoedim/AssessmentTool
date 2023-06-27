<template>
  <img
    class="block w-full object-cover"
    :src="src"
    :alt="$attrs.alt"
    @error="$emit('error')"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CeImage',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  emits: ['error'],
})
</script>
