import { mount } from '@vue/test-utils'
import CeIcon from '~/components/atoms/CeIcon.vue'
import '~/test/helper/svgIcon'
import { expectAttr, expectClass, expectStyle } from '~/test/helper/expect'
describe('CeIcon.vue', () => {
  it('renders name', () => {
    const wrap = mount(CeIcon, {
      propsData: {
        name: 'arrow-left',
      },
    })
    const $el = wrap.find('use')
    expectAttr($el, { href: 'arrow-left' })
  })
  it('has class(inline stroke-current)', () => {
    const wrap = mount(CeIcon, {
      propsData: {
        name: 'arrow-left',
      },
    })
    expectClass(wrap, ['inline', 'stroke-current'])
  })

  it('can remove padding', () => {
    const wrap = mount(CeIcon, {
      propsData: {
        name: 'external-link',
        withoutPadding: true,
      },
    })
    const $el = wrap.find('use')
    expectAttr($el, { href: 'external-link-24' })
  })
  it('can change size based 36', () => {
    const wrap = mount(CeIcon, {
      propsData: {
        name: 'external-link',
        size: 2,
      },
    })
    const $el = wrap.find('use')
    expectStyle($el, { width: '72px', height: '72px' })
  })
  describe('can change theme', () => {
    it('has a primary theme', () => {
      const wrap = mount(CeIcon, {
        propsData: {
          name: 'arrow-left',
          theme: 'primary',
        },
      })
      expectClass(wrap, 'text-kh-primary')
    })
    it('has a yellow theme', () => {
      const wrap = mount(CeIcon, {
        propsData: {
          name: 'arrow-left',
          theme: 'yellow',
        },
      })
      expectClass(wrap, 'text-kh-yellow')
    })
    it('has a white theme', () => {
      const wrap = mount(CeIcon, {
        propsData: {
          name: 'arrow-left',
          theme: 'white',
        },
      })
      expectClass(wrap, 'text-white')
    })
  })
})
