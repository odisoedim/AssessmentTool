import { shallowMount } from '@vue/test-utils'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import {
  expectClass,
  expectRootNodeName,
  expectText,
} from '~/test/helper/expect'

describe('CeHeading3', () => {
  it('can work', () => {
    const wrap = shallowMount(CeHeading3)
    expect(wrap).toBeTruthy()
    expectRootNodeName(wrap, 'h3')
    expectClass(wrap, ['text-1.5xl'])
  })
  it('has default slot', () => {
    const wrap = shallowMount(CeHeading3, { slots: { default: 'CeHeading3' } })
    expectText(wrap, 'CeHeading3')
  })
})
