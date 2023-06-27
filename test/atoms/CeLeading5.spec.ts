import { mount } from '@vue/test-utils'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'
import { expectRootNodeName, expectText } from '~/test/helper/expect'

describe('CeHeading5', () => {
  it('can work', () => {
    const wrap = mount(CeHeading5)
    expect(wrap).toBeTruthy()
    expectRootNodeName(wrap, 'h5')
  })
  it('has default slot', () => {
    const wrap = mount(CeHeading5, { slots: { default: 'hello' } })
    expectText(wrap, 'hello')
  })
})
