import { shallowMount } from '@vue/test-utils'
import ResultCollapse from '~/components/molecules/ResultCollapse.vue'
import { expectClass, expectText } from '~/test/helper/expect'
import CeIcon from '~/components/atoms/CeIcon.vue'

describe('ResultCollapse', () => {
  it('can work', () => {
    const wrap = shallowMount(ResultCollapse, {
      propsData: {
        title: 'hello',
      },
    })
    expect(wrap).toBeTruthy()
  })
  it('can nott expand if notApplicable', () => {
    const wrap = shallowMount(ResultCollapse, {
      propsData: {
        title: 'hello',
        notApplicable: true,
      },
    })
    expectClass(wrap.find('.result-collapse__header'), ['shadow-card'])
    expect(wrap.find('.result-collapse__body').exists()).toBeFalsy()
  })
  it('can not expand if progress not eq 100', () => {
    const wrap = shallowMount(ResultCollapse, {
      propsData: {
        title: 'hello',
        notApplicable: false,
        progress: 40,
      },
    })
    expectClass(wrap.find('.result-collapse__header'), ['shadow-card'])
    expect(wrap.find('.result-collapse__body').exists()).toBeFalsy()
    expect(wrap.findComponent(CeIcon).exists()).toBeFalsy()
  })
  it('it can use expand if progress eq 100', () => {
    const wrap = shallowMount(ResultCollapse, {
      propsData: {
        title: 'hello',
        notApplicable: false,
        progress: 100,
      },
    })
    expectClass(wrap.find('.result-collapse__header'), ['cursor-pointer'])
    expect(wrap.find('.result-collapse__body').exists()).toBeTruthy()
    expect(wrap.findComponent(CeIcon).exists()).toBeTruthy()
  })
  it('it can expand and show slot if click header', async () => {
    const wrap = shallowMount(ResultCollapse, {
      propsData: {
        title: 'hello',
        notApplicable: false,
        progress: 100,
      },
      slots: {
        default: 'hello',
      },
    })
    expect(wrap.find('.result-collapse__body').isVisible()).toBeFalsy()
    await wrap.find('.result-collapse__header').trigger('click')
    expect(wrap.find('.result-collapse__body').isVisible()).toBeTruthy()
    expectText(wrap.find('.result-collapse__body'), 'hello')
  })
})
