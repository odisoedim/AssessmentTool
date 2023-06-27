<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="diam + 'px'"
      :height="diam + 'px'"
      :viewBox="`0 0 ${diam} ${diam}`"
    >
      <circle
        :cx="diam / 2"
        :cy="diam / 2"
        :r="radius"
        fill="transparent"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        :stroke="barBgColor"
      />
      <path
        :d="circlePath"
        stroke="#593CCF"
        fill="none"
        stroke-linecap="round"
        :stroke-width="strokeWidth"
        stroke-dashoffset="0px"
        :style="{
          'stroke-dasharray': strokeDasharray,
          transition: '0.6s ease 0s',
          opacity: +score > 0 ? '1' : '0',
        }"
      ></path>
    </svg>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from '@nuxtjs/composition-api'
import { PROGRESS_BG_COLOR_TYPE } from '~/type/enum'

export default defineComponent({
  name: 'CeScoreCircle',
  props: {
    score: {
      type: Number,
      default: 0,
    },
    barBackgroundColor: {
      type: String as PropType<PROGRESS_BG_COLOR_TYPE>,
      default: 'primary',
    },
    strokeWidth: {
      type: [Number, String],
      default: 13,
    },
    diam: {
      type: [Number, String],
      default: 163,
    },
  },
  setup(props) {
    const barBgColorList: Record<PROGRESS_BG_COLOR_TYPE, string> = {
      primary: '#EEECFA',
      grey: '#E2E8F0',
    }
    const barBgColor = computed(() => {
      return barBgColorList[props.barBackgroundColor]
    })
    const radius = computed(() => {
      return (+props.diam - +props.strokeWidth) / 2
    })
    const circlePath = computed(() => {
      return `
            M ${+props.diam / 2} ${+props.diam / 2}
            m 0 -${radius.value}
            a ${radius.value} ${radius.value} 0 0 1 0 ${radius.value * 2}
            a ${radius.value} ${radius.value} 0 0 1 0 -${radius.value * 2}
            `
    })
    const strokeDasharray = computed(() => {
      return (
        (+props.score * 2 * radius.value * +Math.PI.toFixed(2)) / 100 +
        `px, ${2 * radius.value * +Math.PI.toFixed(2)}px`
      )
    })

    return {
      barBgColor,
      circlePath,
      radius,
      strokeDasharray,
    }
  },
})
</script>
