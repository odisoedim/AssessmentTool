<template>
  <div class="w-[1032px] px-4 mx-auto box-content"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LandingLayoutCenter',
})
</script>
