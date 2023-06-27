import { mount, shallowMount } from '@vue/test-utils'
import CeButton from '~/components/atoms/CeButton.vue'
import '~/test/helper/svgIcon'
import {
  expectAttr,
  expectClass,
  expectRootNodeName,
  expectStyle,
  expectText,
  realClass,
} from '~/test/helper/expect'

describe('CeButton.vue', () => {
  it('can work', () => {
    const wrap = shallowMount(CeButton)
    const $el = wrap.get('button')
    expectClass($el, ['font-bold', 'font-NotoSans'])
    expect(wrap).toBeTruthy()
  })
  describe('it can change element type', () => {
    it('default button', () => {
      const wrap = shallowMount(CeButton)
      expectRootNodeName(wrap, 'button')
    })
    it('can be a nuxt-link', () => {
      const wrap = mount(CeButton, {
        propsData: { rootType: 'nuxt-link' },
        attrs: { to: '/hello' },
      })
      expectRootNodeName(wrap, 'a')
      expectAttr(wrap, { href: '/hello' })
    })
    it('can be a <a>', () => {
      const wrap = mount(CeButton, {
        propsData: { rootType: 'a' },
        attrs: { href: '/hello' },
      })
      expectRootNodeName(wrap, 'a')
      expectAttr(wrap, { href: '/hello' })
    })
  })
  it('can set content by slot', () => {
    const wrap = mount(CeButton, {
      slots: {
        default: 'Hello',
      },
    })
    const $el = wrap.get('button')
    expectText($el, 'Hello')
  })
  it('can set native attr', () => {
    const wrap = mount(CeButton, {
      attrs: { type: 'submit', name: 'i-am-a-button' },
    })
    expectAttr(wrap, { type: 'submit', name: 'i-am-a-button' })
  })
  describe('can change theme', () => {
    it('has a default theme', () => {
      const wrap = mount(CeButton)
      const $el = wrap.get('button')
      expectClass($el, ['bg-kh-primary', 'text-white'])
    })

    it('has a secondary theme', () => {
      const wrap = mount(CeButton, {
        propsData: {
          theme: 'secondary',
        },
      })
      const $el = wrap.get('button')
      expectClass($el, ['bg-white', 'border-kh-primary', 'text-kh-grey'])
    })
    it('has a Tertiary theme', () => {
      const wrap = mount(CeButton, {
        propsData: {
          theme: 'tertiary',
        },
      })
      const $el = wrap.get('button')
      expectClass($el, [
        'bg-transparent',
        'border-transparent',
        'text-kh-primary',
      ])
    })
    it('can custom color when it has a Tertiary theme', () => {
      const wrap = mount(CeButton, {
        propsData: {
          theme: 'tertiary',
          customColor: true,
        },
        attrs: {
          style: 'color:red',
        },
      })
      const $el = wrap.get('button')
      expect(realClass($el.classes())).not.toContain('text-kh-primary')
      expectStyle($el, { color: 'red' })
    })
  })
  it('can have a left-icon prop', () => {
    const wrap = mount(CeButton, {
      propsData: {
        'left-icon': 'bell',
      },
      slots: {
        default: 'hello',
      },
    })
    const icon = wrap.get('use')
    const href = icon.attributes('href') as string
    expect(/bell/.test(href)).toBeTruthy()
    const $icon = icon.vm.$el
    const $span = $icon.nextElementSibling!
    expect($span).toBeTruthy()
    expect($span.nodeName.toUpperCase()).toBe('SPAN')
  })
  it('can have a right-icon', () => {
    const wrap = mount(CeButton, {
      propsData: {
        'right-icon': 'bell',
      },
      slots: {
        default: 'hello',
      },
    })
    const icon = wrap.get('use')
    const href = icon.attributes('href') as string
    expect(/bell/.test(href)).toBeTruthy()
    const $icon = icon.vm.$el
    const $span = $icon.previousElementSibling!
    expect($span).toBeTruthy()
    expect($span.nodeName.toUpperCase()).toBe('SPAN')
  })
  describe('can set shadow', () => {
    it('primary button has a shadow', () => {
      const wrap = mount(CeButton)
      expectClass(wrap, 'shadow-normal')
    })
    it('tertiary button not has a shadow', () => {
      const wrap = mount(CeButton, { propsData: { theme: 'tertiary' } })
      expectClass(wrap, 'shadow-none')
    })
    it('can close shadow by prop', () => {
      const wrap = mount(CeButton, { propsData: { shadow: false } })
      expectClass(wrap, 'shadow-none')
    })
  })
  describe('can disabled', () => {
    it('default that button can click', () => {
      const cb = jest.fn()
      const wrap = mount(CeButton, {
        listeners: {
          click: cb,
        },
      })
      const button = wrap.get('button')
      expect(cb).toBeCalledTimes(0)
      button.trigger('click')
      expect(cb).toBeCalledTimes(1)
    })
    it('be true that button can not click', () => {
      const cb = jest.fn()
      const wrap = mount(CeButton, {
        attrs: {
          disabled: '1',
        },
        listeners: {
          click: cb,
        },
      })
      const button = wrap.get('button')
      expect(cb).toBeCalledTimes(0)
      button.trigger('click')
      expect(cb).toBeCalledTimes(0)
    })
  })
})
