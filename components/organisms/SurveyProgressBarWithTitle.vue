<template>
  <div class="py-10">
    <ce-heading4 class="mb-6">{{ title }}</ce-heading4>
    <component :is="progressBar" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import Tier3SurveyProgressBar from '~/components/molecules/Tier3SurveyProgressBar.vue'
import { useSurveyInfo } from '~/pages-helper/assessment/survey/surveyInfo'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'

export default defineComponent({
  name: 'SurveyProgressBarWithTitle',
  components: {
    CeHeading4,
    Tier3SurveyProgressBar,
  },
  props: {
    tierLevel: {
      type: Number as PropType<1 | 3>,
      required: true,
    },
  },
  setup(props) {
    const info = useSurveyInfo()
    const progressBar = computed(
      () => `Tier${props.tierLevel}SurveyProgressBar`
    )
    return {
      title: computed(() => info.value.name),
      progressBar,
    }
  },
})
</script>
