<template>
  <div class="px-16.5">
    <ce-heading1 class="mb-6">
      {{ data.data.name }}
    </ce-heading1>
    <!-- eslint-disable vue/no-v-html -->
    <ce-p class="mb-6" v-html="description"> </ce-p>
    <!--eslint-enable-->

    <ce-p class="mb-6">
      {{ `It consists of ${data.data.children.length} substrategies:` }}
    </ce-p>
    <ul class="pl-4 mb-6">
      <li v-for="text in data.data.children" :key="text" class="pb-2">
        <ce-heading5>
          {{ text }}
        </ce-heading5>
      </li>
    </ul>
    <ce-p>
      In the next segment of this assessment you will learn more about each
      substrategy and assess how you engage with it.
    </ce-p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from '@nuxtjs/composition-api'
import { useUppercase } from '@use/useUppercase'
import CeP from '~/components/atoms/CeP.vue'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import { CircleStrategyStartPage } from '~/pages-helper/assessment/survey/createPage'
import { useComputedPages } from '~/pages-helper/assessment/survey/computedPages'

export default defineComponent({
  name: 'SurveyQuestionDesc',
  components: {
    CeHeading1,
    CeHeading5,
    CeP,
  },
  setup() {
    const { computedPages, pageIndex, validation } = useComputedPages()
    const data = computed(() => {
      return computedPages.value[pageIndex.value] as CircleStrategyStartPage
    })
    const description = useUppercase(
      computed(() => data.value.data.description)
    )
    onMounted(() => validation.open())
    return {
      data,
      description,
    }
  },
})
</script>
