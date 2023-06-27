<template>
  <div class="h-7.5 w-full relative mx-auto">
    <div
      class="absolute top-0 left-0 right-0 flex items-center mx-auto h-5 z-20"
    >
      <SurveyProgressBarPoint
        active-circle
        :active-icon="furthestPage > -1 || pageIndex >= 0"
        :is-current="-1 === pageIndex"
      />
      <SurveyProgressBarLine :active="pageIndex > -1" :style="{ flex: 2 }" />
      <template v-for="(item, index) in computedPages">
        <SurveyProgressBarLine
          v-if="index"
          :key="`${item.data.id}_${index}_line`"
          :active="pageIndex >= index"
          :style="{ flex: 3 }"
        />
        <SurveyProgressBarPoint
          :key="`${item.data.id}_${index}_point`"
          :active-icon="furthestPage > index"
          :active-circle="pageIndex >= index"
          :is-current="index === pageIndex"
        />
      </template>
      <SurveyProgressBarLine
        :active="pageIndex >= pagesLength"
        :style="{ flex: 2 }"
      />
      <SurveyProgressBarPoint
        :active-circle="furthestPage > -1 && pageIndex === pagesLength"
        :is-current="pagesLength === pageIndex"
        :active-icon="pageIndex >= 0 && isCompleted"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import SurveyProgressBarPoint from '~/components/atoms/SurveyProgressBarPoint.vue'
import SurveyProgressBarLine from '~/components/atoms/SurveyProgressBarLine.vue'
import { useComputedPages } from '~/pages-helper/assessment/survey/computedPages'
import { useSurveyStore } from '~/pages-helper/assessment/survey/surveyStore'

export default defineComponent({
  name: 'DemoTier1SurveyProgressBar',
  components: { SurveyProgressBarLine, SurveyProgressBarPoint },
  setup() {
    const { pageIndex, computedPages, furthestPage, pagesLength } =
      useComputedPages()
    const surveyStore = useSurveyStore()
    const isCompleted = computed(() => surveyStore.isCompleted.bool.value)
    return { pageIndex, furthestPage, computedPages, pagesLength, isCompleted }
  },
})
</script>
