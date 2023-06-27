<template>
  <ce-card>
    <div v-if="title || subTitle" class="mb-6">
      <ce-heading3 v-if="title" :class="{ 'pb-2': subTitle }">{{
        title
      }}</ce-heading3>
      <ce-small-text v-if="subTitle" class="pb-2">{{ subTitle }}</ce-small-text>
    </div>
    <slot />
  </ce-card>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeCard from '~/components/atoms/CeCard.vue'

export default defineComponent({
  name: 'SurveyCard',
  components: {
    CeCard,
    CeSmallText,
    CeHeading3,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {}
  },
})
</script>
