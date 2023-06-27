<template>
  <div>
    <ce-button v-if="pageIndex === pagesLength" @click="submit">
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
import { useComputedPages } from '~/pages-helper/assessment/survey/computedPages'
import { useSurveyStore } from '~/pages-helper/assessment/survey/surveyStore'
import { useSurveyIds } from '~/pages-helper/assessment/survey/surveyIds'

export default defineComponent({
  name: 'DemoSurveyFooterNext',
  components: { SurveyAlertModal, CeButton },
  setup() {
    const { nextPage, pageIndex, pagesLength } = useComputedPages()
    const { save } = useSurveyStore()
    const { bool: visible, open } = useBoolean()
    const router = useRouter()
    const { assessmentId } = useSurveyIds()
    return {
      open,
      visible,
      nextPage,
      pageIndex,
      pagesLength,
      submit: async () => {
        await save(false, true)
        router.push(`/demoAssessment/result/${assessmentId.value}`)
      },
    }
  },
})
</script>
