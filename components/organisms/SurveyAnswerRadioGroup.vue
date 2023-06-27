<template>
  <div class="pt-4 pl-10 h-[115px]">
    <div class="flex items-center">
      <div class="flex items-center relative">
        <survey-answer-radio
          v-for="(text, index) in optionGroup.filter((_, i) => i < 5)"
          :key="`${text}_radio`"
          v-model="value_"
          :text="text + ''"
          :index="index"
          class="z-20"
          :class="index > 0 ? 'ml-28.75' : ''"
        />

        <div
          class="
            absolute
            top-1/2
            left-0
            bg-kh-blue-grey-400
            h-[3px]
            w-full
            -translate-y-1/2
            answers__inactive-line
          "
        />
        <div
          class="
            absolute
            top-1/2
            left-0
            bg-kh-primary
            h-2
            -translate-y-1/2
            transition-all
            ease-out
            duration-500
            answers__active-line
          "
          :style="{ width }"
        />
      </div>
      <div class="flex items-center">
        <survey-answer-radio
          v-for="text in optionGroup.filter((_, i) => +i === NOT_APPLICABLE)"
          :key="`${text}_radio`"
          v-model="value_"
          :text="text + ''"
          :index="NOT_APPLICABLE"
          class="z-20 ml-48.25"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useModel } from '@use/useModel'
import SurveyAnswerRadio from '~/components/molecules/SurveyAnswerRadio.vue'
import { useSubStrategyOption } from '~/pages-helper/assessment/survey/subStrategyOption'
import { NOT_APPLICABLE } from '~/util/static'

export default defineComponent({
  name: 'SurveyAnswerRadioGroup',
  components: { SurveyAnswerRadio },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const value_ = useModel(
      () => props.value,
      (v) => emit('input', v)
    )
    const optionGroup = useSubStrategyOption()
    const width = computed(() => {
      if (+value_.value === NOT_APPLICABLE) return '0%'
      if (+value_.value === -1) return '0%'
      return +value_.value * 25 + '%'
    })
    return { value_, optionGroup, NOT_APPLICABLE, width }
  },
})
</script>
