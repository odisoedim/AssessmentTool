import { mount } from '@vue/test-utils'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import { expectClass, expectText } from '~/test/helper/expect'

describe('CeSmallText', () => {
  it('can work', () => {
    const wrap = mount(CeSmallText)
    expect(wrap).toBeTruthy()
    expectClass(wrap, ['text-sm'])
  })
  it('has default slot', () => {
    const wrap = mount(CeSmallText, { slots: { default: 'hello' } })
    expectText(wrap, 'hello')
  })
})
