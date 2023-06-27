import { shallowMount } from '@vue/test-utils'
import SurveyAnswerRadio from '~/components/molecules/SurveyAnswerRadio.vue'
import CeRadio from '~/components/atoms/CeRadio.vue'
import CeP from '~/components/atoms/CeP.vue'

describe('SurveyAnswerRadio', () => {
  it('can work', () => {
    const wrap = shallowMount(SurveyAnswerRadio, {
      propsData: {
        value: '',
        text: 'test text',
        index: 3,
      },
    })
    expect(wrap).toBeTruthy()
  })
  it('render CeRadio and CeP ', () => {
    const wrap = shallowMount(SurveyAnswerRadio, {
      propsData: {
        value: '',
        text: 'test text2',
        index: 3,
      },
    })
    const ceRadio = wrap.findComponent(CeRadio)
    const ceP = wrap.findComponent(CeP)
    expect(ceRadio.exists()).toBe(true)
    expect(ceP.exists()).toBe(true)
  })
})
