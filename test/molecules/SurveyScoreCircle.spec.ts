import { shallowMount } from '@vue/test-utils'
import SurveyScoreCircle from '~/components/molecules/SurveyScoreCircle.vue'
import CeScoreCircle from '~/components/atoms/CeScoreCircle.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'

describe('SurveyScoreCircle.vue', () => {
  it('can work', () => {
    const wrapper = shallowMount(SurveyScoreCircle)
    expect(wrapper).toBeTruthy()
  })
  it('has correct structure', () => {
    const wrapper = shallowMount(SurveyScoreCircle)
    expect(wrapper.findComponent(CeScoreCircle)).toBeTruthy()
  })
  it('has correct size', () => {
    const wrapper = shallowMount(SurveyScoreCircle, {
      propsData: {
        smallText: true,
      },
    })
    expect(wrapper.find('span').classes()).toContain('text-[36px]')
    expect(wrapper.findComponent(CeSmallText)).toBeTruthy()
  })
})
