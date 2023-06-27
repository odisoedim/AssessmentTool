<template>
  <div>
    <survey-header />
    <div v-if="result" class="shadow-header min-w-[1064px]">
      <survey-progress-bar-with-title
        :tier-level="3"
        class="w-[1032px] mx-auto"
      />
    </div>
    <div v-if="result" class="w-[1032px] mx-auto mt-24 px-4 box-content">
      <component :is="computedCom" :key="pageIndex" />
      <survey-footer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

// components
import SurveyHeader from '~/components/organisms/SurveyHeader.vue'
import SurveyProgressBarWithTitle from '~/components/organisms/SurveyProgressBarWithTitle.vue'
import SurveyFooter from '~/components/organisms/SurveyFooter.vue'
import SurveyEnd from '~/components/templates/SurveyEnd.vue'
import SurveyStart from '~/components/templates/SurveyStart.vue'
import SurveyQuestion from '~/components/templates/SurveyQuestion.vue'
import SurveyQuestionEnd from '~/components/templates/SurveyQuestionEnd.vue'
import SurveyQuestionDesc from '~/components/templates/SurveyQuestionDesc.vue'

// hooks
import { useSurveyWithAssessment } from '~/pages-helper/assessment/survey/_id'
import { useSurveyPages } from '~/pages-helper/assessment/survey/surveyPages'
import { useComputedPages } from '~/pages-helper/assessment/survey/computedPages'

export default defineComponent({
  name: 'SurveyId',
  components: {
    SurveyQuestion,
    SurveyQuestionEnd,
    SurveyQuestionDesc,
    SurveyStart,
    SurveyEnd,
    SurveyFooter,
    SurveyProgressBarWithTitle,
    SurveyHeader,
  },
  setup() {
    const { result } = useSurveyWithAssessment()
    const { computedPages, pageIndex, pagesLength } = useComputedPages()
    const computedCom = computed(() => {
      if (pageIndex.value === -1) return 'survey-start'
      if (pageIndex.value >= pagesLength.value) return 'survey-end'
      return ['survey-question-desc', 'survey-question', 'survey-question-end'][
        computedPages.value[pageIndex.value].type
      ]
    })

  
    return {
      result,
      computedCom,
      computedPages,
      pageIndex,
      pages: useSurveyPages(),
    }
  },
})
</script>
