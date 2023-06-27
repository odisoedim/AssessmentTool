<template>
  <div class="py-10">
    <ce-heading4 class="mb-6">{{ title }}</ce-heading4>
    <Tier1SurveyProgressBar />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useSurveyInfo } from '~/pages-helper/assessment/survey/surveyInfo'
import Tier1SurveyProgressBar from '~/components/molecules/DemoTier1SurveyProgressBar.vue'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'

export default defineComponent({
  name: 'DemoSurveyProgressBarWithTitle',
  components: {
    CeHeading4,
    Tier1SurveyProgressBar,
  },
  setup() {
    const info = useSurveyInfo()
    return {
      title: computed(() => info.value.frameworkName),
    }
  },
})
</script>
