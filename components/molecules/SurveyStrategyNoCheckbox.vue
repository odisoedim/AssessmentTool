<template>
  <div
    class="
      w-[264px]
      relative
      bg-white
      p-6
      cursor-pointer
      rounded-lg
      flex-none
      shadow-new-card
      ease-out
      transition-all
      hover:shadow-new-card-hover hover-child hover:-translate-y-1
      active:shadow-new-card-pressed active:translate-y-2
      flex
      items-center
      h-auto
      justify-between
    "
    tabindex="0"
    @keydown.enter="onActive"
    @keydown.space="onActive"
    @click="onActive"
  >
    <ce-heading5 class="truncate-2">Not applicable</ce-heading5>
    <ce-checkbox v-model="noCircleStrategies" name="-1" class="fake-hover" />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from '@nuxtjs/composition-api'
import CeCheckbox from '~/components/atoms/CeCheckbox.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import { useCircleStrategyCheck } from '~/pages-helper/assessment/survey/circleStrategyCheck'

export default defineComponent({
  name: 'SurveyStrategyNoCheckbox',
  components: { CeHeading5, CeCheckbox },
  inheritAttrs: false,
  setup() {
    const { circleStrategies, reset, noCircleStrategies } =
      useCircleStrategyCheck()
    watch(
      () => circleStrategies.value,
      (v) => {
        if (v.length) {
          noCircleStrategies.value = []
        }
      }
    )
    const onActive = (e: Event) => {
      if (
        !noCircleStrategies.value.find((item) => {
          return item === '-1'
        })
      ) {
        reset()
        noCircleStrategies.value.push('-1')
      } else {
        noCircleStrategies.value = []
      }
      e.preventDefault()
    }
    return {
      circleStrategies,
      onActive,
      noCircleStrategies,
    }
  },
})
</script>
<style scoped>
.hover-child:hover .fake-hover {
  border-color: #593ccf;
}
</style>
