import { mount } from '@vue/test-utils'
import CeHalfPxLine from '~/components/atoms/CeHalfPxLine.vue'
import { expectClass } from '~/test/helper/expect'

describe('CeHalfPxLine', () => {
  it('can work', () => {
    const wrap = mount(CeHalfPxLine)
    expect(wrap).toBeTruthy()
    expectClass(wrap, ['h-px', 'scale-y-50'])
  })
})
