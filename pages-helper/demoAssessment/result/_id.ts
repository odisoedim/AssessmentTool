import { computed, provide, inject } from '@nuxtjs/composition-api'
import { useDemoAssessmentResultFetch } from '~/pages-helper/assessment/overview/useAssessmentOverviewResult'
import { useRequest } from '~/composables'
import { Assessment } from '~/type/assessment'
import { FrameworkElement } from '~/type/frameworkElement'
import { AnswersStore } from '~/type/schema/answersStore'
import { provideDemoSurveyResult } from '~/pages-helper/assessment/result/surveyResult'
import { provideDemoSurveyInfo } from '~/pages-helper/assessment/survey/surveyInfo'
import { provideSubStrategyOption } from '~/pages-helper/assessment/survey/subStrategyOption'

const resultSymbol = Symbol('result')
const assessmentSymbol = Symbol('assessment')
const frameworkElementsSymbol = Symbol('frameworkElements')
const answersSymbol = Symbol('answers')

export const useDemoAssessmentResult = () => {
  const { fetch } = useDemoAssessmentResultFetch()
  const { result } = useRequest(fetch)
  const assessment = computed(
    () =>
      /* istanbul ignore next */ result.value?.assessmentData?.demoAssessment
  )
  const frameworkElements = computed(
    () =>
      /* istanbul ignore next */ result.value?.frameworksData?.frameworkElements
  )
  const answers = computed(
    () =>
      /* istanbul ignore next */ result.value?.answersData?.demoAnswersStores
  )
  const score = computed(() => /* istanbul ignore next */ result.value?.score)
  provide(resultSymbol, result)
  provide(assessmentSymbol, assessment)
  provide(frameworkElementsSymbol, frameworkElements)
  provide(answersSymbol, answers)
  provideSubStrategyOption(assessment)
  provideDemoSurveyInfo(assessment, frameworkElements)
  provideDemoSurveyResult(assessment, frameworkElements, answers, score)
}

export const useInjectDemoAssessmentResult: () => {
  assessment: Assessment | undefined
  frameworkElements: FrameworkElement[] | undefined
  answers: AnswersStore[] | undefined
  result: {} | undefined
} = () => ({
  result: inject(resultSymbol),
  assessment: inject(assessmentSymbol),
  frameworkElements: inject(frameworkElementsSymbol),
  answers: inject(answersSymbol),
})
