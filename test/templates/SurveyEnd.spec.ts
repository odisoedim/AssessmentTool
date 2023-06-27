import { shallowMount } from '@vue/test-utils'
import SurveyEnd from '~/components/templates/SurveyEnd.vue'
import CeHeading3 from '~/components/atoms/CeHeading3.vue'
import CeP from '~/components/atoms/CeP.vue'
import { useSurveyInfoMock } from '~/test/helper/mockInject'

const useSurveyInfo = useSurveyInfoMock()
jest.mock('~/pages-helper/assessment/survey/surveyInfo', () => {
  return {
    useSurveyInfo: () => useSurveyInfo.mock(),
  }
})
useSurveyInfo.mockInfo(12, 2)
const content = {
  titleText: `Thank you for completing this portion of the
    assessment.`,
  mainText: `Click “Submit” in order to finalise your answers for “Name_12”.
    You will return to the assessment overview where you can view your
    results.`,
  tailText: 'Your answers will be saved and can be edited at any time.',
}

describe('SurveyEnd', () => {
  it('can work', () => {
    const wrapper = shallowMount(SurveyEnd)
    expect(wrapper).toBeTruthy()
  })
  it('has correct structure', () => {
    const wrapper = shallowMount(SurveyEnd)
    const H3 = wrapper.findComponent(CeHeading3)
    const cePs = wrapper.findAllComponents(CeP)
    expect(H3.text()).toBe(content.titleText)
    expect(cePs.at(0).text()).toBe(content.mainText)
    expect(cePs.at(1).text()).toBe(content.tailText)
  })
})
