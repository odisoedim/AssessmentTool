import { mount } from '@vue/test-utils'
import CeSkeleton from '~/components/atoms/CeSkeleton.vue'
import { expectClass } from '~/test/helper/expect'

describe('CeSkeleton', () => {
  it('can work', () => {
    const wrap = mount(CeSkeleton)
    expect(wrap).toBeTruthy()
  })
  it('has gray background and animate', () => {
    const wrap = mount(CeSkeleton)
    expectClass(wrap, ['bg-gray-100', 'animate-pulse'])
  })
})
