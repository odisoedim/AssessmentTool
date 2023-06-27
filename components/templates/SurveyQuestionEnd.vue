<template>
  <div>
    <div v-if="fromDemo" class="px-16.5 mb-20">
      <ce-p>
        You’ve now completed all {{ data.data.children.length }} key elements.
      </ce-p>
      <ce-p class="mb-16">
        Next you will answer a few last questions about the
        {{ surveyInfo.frameworkName }}.
      </ce-p>
      <ce-heading1 class="mb-6">
        {{ surveyInfo.frameworkName }}
      </ce-heading1>
      <div class="mb-6">
        <ce-p> It consists of {{ data.data.children.length }} elements: </ce-p>
      </div>
      <ul class="px-4">
        <li
          v-for="children in data.data.children"
          :key="children.id"
          class="mb-2"
        >
          <ce-p>
            {{ children.name }}
          </ce-p>
        </li>
      </ul>
    </div>
    <div v-else class="px-16.5 mb-20">
      <ce-p>
        You’ve now completed all substrategies in {{ data.data.name }}.
      </ce-p>
      <ce-p class="mb-16">
        Next you will answer a few last questions about the circular strategy,
        {{ data.data.name }}.
      </ce-p>
      <ce-heading1 class="mb-6">
        {{ data.data.name }}
      </ce-heading1>
      <div class="h-[78px] flex flex-col justify-between mb-6">
        <!-- eslint-disable vue/no-v-html -->
        <ce-p v-html="data.data.description"> </ce-p>
        <!--eslint-enable-->
        <ce-p>
          {{ `It consists of ${data.data.children.length} substrategies:` }}
        </ce-p>
      </div>

      <ul class="px-4">
        <li v-for="text in data.data.children" :key="text" class="mb-2">
          <ce-p>
            {{ text }}
          </ce-p>
        </li>
      </ul>
    </div>

    <div v-for="(question, index) in questions" :key="index">
      <survey-card
        :sub-title="question.subtitle"
        :title="question.text"
        class="mb-20"
      >
        <survey-challenges-checkbox-group
          v-if="question.model === 'challenge'"
          v-model="data.input[index].value"
        />
        <ce-input
          v-else-if="question.type === 'text' || 'list'"
          v-model="data.input[index].value"
          type="textarea"
        />
      </survey-card>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import CeP from '~/components/atoms/CeP.vue'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import CeInput from '~/components/atoms/CeInput.vue'
import SurveyCard from '~/components/molecules/SurveyCard.vue'
import SurveyChallengesCheckboxGroup from '~/components/organisms/SurveyChallengesCheckboxGroup.vue'
import {
  CircleStrategyEndChallengeInputQuestion,
  CircleStrategyEndPage,
} from '~/pages-helper/assessment/survey/createPage'
import { useComputedPages } from '~/pages-helper/assessment/survey/computedPages'
import { useSurveyInfo } from '~/pages-helper/assessment/survey/surveyInfo'
import { useEndQuestions } from '~/pages-helper/assessment/survey/endQuestionTexts'
import { ENUM_QUESTION_TYPE } from '~/type/enum'

export default defineComponent({
  name: 'SurveyQuestionEnd',
  components: {
    CeHeading1,
    CeInput,
    CeP,
    SurveyCard,
    SurveyChallengesCheckboxGroup,
  },
  props: {
    fromDemo: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { computedPages, pageIndex } = useComputedPages()
    const { value: endQuestionTexts } = useEndQuestions()
    const surveyInfo = useSurveyInfo()

    const questions = computed(() =>
      endQuestionTexts.map(({ type, text, required, model }) => ({
        type,
        text: text.replaceAll('#', `"${data.value.data.name}"`),
        subtitle:
          type === ENUM_QUESTION_TYPE.check
            ? 'Select all that apply'
            : !required
            ? '(Optional)'
            : '',
        model,
      }))
    )
    const data = computed(() => {
      const strategy = computedPages.value[
        pageIndex.value
      ] as CircleStrategyEndPage
      strategy.input = endQuestionTexts.map(
        ({ id, model, type, heading, blankPlaceholder }) => {
          let value =
            strategy.input.find(
              ({ model: m }) => m === model || m === id.toString()
            )?.value ?? ''
          if (type === ENUM_QUESTION_TYPE.check) {
            const v = value as CircleStrategyEndChallengeInputQuestion
            value = {
              check: v.check || [],
              other: v.other || '',
            }
          }
          return {
            heading,
            model: model || id.toString(),
            value,
            type,
            blankPlaceholder,
          }
        }
      )
      return strategy
    })
    return {
      questions,
      data,
      surveyInfo,
    }
  },
})
</script>
