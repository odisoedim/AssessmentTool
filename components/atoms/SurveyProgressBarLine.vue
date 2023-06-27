<template>
  <div :class="classList" class="w-full -mx-1 relative bg-kh-blue-grey-500">
    <div
      :class="[
        classList,
        active ? 'w-full' : 'w-0',
        { 'transition-all duration-500': animate },
      ]"
      class="bg-kh-primary"
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
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
} from '@nuxtjs/composition-api'
import SurveyProgressCircleTitle from '~/components/atoms/SurveyProgressCircleTitle.vue'
import { useBoolean } from '~/composables'

export default defineComponent({
  name: 'SurveyProgressBarLine',
  components: { SurveyProgressCircleTitle },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<'lg' | 'sm' | 'md'>,
      default: 'sm',
    },
    groupLength: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const { bool: animate, open } = useBoolean()
    onMounted(() => setTimeout(open, 600))
    const classList = computed(() => {
      return { lg: 'h-2.5', sm: 'h-1', md: 'h-2' }[props.size]
    })

    return { classList, animate }
  },
})
</script>
