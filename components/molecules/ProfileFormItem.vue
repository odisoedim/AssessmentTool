<template>
  <div>
    <ce-heading3 class="mb-2">{{ title }}</ce-heading3>
    <slot />
    <CeWarningText v-if="!valid" class="mt-2">{{ error }}</CeWarningText>
    <ce-small-text
      v-else
      class="mt-4"
      :class="{ 'text-kh-grey-200': promptDisabled }"
      >{{ prompt }}</ce-small-text
    >
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import CeWarningText from '~/components/atoms/CeWarningText.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'

export default defineComponent({
  name: 'ProfileFormItem',
  components: {
    CeHeading3,
    CeWarningText,
    CeSmallText,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    valid: {
      type: Boolean,
      default: true,
    },
    error: {
      type: String,
      default: '',
    },
    prompt: {
      type: String,
      default: '',
    },
    promptDisabled: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
