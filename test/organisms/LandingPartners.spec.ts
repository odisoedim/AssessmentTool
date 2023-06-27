import { mount, shallowMount } from '@vue/test-utils'
import LandingPartners from '~/components/organisms/LandingPartners.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import LandingSectionTitle from '~/components/atoms/LandingSectionTitle.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import { expectText } from '~/test/helper/expect'

describe('LandingPartners', () => {
  it('can work', () => {
    const wrap = shallowMount(LandingPartners)
    expect(wrap).toBeTruthy()
  })
  it('has correct structure and content', () => {
    const wrap = mount(LandingPartners)
    const landingSectionTitle = wrap.findComponent(LandingSectionTitle)
    const ceHeading3 = wrap.findComponent(CeHeading3)
    const ceImage = wrap.findComponent(CeImage)
    expect(landingSectionTitle).toBeTruthy()
    expectText(landingSectionTitle, 'Partners we work with')
    expect(ceHeading3).toBeTruthy()
    expectText(ceHeading3, 'The Circularity Assessment Tool is supported by:')
    expect(ceImage).toBeTruthy()
  })
  it('can render image', () => {
    const wrap = mount(LandingPartners)
    expect(wrap.findComponent(CeImage).props().src).toBe('test-file-stub')
  })
})
