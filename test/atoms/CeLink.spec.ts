import { mount } from '@vue/test-utils'
import CeLink from '~/components/atoms/CeLink.vue'
import { expectAttr } from '~/test/helper/expect'

describe('CeLink', () => {
  it('can work', () => {
    const wrap = mount(CeLink)
    expect(wrap).toBeTruthy()
  })
  it('has _blank for target default', () => {
    const wrap = mount(CeLink)
    expectAttr(wrap, { target: '_blank' })
  })

  it('has `rel="noopener"` ', () => {
    const wrap = mount(CeLink)
    expectAttr(wrap, { rel: 'noopener' })
  })
})
