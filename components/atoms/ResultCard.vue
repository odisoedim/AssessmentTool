<template>
  <div>
    <ce-heading5 v-if="$slots.header" class="mb-6 text-kh-grey">
      <slot name="header"></slot>
    </ce-heading5>
    <div
      v-if="$slots.default"
      class="bg-kh-blue-grey-100 px-6 py-4 rounded-lg shadow-card"
      :class="bodyClass"
      :style="{ background: bodyBg }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'

export default defineComponent({
  name: 'ResultCard',
  components: { CeHeading5 },
  props: {
    bodyClass: {
      type: String,
      default: '',
    },
    bodyBg: {
      type: String,
      default: '',
    },
  },
})
</script>
