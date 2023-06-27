import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import AssessmentSurveyId from '@/pages/assessment/survey/_id.vue'
import SurveyEnd from '~/components/templates/SurveyEnd.vue'
import SurveyQuestionDesc from '~/components/templates/SurveyQuestionDesc.vue'
import SurveyQuestion from '~/components/templates/SurveyQuestion.vue'
import SurveyQuestionEnd from '~/components/templates/SurveyQuestionEnd.vue'
import SurveyHeader from '~/components/organisms/SurveyHeader.vue'
import SurveyProgressBarWithTitle from '~/components/organisms/SurveyProgressBarWithTitle.vue'
import SurveyFooter from '~/components/organisms/SurveyFooter.vue'

jest.mock('~/pages-helper/assessment/survey/_id', () => ({
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
  it('render survey header, SurveyFooter, SurveyProgressBarWithTitle', () => {
    const wrap = shallowMount(AssessmentSurveyId)
    expect(wrap.findComponent(SurveyHeader).exists()).toBeTruthy()
    expect(wrap.findComponent(SurveyProgressBarWithTitle).exists()).toBeTruthy()
    expect(wrap.findComponent(SurveyFooter).exists()).toBeTruthy()
    expect(wrap).toBeTruthy()
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
