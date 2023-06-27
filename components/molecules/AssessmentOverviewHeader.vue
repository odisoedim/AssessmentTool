<template>
  <div>
    <div class="mt-[62.5px] mb-[49.5px]">
      <ce-breadcrumb :paths="paths"></ce-breadcrumb>
    </div>
    <div class="flex">
      <div class="w-[163px] mr-10 flex justify-center items-center">
        <SurveyProgressLine
          v-if="progress < 100"
          :progress="progress"
          class="w-[163px]"
        />
        <SurveyScoreCircle v-else :score="+score < 0 ? 0 : score" />
      </div>
      <div>
        <ce-heading1 class="w-[768px] truncate-2">
          {{ assessment && assessment.title }}
        </ce-heading1>

        <ce-heading4 class="mt-4">
          Framework: Key Elements of the circular economy
        </ce-heading4>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

// components
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'
import SurveyProgressLine from '~/components/molecules/SurveyProgressLine.vue'
import SurveyScoreCircle from '~/components/molecules/SurveyScoreCircle.vue'
import CeBreadcrumb from '~/components/atoms/CeBreadcrumb.vue'

// page helper
import { useInjectAssessmentResult } from '~/pages-helper/assessment/overview/_id'
import { useAssessmentCardResult } from '~/pages-helper/assessment/overview/assesmentCardResult'

// type
import { BreadcrumbItem } from '~/type/base'

// hooks
import { useOrganisation } from '~/composables/useOrganisation'

// utils
import { stringCut } from '~/util/stringCut'

export default defineComponent({
  name: 'AssessmentOverviewHeader',
  components: {
    CeHeading1,
    CeHeading4,
    SurveyProgressLine,
    SurveyScoreCircle,
    CeBreadcrumb,
  },
  props: {
    assessmentResult: {
      type: Object,
      default: () => {
        return {
          title: '',
        }
      },
    },
  },
  setup(props) {
    const { assessment, scores } = useInjectAssessmentResult()
    const { getOrganisation } = useOrganisation()
    const cardsResults = useAssessmentCardResult()

    const score = computed(() => {
      if (!scores || !assessment?.value) return 0
      return scores?.value[assessment.value.id].score
    })
    const progress = computed(() => {
      let completedNum = 0
      cardsResults?.value.forEach((items) => {
        items.completed && completedNum++
      })
      return Math.round(
        (completedNum / (cardsResults?.value.length || 1)) * 100
      )
    })

    const orgName = computed(
      () => getOrganisation.value?.organizationName || ''
    ).value

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
          title: `${stringCut(orgName)} assessments`,
          to: `/assessment/`,
        },
        {
          nuxtLink: true,
          id: '3',
          title: `${stringCut(props.assessmentResult.title)}`,
          to: `#`,
        },
      ]
    })

    return {
      assessment,
      score,
      progress,
      paths,
    }
  },
})
</script>
