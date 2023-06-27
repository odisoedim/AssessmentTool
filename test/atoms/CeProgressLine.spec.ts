import { shallowMount } from '@vue/test-utils'
import CeProgressLine from '~/components/atoms/CeProgressLine.vue'
import { expectStyle } from '~/test/helper/expect'

describe('CeProgressLine.vue', () => {
  it('can work', () => {
    const wrapper = shallowMount(CeProgressLine)
    expect(wrapper).toBeTruthy()
  })
  it('can change progress', async () => {
    const wrapper = shallowMount(CeProgressLine, {
      propsData: {
        progress: 50,
      },
    })
    await wrapper.vm.$nextTick()
    expectStyle(wrapper.find('div.bg-kh-primary'), { width: '50%' })
  })
})
