<template>
  <div>
    <ce-button
      v-if="progress === 0"
      root-type="nuxt-link"
      :to="`/assessment/survey/${urlId}`"
      >Start</ce-button
    >
    <ce-button
      v-else-if="!completed"
      root-type="nuxt-link"
      :to="`/assessment/survey/${urlId}`"
      >Resume</ce-button
    >
    <ce-button
      v-else-if="score >= 0"
      theme="secondary"
      root-type="nuxt-link"
      :to="`/assessment/result/${urlId}`"
      >View results</ce-button
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { useParamsId } from '@use/useParamsId'
import CeButton from '~/components/atoms/CeButton.vue'
export default defineComponent({
  name: 'SurveyCardButton',
  components: {
    CeButton,
  },
  props: {
    itemId: {
      type: [String, Number],
      required: true,
    },
    score: {
      type: Number,
      default: -1,
    },
    progress: {
      type: Number,
      default: -1,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const id = useParamsId()
    // urlId consist of assessmentId and elementId
    const urlId = computed(() => {
      return `${id.value}_${props.itemId}`
    })
    return {
      urlId,
    }
  },
})
</script>
