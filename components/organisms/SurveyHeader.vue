<template>
  <div class="bg-kh-blue-grey-100">
    <div
      class="h-[240px] flex flex-col px-4 box-content w-[1032px] mx-auto -translate-x-4"
    >
      <div class="mt-[62.5px] mb-[49.5px]">
        <ce-breadcrumb :paths="paths"></ce-breadcrumb>
      </div>

      <ce-heading4 class="mb-3">{{ info.assessmentName }}</ce-heading4>
      <ce-p>Framework: {{ info.frameworkName }}</ce-p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

// component
import CeHeading4 from '~/components/atoms/CeHeading4.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeBreadcrumb from '~/components/atoms/CeBreadcrumb.vue'

// utils
import { stringCut } from '~/util/stringCut'

// type
import { BreadcrumbItem } from '~/type/base'

// hooks
import { useUppercase } from '~/composables/useUppercase'
import { useOrganisation } from '~/composables/useOrganisation'
import { useSurveyInfo } from '~/pages-helper/assessment/survey/surveyInfo'
import { useSurveyIds } from '~/pages-helper/assessment/survey/surveyIds'

export default defineComponent({
  name: 'SurveyHeader',
  components: { CeP, CeHeading4, CeBreadcrumb },
  props: {
    fromDemo: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const info = useSurveyInfo()
    const { assessmentId } = useSurveyIds()
    const surveyName = useUppercase(computed(() => info.value.name))
    const assessmentName = useUppercase(
      computed(() => info.value.assessmentName)
    )
    const { getOrganisation } = useOrganisation()
    const orgName = computed(
      () => getOrganisation.value?.organizationName || ''
    )
    const backUrl = computed(() => {
      return props.fromDemo
        ? `/demoAssessment/result/${assessmentId.value}`
        : `/assessment/overview/${assessmentId.value}`
    })

    const paths = computed<BreadcrumbItem[]>(() => {
      return [
        {
          nuxtLink: true,
          id: '1',
          title: 'Organisations',
          to: '/assessment/organisations',
        },
        {
          nuxtLink: true,
          id: '2',
          title: `${stringCut(orgName.value)} assessments`,
          to: `/assessment/`,
        },
        {
          nuxtLink: true,
          id: '3',
          title: `${stringCut(assessmentName.value)}`,
          to: `${backUrl.value}`,
        },
        {
          nuxtLink: false,
          id: '4',
          title: `${stringCut(surveyName.value)}`,
          to: `#`,
        },
      ]
    })

    return { info, assessmentId, backUrl, paths }
  },
})
</script>
