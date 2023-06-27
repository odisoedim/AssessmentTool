import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import AssessmentResultId from '@/pages/assessment/result/_id.vue'
import CollapseElement from '~/components/molecules/CollapseElement.vue'
import SurveyResultContentHeader from '~/components/molecules/SurveyResultContentHeader.vue'
import SurveyResultTabs from '~/components/organisms/SurveyResultTabs.vue'
import SurveyResultHeaderBreadcrumb from '~/components/templates/SurveyResultHeader.vue'

const useSurveyScore = jest.fn()
useSurveyScore.mockReturnValue({
  completed: ref(true),
  progress: ref(100),
  scoreSurvey: ref({ score: 100 }),
})
jest.mock('~/pages-helper/assessment/result/useSurveyScore', () => ({
  useSurveyScore: () => useSurveyScore(),
}))
jest.mock('@use/useParamsId', () => {
  return {
    useParamsId: () => {
      return ref('1_1')
    },
  }
})
jest.mock('~/pages-helper/assessment/result/_id', () => ({
  useSurveyResult: () => ({
    result: jest.fn(),
  }),
}))

jest.mock('~/pages-helper/assessment/result/surveyResult', () => ({
  useSurveyResultGroup: () => jest.fn(),
}))

const mockRoute = {
  mocks: {
    $route: {
      params: {
        id: '1_2',
      },
    },
  },
}
describe('AssessmentResultId', () => {
  it('can work', () => {
    const wrap = shallowMount(AssessmentResultId,{...mockRoute})
    expect(wrap).toBeTruthy()
  })
  it('has correct structure', () => {
    const wrap = shallowMount(AssessmentResultId,{...mockRoute})
    expect(wrap.findComponent(CollapseElement)).toBeTruthy()
    expect(wrap.findComponent(SurveyResultContentHeader)).toBeTruthy()
    expect(wrap.findComponent(SurveyResultTabs)).toBeTruthy()
    expect(wrap.findComponent(SurveyResultHeaderBreadcrumb)).toBeTruthy()
  })
})
