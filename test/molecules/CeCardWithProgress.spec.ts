import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import CeCardWithProgress from '~/components/molecules/CeCardWithProgress.vue'
import SurveyProgressLine from '~/components/molecules/SurveyProgressLine.vue'
import SurveyScoreCircle from '~/components/molecules/SurveyScoreCircle.vue'

jest.mock('@use/useParamsId', () => {
  return {
    useParamsId: () => {
      return ref(1)
    },
  }
})
describe('CeCardWithProgress.vue', () => {
  it('can work', () => {
    const wrapper = shallowMount(CeCardWithProgress)
    expect(wrapper).toBeTruthy()
  })
  it('can slot right', () => {
    const wrapper = shallowMount(CeCardWithProgress, {
      slots: {
        right: 'test',
      },
    })
    expect(wrapper.text()).toContain('test')
  })
  it('shows circleScore', () => {
    const wrapper = shallowMount(CeCardWithProgress, {
      propsData: {
        completed: true,
        score: 50,
        progress: 100,
      },
      slots: {
        right: 'test',
      },
    })
    expect(wrapper.findComponent(SurveyProgressLine).exists()).toBeFalsy()
    expect(wrapper.findComponent(SurveyScoreCircle).exists()).toBeTruthy()
  })
  it('shows progressLine', () => {
    const wrapper = shallowMount(CeCardWithProgress, {
      propsData: {
        score: -1,
        progress: 50,
      },
      slots: {
        right: 'test',
      },
    })
    expect(wrapper.findComponent(SurveyScoreCircle).exists()).toBeFalsy()
    expect(wrapper.findComponent(SurveyProgressLine).exists()).toBeTruthy()
  })
  it('shows N/A', () => {
    const wrapper = shallowMount(CeCardWithProgress, {
      propsData: {
        notApplicable: true,
        score: -1,
        progress: 50,
      },
      slots: {
        right: 'test',
      },
    })
    expect(wrapper.findComponent(SurveyScoreCircle).exists()).toBeFalsy()
    expect(wrapper.findComponent(SurveyProgressLine).exists()).toBeFalsy()
  })
})
