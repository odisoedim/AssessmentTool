import { mount } from '@vue/test-utils'
import CeItemCard from '~/components/atoms/CeItemCard.vue'
describe('CeItem.vue', () => {
  it('can work', () => {
    const wrapper = mount(CeItemCard)
    expect(wrapper).toBeTruthy()
  })
  it('can slot', () => {
    const wrapper = mount(CeItemCard, {
      slots: {
        default: 'test',
      },
    })
    expect(wrapper.text()).toBe('test')
  })
})
