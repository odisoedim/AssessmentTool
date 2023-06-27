<template>
  <div class="px-16.5">
    <ce-heading1 class="mb-6">
      {{ data.frameworkName }}
    </ce-heading1>
    <!-- eslint-disable vue/no-v-html -->
    <ce-p class="mb-6 markdown__content" v-html="markdownToHtml"> </ce-p>
    <!--eslint-enable-->
    <ce-p class="mb-6">
      It consists of {{ data.children.length }} elements:
    </ce-p>
    <ul class="pl-4 -mb-2">
      <li v-for="children in data.children" :key="children.id" class="pb-2">
        <ce-heading5>
          {{ children.name }}
        </ce-heading5>
      </li>
    </ul>
    <ce-p class="mt-16">
      In the next segment of this survey you will learn more about each element
      and assess how you engage with it.
    </ce-p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from '@nuxtjs/composition-api'
import { Marked } from 'marked-ts'
import { useUppercase } from '@use/useUppercase'
import CeP from '~/components/atoms/CeP.vue'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import { useSurveyInfo } from '~/pages-helper/assessment/survey/surveyInfo'
import { useComputedPages } from '~/pages-helper/assessment/survey/computedPages'

export default defineComponent({
  name: 'DemoSurveyQuestionDesc',
  components: {
    CeHeading1,
    CeHeading5,
    CeP,
  },
  setup() {
    const { validation } = useComputedPages()
    const data = useSurveyInfo()
    onMounted(() => validation.open())
    const description = useUppercase(computed(() => data.value.description))
    const markdownToHtml = computed(() => {
      return Marked.parse(description.value || '')
    })

    return {
      data,
      markdownToHtml,
    }
  },
})
</script>
<style scoped>
.markdown__content >>> p {
  margin-bottom: 32px;
}
</style>
