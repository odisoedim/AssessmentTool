import { shallowMount } from '@vue/test-utils'
import StartSurvey from '~/pages/assessment/overview/_id.vue'
import CollapseFramework from '~/components/molecules/CollapseFramework.vue'
import AssessmentOverviewHeader from '~/components/molecules/AssessmentOverviewHeader.vue'
import AssessmentSurveyTabs from '~/components/organisms/AssessmentSurveyTabs.vue'
import CeLoader from '~/components/atoms/CeLoader.vue'

let result: undefined | {} = {}
jest.mock('~/pages-helper/assessment/overview/_id', () => {
  return {
    useAssessmentResult: () => {},
    useInjectAssessmentResult: () => {
      return {
        result,
      }
    },
  }
})
describe('AssessmentPage', () => {
  it('can work', () => {
    const wrapper = shallowMount(StartSurvey)
    expect(wrapper).toBeTruthy()
  })
  it('has correct structure', () => {
    const wrapper = shallowMount(StartSurvey)

    expect(wrapper.findComponent(CollapseFramework)).toBeTruthy()
    expect(wrapper.findComponent(AssessmentOverviewHeader)).toBeTruthy()
    expect(wrapper.findComponent(AssessmentSurveyTabs)).toBeTruthy()
  })
  it('shows loader', () => {
  
    const wrapper = shallowMount(StartSurvey)
    expect(wrapper.findComponent(CeLoader)).toBeTruthy()
   
  })
})
