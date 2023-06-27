import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { useSurveyWithAssessment } from '~/pages-helper/demoAssessment/survey/_id'
import {
  renderAssessment,
  renderFrameworkElements,
} from '~/test/helper/mockData'
import { useRequestAsyncMock } from '~/test/helper/mockRequestAsync'

const useRequest = useRequestAsyncMock()
jest.mock('@use/useRequest', () => ({
  useRequest: () => useRequest.mock(),
}))

jest.mock(
  '~/pages-helper/assessment/survey/useSurveyWithAssessmentRequest',
  () => ({
    useDemoSurveyWithAssessmentRequest: () => ({
      fetch: jest.fn(),
    }),
  })
)

const provideSubStrategyOption = jest.fn()
jest.mock('~/pages-helper/assessment/survey/subStrategyOption', () => ({
  provideSubStrategyOption: () => provideSubStrategyOption(),
}))
const provideChallengeOptions = jest.fn()
jest.mock('~/pages-helper/assessment/survey/challengeOptions', () => ({
  provideChallengeOptions: () => provideChallengeOptions(),
}))
const provideDemoSurveyInfo = jest.fn()
jest.mock('~/pages-helper/assessment/survey/surveyInfo', () => ({
  provideDemoSurveyInfo: () => provideDemoSurveyInfo(),
}))
const provideDemoSurveyPages = jest.fn()
jest.mock('~/pages-helper/assessment/survey/surveyPages', () => ({
  provideDemoSurveyPages: () => provideDemoSurveyPages(),
}))
const provideCaseFetchBody = jest.fn()
jest.mock('~/pages-helper/assessment/survey/caseFetchBody', () => ({
  provideCaseFetchBody: () => provideCaseFetchBody(),
}))
const provideDemoSurveyStore = jest.fn()
jest.mock('~/pages-helper/assessment/survey/surveyStore', () => ({
  provideDemoSurveyStore: () => provideDemoSurveyStore(),
}))
const provideDemoComputedPages = jest.fn()
jest.mock('~/pages-helper/assessment/survey/computedPages', () => ({
  provideDemoComputedPages: () => provideDemoComputedPages(),
}))

describe('survey/_id.ts', () => {
  it('can provide result if all fetch success', async () => {
    useRequest.mockSuccess(
      ref({
        assessmentData: { demoAssessment: renderAssessment(1) },
        frameworksData: {
          frameworkElements: renderFrameworkElements(2),
        },
      })
    )
    const wrap = mount({
      template: '<div></div>',
      setup() {
        useSurveyWithAssessment()
      },
    })
    await wrap.vm.$nextTick()
    expect(provideSubStrategyOption).toBeCalledTimes(1)
    expect(provideChallengeOptions).toBeCalledTimes(1)
    expect(provideDemoSurveyInfo).toBeCalledTimes(1)
    expect(provideDemoSurveyPages).toBeCalledTimes(1)
    expect(provideCaseFetchBody).toBeCalledTimes(1)
    expect(provideDemoSurveyStore).toBeCalledTimes(1)
    expect(provideDemoComputedPages).toBeCalledTimes(1)
    expect(wrap).toBeTruthy()
  })
})
