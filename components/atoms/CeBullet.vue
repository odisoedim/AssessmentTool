<template>
  <div class="flex">
    <div
      class="w-6 h-6 flex justify-center items-center font-bold"
      :class="bulletClass"
    >
      <div>·</div>
    </div>
    <div class="flex-1">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CeBullet',
  props: {
    bulletClass: {
      type: String,
      default: '',
    },
  },
})
</script>
