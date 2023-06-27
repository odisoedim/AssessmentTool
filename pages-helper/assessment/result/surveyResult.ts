import {
  InjectionKey,
  Ref,
  provide,
  inject,
  computed,
} from '@nuxtjs/composition-api'
import { FrameworkElement } from '~/type/frameworkElement'
import { AnswersStore, DemoAnswersStore } from '~/type/schema/answersStore'
import { genKey } from '~/util/genKey'
import {
  CircleStrategyEndInput,
  SubStrategyInput,
} from '~/pages-helper/assessment/survey/createPage'
import { ID } from '~/type/base'
import { NOT_APPLICABLE } from '~/util/static'
import { Assessment } from '~/type/assessment'

export interface SubAnswer {
  id: ID
  name: string
  option: string
  provideExample: string
  notApplicable: boolean
}
export interface CircleAnswer {
  name: string
  id: ID
  notApplicable: boolean
  progress: number
  score: number
  children: SubAnswer[]
  answers: CircleStrategyEndInput | null
}
export const surveyResultGroupSymbol: InjectionKey<Ref<CircleAnswer[]>> =
  Symbol('surveyResultGroup')
export const provideSurveyResultGroup = (
  element: Ref<FrameworkElement | undefined>,
  answers: Ref<AnswersStore | undefined>,
  circleScores: Ref<Record<string, number> | undefined>
) => {
  const result = computed<CircleAnswer[]>(() => {
    if (!element.value) {
      return []
    }
    const { children } = element.value
    const _children = genKey(children, (i) => i.name)
    const _result: CircleAnswer[] = []
    _children.forEach((CircleStrategy) => {
      const obj: CircleAnswer = {
        name: CircleStrategy.name,
        id: CircleStrategy.id,
        notApplicable: false,
        progress: 0,
        score: -1,
        children: [],
        answers: null,
      }
      if (!answers.value) {
        _result.push(obj)
        return
      }
      if (
        !answers.value.progress.circleStrategies.includes(
          CircleStrategy.id + ''
        )
      ) {
        obj.notApplicable = true
        _result.push(obj)
        return
      }
      let progress = 0

      /* istanbul ignore next */ ;(CircleStrategy.children || []).forEach(
        (SubStrategy) => {
          const { id, name } = SubStrategy
          const { option, provideExample } = answers.value!.data[
            id
          ] as SubStrategyInput
          obj.children.push({
            id,
            name,
            option,
            provideExample,
            notApplicable: +option === NOT_APPLICABLE,
          })
          if (+option !== -1) {
            progress++
          }
        }
      )
      obj.progress = CircleStrategy.children
        ? progress / (CircleStrategy.children.length || 1)
        : -1
      obj.score = circleScores.value
        ? circleScores.value[CircleStrategy.id]
        : -1

      obj.answers = answers.value.data[
        CircleStrategy.id
      ] as CircleStrategyEndInput
      if (obj.score === -1 && obj.progress === 1) {
        obj.notApplicable = true
      }
      _result.push(obj)
    })
    return _result
  })
  provide(surveyResultGroupSymbol, result)
}

export const useSurveyResultGroup = () => inject(surveyResultGroupSymbol)!

export interface DemoSurveyResult {
  id: ID
  name: string
  progress: number
  score: number
  completed: boolean
  children: SubAnswer[]
  answers: CircleStrategyEndInput | null
}
export const demoSurveyResultSymbol: InjectionKey<
  Ref<DemoSurveyResult | undefined>
> = Symbol('surveyResultGroup')
export const provideDemoSurveyResult = (
  assessment: Ref<Assessment | undefined>,
  elements: Ref<FrameworkElement[] | undefined>,
  answers: Ref<DemoAnswersStore[] | undefined>,
  score: Ref<number | undefined>
) => {
  const result = computed<DemoSurveyResult | undefined>(() => {
    if (!assessment.value) {
      return
    }
    if (!elements.value) {
      return
    }

    const obj: DemoSurveyResult = {
      id: assessment.value.id,
      name: assessment.value.name,
      progress: 0,
      score: score.value ?? -1,
      completed: false,
      children: [],
      answers: null,
    }

    let progress = 0

    elements.value.forEach((element) => {
      const { id, name } = element
      let option = '-1'
      let provideExample = ''
      if (answers.value && answers.value[0]) {
        const subStrategyInput = answers.value[0].data[id] as SubStrategyInput
        if (subStrategyInput) {
          option = subStrategyInput.option
          provideExample = subStrategyInput.provideExample
        }
      }

      obj.children.push({
        id,
        name,
        option,
        provideExample,
        notApplicable: +option === NOT_APPLICABLE,
      })
      if (+option !== -1) {
        progress++
      }
    })
    obj.progress = Math.floor((progress / elements.value.length) * 100)
    if (answers.value && answers.value[0]) {
      obj.completed = answers.value[0].completed
      const strategyEndInput = answers.value[0].data[
        assessment.value.framework_id
      ] as CircleStrategyEndInput
      if (strategyEndInput) {
        obj.answers = strategyEndInput
      }
    }
    return obj
  })
  provide(demoSurveyResultSymbol, result)
}

export const useDemoSurveyResult = () => inject(demoSurveyResultSymbol)
