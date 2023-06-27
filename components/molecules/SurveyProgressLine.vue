<template>
  <div>
    <component
      :is="smallText ? 'CeSmallText' : 'CeHeading5'"
      class="mb-2 text-kh-primary text-center"
    >
      {{ progressComp }}% COMPLETED
    </component>
    <CeProgressLine
      :progress="progress"
      :stroke-width="strokeWidthComputed"
      :bar-background-color="barBackgroundColor"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from '@nuxtjs/composition-api'
import { PROGRESS_BG_COLOR_TYPE } from '~/type/enum'
import CeProgressLine from '~/components/atoms/CeProgressLine.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'

export default defineComponent({
  name: 'SurveyProgressLine',
  components: {
    CeProgressLine,
    CeHeading5,
    CeSmallText,
  },
  inheritAttrs: false,
  props: {
    progress: {
      type: Number,
      default: 0,
    },
    smallText: {
      type: Boolean,
      default: false,
    },
    strokeWidth: {
      type: [Number, String],
      default: 0,
    },
    barBackgroundColor: {
      type: String as PropType<PROGRESS_BG_COLOR_TYPE>,
      default: 'primary',
    },
  },
  setup(props) {
    const strokeWidthComputed = computed(() => {
      let strokeWidth: number | string
      if (props.strokeWidth) {
        strokeWidth = props.strokeWidth
      } else {
        strokeWidth = props.smallText ? 8 : 13
      }
      return strokeWidth
    })
    const progressComp = computed(() => {
      return +props.progress < 0 ? 0 : props.progress
    })
    return {
      strokeWidthComputed,
      progressComp,
    }
  },
})
</script>
