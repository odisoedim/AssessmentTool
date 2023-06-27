import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import SurveyQuestionEnd from '~/components/templates/SurveyQuestionEnd.vue'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import SurveyChallengesCheckboxGroup from '~/components/organisms/SurveyChallengesCheckboxGroup.vue'
import CeInput from '~/components/atoms/CeInput.vue'
import { CircleDemoStrategyEndPage } from '~/pages-helper/assessment/survey/createPage'
import {
  useDemoSurveyInfoMock,
  useEndQuestionsMock,
} from '~/test/helper/mockInject'

const useComputedPages = jest.fn()
const computedPageMock = function () {
  return [
    {
      data: {
        id: 11,
        name: 'stringName',
        children: [],
      },
      type: 1,
      input: [],
    },
  ]
}

const computedPagesMock = function () {
  return {
    computedPages: ref<CircleDemoStrategyEndPage[]>(computedPageMock()),
    pageIndex: ref(0),
  }
}

useComputedPages.mockReturnValue(computedPagesMock())

jest.mock('~/pages-helper/assessment/survey/computedPages.ts', () => {
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

const useEndQuestions = useEndQuestionsMock()
jest.mock('~/pages-helper/assessment/survey/endQuestionTexts', () => {
  return {
    useEndQuestions: () => useEndQuestions.mock(),
  }
})
useEndQuestions.mockQuestion()

describe('SurveyQuestionEnd', () => {
  it('can work', () => {
    const wrapper = shallowMount(SurveyQuestionEnd, {
      propsData: {
        fromDemo: true,
      },
    })
    expect(wrapper).toBeTruthy()
  })
  it('has correct structure', async () => {
    const wrapper = shallowMount(SurveyQuestionEnd, {
      propsData: {
        fromDemo: true,
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(CeHeading1).text()).toBe('frameworkName_9')
    expect(wrapper.findComponent(SurveyChallengesCheckboxGroup)).toBeTruthy()
    expect(wrapper.findAllComponents(CeInput).length).toBe(
      useEndQuestions.mock().value.length
    )
  })
  it('is correct type', async () => {
    const wrapper = shallowMount(SurveyQuestionEnd, {
      propsData: {
        fromDemo: true,
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.data.type).toBe(1)
  })
})
