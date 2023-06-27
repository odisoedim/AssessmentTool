import { mount, shallowMount } from '@vue/test-utils'
import LandingWhatDo from '~/components/organisms/LandingWhatDo.vue'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import { expectText } from '~/test/helper/expect'

describe('LandingWhatDo', () => {
  it('can work', () => {
    const wrap = shallowMount(LandingWhatDo)
    expect(wrap).toBeTruthy()
  })
  it('has correct structure and content', () => {
    const wrap = mount(LandingWhatDo)
    const h1 = wrap.findComponent(CeHeading1)
    const ceImage = wrap.findComponent(CeImage)
    expect(h1).toBeTruthy()
    expect(ceImage).toBeTruthy()
    expectText(h1, 'What do we want to achieve with the Circularity Assessment Tool?')
  })
  it('can render image', () => {
    const wrap = mount(LandingWhatDo)
    expect(wrap.findComponent(CeImage).props().src).toBe('test-file-stub')
  })
})
