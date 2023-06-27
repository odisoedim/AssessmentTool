import { mount } from '@vue/test-utils'
import CeMenuItem from '~/components/atoms/CeMenuItem.vue'
import { expectClass, expectText } from '~/test/helper/expect'

describe('CeMenuItem', () => {
  it('can work', () => {
    const wrap = mount(CeMenuItem)
    expect(wrap).toBeTruthy()
  })
  it('use default slot', () => {
    const wrap = mount(CeMenuItem, {
      slots: {
        default: 'Hello',
      },
    })
    expectText(wrap, 'Hello')
  })
  describe('can set active to change font-weight', () => {
    it('default false', () => {
      const wrap = mount(CeMenuItem)
      expectClass(wrap, 'font-normal')
    })
    it('set true', () => {
      const wrap = mount(CeMenuItem, { propsData: { active: true } })
      expectClass(wrap, 'font-semibold')
    })
  })
})
