import { shallowMount } from '@vue/test-utils'
import CeTabs from '~/components/atoms/CeTabs.vue'

describe('CeTabs.vue', () => {
  it('can work', () => {
    const wrapper = shallowMount(CeTabs)
    expect(wrapper).toBeTruthy()
  })
  it('can slot', () => {
    const wrapper = shallowMount(CeTabs, {
      slots: {
        default: 'test',
      },
    })
    expect(wrapper.find('.ce-tabs-content').text()).toBe('test')
  })
})
