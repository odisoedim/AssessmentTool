import { mount } from '@vue/test-utils'
import CeCard from '~/components/atoms/CeCard.vue'

describe('CeCard.vue', () => {
  it('can work', () => {
    const wrapper = mount(CeCard)
    expect(wrapper).toBeTruthy()
  })
  it('can correctly slot', () => {
    const wrapper = mount(CeCard, {
      slots: {
        default: '<input />',
      },
    })
    expect(wrapper.find('input')).toBeTruthy()
  })
})
