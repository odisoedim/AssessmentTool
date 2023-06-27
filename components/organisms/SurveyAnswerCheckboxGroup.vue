<template>
  <div class="flex items-center">
    <ul class="flex flex-wrap w-[660px]">
      <li v-for="(item, key) in options" :key="key" class="mb-8 w-full">
        <survey-challenges-checkbox v-model="valueCheck" :name="item.label" />
      </li>
      <li v-if="hasOther" class="mb-8 w-full">
        <survey-challenges-checkbox
          v-model="valueCheck"
          name="Other"
          class="mb-8"
        />
        <template v-if="isOtherChecked">
          <ce-small-text class="mb-3">Other</ce-small-text>
          <ce-input
            v-model="valueInput"
            type="textarea"
            rows="1"
            class="mb-8"
          />
        </template>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  watchEffect,
} from '@nuxtjs/composition-api'
import { useModel } from '@use/useModel'
import SurveyChallengesCheckbox from '~/components/molecules/SurveyChallengesCheckbox.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import CeInput from '~/components/atoms/CeInput.vue'
import { useComputedPages } from '~/pages-helper/assessment/survey/computedPages'
import { SubstrategyQuestionAnswerOption } from '~/type/substrategyQuestion'
import { CircleStrategyEndChallengeInputQuestion } from '~/pages-helper/assessment/survey/createPage'

export default defineComponent({
  name: 'SurveyAnswerCheckboxGroup',
  components: { CeInput, CeSmallText, SurveyChallengesCheckbox },
  props: {
    value: {
      type: Object as PropType<CircleStrategyEndChallengeInputQuestion>,
      required: true,
    },
    options: {
      type: Array as PropType<SubstrategyQuestionAnswerOption[]>,
      required: true,
    },
    hasOther: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const valueCheck = useModel(
      () => props.value.check,
      (v) => {
        emit('input', Object.assign({}, props.value, { check: v }))
      }
    )

    const valueInput = useModel(
      () => props.value.other,
      (v) => {
        emit('input', Object.assign({}, props.value, { other: v }))
      }
    )

    const { validation } = useComputedPages()
    const isOtherChecked = computed(() => valueCheck.value.includes('Other'))
    watchEffect(() => {
      if (isOtherChecked.value && !valueInput.value) {
        validation.close()
      } else {
        validation.open()
      }
    })
    return {
      valueCheck,
      valueInput,
      isOtherChecked,
    }
  },
})
</script>
