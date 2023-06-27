import { mount } from '@vue/test-utils'
import CeP from '~/components/atoms/CeP.vue'
import { expectRootNodeName, expectText } from '~/test/helper/expect'

describe('Cep', () => {
  it('can work', () => {
    const wrap = mount(CeP)
    expect(wrap).toBeTruthy()
    expectRootNodeName(wrap, 'p')
  })
  it('has default slot', () => {
    const wrap = mount(CeP, { slots: { default: 'hello' } })
    expectText(wrap, 'hello')
  })
})
