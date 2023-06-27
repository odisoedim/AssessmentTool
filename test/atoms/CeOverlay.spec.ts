import { mount } from '@vue/test-utils'
import CeOverlay from '~/components/atoms/CeOverlay.vue'

describe('CeOverlay.vue', () => {
  it('can work', () => {
    const wrap = mount(CeOverlay)
    expect(wrap).toBeTruthy()
  })
  it('can set zIndex', () => {
    const wrap = mount(CeOverlay, {
      propsData: {
        zIndex: 3000,
      },
    })
    const $el = wrap.vm.$el as HTMLDivElement
    expect(+$el.style.zIndex).toBe(3000)
  })
})
