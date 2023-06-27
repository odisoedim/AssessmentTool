import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import AssessmentSurveyId from '@/pages/demoAssessment/survey/_id.vue'
import SurveyEnd from '~/components/templates/SurveyEnd.vue'
import SurveyQuestionDesc from '~/components/templates/DemoSurveyQuestionDesc.vue'
import SurveyQuestion from '~/components/templates/SurveyQuestion.vue'
import SurveyQuestionEnd from '~/components/templates/SurveyQuestionEnd.vue'

jest.mock('~/pages-helper/demoAssessment/survey/_id', () => ({
  useSurveyWithAssessment: () => {
    return { result: jest.fn() }
  },
}))
const computedPages = ref([{ type: 0 }, { type: 0 }, { type: 1 }])
const useComputedPages = jest.fn()
jest.mock('~/pages-helper/assessment/survey/computedPages', () => ({
  useComputedPages: () => useComputedPages(),
}))
useComputedPages.mockReturnValue({
  computedPages,
  pageIndex: ref(-1),
  pagesLength: ref(computedPages.value.length),
})
describe('AssessmentResultId', () => {
  it('can work', () => {
    const wrap = shallowMount(AssessmentSurveyId)
    expect(wrap).toBeTruthy()
  })
  it('can show SurveyQuestionDesc at first page', () => {
    const wrapper = shallowMount(AssessmentSurveyId)
    expect(wrapper.findComponent(SurveyQuestionDesc).exists()).toBeTruthy()
    expect(wrapper.findComponent(SurveyEnd).exists()).toBeFalsy()
    expect(wrapper.findComponent(SurveyQuestion).exists()).toBeFalsy()
    expect(wrapper.findComponent(SurveyQuestionEnd).exists()).toBeFalsy()
  })
  it('can show SurveyQuestion when type is 0', () => {
    useComputedPages.mockReturnValue({
      computedPages,
      pageIndex: ref(0),
      pagesLength: ref(computedPages.value.length),
    })
    const wrapper = shallowMount(AssessmentSurveyId)

    expect(wrapper.findComponent(SurveyQuestionDesc).exists()).toBeFalsy()
    expect(wrapper.findComponent(SurveyEnd).exists()).toBeFalsy()
    expect(wrapper.findComponent(SurveyQuestion).exists()).toBeTruthy()
    expect(wrapper.findComponent(SurveyQuestionEnd).exists()).toBeFalsy()
  })
  it('can show SurveyQuestionEnd when type is 1', () => {
    useComputedPages.mockReturnValue({
      computedPages,
      pageIndex: ref(2),
      pagesLength: ref(computedPages.value.length),
    })

    const wrapper = shallowMount(AssessmentSurveyId)
    expect(wrapper.findComponent(SurveyQuestionDesc).exists()).toBeFalsy()
    expect(wrapper.findComponent(SurveyEnd).exists()).toBeFalsy()
    expect(wrapper.findComponent(SurveyQuestion).exists()).toBeFalsy()
    expect(wrapper.findComponent(SurveyQuestionEnd).exists()).toBeTruthy()
  })
  it('can show SurveyQuestionEnd at last', () => {
    useComputedPages.mockReturnValue({
      computedPages,
      pageIndex: ref(3),
      pagesLength: ref(computedPages.value.length),
    })

    const wrapper = shallowMount(AssessmentSurveyId)
    expect(wrapper.findComponent(SurveyQuestionDesc).exists()).toBeFalsy()
    expect(wrapper.findComponent(SurveyEnd).exists()).toBeTruthy()
    expect(wrapper.findComponent(SurveyQuestion).exists()).toBeFalsy()
    expect(wrapper.findComponent(SurveyQuestionEnd).exists()).toBeFalsy()
  })
})
