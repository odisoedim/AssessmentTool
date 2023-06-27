import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import CollapseFramework from '~/components/molecules/CollapseFramework.vue'
import CeCollapseSimple from '~/components/atoms/CeCollapseSimple.vue'
import { useUserinfoMock } from '~/test/helper/mockInject'
import { renderFrameworkElement } from '~/test/helper/mockData'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'

const frameworkElements = ref([renderFrameworkElement(3)])

const useUserinfo = useUserinfoMock()
jest.mock('@use/useUserinfo', () => ({
  useUserinfo: () => useUserinfo.mock(),
}))
useUserinfo.mockResult(true)
jest.mock('@use/useParamsId', () => {
  return {
    useParamsId: () => {
      return ref('1')
    },
  }
})
jest.mock('~/pages-helper/assessment/overview/_id', () => {
  return {
    useInjectAssessmentResult: () => {
      return {
        frameworkElements,
      }
    },
  }
})
describe('CollapseFramework.vue', () => {
  it('can expand ', async () => {
    const wrapper = shallowMount(CollapseFramework)
    expect(localStorage.getItem('VisitedAssessment')).toBe(
      JSON.stringify({ '1': ['1'] })
    )
    expect(wrapper.vm.$data.expand).toBeFalsy()
    await wrapper.findComponent(CeCollapseSimple).trigger('click')
    expect(wrapper.vm.$data.expand).toBeTruthy()
  })
  it('can expend when first in ', async () => {
    localStorage.clear()
    const wrapper = shallowMount(CollapseFramework)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.expand).toBeTruthy()
  })
  it('can expend when first in another situation', async () => {
    localStorage.setItem('VisitedAssessment', JSON.stringify({ '1': ['2'] }))
    const wrapper = shallowMount(CollapseFramework)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.expand).toBeTruthy()
  })
  it('can expend when not first in ', async () => {
    localStorage.setItem('VisitedAssessment', JSON.stringify({ '1': ['1'] }))
    const wrapper = shallowMount(CollapseFramework)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.expand).toBeFalsy()
  })
  it('can show frameworks', () => {
    const wrapper = shallowMount(CollapseFramework, {
      propsData: {
        frameworks: [
          {
            id: '1',
            name: 'frameworks 1',
            framework: {
              description: '1',
            },
          },
          {
            id: '2',
            name: 'frameworks 2',
            framework: {
              description: '1',
            },
          },
        ],
      },
    })
    const ceHeading5 = wrapper.findAllComponents(CeHeading5)
    expect(ceHeading5.length).toBe(2)
  })
})
