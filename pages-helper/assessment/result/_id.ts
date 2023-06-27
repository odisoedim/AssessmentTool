import {
  computed,
  provide,
  inject,
  InjectionKey,
  Ref,
} from '@nuxtjs/composition-api'
import { provideSubStrategyOption } from '~/pages-helper/assessment/survey/subStrategyOption'
import { provideSurveyInfo } from '~/pages-helper/assessment/survey/surveyInfo'
import { useSurveyResultFetch } from '~/pages-helper/assessment/result/useSurveyResult'
import { provideSurveyResultGroup } from '~/pages-helper/assessment/result/surveyResult'
import { useRequest } from '~/composables'
import { AnswersStore } from '~/type/schema/answersStore'
import { Assessment } from '~/type/assessment'
import { FrameworkElement } from '~/type/frameworkElement'

const answerSymbol: InjectionKey<Ref<AnswersStore | undefined>> =
  Symbol('answer')
const assessmentSymbol: InjectionKey<Ref<Assessment | undefined>> =
  Symbol('assessment')
const frameworkSymbol: InjectionKey<Ref<FrameworkElement | undefined>> =
  Symbol('framework')
export const useSurveyResult = () => {
  const { fetch } = useSurveyResultFetch()
  const { result } = useRequest(fetch)
  const assessment = computed(
    () => /* istanbul ignore next */ result.value?.assessmentData?.assessment
  )
  const framework = computed(
    () =>
      /* istanbul ignore next */ result.value?.frameworksData?.frameworkElement
  )
  const answer = computed(
    () => /* istanbul ignore next */ result.value?.answersData?.answersStores[0]
  )
  const circleScoresData = computed(
    () => /* istanbul ignore next */ result.value?.circleScoresData
  )
  provideSubStrategyOption(assessment)
  provideSurveyInfo(framework, assessment)
  provideSurveyResultGroup(framework, answer, circleScoresData)
  provide(answerSymbol, answer)
  provide(assessmentSymbol, assessment)
  provide(frameworkSymbol, framework)
  return { result, assessment, framework, answer }
}

export const useInjectSurveyResult = () => {
  return {
    injectAnswer: inject(answerSymbol),
    injectAssessment: inject(assessmentSymbol),
    injectFramework: inject(frameworkSymbol),
  }
}
