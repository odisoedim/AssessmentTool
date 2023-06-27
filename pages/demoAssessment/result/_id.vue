<template>
  <div class="w-[1064px] px-4 mx-auto mb-20">
    <template v-if="result">
      <SurveyResultContentHeader
        :is-completed="demoSurveyResult.completed"
        :score="demoSurveyResult.score"
        :progress="demoSurveyResult.progress"
        class="mb-24"
        :is-demo-result="true"
      />
      <CollapseFramework class="mb-24" :frameworks="frameworkElements" />
      <DemoAssessmentSurveyTabs />
    </template>

    <CeLoader v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

// components
import CollapseFramework from '~/components/molecules/CollapseFramework.vue'
import SurveyResultContentHeader from '~/components/molecules/SurveyResultContentHeader.vue'
import DemoAssessmentSurveyTabs from '~/components/organisms/DemoAssessmentSurveyTabs.vue'
import CeLoader from '~/components/atoms/CeLoader.vue'

// hooks
import {
  useDemoAssessmentResult,
  useInjectDemoAssessmentResult,
} from '~/pages-helper/demoAssessment/result/_id'
import { useDemoSurveyResult } from '~/pages-helper/assessment/result/surveyResult'

export default defineComponent({
  name: 'DemoAssessmentResultId',
  components: {
    CollapseFramework,
    SurveyResultContentHeader,
    DemoAssessmentSurveyTabs,
    CeLoader,
  },
  setup() {
    useDemoAssessmentResult()
    const { result, frameworkElements } = useInjectDemoAssessmentResult()
    const demoSurveyResult = useDemoSurveyResult()

    return {
      result,
      demoSurveyResult,
      frameworkElements,
    }
  },
})
</script>
