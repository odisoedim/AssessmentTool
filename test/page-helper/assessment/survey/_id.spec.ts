import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { useSurveyWithAssessment } from '~/pages-helper/assessment/survey/_id'
import {
  renderAssessment,
  renderFrameworkElement,
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
    useSurveyWithAssessmentRequest: () => ({
      assessmentId: ref('1'),
      surveyId: ref('2'),
      fetch: jest.fn(),
    }),
  })
)

const provideCircleStrategyCheck = jest.fn()
jest.mock('~/pages-helper/assessment/survey/circleStrategyCheck', () => ({
  provideCircleStrategyCheck: () => provideCircleStrategyCheck(),
}))
const provideSubStrategyOption = jest.fn()
jest.mock('~/pages-helper/assessment/survey/subStrategyOption', () => ({
  provideSubStrategyOption: () => provideSubStrategyOption(),
}))
const provideChallengeOptions = jest.fn()
jest.mock('~/pages-helper/assessment/survey/challengeOptions', () => ({
  provideChallengeOptions: () => provideChallengeOptions(),
}))
const provideSurveyInfo = jest.fn()
jest.mock('~/pages-helper/assessment/survey/surveyInfo', () => ({
  provideSurveyInfo: () => provideSurveyInfo(),
}))
const provideSurveyChildren = jest.fn()
jest.mock('~/pages-helper/assessment/survey/surveyChildren', () => ({
  provideSurveyChildren: () => provideSurveyChildren(),
}))
const provideSurveyPages = jest.fn()
jest.mock('~/pages-helper/assessment/survey/surveyPages', () => ({
  provideSurveyPages: () => provideSurveyPages(),
}))
const provideCaseFetchBody = jest.fn()
jest.mock('~/pages-helper/assessment/survey/caseFetchBody', () => ({
  provideCaseFetchBody: () => provideCaseFetchBody(),
}))
const provideSurveyStore = jest.fn()
jest.mock('~/pages-helper/assessment/survey/surveyStore', () => ({
  provideSurveyStore: () => provideSurveyStore(),
}))
const provideComputedPages = jest.fn()
jest.mock('~/pages-helper/assessment/survey/computedPages', () => ({
  provideComputedPages: () => provideComputedPages(),
}))

describe('survey/_id.ts', () => {
  it('can provide result if all fetch success', async () => {
    useRequest.mockSuccess(
      ref({
        assessmentData: { assessment: renderAssessment(1) },
        frameworksData: {
          frameworkElement: renderFrameworkElements(2),
        },
        challengesData: {
          frameworkElements: [
            renderFrameworkElement(31),
            renderFrameworkElement(32),
            renderFrameworkElement(33),
          ],
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
    expect(provideCircleStrategyCheck).toBeCalledTimes(1)
    expect(provideSubStrategyOption).toBeCalledTimes(1)
    expect(provideChallengeOptions).toBeCalledTimes(1)
    expect(provideSurveyInfo).toBeCalledTimes(1)
    expect(provideSurveyChildren).toBeCalledTimes(1)
    expect(provideSurveyPages).toBeCalledTimes(1)
    expect(provideCaseFetchBody).toBeCalledTimes(1)
    expect(provideSurveyStore).toBeCalledTimes(1)
    expect(provideComputedPages).toBeCalledTimes(1)
    expect(wrap).toBeTruthy()
  })
})
