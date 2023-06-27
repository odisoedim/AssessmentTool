<template>
  <div class="px-16.5">
    <ce-heading3>
      Thank you for completing {{ fromDemo ? '' : 'this portion of' }} the
      assessment.
    </ce-heading3>

    <ce-p class="my-6">
      Click “Submit” in order to finalise your answers for “{{ surveyName }}”.
      You will return to the assessment overview where you can view your
      results.
    </ce-p>
    <ce-p> Your answers will be saved and can be edited at any time. </ce-p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useUppercase } from '@use/useUppercase'
import CeP from '~/components/atoms/CeP.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import { useSurveyInfo } from '~/pages-helper/assessment/survey/surveyInfo'

export default defineComponent({
  name: 'SurveyEnd',
  components: {
    CeP,
    CeHeading3,
  },
  props: {
    fromDemo: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const survey = useSurveyInfo()
    const surveyName = useUppercase(
      computed(() =>
        props.fromDemo ? survey.value.frameworkName : survey.value.name
      )
    )
    return {
      surveyName,
    }
  },
})
</script>
