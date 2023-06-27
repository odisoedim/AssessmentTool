<template>
  <p class="font-Rubik text-sm leading-[17px] text-kh-grey ce-small-text">
    <slot></slot>
  </p>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CeSmallText',
})
</script>
