<template>
  <div class="relative" :style="{ width: diam + 'px' }">
    <div
      class="
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2 -translate-y-1/2
        text-center
      "
    >
      <component
        :is="smallText ? 'CeSmallText' : 'CeHeading5'"
        class="mb-2 text-kh-primary"
      >
        SCORE
      </component>
      <span
        class="font-Rubik text-kh-primary font-bold inline-block tracking-04"
        :class="smallText ? 'text-[36px] h-8 -mt-4' : 'text-6xl -mt-2'"
        >{{ Math.round(+score) }}</span
      >
    </div>
    <CeScoreCircle
      :score="score"
      :diam="diam"
      :stroke-width="strokeWidth"
      :bar-background-color="barBackgroundColor"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { PROGRESS_BG_COLOR_TYPE } from '~/type/enum'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import CeScoreCircle from '~/components/atoms/CeScoreCircle.vue'

export default defineComponent({
  name: 'SurveyScoreCircle',
  components: {
    CeScoreCircle,
    CeHeading5,
    CeSmallText,
  },
  inheritAttrs: false,
  props: {
    score: {
      type: Number,
      default: 0,
    },
    smallText: {
      type: Boolean,
      default: false,
    },
    strokeWidth: {
      type: [Number, String],
      default: 13,
    },
    diam: {
      type: [Number, String],
      default: 163,
    },
    barBackgroundColor: {
      type: String as PropType<PROGRESS_BG_COLOR_TYPE>,
      default: 'primary',
    },
  },
})
</script>
