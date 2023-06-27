import { mount, shallowMount } from '@vue/test-utils'
import OnboardingIntroduceWelcome2 from '~/components/molecules/OnboardingIntroduceWelcome2.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import { expectText } from '~/test/helper/expect'

describe('OnboardingIntroduceWelcome2', () => {
  it('can work', () => {
    const wrap = shallowMount(OnboardingIntroduceWelcome2)
    expect(wrap.exists()).toBeTruthy()
  })
  it('show correct content', () => {
    const wrap = mount(OnboardingIntroduceWelcome2)
    const ceHeading3 = wrap.findComponent(CeHeading3)
    expectText(ceHeading3, 'How it works...')
  })
})
