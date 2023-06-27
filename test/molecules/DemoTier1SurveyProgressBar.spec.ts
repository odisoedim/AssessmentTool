import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import Tier1SurveyProgressBar from '~/components/molecules/DemoTier1SurveyProgressBar.vue'
import {
  useComputedPagesMock,
  useSurveyStoreMock,
} from '~/test/helper/mockInject'
import {
  renderAssessment,
  renderFrameworkElements,
} from '~/test/helper/mockData'
import {
  createDemoCircleStrategyEndPage,
  createDemoSubStrategyPage,
  DemoSurveyPage,
} from '~/pages-helper/assessment/survey/createPage'
import SurveyProgressBarLine from '~/components/atoms/SurveyProgressBarLine.vue'
import SurveyProgressBarPoint from '~/components/atoms/SurveyProgressBarPoint.vue'

const useComputedPages = useComputedPagesMock()
jest.mock('~/pages-helper/assessment/survey/computedPages', () => ({
  useComputedPages: () => useComputedPages.mock(),
}))
const assessment = renderAssessment(1)
const elements = [renderFrameworkElements(1)]
const pages: DemoSurveyPage[] = []
elements.forEach((frameWork) => {
  pages.push(createDemoSubStrategyPage(frameWork))
})
pages.push(createDemoCircleStrategyEndPage(assessment, elements))
const useSurveyStore = useSurveyStoreMock()
jest.mock('~/pages-helper/assessment/survey/surveyStore', () => ({
  useSurveyStore: () => useSurveyStore.mock(),
}))
useSurveyStore.isCompleted.mockReturnValue({
  bool: ref(false),
})
describe('Tier1SurveyProgressBar', () => {
  it('can work', () => {
    const wrap = shallowMount(Tier1SurveyProgressBar)
    expect(wrap).toBeTruthy()
  })
  it('has render line and checkmark by pages', () => {
    useComputedPages.computedPages.mockReturnValue(ref(pages))
    useComputedPages.pageIndex.mockReturnValue(ref(0))
    const wrap = shallowMount(Tier1SurveyProgressBar)
    expect(wrap.findAllComponents(SurveyProgressBarLine).length).toBe(3)
    expect(wrap.findAllComponents(SurveyProgressBarPoint).length).toBe(4)
  })
})
