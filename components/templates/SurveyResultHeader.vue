<template>
  <div class="h-20 flex items-center">
    <ce-breadcrumb :paths="paths"></ce-breadcrumb>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { BreadcrumbItem } from '~/type/base'
import { useInjectSurveyResult } from '~/pages-helper/assessment/result/_id'
import CeBreadcrumb from '~/components/atoms/CeBreadcrumb.vue'

export default defineComponent({
  name: 'SurveyResultHeader',
  components: { CeBreadcrumb },
  setup() {
    const { injectAssessment: assessment, injectFramework: framework } =
      useInjectSurveyResult()
    const paths = computed<BreadcrumbItem[]>(() => {
      return [
        { nuxtLink: true, id: '1', title: 'Assessments', to: '/assessment' },
        {
          nuxtLink: true,
          id: '2',
          title: `${assessment?.value?.name}`,
          to: `/assessment/overview/${assessment?.value?.id}`,
        },
        {
          nuxtLink: true,
          id: '3',
          title: `${framework?.value?.name}`,
          to: `/assessment/result/${assessment?.value?.id}_${framework?.value?.id}`,
        },
      ]
    })
    return { paths }
  },
})
</script>
