import { mount } from '@vue/test-utils'
import CeItem from '~/components/molecules/CeItem.vue'
import CeItemCard from '~/components/atoms/CeItemCard.vue'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'
describe('CeItem.vue', () => {
  it('can work', () => {
    const wrapper = mount(CeItem)
    expect(wrapper).toBeTruthy()
  })
  it('has correct structure', () => {
    const wrapper = mount(CeItem)

    expect(wrapper.findComponent(CeItemCard)).toBeTruthy()
    expect(
      wrapper.findComponent(CeItemCard).findComponent(CeHeading4)
    ).toBeTruthy()
  })
  it('can slot', () => {
    const wrapper = mount(CeItem, {
      slots: {
        default: 'test',
      },
    })
    expect(wrapper.text()).toBe('test')
  })
})
