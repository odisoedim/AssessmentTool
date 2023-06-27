<template>
  <div class="w-[1064px] px-4 mx-auto mb-20">
    <div v-if="result">
      <AssessmentOverviewHeader
        :assessment-result="assessmentResult"
        class="mt-15.5 mb-24"
      />
      <CollapseFramework class="mb-24" title="About this framework" />
      <AssessmentSurveyTabs />
    </div>

    <CeLoader v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

// components
import CollapseFramework from '~/components/molecules/CollapseFramework.vue'
import AssessmentOverviewHeader from '~/components/molecules/AssessmentOverviewHeader.vue'
import AssessmentSurveyTabs from '~/components/organisms/AssessmentSurveyTabs.vue'
import CeLoader from '~/components/atoms/CeLoader.vue'

// hooks
import {
  useAssessmentResult,
  useInjectAssessmentResult,
} from '~/pages-helper/assessment/overview/_id'

export default defineComponent({
  name: 'OverviewId',
  components: {
    CollapseFramework,
    AssessmentOverviewHeader,
    AssessmentSurveyTabs,
    CeLoader,
  },
  setup() {
    useAssessmentResult()
    const AssessmentResult = useInjectAssessmentResult()
    const result = computed(() => AssessmentResult?.result)

    return {
      result,
      assessmentResult: AssessmentResult.assessment,
    }
  },
})
</script>
