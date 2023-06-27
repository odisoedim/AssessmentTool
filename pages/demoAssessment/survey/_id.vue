<template>
  <div>
    <div class="bg-kh-blue-grey-100">
      <survey-header class="w-[1032px] mx-auto box-border" :from-demo="true" />
    </div>
    <div v-if="result" class="min-w-[1064px]">
      <survey-progress-bar-with-title class="w-[1032px] mx-auto" />
    </div>
    <div v-if="result" class="w-[1032px] mx-auto mt-24 px-4 box-content">
      <component :is="computedCom" :from-demo="true" />
      <survey-footer :from-demo="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { useSurveyWithAssessment } from '~/pages-helper/demoAssessment/survey/_id'
import SurveyHeader from '~/components/organisms/SurveyHeader.vue'
import SurveyProgressBarWithTitle from '~/components/organisms/DemoSurveyProgressBarWithTitle.vue'
import SurveyFooter from '~/components/organisms/SurveyFooter.vue'
import SurveyEnd from '~/components/templates/SurveyEnd.vue'
import SurveyQuestionDesc from '~/components/templates/DemoSurveyQuestionDesc.vue'
import SurveyQuestion from '~/components/templates/SurveyQuestion.vue'
import SurveyQuestionEnd from '~/components/templates/SurveyQuestionEnd.vue'
import { useComputedPages } from '~/pages-helper/assessment/survey/computedPages'

export default defineComponent({
  name: 'DemoSurveyId',
  components: {
    SurveyQuestion,
    SurveyQuestionEnd,
    SurveyEnd,
    SurveyQuestionDesc,
    SurveyFooter,
    SurveyProgressBarWithTitle,
    SurveyHeader,
  },
  setup() {
    const { result } = useSurveyWithAssessment()
    const { computedPages, pageIndex, pagesLength } = useComputedPages()

    const computedCom = computed(() => {
      if (pageIndex.value === -1) return 'Survey-question-desc'
      if (pageIndex.value >= pagesLength.value) return 'survey-end'
      return ['survey-question', 'survey-question-end'][
        computedPages.value[pageIndex.value].type
      ]
    })

    return {
      result,
      computedCom,
    }
  },
})
</script>
