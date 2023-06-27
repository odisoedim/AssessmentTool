import { shallowMount } from '@vue/test-utils'
import CeWarningText from '~/components/atoms/CeWarningText.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import CeIcon from '~/components/atoms/CeIcon.vue'
describe('CeSelect', () => {
  it('can work', () => {
    const wrap = shallowMount(CeWarningText)
    expect(wrap).toBeTruthy()
  })
  it('has correct structure', () => {
    const wrap = shallowMount(CeWarningText)
    expect(wrap.findComponent(CeIcon).exists()).toBeTruthy()
    expect(wrap.findComponent(CeSmallText).exists()).toBeTruthy()
  })
})
