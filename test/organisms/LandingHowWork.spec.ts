import { mount, shallowMount } from '@vue/test-utils'
import LandingHowWork from '~/components/organisms/LandingHowWork.vue'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import { expectText } from '~/test/helper/expect'

describe('LandingHowWork', () => {
  it('can work', () => {
    const wrap = shallowMount(LandingHowWork)
    expect(wrap).toBeTruthy()
  })
  it('has correct structure and content', () => {
    const wrap = mount(LandingHowWork)
    const h1 = wrap.findComponent(CeHeading1)
    const ceP = wrap.findComponent(CeP)
    const ceHeading3 = wrap.findComponent(CeHeading3)
    expect(h1).toBeTruthy()
    expectText(h1, 'How does it work?')
    expect(ceP).toBeTruthy()
    expect(ceHeading3).toBeTruthy()
  })
})
