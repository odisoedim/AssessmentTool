<template>
  <div>
    <div class="overflow-hidden">
      <ul class="-mb-6">
        <QuestionResult
          v-for="item in childrenGroupBy"
          :key="item.id"
          class="mb-6"
          :sub-strategy="item.name"
          :provide-example="item.provideExample"
          :option="+item.option"
          :sub-strategy-id="+item.id"
          :framework-id="+frameworkId"
        />
      </ul>
    </div>
    <ResultCard
      v-for="(answer, key) in mappedAnswers"
      :key="key"
      class="mt-12 circle-result__opportunities"
    >
      <template #header>{{ answer.heading }}</template>
      <template
        v-if="answer.model === 'challenge'"
        class="circle-result__challenges"
      >
        <div
          v-if="answer.value.check.length"
          class="mb-4 circle-result__challenges_check"
        >
          <div v-for="i in answer.value.check" :key="i">
            <ce-bullet class="circle-result__challenges_check_bullet">
              <ce-p class="text-kh-grey">{{ i }}</ce-p>
            </ce-bullet>
          </div>
        </div>
        <ce-p
          v-if="!!answer.value.other"
          class="text-kh-grey circle-result__challenges_explain"
        >
          {{ answer.value.other }}
        </ce-p>
        <ce-p v-if="!answer.value.length" class="text-kh-grey">{{
          answer.blankPlaceholder
        }}</ce-p>
      </template>
      <template v-if="answer.type === 'list'" class="circle-result__list">
        <div v-for="(v, i) in answer.value" :key="i">
          <ce-bullet>
            <ce-p class="text-kh-grey">{{ v }}</ce-p>
          </ce-bullet>
        </div>
        <ce-p v-if="!answer.value.length" class="text-kh-grey">{{
          answer.blankPlaceholder
        }}</ce-p>
      </template>
      <template v-if="typeof answer.value === 'string'" #default>
        <ce-p class="text-kh-grey circle-result__text">{{
          answer.value || answer.blankPlaceholder
        }}</ce-p>
      </template>
    </ResultCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@nuxtjs/composition-api'
import QuestionResult from '~/components/molecules/QuestionResult.vue'
import CeP from '~/components/atoms/CeP.vue'
import ResultCard from '~/components/atoms/ResultCard.vue'
import { SubAnswer } from '~/pages-helper/assessment/result/surveyResult'
import CeBullet from '~/components/atoms/CeBullet.vue'
import {
  CircleStrategyEndChallengeInputQuestion,
  CircleStrategyEndInput,
} from '~/pages-helper/assessment/survey/createPage'
import { ENUM_QUESTION_TYPE } from '~/type/enum'

export default defineComponent({
  name: 'CircleResult',
  components: { CeBullet, ResultCard, CeP, QuestionResult },
  props: {
    answers: {
      type: Array as PropType<CircleStrategyEndInput>,
      required: true,
    },
    children: {
      type: Array as PropType<SubAnswer[]>,
      required: true,
    },
    frameworkId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const childrenGroupBy = computed<SubAnswer[]>(() => {
      const notApplicable: SubAnswer[] = []
      const applicable: SubAnswer[] = []
      props.children.forEach((item) => {
        if (item.notApplicable) {
          notApplicable.push(item)
        } else {
          applicable.push(item)
        }
      })
      return [...applicable, ...notApplicable]
    })
    const mappedAnswers = computed(() =>
      props.answers
        .filter(({ model }) => model !== 'challengeExplain')
        .map((answer) => {
          let value = answer.value
          if (answer.model === 'challenge') {
            const ans = answer.value as CircleStrategyEndChallengeInputQuestion
            let newValue: CircleStrategyEndChallengeInputQuestion = {
              check: [],
              other: '',
            }
            newValue.check = ans.check
              .filter((v) => v !== 'Other')
              .filter((x) => !!x.length)
            if (ans.other) newValue.check.push(`Other: ${ans.other}`)
            const explain = props.answers.find(
              ({ model }) => model === 'challengeExplain'
            )?.value as string
            if (explain) newValue.other = explain
            value = newValue
          } else if (
            answer.type === ENUM_QUESTION_TYPE.list &&
            typeof answer.value === 'string'
          ) {
            value = (answer.value as string)
              .split(/[\n,]/)
              .map((name) => name.trim())
              .filter((x) => !!x.length)
          }
          return {
            ...answer,
            value,
          }
        })
    )
    return {
      childrenGroupBy,
      mappedAnswers,
    }
  },
})
</script>
