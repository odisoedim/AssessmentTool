import { shallowMount } from '@vue/test-utils'
import SurveyFooter from '~/components/organisms/SurveyFooter.vue'
import SurveyFooterBack from '~/components/molecules/SurveyFooterBack.vue'
import SurveyFooterNext from '~/components/molecules/SurveyFooterNext.vue'
import SurveyExit from '~/components/organisms/SurveyExit.vue'

describe('SurveyFooter', () => {
  it('can work', () => {
    const wrap = shallowMount(SurveyFooter)
    expect(wrap).toBeTruthy()
  })
  it('has back/exit/next', () => {
    const wrap = shallowMount(SurveyFooter, {
      propsData: {
        fromDemo: true,
      },
    })
    expect(wrap.findComponent(SurveyFooterBack)).toBeTruthy()
    expect(wrap.findComponent(SurveyFooterNext)).toBeTruthy()
    expect(wrap.findComponent(SurveyExit)).toBeTruthy()
  })
})
