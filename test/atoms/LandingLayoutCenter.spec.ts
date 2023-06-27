import { mount } from '@vue/test-utils'
import LandingLayoutCenter from '~/components/atoms/LandingLayoutCenter.vue'
import { expectClass, expectText } from '~/test/helper/expect'

describe('LandingSectionTitle', () => {
  it('can work', () => {
    const wrap = mount(LandingLayoutCenter)
    expect(wrap.exists()).toBeTruthy()
    expectClass(wrap, ['w-[1032px]', 'px-4', 'mx-auto', 'box-content'])
  })
  it('has default slot', () => {
    const wrap = mount(LandingLayoutCenter, { slots: { default: 'hello' } })
    expectText(wrap, 'hello')
  })
})
