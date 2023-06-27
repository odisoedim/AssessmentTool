<template>
  <div>
    <div class="px-14.5 pb-20">
      <ce-heading1 class="pb-6">{{ survey.name }} </ce-heading1>
      <ce-p class="pb-4"> {{ surveyDesc }}. </ce-p>
      <ce-p>
        This section consists of the {{ children.length }} circular strategies
        below.
      </ce-p>
    </div>

    <survey-card
      v-if="children"
      title="Which of the following do you want to assess?"
      sub-title="Select all that apply"
    >
      <survey-strategy-checkbox-group />
    </survey-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import SurveyCard from '~/components/molecules/SurveyCard.vue'
import SurveyStrategyCheckboxGroup from '~/components/organisms/SurveyStrategyCheckboxGroup.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import { useSurveyInfo } from '~/pages-helper/assessment/survey/surveyInfo'
import { useSurveyChildren } from '~/pages-helper/assessment/survey/surveyChildren'

export default defineComponent({
  name: 'SurveyStart',
  components: {
    SurveyStrategyCheckboxGroup,
    CeP,
    SurveyCard,
    CeHeading1,
  },
  setup() {
    const children = useSurveyChildren()
    const survey = useSurveyInfo()
    const surveyDesc = computed(
      () =>
        `${survey.value.description
          .charAt(0)
          .toUpperCase()}${survey.value.description.slice(1)}`
    )
    return {
      survey,
      children,
      surveyDesc,
    }
  },
})
</script>
