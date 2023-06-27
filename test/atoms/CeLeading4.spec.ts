import { mount } from '@vue/test-utils'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'
import {
  expectClass,
  expectRootNodeName,
  expectText,
} from '~/test/helper/expect'

describe('CeHeading4', () => {
  it('can work', () => {
    const wrap = mount(CeHeading4)
    expect(wrap).toBeTruthy()
    expectRootNodeName(wrap, 'h4')
    expectClass(wrap, ['text-lg'])
  })
  it('has default slot', () => {
    const wrap = mount(CeHeading4, { slots: { default: 'hello' } })
    expectText(wrap, 'hello')
  })
})
