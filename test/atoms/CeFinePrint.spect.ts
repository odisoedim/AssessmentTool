import { shallowMount } from '@vue/test-utils'
import CeFinePrint from '~/components/atoms/CeFinePrint.vue'
import {
  expectRootNodeName,
  expectText,
  expectClass,
} from '~/test/helper/expect'

describe('CeFinePrint', () => {
  it('can work', () => {
    const wrap = shallowMount(CeFinePrint)
    expect(wrap).toBeTruthy()
    expectRootNodeName(wrap, 'p')
    expectClass(wrap, ['text-xs'])
  })
  it('has default slot', () => {
    const wrap = shallowMount(CeFinePrint, {
      slots: { default: 'test CeFinePrint text' },
    })
    expectText(wrap, 'test CeFinePrint text')
  })
})
