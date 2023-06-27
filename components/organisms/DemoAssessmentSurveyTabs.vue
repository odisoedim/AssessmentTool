<template>
  <ce-tabs v-if="result" class="w-[1032px]" title="Results">
    <div class="pt-20 px-10.5 pb-14">
      <DemoCircleResult
        :answers="result.answers"
        :children="result.children"
        :framework-id="+result.id"
      />
    </div>
  </ce-tabs>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CeTabs from '~/components/atoms/CeTabs.vue'
import DemoCircleResult from '~/components/organisms/DemoCircleResult.vue'
import { useDemoSurveyResult } from '~/pages-helper/assessment/result/surveyResult'
import { CircleStrategyEndInput } from '~/pages-helper/assessment/survey/createPage'

export default defineComponent({
  name: 'DemoAssessmentSurveyTabs',
  components: {
    CeTabs,
    DemoCircleResult,
  },
  setup() {
    const result = useDemoSurveyResult()
    if (result && result.value) {
      if (!result.value.answers) {
        result.value.answers = {} as CircleStrategyEndInput
      }
    }
    return {
      result,
    }
  },
})
</script>
