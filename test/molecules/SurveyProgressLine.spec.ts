import { shallowMount } from '@vue/test-utils'
import SurveyProgressLine from '~/components/molecules/SurveyProgressLine.vue'
import CeProgressLine from '~/components/atoms/CeProgressLine.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'

describe('SurveyProgressLine.vue', () => {
  it('can work', () => {
    const wrapper = shallowMount(SurveyProgressLine, {
      propsData: { strokeWidth: 10 },
    })
    expect(wrapper).toBeTruthy()
  })
  it('has correct structure', () => {
    const wrapper = shallowMount(SurveyProgressLine)
    expect(wrapper.findComponent(CeProgressLine)).toBeTruthy()
  })
  it('has correct size', () => {
    const wrapper = shallowMount(SurveyProgressLine, {
      propsData: {
        smallText: true,
        progress: -1,
      },
    })
    expect(wrapper.findComponent(CeSmallText)).toBeTruthy()
  })
})
