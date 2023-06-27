import { mount, shallowMount } from '@vue/test-utils'
import LandingActionContent from '~/components/molecules/LandingActionContent.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import CeHeading2 from '~/components/atoms/CeHeading2.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import { expectText } from '~/test/helper/expect'

describe('LandingActionContent', () => {
  it('can work', () => {
    const wrap = shallowMount(LandingActionContent, {
      propsData: {
        image: '/test-image.png',
        title: 'test title',
        content: 'test content',
        imageAlt: 'image',
      },
    })
    expect(wrap).toBeTruthy()
  })
  it('has correct structure and content', () => {
    const wrap = mount(LandingActionContent, {
      propsData: {
        image: '/test-image.png',
        title: 'test title',
        content: 'test content',
        imageAlt: 'image',
      },
    })
    const h2 = wrap.findComponent(CeHeading2)
    const h3 = wrap.findComponent(CeHeading3)
    const ceImage = wrap.findComponent(CeImage)
    expect(h2.exists()).toBeTruthy()
    expectText(h2, 'test title')
    expect(h3.exists()).toBeTruthy()
    expectText(h3, 'test content')
    expect(ceImage.exists()).toBeTruthy()
    expect(ceImage.props().src).toBe('/test-image.png')
  })
})
