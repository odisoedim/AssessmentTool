<template>
  <div>
    <div class="mt-[62.5px] mb-[49.5px]">
      <ce-breadcrumb :paths="paths"></ce-breadcrumb>
    </div>

    <div class="flex">
      <div class="w-[163px] mr-10 flex justify-center items-center">
        <span
          v-if="isCompleted && score < 0"
          class="text-[70px] text-NotoSans text-kh-blue-grey-400 font-bold"
          >N/A</span
        >
        <SurveyProgressLine
          v-else-if="!isCompleted"
          :progress="progress"
          class="w-[163px]"
        />
        <SurveyScoreCircle v-else-if="score >= 0" :score="score" />
      </div>
      <div>
        <ce-heading1 class="w-[768px] truncate-2">
          {{ surveyName }}
        </ce-heading1>
        <ce-heading4 class="mt-4"> Framework:{{ framework }} </ce-heading4>
        <ce-button
          root-type="nuxt-link"
          :to="
            isDemoResult
              ? `/demoAssessment/survey/${id}`
              : `/assessment/survey/${id}`
          "
          :theme="buttonType.includes('Edit') ? 'secondary' : 'primary'"
          class="mt-8"
          :left-icon="buttonType.includes('Edit') ? 'edit' : ''"
          >{{ buttonType }}</ce-button
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

// hooks
import { useParamsId } from '@use/useParamsId'
import { useUppercase } from '@use/useUppercase'
import { useOrganisation } from '~/composables/useOrganisation'

// components
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import SurveyProgressLine from '~/components/molecules/SurveyProgressLine.vue'
import SurveyScoreCircle from '~/components/molecules/SurveyScoreCircle.vue'
import { useSurveyInfo } from '~/pages-helper/assessment/survey/surveyInfo'
import CeBreadcrumb from '~/components/atoms/CeBreadcrumb.vue'

// utils
import { stringCut } from '~/util/stringCut'

// type
import { BreadcrumbItem } from '~/type/base'

export default defineComponent({
  name: 'SurveyResultContentHeader',
  components: {
    CeHeading1,
    CeHeading4,
    CeButton,
    SurveyProgressLine,
    SurveyScoreCircle,
    CeBreadcrumb,
  },
  props: {
    score: {
      type: Number,
      default: 0,
    },
    progress: {
      type: Number,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isDemoResult: {
      type: Boolean,
      default: false,
    },
    assessmentTitle: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const id = useParamsId()
    const info = useSurveyInfo()
    const { getOrganisation } = useOrganisation()

    const isDemoResult = () => {
      if (props.isCompleted) return 'Edit assessment'
      if (props.progress <= 0) return 'Start assessment'
      return 'Resume assessment'
    }
    const isDemoSurveyResult = () => {
      if (props.isCompleted) return 'Edit survey'
      if (props.progress <= 0) return 'Start survey'
      return 'Resume survey'
    }

    const buttonType = props.isDemoResult
      ? computed(() => isDemoResult())
      : computed(() => isDemoSurveyResult())

    const orgName = computed(
      () => getOrganisation.value?.organizationName || ''
    ).value
    const surveyName = computed(() => info.value.name || '').value
    const framework = computed(() => info.value.frameworkName || '')
    const assessmentId = computed(() => id.value.split('_')[0]).value

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
          title: `${stringCut(props.assessmentTitle)}`,
          to: `/assessment/overview/${assessmentId}`,
        },
        {
          nuxtLink: false,
          id: '4',
          title: `${stringCut(surveyName)}`,
          to: `#`,
        },
      ]
    })

    return {
      id,
      surveyName: useUppercase(surveyName),
      framework: useUppercase(framework),
      buttonType,
      paths,
    }
  },
})
</script>
