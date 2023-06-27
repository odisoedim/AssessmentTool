import { mount, shallowMount } from '@vue/test-utils'
import LandingWhyTrustUs from '~/components/organisms/LandingWhyTrustUs.vue'
import LandingSectionTitle from '~/components/atoms/LandingSectionTitle.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import { expectText } from '~/test/helper/expect'

describe('LandingWhyTrustUs', () => {
  it('can work', () => {
    const wrap = shallowMount(LandingWhyTrustUs)
    expect(wrap).toBeTruthy()
  })
  it('has correct structure and content', () => {
    const wrap = mount(LandingWhyTrustUs)
    const landingSectionTitle = wrap.findComponent(LandingSectionTitle)
    const ceHeading3 = wrap.findComponent(CeHeading3)
    expect(landingSectionTitle).toBeTruthy()
    expect(ceHeading3).toBeTruthy()
    expectText(landingSectionTitle, 'Why trust us?')
  })
})
