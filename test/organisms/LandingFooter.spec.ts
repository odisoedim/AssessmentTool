import { mount, shallowMount } from '@vue/test-utils'
import LandingFooter from '~/components/organisms/LandingFooter.vue'
import LandingLayoutCenter from '~/components/atoms/LandingLayoutCenter.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'

describe('LandingFooter', () => {
  process.client = true
  it('can work', () => {
    const wrap = shallowMount(LandingFooter)
    expect(wrap).toBeTruthy()
  })
  it('has correct structure and content', () => {
    const wrap = mount(LandingFooter)
    const landingLayoutCenter = wrap.findComponent(LandingLayoutCenter)
    const ceHeading5 = wrap.findComponent(CeHeading5)
    const ceImage = wrap.findComponent(CeImage)
    const ceSmallText = wrap.findComponent(CeSmallText)
    expect(landingLayoutCenter).toBeTruthy()
    expect(ceHeading5).toBeTruthy()
    expect(ceSmallText).toBeTruthy()
    expect(ceImage).toBeTruthy()
  })
  it(' can render image', () => {
    const wrap = mount(LandingFooter)
    const ceImage = wrap.findComponent(CeImage)
    expect(ceImage.props().src).toBe('test-file-stub')
  })
  it('if load can render script', () => {
    process.client = true
    const firstScript = document.createElement('script')
    document.body.appendChild(firstScript)
    window.dispatchEvent(new Event('load'))
    const scripts = document.getElementsByTagName('script')
    expect(scripts.length).toBe(3)
  })
})
