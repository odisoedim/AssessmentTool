import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import { ref } from '@nuxtjs/composition-api'
import AssessmentSurveyTabs from '~/components/organisms/AssessmentSurveyTabs.vue'
import CeCardWithProgress from '~/components/molecules/CeCardWithProgress.vue'
import CeButton from '~/components/atoms/CeButton.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()
const assessmentCardResult = jest.fn()
jest.mock('@use/useParamsId', () => {
  return {
    useParamsId: () => {
      return ref(1)
    },
  }
})

jest.mock('~/pages-helper/assessment/overview/assesmentCardResult', () => {
  return {
    useAssessmentCardResult: () => assessmentCardResult(),
  }
})
assessmentCardResult.mockReturnValue([
  {
    name: 'test1',
    id: 1,
    notApplicable: false,
    progress: 100,
    score: 50,
  },
])
describe('AssessmentSurveyTabs.vue', () => {
  it('can work', () => {
    const wrapper = shallowMount(AssessmentSurveyTabs)
    expect(wrapper).toBeTruthy()
  })
  it('has correct structure', () => {
    const wrapper = shallowMount(AssessmentSurveyTabs, {})
    expect(wrapper.findAllComponents(CeCardWithProgress).length).toBe(1)
  })

  it('can redirect to survey strategy when click card', async () => {
    const wrapper = mount(AssessmentSurveyTabs, {
      localVue,
      router,
    })
    wrapper.findComponent(CeButton).trigger('click')
    await wrapper.findComponent(CeCardWithProgress).trigger('click')
    expect(wrapper.vm.$route.path).toBe('/assessment/result/1_1')
  })
})
