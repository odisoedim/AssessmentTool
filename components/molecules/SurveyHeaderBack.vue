<template>
  <ce-button
    root-type="nuxt-link"
    :to="to"
    theme="tertiary"
    left-icon="arrow-left"
    class="text-kh-gray hover:text-kh-primary-200 active:text-kh-primary-400"
    custom-color
    >{{ tag }}</ce-button
  >
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CeButton from '~/components/atoms/CeButton.vue'

export default defineComponent({
  name: 'SurveyHeaderBack',
  components: { CeButton },
  props: {
    to: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: 'Back',
    },
  },
})
</script>
