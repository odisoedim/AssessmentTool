import { mount } from '@vue/test-utils'
import CeColorfulIcon from '~/components/atoms/CeColorfulIcon.vue'
import '~/test/helper/svgIcon'
import { expectAttr, expectStyle } from '~/test/helper/expect'

describe('CeColorfulIcon.vue', () => {
  it('renders name', () => {
    const wrap = mount(CeColorfulIcon, {
      propsData: {
        name: 'apple',
      },
    })
    expect(wrap.props().name).toBe('apple')
  })
  it('has class(inline)', () => {
    const wrap = mount(CeColorfulIcon, {
      propsData: {
        name: 'apple',
      },
    })
    expect(wrap.classes()).toContain('inline')
  })
  it('can remove padding', () => {
    const wrap = mount(CeColorfulIcon, {
      propsData: {
        name: 'check-mark',
        withoutPadding: true,
      },
    })
    const $el = wrap.find('use')
    expectAttr($el, { href: 'check-mark-24' })
  })
  it('can change size based 36', () => {
    const wrap = mount(CeColorfulIcon, {
      propsData: {
        name: 'check-mark',
        size: 2,
      },
    })
    const $el = wrap.find('use')
    expectStyle($el, { width: '72px', height: '72px' })
  })
})
