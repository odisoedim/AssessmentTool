import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import SurveyProgressBarWithTitle from '~/components/organisms/SurveyProgressBarWithTitle.vue'
import { expectText } from '~/test/helper/expect'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'
import Tier3SurveyProgressBar from '~/components/molecules/Tier3SurveyProgressBar.vue'
import { useSurveyStoreMock } from '~/test/helper/mockInject'

const useSurveyInfoMock = jest.fn()
const useComputedPagesMock = jest.fn()

jest.mock('~/pages-helper/assessment/survey/surveyInfo', () => ({
  useSurveyInfo: () => useSurveyInfoMock(),
}))
jest.mock('~/pages-helper/assessment/survey/computedPages', () => ({
  useComputedPages: () => useComputedPagesMock(),
}))
const useSurveyStore = useSurveyStoreMock()
jest.mock('~/pages-helper/assessment/survey/surveyStore', () => ({
  useSurveyStore: () => useSurveyStore.mock(),
}))
useSurveyStore.isCompleted.mockReturnValue({
  bool: ref(false),
})
useSurveyInfoMock.mockReturnValue(
  ref({
    name: 'test',
    description: 'test_description',
    id: '1',
    assessmentName: 'test_assessmentName',
    frameworkId: '1001',
    frameworkName: 'test_frameworkName',
  })
)
useComputedPagesMock.mockReturnValue({
  pageIndex: ref(0),
  computedPages: ref([]),
})
describe('SurveyProgressBarWithTitle', () => {
  it('can work', () => {
    const wrap = shallowMount(SurveyProgressBarWithTitle, {
      propsData: {
        tierLevel: 3,
      },
    })
    expect(wrap).toBeTruthy()
  })
  it('has title', () => {
    const wrap = shallowMount(SurveyProgressBarWithTitle, {
      propsData: {
        tierLevel: 3,
      },
    })
    const h4 = wrap.getComponent(CeHeading4)
    expectText(h4, 'test')
  })
  it('can has progressBar and required tier level', () => {
    const wrap = shallowMount(SurveyProgressBarWithTitle, {
      propsData: {
        tierLevel: 3,
      },
    })
    expect(wrap.findComponent(Tier3SurveyProgressBar)).toBeTruthy()
  })
})
