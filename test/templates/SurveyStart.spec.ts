import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import SurveyStart from '~/components/templates/SurveyStart.vue'
import SurveyStrategyCheckboxGroup from '~/components/organisms/SurveyStrategyCheckboxGroup.vue'

const useSurveyInfo = jest.fn()
const useSurveyChildren = jest.fn()

const surveyChildrenMock = function (num: number = 3) {
  return Array(num)
}
const surveyInfoMock = ref({
  description: 'Test SurveyInfo Description',
})

useSurveyChildren.mockReturnValue(surveyChildrenMock())
useSurveyInfo.mockReturnValue(surveyInfoMock)

jest.mock('~/pages-helper/assessment/survey/surveyInfo', () => {
  return {
    useSurveyInfo: () => useSurveyInfo(),
  }
})
jest.mock('~/pages-helper/assessment/survey/surveyChildren', () => {
  return {
    useSurveyChildren: () => useSurveyChildren(),
  }
})
describe('SurveyQuestionEnd', () => {
  it('can work', () => {
    const wrapper = shallowMount(SurveyStart)
    expect(wrapper).toBeTruthy()
  })
  it('has SurveyStrategyCheckboxGroup', () => {
    const wrapper = shallowMount(SurveyStart)
    expect(wrapper.findComponent(SurveyStrategyCheckboxGroup)).toBeTruthy()
    expect(
      wrapper.findComponent(SurveyStrategyCheckboxGroup).vm.$parent.$el.nodeName
    ).toBe('SURVEY-CARD-STUB')
  })
})
