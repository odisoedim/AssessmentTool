import { mount, shallowMount } from '@vue/test-utils'
import LandingStart from '~/components/organisms/LandingStart.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import CeHeading2 from '~/components/atoms/CeHeading2.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import { expectText } from '~/test/helper/expect'
const gotoLogin = jest.fn()
jest.mock('~/util/auth', () => ({
  gotoLogin: () => gotoLogin(),
}))
describe('LandingStart', () => {
  it('can work', () => {
    const wrap = shallowMount(LandingStart)
    expect(wrap.exists()).toBeTruthy()
  })
  it('has correct structure and content', () => {
    const wrap = shallowMount(LandingStart, {
      propsData: {
        image: 'https://test.con/test-image.png',
      },
    })
    const ceImages = wrap.findAllComponents(CeImage)
    expect(ceImages.wrappers[0].props().src).toBe('test-file-stub')
    expect(ceImages.wrappers[1].props().src).toBe(
      'https://test.con/test-image.png'
    )
    const ceHeading2 = wrap.findComponent(CeHeading2)
    expectText(ceHeading2, 'Assess. Understand. Act.')
    const ceHeading3 = wrap.findComponent(CeHeading3)
    expect(ceHeading3.exists()).toBeTruthy()
  })
  it('can click, it will save current href and link to Auth0', async () => {
    jest.clearAllMocks()
    const wrap = mount(LandingStart)
    const ceButton = wrap.findComponent(CeButton)
    await ceButton.trigger('click')
    expect(gotoLogin).toBeCalled()
  })
})
