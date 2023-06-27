import { mount } from '@vue/test-utils'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import {
  expectClass,
  expectRootNodeName,
  expectText,
} from '~/test/helper/expect'

describe('CeHeading1', () => {
  it('can work', () => {
    const wrap = mount(CeHeading1)
    expect(wrap).toBeTruthy()
    expectRootNodeName(wrap, 'h1')
    expectClass(wrap, ['text-4.5xl'])
  })
  it('has default slot', () => {
    const wrap = mount(CeHeading1, { slots: { default: 'hello' } })
    expectText(wrap, 'hello')
  })
})
