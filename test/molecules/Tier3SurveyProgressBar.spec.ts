import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import Tier3SurveyProgressBar from '~/components/molecules/Tier3SurveyProgressBar.vue'
import {
  useComputedPagesMock,
  useSurveyStoreMock,
} from '~/test/helper/mockInject'
import { renderFrameworkElements } from '~/test/helper/mockData'
import {
  createCircleStrategyEndPage,
  createCircleStrategyStartPage,
  createSubStrategyPage,
  SurveyPage,
} from '~/pages-helper/assessment/survey/createPage'
import SurveyProgressBarLine from '~/components/atoms/SurveyProgressBarLine.vue'
import SurveyProgressBarPoint from '~/components/atoms/SurveyProgressBarPoint.vue'

const useComputedPages = useComputedPagesMock()
jest.mock('~/pages-helper/assessment/survey/computedPages', () => ({
  useComputedPages: () => useComputedPages.mock(),
}))
const element = renderFrameworkElements(1)

const useSurveyStore = useSurveyStoreMock()
jest.mock('~/pages-helper/assessment/survey/surveyStore', () => ({
  useSurveyStore: () => useSurveyStore.mock(),
}))
useSurveyStore.isCompleted.mockReturnValue({
  bool: ref(false),
})
const pages: SurveyPage[] = []
element.children!.forEach((CircleStrategy) => {
  pages.push(createCircleStrategyStartPage(CircleStrategy))
  ;(CircleStrategy.children || []).forEach((SubStrategy) => {
    const { id, name } = CircleStrategy
    pages.push(createSubStrategyPage(SubStrategy, { id, name }))
  })
  pages.push(createCircleStrategyEndPage(CircleStrategy))
})

describe('Tier3SurveyProgressBar', () => {
  it('can work', () => {
    const wrap = shallowMount(Tier3SurveyProgressBar)
    expect(wrap).toBeTruthy()
  })
  it('has render line and checkmark by pages', () => {
    useComputedPages.computedPages.mockReturnValue(ref(pages))
    useComputedPages.pageIndex.mockReturnValue(ref(0))
    const wrap = shallowMount(Tier3SurveyProgressBar)
    expect(wrap.findAllComponents(SurveyProgressBarLine).length).toBe(10)
    expect(wrap.findAllComponents(SurveyProgressBarPoint).length).toBe(11)
  })
  it('render check mark of last point if survey is completed', () => {
    useSurveyStore.isCompleted.mockReturnValue({
      bool: ref(true),
    })
    useComputedPages.computedPages.mockReturnValue(ref(pages))
    useComputedPages.pageIndex.mockReturnValue(ref(0))
    const wrap = shallowMount(Tier3SurveyProgressBar)
    const points = wrap.findAllComponents(SurveyProgressBarPoint)
    expect(points.at(points.length - 1).vm.$props.activeIcon).toBe(true)
  })
})
