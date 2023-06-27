<template>
  <div
    class="
      relative
      flex
      justify-center
      items-center
      w-5
      h-5
      bg-white
      z-10
      rounded-full
      border
      shadow-button
    "
    :class="[...classList, { 'shadow-circle-out': isCurrent }]"
  >
    <CeIcon
      v-show="activeIcon"
      :stroke-width="4"
      name="check"
      theme="primary"
    />
    <SurveyProgressCircleTitle
      v-if="$slots.default"
      :style="{ width: `${groupLength * 800}px` }"
    >
      <slot></slot>
    </SurveyProgressCircleTitle>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import CeIcon from '~/components/atoms/CeIcon.vue'
import SurveyProgressCircleTitle from '~/components/atoms/SurveyProgressCircleTitle.vue'

export default defineComponent({
  name: 'SurveyProgressBarPoint',
  components: { SurveyProgressCircleTitle, CeIcon },
  props: {
    activeIcon: {
      type: Boolean,
      default: false,
    },
    activeCircle: {
      type: Boolean,
      default: false,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    groupLength: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const classList = computed(() =>
      props.activeCircle
        ? ['border-kh-primary', 'border-3']
        : ['border-kh-blue-grey-500', 'border-2']
    )
    return {
      classList,
    }
  },
})
</script>
