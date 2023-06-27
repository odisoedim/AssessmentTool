<template>
  <ce-tabs class="mt-16" title="Results">
    <div class="-mb-8 pt-20 px-10.5 pb-14">
      <div v-for="(arr, key) in resultGroupBy" :key="key">
        <ResultCollapse
          v-for="item in arr"
          :key="item.id"
          class="mb-8"
          :title="item.name"
          :not-applicable="item.notApplicable"
          :score="item.score === -1 ? -1 : item.score"
          :progress="item.progress * 100"
        >
          <CircleResult
            v-if="key === 'completed'"
            :answers="item.answers"
            :children="item.children"
            :framework-id="+frameworkId"
          />
        </ResultCollapse>
      </div>
    </div>
  </ce-tabs>
</template>
<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import CeTabs from '~/components/atoms/CeTabs.vue'
import CircleResult from '~/components/organisms/CircleResult.vue'
import {
  CircleAnswer,
  useSurveyResultGroup,
} from '~/pages-helper/assessment/result/surveyResult'
import ResultCollapse from '~/components/molecules/ResultCollapse.vue'

export default defineComponent({
  name: 'SurveyResultTabs',
  components: {
    ResultCollapse,
    CircleResult,
    CeTabs,
  },
  props: {
    frameworkId: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const result = useSurveyResultGroup()
    const resultGroupBy = computed<Record<string, CircleAnswer[]>>(() => {
      const completed: CircleAnswer[] = []
      const notCompleted: CircleAnswer[] = []
      const notApplicable: CircleAnswer[] = []
      result.value.forEach((item) => {
        if (item.notApplicable) {
          notApplicable.push(item)
        } else if (item.progress === 1) {
          completed.push(item)
        } else {
          notCompleted.push(item)
        }
      })
      return {
        completed,
        notCompleted,
        notApplicable,
      }
    })
    return {
      resultGroupBy,
    }
  },
})
</script>
