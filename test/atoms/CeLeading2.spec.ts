import { mount } from '@vue/test-utils'
import CeHeading2 from '~/components/atoms/CeHeading2.vue'
import {
  expectClass,
  expectRootNodeName,
  expectText,
} from '~/test/helper/expect'

describe('CeHeading2', () => {
  it('can work', () => {
    const wrap = mount(CeHeading2)
    expect(wrap).toBeTruthy()
    expectRootNodeName(wrap, 'h2')
    expectClass(wrap, ['text-2.5xl'])
  })
  it('has default slot', () => {
    const wrap = mount(CeHeading2, { slots: { default: 'hello' } })
    expectText(wrap, 'hello')
  })
})
