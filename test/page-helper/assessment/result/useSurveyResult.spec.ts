import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { useCommonGraphqlMock } from '~/test/helper/mockApi'
import { expectText } from '~/test/helper/expect'
import { useSurveyResultFetch } from '~/pages-helper/assessment/result/useSurveyResult'
import { useOrganisationMock, useUserinfoMock } from '~/test/helper/mockInject'
import { ErrMsg } from '~/util/errMsg'

const useFetchAssessment = useCommonGraphqlMock()
const useFetchFrameworkElement = useCommonGraphqlMock()
const useFetchStore = useCommonGraphqlMock()

const useFetchCircleScore = jest.fn()
useFetchCircleScore.mockReturnValue(() => {
  return {
    data: 'success',
  }
})
jest.mock('~/api/score', () => ({
  useFetchCircleScore: () => useFetchCircleScore(),
}))

jest.mock('~/api/assessment', () => ({
  useFetchAssessment: () => useFetchAssessment.mock(),
}))
jest.mock('~/api/frameworkElements', () => ({
  useFetchFrameworkElement: () => useFetchFrameworkElement.mock(),
}))
jest.mock('~/api/answersStore', () => ({
  useFetchStore: () => useFetchStore.mock(),
}))
const useUserinfo = useUserinfoMock()
jest.mock('@use/useUserinfo', () => ({
  useUserinfo: () => useUserinfo.mock(),
}))
useUserinfo.mockResult()
const useOrganisation = useOrganisationMock()
jest.mock('@use/useOrganisation', () => ({
  useOrganisation: () => useOrganisation.mock(),
}))
useOrganisation.currentOrganisation.mockReturnValue(ref('1'))
const mockRoute = {
  mocks: {
    $route: {
      params: {
        id: '1_2',
      },
    },
  },
}
describe('useSurveyResultFetch', () => {
  it('return assessmentId and surveyId from route', () => {
    const wrap = mount(
      {
        template: `<div>{{assessmentId}}_{{surveyId}}</div>`,
        setup() {
          return useSurveyResultFetch()
        },
      },
      { ...mockRoute }
    )
    expectText(wrap, '1_2')
  })
  describe('return a fetch, can fetch data', () => {
    const failMount = {
      template: `<div @click='fetch'>
              <div v-if='error'>{{error}}</div>
              <div v-else>
                <span v-for='(v,k) in result' :key='k'>
                  {{k}}_{{Object.values(v).join('/')}}
                </span>
              </div>
            </div>`,
      setup() {
        const { fetch } = useSurveyResultFetch()
        const error = ref('')
        const result = ref<Record<string, any>>({})
        return {
          error,
          result,
          async fetch() {
            try {
              result.value = await fetch()
            } catch (e) {
              error.value = e.message
            }
          },
        }
      },
    }
    it('return error when user no login', async () => {
      useUserinfo.mockResult(false)
      const wrap = mount(failMount, { ...mockRoute })
      expectText(wrap, '')
      await wrap.trigger('click')
      await wrap.vm.$nextTick()
      expectText(wrap, ErrMsg.NoLogged)
    })
    it('return error when fetchAssessment fail', async () => {
      useUserinfo.mockResult()
      useFetchAssessment.mockFail('fetchAssessment fail')
      const wrap = mount(failMount, { ...mockRoute })
      expectText(wrap, '')
      await wrap.trigger('click')
      await wrap.vm.$nextTick()
      expectText(wrap, 'fetchAssessment fail')
    })
    it('return error when fetchFramework fail', async () => {
      useUserinfo.mockResult()
      useFetchAssessment.mockSuccess({})
      useFetchFrameworkElement.mockFail('fetchFramework fail')
      const wrap = mount(failMount, { ...mockRoute })
      expectText(wrap, '')
      await wrap.trigger('click')
      await wrap.vm.$nextTick()
      await wrap.vm.$nextTick()
      expectText(wrap, 'fetchFramework fail')
    })
    it('return error when fetchAnswers fail', async () => {
      useUserinfo.mockResult()
      useFetchAssessment.mockSuccess({})
      useFetchFrameworkElement.mockSuccess({})
      useFetchStore.mockFail('fetchFrameworks fail')
      const wrap = mount(failMount, { ...mockRoute })
      expectText(wrap, '')
      await wrap.trigger('click')
      await wrap.vm.$nextTick()
      await wrap.vm.$nextTick()
      expectText(wrap, 'fetchFrameworks fail')
    })
    it('return data when fetch success', async () => {
      useUserinfo.mockResult()
      useFetchAssessment.mockSuccess({ data: 'success' })
      useFetchFrameworkElement.mockSuccess({
        data: 'success',
      })
      useFetchStore.mockSuccess({
        data: 'success',
      })
      const wrap = mount(failMount, { ...mockRoute })
      expectText(wrap, '')
      await wrap.trigger('click')
      await wrap.vm.$nextTick()
      await wrap.vm.$nextTick()
      await wrap.vm.$nextTick()
      const spans = wrap.findAll('span')
      expectText(spans.at(0), 'assessmentData_success')
      expectText(spans.at(1), 'frameworksData_success')
      expectText(spans.at(2), 'answersData_success')
      expectText(spans.at(3), 'circleScoresData_success')
    })
  })
})
