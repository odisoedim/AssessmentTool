import { mount, shallowMount } from '@vue/test-utils'
import LandingAction from '~/components/organisms/LandingAction.vue'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import LandingActionContent from '~/components/molecules/LandingActionContent.vue'
import { expectText } from '~/test/helper/expect'

describe('LandingAction', () => {
  it('can work', () => {
    const wrap = shallowMount(LandingAction)
    expect(wrap).toBeTruthy()
  })
  it('has correct structure and content', () => {
    const wrap = mount(LandingAction)
    const h1 = wrap.findComponent(CeHeading1)
    const landingActionContent = wrap.findComponent(LandingActionContent)
    expect(h1).toBeTruthy()
    expectText(h1, 'With Circularity Assessment Tool, you can:')
    expect(landingActionContent).toBeTruthy()
  })
})
