import { ref } from '@nuxtjs/composition-api'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import {
  useComputedPagesMock,
  useSurveyIdsMock,
  useSurveyStoreMock,
} from '~/test/helper/mockInject'
import SurveyFooterNext from '~/components/molecules/DemoSurveyFooterNext.vue'
import SurveyAlertModal from '~/components/organisms/SurveyAlertModal.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import { expectText } from '~/test/helper/expect'
const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()
const useComputedPages = useComputedPagesMock()
const useSurveyStore = useSurveyStoreMock()
const useSurveyIds = useSurveyIdsMock()
jest.mock('~/pages-helper/assessment/survey/surveyIds', () => ({
  useSurveyIds: () => useSurveyIds.mock(),
}))
useSurveyIds.mockValue('31', '22')
jest.mock('~/pages-helper/assessment/survey/computedPages', () => ({
  useComputedPages: () => useComputedPages.mock(),
}))
jest.mock('~/pages-helper/assessment/survey/surveyStore', () => ({
  useSurveyStore: () => useSurveyStore.mock(),
}))

useComputedPages.pageIndex.mockReturnValue(ref(1))

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
    it('show Next when pageIndex is not eq -1 ', async () => {
      useComputedPages.pageIndex.mockReturnValue(ref(5))
      useComputedPages.pagesLength.mockReturnValue(ref(10))
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
