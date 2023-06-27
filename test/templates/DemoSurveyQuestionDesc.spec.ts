import { shallowMount } from '@vue/test-utils'
import SurveyQuestionDesc from '~/components/templates/DemoSurveyQuestionDesc.vue'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import { useDemoSurveyInfoMock } from '~/test/helper/mockInject'

let validationResult = ''
const useComputedPages = jest.fn()
const validation = {
  open: jest.fn(() => {
    validationResult = 'open'
  }),
}

const computedPagesMock = function () {
  return {
    validation,
  }
}

useComputedPages.mockReturnValue(computedPagesMock())

jest.mock('~/pages-helper/assessment/survey/computedPages', () => {
  return {
    useComputedPages: () => useComputedPages(),
  }
})

const useSurveyInfo = useDemoSurveyInfoMock()
jest.mock('~/pages-helper/assessment/survey/surveyInfo', () => {
  return {
    useSurveyInfo: () => useSurveyInfo.mock(),
  }
})
useSurveyInfo.mockInfo(1, 9)

describe('SurveyQuestionDesc', () => {
  it('can work', () => {
    const wrapper = shallowMount(SurveyQuestionDesc)
    expect(wrapper).toBeTruthy()
  })
  it('has correct structure', () => {
    const wrapper = shallowMount(SurveyQuestionDesc)
    expect(wrapper.findAll('li').length).toBe(1)
    expect(wrapper.findComponent(CeHeading1).text()).toBe('frameworkName_9')
    expect(validationResult).toBe('open')
  })
})
