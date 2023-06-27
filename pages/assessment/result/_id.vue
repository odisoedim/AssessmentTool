<template>
  <div class="w-[1064px] px-4 mx-auto mb-20">
    <template v-if="result">
      <SurveyResultContentHeader
        :score="scoreSurvey.score"
        :progress="progress"
        :is-completed="completed"
        :assessment-title="assessmentTitle"
        class="mb-24"
      />
      <CollapseElement class="mb-24" />
      <SurveyResultTabs :framework-id="+frameworkId" />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

// hooks
import { useParamsId } from '@use/useParamsId'
import { useSurveyResult } from '~/pages-helper/assessment/result/_id'
import { useSurveyScore } from '~/pages-helper/assessment/result/useSurveyScore'

// components
import CollapseElement from '~/components/molecules/CollapseElement.vue'
import SurveyResultContentHeader from '~/components/molecules/SurveyResultContentHeader.vue'
import SurveyResultTabs from '~/components/organisms/SurveyResultTabs.vue'

export default defineComponent({
  name: 'ResultId',
  components: {
    CollapseElement,
    SurveyResultContentHeader,
    SurveyResultTabs,
  },
  setup() {
    const id = useParamsId()

    const { result } = useSurveyResult()
    const frameworkId = computed(() => {
      return result.value?.assessmentData?.assessment.framework_id
    })
    const assessmentTitle = computed(() => {
      return result.value?.assessmentData?.assessment.name
    })

    const assessmentId = computed(() => {
      return id.value.split('_')[0]
    })
    const surveyId = computed(() => {
      return id.value.split('_')[1]
    })
    const { progress, completed, scoreSurvey } = useSurveyScore(
      assessmentId,
      surveyId
    )
    return {
      result,
      frameworkId,
      assessmentTitle,
      scoreSurvey,
      progress,
      completed,
    }
  },
})
</script>
