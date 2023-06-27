<template>
  <div>
    <ce-button
      v-if="pageIndex === -1"
      :disabled="!circleStrategies.length && !noCircleStrategies.length"
      @click="ready"
    >
      Next
    </ce-button>
    <ce-button v-else-if="pageIndex === pagesLength" @click="submit">
      Submit
    </ce-button>
    <ce-button v-else @click="() => nextPage(open)"> Next </ce-button>
    <survey-alert-modal v-model="visible" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import CeButton from '~/components/atoms/CeButton.vue'
import SurveyAlertModal from '~/components/organisms/SurveyAlertModal.vue'
import { useBoolean } from '~/composables'
import { useCircleStrategyCheck } from '~/pages-helper/assessment/survey/circleStrategyCheck'
import { useComputedPages } from '~/pages-helper/assessment/survey/computedPages'
import { useSurveyStore } from '~/pages-helper/assessment/survey/surveyStore'
import { useSurveyIds } from '~/pages-helper/assessment/survey/surveyIds'

export default defineComponent({
  name: 'SurveyFooterNext',
  components: { SurveyAlertModal, CeButton },
  setup() {
    const { circleStrategies, noCircleStrategies } = useCircleStrategyCheck()
    const { nextPage, pageIndex, ready, pagesLength } = useComputedPages()
    const { save } = useSurveyStore()
    const { bool: visible, open } = useBoolean()
    const router = useRouter()
    const { surveyId, assessmentId } = useSurveyIds()
    return {
      open,
      visible,
      nextPage,
      pageIndex,
      ready,
      pagesLength,
      circleStrategies,
      noCircleStrategies,
      submit: async () => {
        await save(false, true)
        router.push(
          `/assessment/result/${assessmentId.value}_${surveyId.value}`
        )
      },
    }
  },
})
</script>
