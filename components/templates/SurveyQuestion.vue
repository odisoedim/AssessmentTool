<template>
  <div>
    <div class="px-16.5 mb-16">
      <ce-heading1 class="mb-6">
        {{ data.name }}
      </ce-heading1>
      <!-- eslint-disable vue/no-v-html -->
      <ce-p class="survey_question_describe" v-html="data.description"></ce-p>
      <!--eslint-enable-->
    </div>
    <div class="px-16.5 mb-16">
      <ce-p class="pb-12">Explore examples in practice:</ce-p>
      <ce-card-area :case-list="data.case" :loading="loading" class="pb-8" />
      <ce-button
        target="_blank"
        rel="noopener norefferrer"
        :href="`https://knowledge-hub.circle-lab.com/frameworks/${surveyInfo.id}/${data.id}?curator=Approved`"
        root-type="a"
        theme="tertiary"
        class="float-right"
        right-icon="external-link"
      >
        See more case studies
      </ce-button>
    </div>

    <survey-card
      :title="`To what extent does your organisation engage in &quot;${name}&quot;?`"
    >
      <survey-answer-radio-group v-model="input.option" />
    </survey-card>
    <survey-card
      v-if="showExtra"
      class="mt-20"
      :title="`Provide examples of how your organisation is implementing &quot;${name}&quot;: `"
    >
      <ce-input v-model="input.provideExample" type="textarea" />
    </survey-card>
    <template v-if="showExtra">
      <survey-card
        v-for="q in questions"
        :key="q.id"
        class="mt-20"
        :title="q.title"
      >
        <template v-if="q.type === 'text'">
          <ce-input
            v-model="input[q.id].answer"
            class="w-[660px]"
            type="textarea"
          />
        </template>
        <template
          v-else-if="q.type === 'check' || q.type === 'check_with_other'"
        >
          <survey-answer-checkbox-group
            v-model="input[q.id].answer"
            :has-other="q.type === 'check_with_other'"
            :options="q.answer_options"
          />
        </template>
        <template
          v-else-if="q.type === 'radio' || q.type === 'radio_with_other'"
        >
          <survey-answer-vertical-radio-group
            v-model="input[q.id].answer"
            :has-other="q.type === 'radio_with_other'"
            :options="q.answer_options"
          />
        </template>
      </survey-card>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watchEffect,
  ref,
} from '@nuxtjs/composition-api'
import { useUppercase } from '@use/useUppercase'
import CeP from '~/components/atoms/CeP.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import CeInput from '~/components/atoms/CeInput.vue'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import SurveyCard from '~/components/molecules/SurveyCard.vue'
import SurveyAnswerRadioGroup from '~/components/organisms/SurveyAnswerRadioGroup.vue'

import SurveyAnswerCheckboxGroup from '~/components/organisms/SurveyAnswerCheckboxGroup.vue'
import SurveyAnswerVerticalRadioGroup from '~/components/organisms/SurveyAnswerVerticalRadioGroup.vue'
import CeCardArea from '~/components/organisms/CaseStudyCardGroup.vue'
import { SubStrategyPage } from '~/pages-helper/assessment/survey/createPage'
import { useSurveyInfo } from '~/pages-helper/assessment/survey/surveyInfo'
import { useComputedPages } from '~/pages-helper/assessment/survey/computedPages'
import { ENUM_SUBSTRATEGY_QUESTION_TYPE } from '~/type/enum'

export default defineComponent({
  name: 'SurveyQuestion',
  components: {
    CeHeading1,
    CeP,
    CeInput,
    CeButton,
    SurveyCard,
    SurveyAnswerRadioGroup,
    SurveyAnswerCheckboxGroup,
    SurveyAnswerVerticalRadioGroup,
    CeCardArea,
  },
  setup() {
    const surveyInfo = useSurveyInfo()
    const { computedPages, pageIndex, validation } = useComputedPages()
    const subStrategyPage = computed<SubStrategyPage>(() => {
      return computedPages.value[pageIndex.value] as SubStrategyPage
    })
    const data = computed(() => subStrategyPage.value.data)
    const input = computed(() => {
      subStrategyPage.value.input.option ??= '-1'
      subStrategyPage.value.input.provideExample ??= ''
      questions.value.forEach(({ id, title, type }) => {
        let answer

        if (
          type === ENUM_SUBSTRATEGY_QUESTION_TYPE.radio ||
          type === ENUM_SUBSTRATEGY_QUESTION_TYPE.radio_with_other
        )
          answer = { radio: '-1', other: '' }
        else if (
          type === ENUM_SUBSTRATEGY_QUESTION_TYPE.check ||
          type === ENUM_SUBSTRATEGY_QUESTION_TYPE.check_with_other
        )
          answer = { check: [], other: '' }
        else answer = ''

        subStrategyPage.value.input[id] ??= ref({
          title,
          type,
          answer,
        }).value
      })
      return subStrategyPage.value.input
    })
    const loading = computed(() => subStrategyPage.value.data.caseLoading)
    watchEffect(() => {
      const { provideExample, option } = subStrategyPage.value.input
      if (option === '-1') {
        validation.close()
      } else if (['0', '5'].includes(option)) {
        validation.open()
      } else if (provideExample) {
        validation.open()
      } else {
        validation.close()
      }
    })
    const showExtra = computed(
      () => +input.value.option > 0 && +input.value.option < 5
    )
    const name = useUppercase(computed(() => data.value.name))
    const questions = computed(() => data.value.questions)
    return {
      subStrategyPage,
      surveyInfo,
      data,
      input,
      loading,
      name,
      questions,
      showExtra,
    }
  },
})
</script>
<style scoped>
.survey_question_describe >>> a {
  text-decoration: underline;
  font-family: 'NotoSans', serif;
  font-weight: 400;
}
</style>
