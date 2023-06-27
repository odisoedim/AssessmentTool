import { mount, shallowMount } from '@vue/test-utils'
import LandingBanner from '~/components/organisms/LandingBanner.vue'
import CeHeading2 from '~/components/atoms/CeHeading2.vue'
import CeButton from '~/components/atoms/CeButton.vue'

const gotoLogin = jest.fn()
jest.mock('~/util/auth', () => ({
  gotoLogin: () => gotoLogin(),
}))
describe('LandingBanner', () => {
  it('can work', () => {
    const wrap = shallowMount(LandingBanner)
    expect(wrap.exists()).toBeTruthy()
  })
  it('if has description then CeHeading3 exist ', () => {
    const wrap = shallowMount(LandingBanner, {
      propsData: {
        title: 'test title',
        description: 'test desc',
        buttonContent: 'test buttonContent',
      },
    })
    expect(wrap.findComponent(CeHeading2).exists()).toBeTruthy()
  })
  it('if has not description is false then CeHeading3 not exist ', () => {
    const wrap = shallowMount(LandingBanner, {
      propsData: {
        title: 'test title',
        buttonContent: 'test buttonContent',
      },
    })
    expect(wrap.findComponent(CeHeading2).exists()).toBe(false)
  })
  it('can click, landingBanner will save current href and link to Auth0', async () => {
    jest.clearAllMocks()
    const wrap = mount(LandingBanner)
    const ceButton = wrap.findComponent(CeButton)
    await ceButton.trigger('click')
    expect(gotoLogin).toBeCalled()
  })
})
