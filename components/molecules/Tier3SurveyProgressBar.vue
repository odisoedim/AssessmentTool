<template>
  <div class="w-full h-14.5 relative mx-auto">
    <div
      class="absolute top-0 left-0 right-0 flex items-center mx-auto h-5 z-20"
    >
      <SurveyProgressBarPoint
        active-circle
        :active-icon="pageIndex >= 0"
        :is-current="-1 === pageIndex"
      />
      <SurveyProgressBarLine
        v-if="pageIndex < 0 || pagesLength === 0"
        :active="pageIndex >= 0 && pagesLength === 0"
      />
      <template v-else>
        <SurveyProgressBarLine :active="pageIndex > -1" :style="{ flex: 1 }" />
        <template v-for="(item, index) in computedPages">
          <SurveyProgressBarLine
            v-show="pageIndex >= 0"
            v-if="index"
            :key="`${index}_line`"
            :active="pageIndex >= index"
            :style="{ flex: item.type === 0 ? 3 : 2 }"
            :size="item.type === 0 ? 'sm' : 'lg'"
            :group-length="
              groupCount[index]
                ? groupCount[index].groupIndex.length / pagesLength
                : 0
            "
          >
            <ce-p v-if="groupCount[index] && groupCount[index].type === 'line'">
              <span
                :class="{
                  'font-medium':
                    groupCount[index].groupIndex.includes(pageIndex),
                }"
              >
                {{ item.group.name }}
              </span>
            </ce-p>
          </SurveyProgressBarLine>
          <SurveyProgressBarPoint
            v-show="pageIndex >= 0"
            :key="`${index}_point`"
            :active-icon="furthestPage > index"
            :active-circle="pageIndex >= index"
            :is-current="index === pageIndex"
            :group-length="
              groupCount[index]
                ? groupCount[index].groupIndex.length / pagesLength
                : 0
            "
          >
            <ce-p
              v-if="groupCount[index] && groupCount[index].type === 'point'"
            >
              <span
                :class="{
                  'font-medium':
                    groupCount[index].groupIndex.includes(pageIndex),
                }"
              >
                {{ item.group.name }}
              </span>
            </ce-p>
          </SurveyProgressBarPoint>
        </template>
        <SurveyProgressBarLine
          :active="pageIndex >= pagesLength"
          :style="{ flex: 1 }"
        />
      </template>
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
import SurveyProgressBarLine from '~/components/atoms/SurveyProgressBarLine.vue'
import SurveyProgressBarPoint from '~/components/atoms/SurveyProgressBarPoint.vue'
import CeP from '~/components/atoms/CeP.vue'
import { useComputedPages } from '~/pages-helper/assessment/survey/computedPages'
import { SurveyPage } from '~/pages-helper/assessment/survey/createPage'
import { useSurveyStore } from '~/pages-helper/assessment/survey/surveyStore'

export default defineComponent({
  name: 'Tier3SurveyProgressBar',
  components: {
    CeP,
    SurveyProgressBarPoint,
    SurveyProgressBarLine,
  },
  setup() {
    const { pageIndex, computedPages, furthestPage, pagesLength } =
      useComputedPages()
    const surveyStore = useSurveyStore()
    const isCompleted = computed(() => surveyStore.isCompleted.bool.value)
    const groupCount = computed(() => {
      const group: Record<string, number[]> = {}
      ;(computedPages.value as SurveyPage[]).forEach((i, _index) => {
        const id = i.group.id
        !group[id] && (group[id] = [])
        group[id].push(_index)
      })
      const map: Record<
        string,
        { type: 'line' | 'point'; groupIndex: number[] }
      > = {}
      Object.values(group).forEach((arr) => {
        const index = parseInt(arr.length / 2 + '')
        map[arr[index] + ''] = {
          type: arr.length % 2 ? 'point' : 'line',
          groupIndex: arr,
        }
      })
      return map
    })
    return {
      groupCount,
      pageIndex,
      furthestPage,
      computedPages,
      pagesLength,
      isCompleted,
    }
  },
})
</script>
