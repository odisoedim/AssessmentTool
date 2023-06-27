import { mount, shallowMount } from '@vue/test-utils'
import OnboardingIntroduceWelcome3 from '~/components/molecules/OnboardingIntroduceWelcome3.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import { expectText } from '~/test/helper/expect'

describe('OnboardingIntroduceWelcome3', () => {
  it('can work', () => {
    const wrap = shallowMount(OnboardingIntroduceWelcome3)
    expect(wrap.exists()).toBeTruthy()
  })
  it('show correct content', () => {
    const wrap = mount(OnboardingIntroduceWelcome3)
    const ceHeading3 = wrap.findComponent(CeHeading3)
    expectText(ceHeading3, 'How it works...')
  })
  it('can render image', () => {
    const wrap = mount(OnboardingIntroduceWelcome3)
    expect(wrap.findComponent(CeImage).props().src).toBe('test-file-stub')
  })
})
