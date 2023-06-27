<template>
  <div class="flex items-center">
    <ul class="flex flex-wrap w-[480px]">
      <li v-for="item in options" :key="item.id" class="mb-8 w-full">
        <survey-challenges-checkbox v-model="valueCheck" :name="item.name" />
      </li>
    </ul>
    <div class="ml-12 flex-1">
      <survey-challenges-checkbox
        v-model="valueCheck"
        name="Other"
        class="mb-8"
      />
      <template v-if="isOtherChecked">
        <ce-small-text class="mb-3"
          >Please explain the key challenge(s) you face that are not already
          listed here</ce-small-text
        >
        <ce-input v-model="valueInput" type="textarea" rows="1" class="mb-8" />
      </template>
    </div>
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
import { useChallengeOptions } from '~/pages-helper/assessment/survey/challengeOptions'
import { useComputedPages } from '~/pages-helper/assessment/survey/computedPages'
import { CircleStrategyEndChallengeInputQuestion } from '~/pages-helper/assessment/survey/createPage'

export default defineComponent({
  name: 'SurveyChallengesCheckboxGroup',
  components: { CeInput, CeSmallText, SurveyChallengesCheckbox },
  props: {
    value: {
      type: Object as PropType<CircleStrategyEndChallengeInputQuestion>,
      required: true,
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

    const options = useChallengeOptions()

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
      options,
      valueInput,
      isOtherChecked,
    }
  },
})
</script>
