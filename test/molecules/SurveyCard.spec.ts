import { shallowMount } from '@vue/test-utils'
import SurveyCard from '~/components/molecules/SurveyCard.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
describe('CeCard.vue', () => {
  it('can work', () => {
    const wrapper = shallowMount(SurveyCard)
    expect(wrapper).toBeTruthy()
  })
  it('can correctly slot', () => {
    const wrapper = shallowMount(SurveyCard, {
      propsData: {
        title: 'title',
        subTitle: 'subTitle',
      },
      slots: {
        default: '<input />',
      },
    })
    expect(wrapper.find('input')).toBeTruthy()
    expect(wrapper.vm.$el.nodeName).toBe('CE-CARD-STUB')
    expect(wrapper.findComponent(CeHeading3).text()).toBe('title')
    expect(wrapper.findComponent(CeSmallText).text()).toBe('subTitle')
  })
})
