import { shallowMount } from '@vue/test-utils'
import ResultCard from '~/components/atoms/ResultCard.vue'
import { expectText } from '~/test/helper/expect'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'

describe('ResultCard.vue', () => {
  it('can work', () => {
    const wrap = shallowMount(ResultCard)
    expect(wrap).toBeTruthy()
  })
  it('has a header slot', () => {
    const wrap = shallowMount(ResultCard, { slots: { header: 'hello' } })
    expectText(wrap.findComponent(CeHeading5), 'hello')
  })
  it('has a default slot', () => {
    const wrap = shallowMount(ResultCard, { slots: { default: 'hello' } })
    expectText(wrap, 'hello')
  })
  it('can set class for default slot', () => {
    const wrap = shallowMount(ResultCard, {
      slots: { default: 'hello' },
      propsData: {
        bodyClass: 'text-test',
      },
    })
    expectText(wrap.find('.text-test'), 'hello')
  })
  it('can set background style for default slot wrapper', () => {
    const wrap = shallowMount(ResultCard, {
      slots: { default: 'hello' },
      propsData: {
        bodyBg: 'rgb(0, 0, 0)',
        bodyClass: 'text-test',
      },
    })
    const attributes = wrap.find('.text-test').attributes()
    expect(attributes.style).toBe('background: rgb(0, 0, 0);')
  })
})
