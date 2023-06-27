import { mount, shallowMount } from '@vue/test-utils'
import SurveyProgressBarPoint from '~/components/atoms/SurveyProgressBarPoint.vue'
import SurveyProgressCircleTitle from '~/components/atoms/SurveyProgressCircleTitle.vue'
import { expectClass, expectStyle } from '~/test/helper/expect'
import CeIcon from '~/components/atoms/CeIcon.vue'

describe('SurveyProgressBarPoint', () => {
  it('can work', function () {
    const wrap = shallowMount(SurveyProgressBarPoint)
    expect(wrap).toBeTruthy()
  })
  it('can set activeIcon to show icon', () => {
    const wrap = shallowMount(SurveyProgressBarPoint, {
      propsData: { activeIcon: true },
    })
    const icon = wrap.findComponent(CeIcon)
    expect(icon.isVisible()).toBeTruthy()
  })
  it('can set activeCircle to change color', () => {
    const wrap = shallowMount(SurveyProgressBarPoint, {
      propsData: { activeCircle: true },
    })
    expectClass(wrap, 'border-kh-primary')
  })

  it('can set isCurrent to render shadow ', () => {
    const wrap = shallowMount(SurveyProgressBarPoint, {
      propsData: { isCurrent: true },
    })
    expectClass(wrap, 'shadow-circle-out')
  })

  it('can set groupLength for SurveyProgressCircleTitle', () => {
    const wrap = mount(SurveyProgressBarPoint, {
      propsData: { groupLength: 0.5 },
      slots: { default: 'hello' },
    })
    const title = wrap.findComponent(SurveyProgressCircleTitle)
    expectStyle(title, { width: '400px' })
  })
})
