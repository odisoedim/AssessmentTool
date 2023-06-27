<template>
  <div class="flex items-center justify-center bg-kh-blue-grey-100 w-[167px]">
    <span
      v-if="notApplicable"
      class="text-[36px] text-NotoSans text-kh-blue-grey-400 font-bold"
      >N/A</span
    >
    <template v-else>
      <SurveyScoreCircle
        v-if="progress === 100"
        :score="score"
        small-text
        diam="104"
        stroke-width="8"
        bar-background-color="grey"
      />
      <SurveyProgressLine
        v-else
        :progress="progress"
        small-text
        bar-background-color="grey"
        class="w-30"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SurveyProgressLine from '~/components/molecules/SurveyProgressLine.vue'
import SurveyScoreCircle from '~/components/molecules/SurveyScoreCircle.vue'

export default defineComponent({
  name: 'ResultStatus',
  components: { SurveyScoreCircle, SurveyProgressLine },
  props: {
    score: {
      type: Number,
      default: -1,
    },
    progress: {
      type: Number,
      default: -1,
    },
    notApplicable: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
