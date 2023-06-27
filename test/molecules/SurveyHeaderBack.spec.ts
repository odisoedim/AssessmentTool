import { mount, shallowMount } from '@vue/test-utils'
import SurveyHeaderBack from '~/components/molecules/SurveyHeaderBack.vue'
import { useSurveyIdsMock } from '~/test/helper/mockInject'
import { expectAttr, expectRootNodeName } from '~/test/helper/expect'
const useSurveyIds = useSurveyIdsMock()
jest.mock('~/pages-helper/assessment/survey/surveyIds', () => ({
  useSurveyIds: () => useSurveyIds.mock(),
}))
describe('SurveyHeaderBack', () => {
  it('can work', () => {
    const wrap = shallowMount(SurveyHeaderBack, {
      propsData: {
        to: '/',
      },
    })
    expect(wrap).toBeTruthy()
  })
  it('render a nuxt-link', () => {
    useSurveyIds.mockValue('1', '2')
    const wrap = mount(SurveyHeaderBack, {
      propsData: {
        to: '/assessment/overview/1',
      },
    })
    expectRootNodeName(wrap, 'a')
    expectAttr(wrap, { href: `/assessment/overview/1` })
  })
})
