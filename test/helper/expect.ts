import { Wrapper } from '@vue/test-utils'
import Vue from 'vue'

export const realClass = (classList: string[]) =>
  classList.filter(Boolean).map((i) => i.trim())

export const expectClass = <El extends Element>(
  $el: Wrapper<Vue, El>,
  target: string[] | string
) => {
  const classList = realClass($el.classes())

  const _target = Array.isArray(target) ? target : [target]
  _target.forEach((i) => expect(classList).toContain(i))
}

export const expectText = <El extends Element>(
  $el: Wrapper<Vue, El>,
  target: string
) => {
  expect($el.text()).toBe(target)
}

export const expectAttr = <El extends Element>(
  $el: Wrapper<Vue, El>,
  target: { [key: string]: string }
) => {
  Object.keys(target).forEach((key) => {
    expect($el.attributes(key)).toBe(target[key])
  })
}

export const expectStyle = <El extends Element>(
  $el: Wrapper<Vue, El>,
  style: Partial<CSSStyleDeclaration>
) => {
  const $style = (
    $el.vm
      ? ($el.vm.$el as HTMLElement)
      : ($el.element as unknown as HTMLElement)
  ).style

  Object.keys(style).forEach((key) => {
    const _key = key as keyof CSSStyleDeclaration
    expect($style[_key]).toBe(style[_key])
  })
}

export const expectRootNodeName = <El extends Element>(
  wrap: Wrapper<Vue, El>,
  nodeName: string
) => expect(wrap.vm.$el.nodeName).toBe(nodeName.toUpperCase())
