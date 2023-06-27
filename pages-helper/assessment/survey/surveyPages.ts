import {
  inject,
  InjectionKey,
  provide,
  ref,
  Ref,
  watch,
} from '@nuxtjs/composition-api'
import {
  createCircleStrategyEndPage,
  createCircleStrategyStartPage,
  createSubStrategyPage,
  createDemoSubStrategyPage,
  createDemoCircleStrategyEndPage,
  DemoSurveyPage,
  SurveyPage,
} from '~/pages-helper/assessment/survey/createPage'
import { Assessment } from '~/type/assessment'
import { FrameworkElement } from '~/type/frameworkElement'
import { genKey } from '~/util/genKey'

const surveyPagesSymbol: InjectionKey<Ref<SurveyPage[] | DemoSurveyPage[]>> =
  Symbol('surveyPages')
export const provideSurveyPages = (
  element: Ref<FrameworkElement | undefined>
) => {
  const pages = ref<SurveyPage[]>([])
  watch(
    element,
    () => {
      if (!element.value) {
        pages.value = []
        return
      }
      const { children } = element.value
      const _children = genKey(children, (i) => i.name)
      const _pages: SurveyPage[] = []
      _children.forEach((CircleStrategy) => {
        _pages.push(createCircleStrategyStartPage(CircleStrategy))
        ;(CircleStrategy.children || []).forEach((SubStrategy) => {
          const { id, name } = CircleStrategy
          _pages.push(createSubStrategyPage(SubStrategy, { id, name }))
        })
        _pages.push(createCircleStrategyEndPage(CircleStrategy))
      })
      pages.value = _pages
    },
    { immediate: true }
  )

  provide(surveyPagesSymbol, pages)
}

export const provideDemoSurveyPages = (
  assessment: Ref<Assessment | undefined>,
  elements: Ref<FrameworkElement[] | undefined>
) => {
  const pages = ref<DemoSurveyPage[]>([])
  watch(
    elements,
    () => {
      if (!elements.value || !assessment.value) {
        pages.value = []
        return
      }
      const _elements = genKey(elements.value, (i) => i.name)
      const _pages: DemoSurveyPage[] = []
      _elements.forEach((frameWork) => {
        _pages.push(createDemoSubStrategyPage(frameWork))
      })
      _pages.push(createDemoCircleStrategyEndPage(assessment.value, _elements))
      pages.value = _pages
    },
    { immediate: true }
  )

  provide(surveyPagesSymbol, pages)
}
export const useSurveyPages = () => inject(surveyPagesSymbol)!
