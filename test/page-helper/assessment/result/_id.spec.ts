import { ref } from '@nuxtjs/composition-api'
import { mount } from '@vue/test-utils'
import {
  renderAssessment,
  renderFrameworkElements,
} from '~/test/helper/mockData'
import { useRequestAsyncMock } from '~/test/helper/mockRequestAsync'
import { useSurveyResult } from '~/pages-helper/assessment/result/_id'
import { useUserinfoMock } from '~/test/helper/mockInject'

jest.mock('~/pages-helper/assessment/result/useSurveyResult', () => ({
  useSurveyResultFetch: () => ({
    assessmentId: ref('1'),
    surveyId: ref('2'),
    fetch: jest.fn(),
  }),
}))
const useUserinfo = useUserinfoMock()
jest.mock('@use/useUserinfo', () => ({
  useUserinfo: () => useUserinfo.mock(),
}))
useUserinfo.mockResult()

const provideSubStrategyOption = jest.fn()
jest.mock('~/pages-helper/assessment/survey/subStrategyOption', () => ({
  provideSubStrategyOption: () => provideSubStrategyOption(),
}))
const provideSurveyInfo = jest.fn()
jest.mock('~/pages-helper/assessment/survey/surveyInfo', () => ({
  provideSurveyInfo: () => provideSurveyInfo(),
}))
const provideSurveyResultGroup = jest.fn()
jest.mock('~/pages-helper/assessment/result/surveyResult', () => ({
  provideSurveyResultGroup: () => provideSurveyResultGroup(),
}))

const useRequest = useRequestAsyncMock()
jest.mock('@use/useRequest', () => ({
  useRequest: () => useRequest.mock(),
}))

describe('assessment/result/_id.ts', () => {
  it('can work', () => {
    useRequest.mockFail()
    const wrap = mount({
      template: '<div></div>',
      setup() {
        useSurveyResult()
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
          frameworkElement: renderFrameworkElements(2),
        },
        answersData: {
          answersStores: [],
        },
      })
    )
    const wrap = mount({
      template: '<div></div>',
      setup() {
        useSurveyResult()
      },
    })
    await wrap.vm.$nextTick()
    expect(provideSubStrategyOption).toBeCalledTimes(1)
    expect(provideSurveyInfo).toBeCalledTimes(1)
    expect(provideSurveyResultGroup).toBeCalledTimes(1)
    expect(wrap).toBeTruthy()
  })
})
