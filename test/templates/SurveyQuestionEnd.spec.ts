import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import SurveyQuestionEnd from '~/components/templates/SurveyQuestionEnd.vue'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import SurveyChallengesCheckboxGroup from '~/components/organisms/SurveyChallengesCheckboxGroup.vue'
import CeInput from '~/components/atoms/CeInput.vue'
import { CircleStrategyEndPage } from '~/pages-helper/assessment/survey/createPage'
import {
  useSurveyInfoMock,
  useEndQuestionsMock,
} from '~/test/helper/mockInject'

const useSurveyInfo = useSurveyInfoMock()

const useComputedPages = jest.fn()
const computedPageMock = function () {
  return [
    {
      group: { name: 'string', id: '163' },
      data: {
        id: 11,
        name: 'stringName',
        description: 'string',
        children: ['test1', 'test2', 'test3'],
      },
      type: 2,
      input: [],
    },
  ]
}

const computedPagesMock = function () {
  return {
    computedPages: ref<CircleStrategyEndPage[]>(computedPageMock()),
    pageIndex: ref(0),
  }
}

useComputedPages.mockReturnValue(computedPagesMock())

jest.mock('~/pages-helper/assessment/survey/computedPages.ts', () => {
  return {
    useComputedPages: () => useComputedPages(),
  }
})
jest.mock('~/pages-helper/assessment/survey/surveyInfo.ts', () => {
  return {
    useSurveyInfo: () => useSurveyInfo.mock(),
  }
})
const useEndQuestions = useEndQuestionsMock()
jest.mock('~/pages-helper/assessment/survey/endQuestionTexts', () => {
  return {
    useEndQuestions: () => useEndQuestions.mock(),
  }
})
useEndQuestions.mockQuestion()
describe('SurveyQuestionEnd', () => {
  it('can work', () => {
    const wrapper = shallowMount(SurveyQuestionEnd)
    expect(wrapper).toBeTruthy()
  })
  it('has correct structure', async () => {
    const wrapper = shallowMount(SurveyQuestionEnd)
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('li').length).toBe(3)
    expect(wrapper.findComponent(CeHeading1).text()).toBe('stringName')
    expect(wrapper.findComponent(SurveyChallengesCheckboxGroup)).toBeTruthy()
    expect(wrapper.findAllComponents(CeInput).length).toBe(
      useEndQuestions.mock().value.length
    )
  })
  it('is correct type', async () => {
    const wrapper = shallowMount(SurveyQuestionEnd)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.data.type).toBe(2)
  })
})
