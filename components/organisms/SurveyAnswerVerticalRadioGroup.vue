<template>
  <div class="flex items-center">
    <ul class="flex flex-wrap w-[660px]">
      <li
        v-for="(option, index) in options_"
        :key="`${index}_radio`"
        class="mb-8 w-full"
        @click="onActive(index)"
      >
        <survey-answer-vertical-radio
          v-model="radioCheck"
          :text="option.label"
          :index="index"
        />
      </li>
      <li v-if="otherChecked" class="w-full">
        <ce-input v-model="valueInput" type="textarea" rows="1" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { useModel } from '@use/useModel'
import SurveyAnswerVerticalRadio from '~/components/molecules/SurveyAnswerVerticalRadio.vue'
import CeInput from '~/components/atoms/CeInput.vue'
import { SubstrategyQuestionAnswerOption } from '~/type/substrategyQuestion'
import { CircleStrategyRadioInput } from '~/pages-helper/assessment/survey/createPage'

export default defineComponent({
  name: 'SurveyAnswerRadioGroup',
  components: { SurveyAnswerVerticalRadio, CeInput },
  props: {
    value: {
      type: Object as PropType<CircleStrategyRadioInput>,
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
  setup(props, { emit }) {
    const radioCheck = useModel(
      () => props.value.radio,
      (v) =>
        emit('input', Object.assign({}, props.value, { radio: v.toString() }))
    )

    const valueInput = useModel(
      () => props.value.other,
      (v) => {
        emit('input', Object.assign({}, props.value, { other: v }))
      }
    )

    const options_ = computed(() =>
      !props.hasOther
        ? props.options
        : [...props.options, { label: 'Other', value: '-2' }]
    )
    const otherChecked = computed(
      () => props.hasOther && +radioCheck.value === props.options.length
    )

    return {
      onActive(index: number) {
        radioCheck.value = index.toString()
      },
      options_,
      otherChecked,
      valueInput,
      radioCheck,
    }
  },
})
</script>
