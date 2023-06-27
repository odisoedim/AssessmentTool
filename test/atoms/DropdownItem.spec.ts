import '../helper/svgIcon'
import { mount } from '@vue/test-utils'
import DropdownItem from '~/components/atoms/DropdownItem.vue'
import CeMenuItem from '~/components/atoms/CeMenuItem.vue'
import { expectAttr, expectText } from '~/test/helper/expect'
import CeIcon from '~/components/atoms/CeIcon.vue'

describe('DropdownItem', () => {
  it('need text and icon', () => {
    const wrap = mount(DropdownItem, {
      propsData: {
        text: 'Hello',
        icon: 'user',
      },
    })
    const textEl = wrap.getComponent(CeMenuItem)
    expectText(textEl, 'Hello')
    const $el = wrap.getComponent(CeIcon).find('use')
    expectAttr($el, { href: 'user' })
  })
  it('has a icon slot', () => {
    const wrap = mount(DropdownItem, {
      propsData: {
        text: 'Hello',
      },
      slots: {
        icon: '1',
      },
    })
    expectText(wrap.find('.dropdown-item_icon'), '1')
  })
})
