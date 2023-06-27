import { shallowMount } from '@vue/test-utils'
import CeModalWithContent from '~/components/molecules/CeModalWithContent.vue'
import CeModal from '~/components/molecules/CeModal.vue'

describe('CeModalWithContent', () => {
  it('can work', () => {
    const wrap = shallowMount(CeModalWithContent, {
      propsData: {
        value: true,
      },
    })
    expect(wrap).toBeTruthy()
  })
  it('render CeModal', () => {
    const wrap = shallowMount(CeModalWithContent, {
      propsData: {
        value: true,
      },
    })
    const ceModal = wrap.findComponent(CeModal)
    expect(ceModal.exists()).toBe(true)
  })
})
