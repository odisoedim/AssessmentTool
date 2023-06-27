import {
  InjectionKey,
  Ref,
  provide,
  inject,
  computed,
} from '@nuxtjs/composition-api'
import { FrameworkElement } from '~/type/frameworkElement'
import { AnswersStore } from '~/type/schema/answersStore'
import { SubStrategyInput } from '~/pages-helper/assessment/survey/createPage'
import { useParamsId } from '~/composables/useParamsId'

export interface AssessmentCardResult {
  name: string
  id: number | string
  notApplicable: boolean
  completed: boolean
  progress: number
  score: number
}
class ResultItem {
  public name: string = ''
  public id: number | string = ''
  public progress: number = 0
  public score: number = -1
  public completed: boolean = false

  public get notApplicable() {
    if (this.completed && (this.score === -1 || this.progress === -1))
      return true
    return false
  }
}

export const assessmentCardResultSymbol: InjectionKey<
  Ref<AssessmentCardResult[]>
> = Symbol('assessmentCardResult')

export const provideAssessmentCardResult: (
  frameworkElements: Ref<FrameworkElement[] | undefined>,
  answers: Ref<AnswersStore[] | undefined>,
  scores: Ref<
    | Record<string, { survey: Record<string, number>; score: number }>
    | undefined
  >
) => void = (frameworkElements, answers, scores) => {
  const assessmentId = useParamsId().value.split('_')[0]
  const surveyScores = computed<Record<string, number>>(() => {
    if (!scores.value) return {}
    return scores.value[assessmentId].survey
  })
  const results = computed<AssessmentCardResult[]>(() => {
    if (!frameworkElements.value) {
      return []
    }
    const answersMap = new Map()
    answers.value?.forEach((answer) => {
      answersMap.set(answer.surveyId + '', answer)
    })

    const _results: AssessmentCardResult[] = []
    frameworkElements.value.forEach((frameworkElement) => {
      const resultItem = new ResultItem()
      resultItem.name = frameworkElement.name
      resultItem.id = frameworkElement.id
      const answer = answersMap.get(frameworkElement.id + '')
      if (answer) {
        const questionsNum = Object.values(answer.data).filter(
          (item) => (item as SubStrategyInput)?.option
        ).length
        let progress = 0
        for (const key in answer.data) {
          if (+(answer.data[key] as SubStrategyInput)?.option > -1) {
            progress++
          }
        }
        resultItem.progress = questionsNum
          ? Math.round((progress / questionsNum) * 100)
          : -1
        resultItem.completed = answer.completed
        if (resultItem.progress === 100) {
          resultItem.score = Object.keys(surveyScores.value).length
            ? surveyScores.value[resultItem.id]
            : 0
        }
      }
      _results.push(resultItem)
    })

    const getOrderWeights = (result: AssessmentCardResult) => {
      let weights = result.progress
      if (result.completed) {
        weights++
      }
      if (result.notApplicable) {
        weights += 10
      }
      return weights
    }

    _results.sort((a, b) => getOrderWeights(a) - getOrderWeights(b))

    return _results
  })
  provide(assessmentCardResultSymbol, results)
}

export const useAssessmentCardResult = () => inject(assessmentCardResultSymbol)
