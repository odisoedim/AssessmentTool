import { mount } from '@vue/test-utils'
import LandingSectionTitle from '~/components/atoms/LandingSectionTitle.vue'
import { expectClass, expectText } from '~/test/helper/expect'

describe('LandingSectionTitle', () => {
  it('can work', () => {
    const wrap = mount(LandingSectionTitle)
    expect(wrap.exists()).toBeTruthy()
    expectClass(wrap, ['font-light', 'text-4xl', 'tracking-06', 'leading-12'])
  })
  it('has default slot', () => {
    const wrap = mount(LandingSectionTitle, { slots: { default: 'hello' } })
    expectText(wrap, 'hello')
  })
})
