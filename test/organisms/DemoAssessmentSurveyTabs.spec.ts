import { shallowMount } from '@vue/test-utils'
import DemoAssessmentSurveyTabs from '~/components/organisms/DemoAssessmentSurveyTabs.vue'
import CeTabs from '~/components/atoms/CeTabs.vue'
import DemoCircleResult from '~/components/organisms/DemoCircleResult.vue'

const demoSurveyResult = jest.fn()
jest.mock('~/pages-helper/assessment/result/surveyResult', () => {
  return {
    useDemoSurveyResult: () => demoSurveyResult(),
  }
})
demoSurveyResult.mockReturnValue({
  id: 1,
  name: 'test',
  progress: 70,
  score: 0,
  children: [
    {
      id: 1,
      name: 'sub_1',
      option: '1',
      provideExample: 'test provideExample1',
      notApplicable: false,
    },
    {
      id: 2,
      name: 'sub_2',
      option: '2',
      provideExample: 'test provideExample2',
      notApplicable: false,
    },
  ],
  answers: {
    challenge: {
      check: [],
      other: 'test other',
    },
    challengeExplain: 'test challengeExplain',
    opportunities: 'test opportunities',
    notes: 'test notes',
  },
})
describe('DemoAssessmentSurveyTabs.vue', () => {
  it('can work', () => {
    const wrap = shallowMount(DemoAssessmentSurveyTabs)
    expect(wrap).toBeTruthy()
  })
  it('has correct structure', () => {
    const wrapper = shallowMount(DemoAssessmentSurveyTabs, {})
    expect(wrapper.findAllComponents(CeTabs)).toBeTruthy()
    expect(wrapper.findAllComponents(DemoCircleResult)).toBeTruthy()
  })
})
