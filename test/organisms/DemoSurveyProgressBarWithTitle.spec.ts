import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import SurveyProgressBarWithTitle from '~/components/organisms/DemoSurveyProgressBarWithTitle.vue'
import { expectText } from '~/test/helper/expect'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'
import Tier1SurveyProgressBar from '~/components/molecules/DemoTier1SurveyProgressBar.vue'

const useSurveyInfoMock = jest.fn()
const useComputedPagesMock = jest.fn()

jest.mock('~/pages-helper/assessment/survey/surveyInfo', () => ({
  useSurveyInfo: () => useSurveyInfoMock(),
}))
jest.mock('~/pages-helper/assessment/survey/computedPages', () => ({
  useComputedPages: () => useComputedPagesMock(),
}))

useSurveyInfoMock.mockReturnValue(
  ref({
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
    const h3 = wrap.getComponent(CeHeading4)
    expectText(h3, 'test_frameworkName')
  })
  it('can has progressBar and required tier level', () => {
    const wrap = shallowMount(SurveyProgressBarWithTitle, {
      propsData: {
        tierLevel: 1,
      },
    })
    expect(wrap.findComponent(Tier1SurveyProgressBar)).toBeTruthy()
  })
})
