import { shallowMount } from '@vue/test-utils'
import SurveyStrategyCheckboxGroup from '~/components/organisms/SurveyStrategyCheckboxGroup.vue'
import SurveyStrategyNoCheckbox from '~/components/molecules/SurveyStrategyNoCheckbox.vue'
import SurveyStrategyCheckbox from '~/components/molecules/SurveyStrategyCheckbox.vue'
import { useSurveyChildrenMock } from '~/test/helper/mockInject'
const useSurveyChildren = useSurveyChildrenMock()

jest.mock('~/pages-helper/assessment/survey/surveyChildren', () => {
  return {
    useSurveyChildren: () => useSurveyChildren.mock(),
  }
})

useSurveyChildren.mockValue(3)

describe('SurveyStrategyCheckboxGroup', () => {
  it('can work', () => {
    const wrap = shallowMount(SurveyStrategyCheckboxGroup)
    expect(wrap).toBeTruthy()
  })
  it('render survey-strategy-checkbox', () => {
    const wrap = shallowMount(SurveyStrategyCheckboxGroup)
    const checkboxGroup = wrap.findAllComponents(SurveyStrategyCheckbox)
    expect(checkboxGroup.length).toBe(3)
  })
  it('has No applicable item', () => {
    const wrap = shallowMount(SurveyStrategyCheckboxGroup)
    expect(wrap.findComponent(SurveyStrategyNoCheckbox)).toBeTruthy()
  })
})
