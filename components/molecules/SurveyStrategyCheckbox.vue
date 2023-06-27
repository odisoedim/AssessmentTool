<template>
  <div
    class="
      w-[264px]
      inline-block
      h-[304px]
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
    "
    tabindex="0"
    @keydown.enter="onActive"
    @keydown.space="onActive"
    @click="onActive"
  >
    <ce-heading5 class="truncate-2 'mb-4'">{{ element.name }}</ce-heading5>
    <ce-p class="truncate-5">{{ element.description }}</ce-p>
    <ce-checkbox
      v-model="circleStrategies"
      :name="element.id + ''"
      class="fake-hover bottom-6 right-6 absolute"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import CeCheckbox from '~/components/atoms/CeCheckbox.vue'
import { FrameworkElement } from '~/type/frameworkElement'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import CeP from '~/components/atoms/CeP.vue'
import { useCircleStrategyCheck } from '~/pages-helper/assessment/survey/circleStrategyCheck'

export default defineComponent({
  name: 'SurveyStrategyCheckbox',
  components: { CeP, CeHeading5, CeCheckbox },
  inheritAttrs: false,
  props: {
    element: {
      type: Object as PropType<FrameworkElement>,
      required: true,
    },
  },
  setup(props) {
    const { circleStrategies, setCircleStrategies } = useCircleStrategyCheck()
    const onActive = (e: Event) => {
      e.preventDefault()
      setCircleStrategies(props.element.id + '')
    }
    return {
      circleStrategies,
      onActive,
    }
  },
})
</script>
<style scoped>
.hover-child:hover .fake-hover {
  border-color: #593ccf;
}
</style>
