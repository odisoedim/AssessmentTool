import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { useCommonGraphqlMock } from '~/test/helper/mockApi'
import { useAssessmentResultFetch } from '~/pages-helper/assessment/overview/useAssessmentOverviewResult'
import { useOrganisationMock, useUserinfoMock } from '~/test/helper/mockInject'
import { expectText } from '~/test/helper/expect'
import { ErrMsg } from '~/util/errMsg'

const useFetchAssessment = useCommonGraphqlMock()
const useFetchFrameworkElements = useCommonGraphqlMock()
const useFetchStores = useCommonGraphqlMock()
const useFetchAssessmentScore = jest.fn()
useFetchAssessmentScore.mockReturnValue(() => {
  return {
    data: 'success',
  }
})
jest.mock('~/api/score', () => ({
  useFetchAssessmentScore: () => useFetchAssessmentScore(),
}))
const useOrganisation = useOrganisationMock()
jest.mock('@use/useOrganisation', () => ({
  useOrganisation: () => useOrganisation.mock(),
}))
useOrganisation.currentOrganisation.mockReturnValue(ref('1'))
jest.mock('~/api/assessment', () => ({
  useFetchAssessment: () => useFetchAssessment.mock(),
}))
jest.mock('~/api/frameworkElements', () => ({
  useFetchFrameworkElements: () => useFetchFrameworkElements.mock(),
}))
jest.mock('~/api/answersStore', () => ({
  useFetchStores: () => useFetchStores.mock(),
}))
const useUserinfo = useUserinfoMock()
jest.mock('@use/useUserinfo', () => ({
  useUserinfo: () => useUserinfo.mock(),
}))
useUserinfo.mockResult()

const mockRoute = {
  mocks: {
    $route: {
      params: {
        id: '1_2',
      },
    },
  },
}
describe('useAssessmentResultFetch', () => {
  it('return assessmentId from route', () => {
    const wrap = mount(
      {
        template: `<div>{{assessmentId}}</div>`,
        setup() {
          return useAssessmentResultFetch()
        },
      },
      { ...mockRoute }
    )
    expectText(wrap, '1')
  })
  describe('return a fetch, can fetch data', () => {
    const failMount = {
      template: `<div @click='fetchData'>
              <div v-if='error'>{{error}}</div>
              <div v-else>
                <span v-for='(v,k) in result' :key='k'>
                  {{k}}_{{Object.values(v)[0]}}
                </span>
              </div>
            </div>`,
      setup() {
        const { fetch } = useAssessmentResultFetch()
        const error = ref('')
        const result = ref<Record<string, any>>({})
        return {
          error,
          result,
          async fetchData() {
            try {
              result.value = await fetch()
            } catch (e: any) {
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
    it('return error when fetchFrameworks fail', async () => {
      useUserinfo.mockResult()
      useFetchAssessment.mockSuccess({
        assessment: { framework_id: 1 },
      })
      useFetchFrameworkElements.mockFail('fetchFrameworks fail')
      const wrap = mount(failMount, { ...mockRoute })
      expectText(wrap, '')
      await wrap.trigger('click')
      await wrap.vm.$nextTick()
      await wrap.vm.$nextTick()
      expect(wrap.find('div').text()).toBe('fetchFrameworks fail')
    })
    it('return error when fetchAnswers fail', async () => {
      useUserinfo.mockResult()
      useFetchAssessment.mockSuccess({ assessment: { framework_id: 1 } })
      useFetchFrameworkElements.mockSuccess({})
      useFetchStores.mockFail('fetchFrameworks fail')
      const wrap = mount(failMount, { ...mockRoute })
      expectText(wrap, '')
      await wrap.trigger('click')
      await wrap.vm.$nextTick()
      await wrap.vm.$nextTick()
      expectText(wrap, 'fetchFrameworks fail')
    })
    it('return data when fetch success', async () => {
      useUserinfo.mockResult()
      useFetchAssessment.mockSuccess({
        data: 'success',
        assessment: { framework_id: 1 },
      })
      useFetchFrameworkElements.mockSuccess({
        data: 'success',
      })
      useFetchStores.mockSuccess({
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
      expectText(spans.at(3), 'scoresData_success')
    })
  })
})
