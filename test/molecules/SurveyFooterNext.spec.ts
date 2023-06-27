import { ref } from '@nuxtjs/composition-api'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import {
  useCircleStrategyCheckMock,
  useComputedPagesMock,
  useSurveyIdsMock,
  useSurveyStoreMock,
} from '~/test/helper/mockInject'
import SurveyFooterNext from '~/components/molecules/SurveyFooterNext.vue'
import SurveyAlertModal from '~/components/organisms/SurveyAlertModal.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import { expectAttr, expectText } from '~/test/helper/expect'
const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()
const useComputedPages = useComputedPagesMock()
const useCircleStrategyCheck = useCircleStrategyCheckMock()
const useSurveyStore = useSurveyStoreMock()
const useSurveyIds = useSurveyIdsMock()
jest.mock('~/pages-helper/assessment/survey/surveyIds', () => ({
  useSurveyIds: () => useSurveyIds.mock(),
}))
useSurveyIds.mockValue('31', '22')
jest.mock('~/pages-helper/assessment/survey/computedPages', () => ({
  useComputedPages: () => useComputedPages.mock(),
}))
jest.mock('~/pages-helper/assessment/survey/circleStrategyCheck', () => ({
  useCircleStrategyCheck: () => useCircleStrategyCheck.mock(),
}))
jest.mock('~/pages-helper/assessment/survey/surveyStore', () => ({
  useSurveyStore: () => useSurveyStore.mock(),
}))

useComputedPages.pageIndex.mockReturnValue(ref(1))
useCircleStrategyCheck.circleStrategies.mockReturnValue(ref([]))
useCircleStrategyCheck.noCircleStrategies.mockReturnValue(ref([]))

describe('SurveyFooterNext', () => {
  it('can work', () => {
    const wrap = shallowMount(SurveyFooterNext)
    expect(wrap).toBeTruthy()
  })
  it('has a modal for alert', () => {
    const wrap = shallowMount(SurveyFooterNext)
    expect(wrap.findComponent(SurveyAlertModal)).toBeTruthy()
  })
  describe('it has a button', () => {
    it('show Next but disabled when pageIndex is -1 and no circleStrategies', () => {
      useComputedPages.pageIndex.mockReturnValue(ref(-1))
      useCircleStrategyCheck.circleStrategies.mockReturnValue(ref([]))
      const wrap = shallowMount(SurveyFooterNext)
      const button = wrap.findComponent(CeButton)
      expectAttr(button, { disabled: 'true' })
      expectText(button, 'Next')
    })
    it('show Next when pageIndex is -1 and has circleStrategies', async () => {
      useComputedPages.pageIndex.mockReturnValue(ref(-1))
      useCircleStrategyCheck.circleStrategies.mockReturnValue(ref(['a']))
      const wrap = mount(SurveyFooterNext)
      const button = wrap.findComponent(CeButton)
      await button.trigger('click')
      expect(useComputedPages.ready).toBeCalledTimes(1)
    })

    it('show Next when pageIndex is not eq -1 and not eq pagesLength', async () => {
      useComputedPages.pageIndex.mockReturnValue(ref(5))
      useComputedPages.pagesLength.mockReturnValue(ref(10))
      const wrap = mount(SurveyFooterNext)
      const button = wrap.findComponent(CeButton)
      expectText(button, 'Next')
      await button.trigger('click')
      expect(useComputedPages.nextPage).toBeCalledTimes(1)
    })
    it('show Next when choice not applicable', async () => {
      useComputedPages.pageIndex.mockReturnValue(ref(-1))
      useCircleStrategyCheck.noCircleStrategies.mockReturnValue(ref(['-1']))
      const wrap = mount(SurveyFooterNext)
      const button = wrap.findComponent(CeButton)
      expectText(button, 'Next')
      await button.trigger('click')
      expect(useComputedPages.nextPage).toBeCalledTimes(1)
    })

    it('show Submit when pageIndex is not eq -1 and eq pagesLength', async () => {
      const alertFn = jest.fn()
      Object.assign(window, { alert: alertFn })
      useComputedPages.pageIndex.mockReturnValue(ref(10))
      useComputedPages.pagesLength.mockReturnValue(ref(10))
      const wrap = mount(SurveyFooterNext, { localVue, router })
      const button = wrap.findComponent(CeButton)
      expectText(button, 'Submit')
      await button.trigger('click')
      expect(useSurveyStore.save).toBeCalledTimes(1)
    })
  })
})
