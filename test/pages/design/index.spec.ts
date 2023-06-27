import { shallowMount } from '@vue/test-utils'
import DesignIndex from '@/pages/design/index.vue'
describe('pages/design/index.vue', () => {
  it('can work', () => {
    const wrap = shallowMount(DesignIndex)
    expect(wrap).toBeTruthy()
  })
})
