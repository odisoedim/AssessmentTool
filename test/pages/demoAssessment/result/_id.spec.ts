import { shallowMount } from '@vue/test-utils'
import DemoAssessmentResultId from '@/pages/demoAssessment/result/_id.vue'
import CollapseFramework from '~/components/molecules/CollapseFramework.vue'
import SurveyResultContentHeader from '~/components/molecules/SurveyResultContentHeader.vue'
import SurveyHeaderBack from '~/components/molecules/SurveyHeaderBack.vue'
import DemoAssessmentSurveyTabs from '~/components/organisms/DemoAssessmentSurveyTabs.vue'
 
let result: undefined | {} = {}
jest.mock('~/pages-helper/demoAssessment/result/_id', () => ({
  useDemoAssessmentResult: () => ({
    result: jest.fn(),
  }),
  useInjectDemoAssessmentResult: () => {
    return {
      result,
    }
  },
}))
jest.mock('~/pages-helper/assessment/result/surveyResult', () => ({
  useDemoSurveyResult: () => jest.fn(),
}))
describe('DemoAssessmentResultId', () => {
  it('can work', () => {
    const wrap = shallowMount(DemoAssessmentResultId)
    expect(wrap).toBeTruthy()
  })
  it('has has correct structure', () => {
    const wrap = shallowMount(DemoAssessmentResultId)
    expect(wrap.findComponent(SurveyHeaderBack)).toBeTruthy()
    expect(wrap.findComponent(SurveyResultContentHeader)).toBeTruthy()
    expect(wrap.findComponent(CollapseFramework)).toBeTruthy()
    expect(wrap.findComponent(DemoAssessmentSurveyTabs)).toBeTruthy()
  })
  it('is loading status', () => {
    result = undefined
    const wrap = shallowMount(DemoAssessmentResultId)
    expect(wrap).toBeTruthy()
  })
})
