<template>
  <div
    class="
      absolute
      top-6
      left-1/2
      transform
      -translate-x-1/2
      w-full
      text-center
    "
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SurveyProgressCircleTitle',
})
</script>
