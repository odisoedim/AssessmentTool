import { ref } from '@nuxtjs/composition-api'
import { mount } from '@vue/test-utils'
import {
  renderAssessment,
  renderFrameworkElements,
} from '~/test/helper/mockData'
import { useRequestAsyncMock } from '~/test/helper/mockRequestAsync'
import { useAssessmentResult } from '~/pages-helper/assessment/overview/_id'

jest.mock(
  '~/pages-helper/assessment/overview/useAssessmentOverviewResult',
  () => ({
    useAssessmentResultFetch: () => ({
      assessmentId: ref('1'),
      fetch: jest.fn(),
    }),
  })
)

const provideAssessmentCardResult = jest.fn()
jest.mock('~/pages-helper/assessment/overview/assesmentCardResult', () => ({
  provideAssessmentCardResult: () => provideAssessmentCardResult(),
}))

const useRequest = useRequestAsyncMock()
jest.mock('@use/useRequest', () => ({
  useRequest: () => useRequest.mock(),
}))

describe('assessment/overview/_id.ts', () => {
  it('can work', () => {
    useRequest.mockFail()
    const wrap = mount({
      template: '<div></div>',
      setup() {
        useAssessmentResult()
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
        useAssessmentResult()
      },
    })
    await wrap.vm.$nextTick()
    expect(provideAssessmentCardResult).toBeCalledTimes(1)
    expect(wrap).toBeTruthy()
  })
})
