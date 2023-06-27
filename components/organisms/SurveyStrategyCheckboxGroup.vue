<template>
  <div>
    <div class="flex flex-wrap -mr-13.5">
      <survey-strategy-checkbox
        v-for="item in children"
        :key="item.id"
        :element="item"
        class="inline-block mb-10 mr-13.5"
      />
    </div>
    <survey-strategy-no-checkbox class="inline-block" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SurveyStrategyCheckbox from '~/components/molecules/SurveyStrategyCheckbox.vue'
import SurveyStrategyNoCheckbox from '~/components/molecules/SurveyStrategyNoCheckbox.vue'
import { useSurveyChildren } from '~/pages-helper/assessment/survey/surveyChildren'

export default defineComponent({
  name: 'SurveyStrategyCheckboxGroup',
  components: { SurveyStrategyCheckbox, SurveyStrategyNoCheckbox },
  setup() {
    const children = useSurveyChildren()
    return {
      children,
    }
  },
})
</script>
