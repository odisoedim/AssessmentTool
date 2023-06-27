import { ref } from '@nuxtjs/composition-api'
import { mount } from '@vue/test-utils'
import {
  renderAssessment,
  renderFrameworkElements,
} from '~/test/helper/mockData'
import { useRequestAsyncMock } from '~/test/helper/mockRequestAsync'
import { useDemoAssessmentResult } from '~/pages-helper/demoAssessment/result/_id'

jest.mock(
  '~/pages-helper/assessment/overview/useAssessmentOverviewResult',
  () => ({
    useDemoAssessmentResultFetch: () => ({
      assessmentId: ref('1'),
      fetch: jest.fn(),
    }),
  })
)

const provideSubStrategyOption = jest.fn()
jest.mock('~/pages-helper/assessment/survey/subStrategyOption', () => ({
  provideSubStrategyOption: () => provideSubStrategyOption(),
}))

const provideDemoSurveyInfo = jest.fn()
jest.mock('~/pages-helper/assessment/survey/surveyInfo', () => ({
  provideDemoSurveyInfo: () => provideDemoSurveyInfo(),
}))

const provideDemoSurveyResult = jest.fn()
jest.mock('~/pages-helper/assessment/result/surveyResult', () => ({
  provideDemoSurveyResult: () => provideDemoSurveyResult(),
}))

const useRequest = useRequestAsyncMock()
jest.mock('@use/useRequest', () => ({
  useRequest: () => useRequest.mock(),
}))

describe('demoAssessment/result/_id.ts', () => {
  it('can work', () => {
    useRequest.mockFail()
    const wrap = mount({
      template: '<div></div>',
      setup() {
        useDemoAssessmentResult()
      },
    })
    expect(wrap).toBeTruthy()
  })
  it('can provide result if all fetch success', async () => {
    jest.clearAllMocks()
    useRequest.mockSuccess(
      ref({
        assessmentData: { assessment: renderAssessment(1) },
        frameworksData: {
          frameworkElements: [renderFrameworkElements(2)],
        },
        answersData: {
          answersStores: [],
        },
      })
    )
    const wrap = mount({
      template: '<div></div>',
      setup() {
        useDemoAssessmentResult()
      },
    })
    await wrap.vm.$nextTick()
    expect(provideSubStrategyOption).toBeCalledTimes(1)
    expect(provideDemoSurveyInfo).toBeCalledTimes(1)
    expect(provideDemoSurveyResult).toBeCalledTimes(1)
    expect(wrap).toBeTruthy()
  })
})
