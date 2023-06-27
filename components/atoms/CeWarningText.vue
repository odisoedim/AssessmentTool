<template>
  <div class="text-kh-red flex items-center">
    <ce-icon name="alert-triangle"></ce-icon>
    <ce-small-text class="text-kh-red"><slot /></ce-small-text>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import CeIcon from '~/components/atoms/CeIcon.vue'

export default defineComponent({
  name: 'CeWarningText',
  components: {
    CeSmallText,
    CeIcon,
  },
})
</script>
