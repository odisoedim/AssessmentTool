import { mount } from '@vue/test-utils'
import SurveyProgressCircleTitle from '~/components/atoms/SurveyProgressCircleTitle.vue'
import { expectText } from '~/test/helper/expect'

describe('SurveyProgressCircleTitle', () => {
  it('can work', () => {
    const wrap = mount(SurveyProgressCircleTitle)
    expect(wrap).toBeTruthy()
  })
  it('can set slot', () => {
    const wrap = mount(SurveyProgressCircleTitle, {
      slots: { default: 'hello' },
    })
    expectText(wrap, 'hello')
  })
})
