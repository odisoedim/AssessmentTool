import { mount } from '@vue/test-utils'
import CeBullet from '~/components/atoms/CeBullet.vue'
import { expectText } from '~/test/helper/expect'

describe('CeBullet', () => {
  it('can work', () => {
    const wrap = mount(CeBullet)
    expect(wrap).toBeTruthy()
  })
  it('has default slot', () => {
    const wrap = mount(CeBullet, {
      slots: { default: 'Hello' },
    })
    expectText(wrap, '· Hello')
  })
})
