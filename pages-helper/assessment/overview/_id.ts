import {
  computed,
  provide,
  inject,
  Ref,
  InjectionKey,
} from '@nuxtjs/composition-api'
import { useAssessmentResultFetch } from '~/pages-helper/assessment/overview/useAssessmentOverviewResult'
import { useRequest } from '~/composables'
import { provideAssessmentCardResult } from '~/pages-helper/assessment/overview/assesmentCardResult'
import { Assessment } from '~/type/assessment'
import { FrameworkElement } from '~/type/frameworkElement'
import { AnswersStore } from '~/type/schema/answersStore'

const resultSymbol: InjectionKey<Ref | undefined> = Symbol('result')
const assessmentSymbol: InjectionKey<Ref<Assessment | undefined>> =
  Symbol('assessment')
const frameworkElementsSymbol: InjectionKey<
  Ref<FrameworkElement[] | undefined>
> = Symbol('frameworkElements')
const answersSymbol: InjectionKey<Ref<AnswersStore[] | undefined>> =
  Symbol('answers')
const scoresSymbol: InjectionKey<Ref | undefined> = Symbol('score')
export const useAssessmentResult = () => {
  const { fetch } = useAssessmentResultFetch()
  const { result } = useRequest(fetch)
  const assessment = computed(
    () => /* istanbul ignore next */ result.value?.assessmentData?.assessment
  )
  const frameworkElements = computed(
    () =>
      /* istanbul ignore next */ result.value?.frameworksData?.frameworkElements
  )
  const answers = computed(
    () => /* istanbul ignore next */ result.value?.answersData?.answersStores
  )
  const scores = computed(
    () => /* istanbul ignore next */ result.value?.scoresData
  )
  provide(resultSymbol, result)
  provide(assessmentSymbol, assessment)
  provide(frameworkElementsSymbol, frameworkElements)
  provide(answersSymbol, answers)
  provide(scoresSymbol, scores)
  provideAssessmentCardResult(frameworkElements, answers, scores)
}

export const useInjectAssessmentResult: () => {
  assessment: Ref<Assessment | undefined> | undefined
  frameworkElements: Ref<FrameworkElement[] | undefined> | undefined
  answers: Ref<AnswersStore[] | undefined> | undefined
  result: Ref<{} | undefined> | undefined
  scores:
    | Ref<Record<string, { survey: Record<string, number>; score: number }>>
    | undefined
} = () => ({
  result: inject(resultSymbol),
  assessment: inject(assessmentSymbol),
  frameworkElements: inject(frameworkElementsSymbol),
  answers: inject(answersSymbol),
  scores: inject(scoresSymbol),
})
