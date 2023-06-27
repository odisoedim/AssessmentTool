import { shallowMount } from '@vue/test-utils'
import CeTabLabel from '~/components/atoms/CeTabLabel.vue'

describe('CeTabLabel.vue', () => {
  it('can work', () => {
    const wrapper = shallowMount(CeTabLabel)
    expect(wrapper).toBeTruthy()
  })
  it('has default slot', () => {
    const wrapper = shallowMount(CeTabLabel, { slots: { default: 'hello' } })
    expect(wrapper.text()).toBeTruthy()
  })
  it('active correctly', () => {
    const wrapper = shallowMount(CeTabLabel, {
      propsData: {
        active: true,
      },
      slots: { default: 'hello' },
    })
    expect(wrapper.classes()).toContain('font-bold')
  })
})
