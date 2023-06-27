import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { useComputedPagesMock } from '~/test/helper/mockInject'
import SurveyFooterBack from '~/components/molecules/SurveyFooterBack.vue'
import { expectRootNodeName, expectText } from '~/test/helper/expect'

const useComputedPages = useComputedPagesMock()
jest.mock('~/pages-helper/assessment/survey/computedPages', () => ({
  useComputedPages: () => useComputedPages.mock(),
}))
useComputedPages.pageIndex.mockReturnValue(ref(1))

describe('SurveyFooterBack', () => {
  it('can work', () => {
    const wrap = mount(SurveyFooterBack)
    expect(wrap).toBeTruthy()
  })
  it('has a button with content', async () => {
    const wrap = mount(SurveyFooterBack)
    expectRootNodeName(wrap, 'button')
    expectText(wrap, 'Back')
    await wrap.trigger('click')
    expect(useComputedPages.prevPage).toBeCalledTimes(1)
  })
  it('button will hide when pageIndex <= -1', () => {
    useComputedPages.pageIndex.mockReturnValue(ref(-1))
    const wrap = mount(SurveyFooterBack)
    expect(wrap.isVisible()).toBeFalsy()
  })
})
