import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { useCommonGraphqlMock } from '~/test/helper/mockApi'
import { useDemoSurveyWithAssessmentRequest } from '~/pages-helper/assessment/survey/useSurveyWithAssessmentRequest'
import { expectText } from '~/test/helper/expect'
import { useOrganisationMock, useUserinfoMock } from '~/test/helper/mockInject'

const useFetchDemoAssessment = useCommonGraphqlMock()
const useFetchFrameworkElements = useCommonGraphqlMock()
jest.mock('~/api/assessment', () => ({
  useFetchDemoAssessment: () => useFetchDemoAssessment.mock(),
}))
jest.mock('~/api/frameworkElements', () => ({
  useFetchFrameworkElements: () => useFetchFrameworkElements.mock(),
}))
const useUserinfo = useUserinfoMock()
jest.mock('@use/useUserinfo', () => ({
  useUserinfo: () => useUserinfo.mock(),
}))
useUserinfo.mockResult(true)
const useOrganisation = useOrganisationMock()
jest.mock('@use/useOrganisation', () => ({
  useOrganisation: () => useOrganisation.mock(),
}))
useOrganisation.organisations.mockReturnValue([])
useOrganisation.currentOrganisation.mockReturnValue(ref(1))

const mockRoute = {
  mocks: {
    $route: {
      params: {
        id: '1_2',
      },
    },
    $router: {
      push: jest.fn(),
    },
  },
}
describe('useSurveyWithAssessmentRequest', () => {
  it('return assessmentId from route', () => {
    const wrap = mount(
      {
        template: `<div>{{assessmentId}}</div>`,
        setup() {
          return useDemoSurveyWithAssessmentRequest()
        },
      },
      { ...mockRoute }
    )
    expectText(wrap, '1')
  })
  describe('return a fetch, can fetch data', () => {
    const failMount = {
      template: `
            <div @click='fetch'>
              <div v-if='error'>{{error}}</div>
              <div v-else>
                <span v-for='(v,k) in result' :key='k'>
                  {{k}}_{{Object.values(Object.values(v)[0]).join('/')}}
                </span>
              </div>
            </div>`,
      setup() {
        const { fetch } = useDemoSurveyWithAssessmentRequest()
        const error = ref('')
        const result = ref<Record<string, any>>({})
        return {
          error,
          result,
          async fetch() {
            try {
              result.value = await fetch()
            } catch (e: any) {
              error.value = e.message
            }
          },
        }
      },
    }
    it('return error when fetchAssessment fail', async () => {
      useFetchDemoAssessment.mockFail('fetchAssessment fail')
      const wrap = mount(failMount, { ...mockRoute })
      expectText(wrap, '')
      await wrap.trigger('click')
      await wrap.vm.$nextTick()
      expectText(wrap, 'fetchAssessment fail')
    })
    it('return error when fetchFramework fail', async () => {
      useFetchDemoAssessment.mockSuccess({
        demoAssessment: { framework_id: 9 },
      })
      useFetchFrameworkElements.mockFail('fetchFrameworks fail')
      const wrap = mount(failMount, { ...mockRoute })
      expectText(wrap, '')
      await wrap.trigger('click')
      await wrap.vm.$nextTick()
      await wrap.vm.$nextTick()
      expectText(wrap, 'fetchFrameworks fail')
    })
    it('return error when fetchChallenges fail', async () => {
      useFetchDemoAssessment.mockSuccess({
        demoAssessment: { framework_id: 9 },
      })
      useFetchFrameworkElements.result.mockReturnValueOnce({
        data: 'success',
      })
      useFetchFrameworkElements.result.mockReturnValueOnce({
        data: null,
        error: new Error('fetchChallenges fail'),
      })
      const wrap = mount(failMount, { ...mockRoute })
      expectText(wrap, '')
      await wrap.trigger('click')
      await wrap.vm.$nextTick()
      await wrap.vm.$nextTick()
      await wrap.vm.$nextTick()
      expectText(wrap, 'fetchChallenges fail')
    })
    it('return data when fetch success', async () => {
      useFetchDemoAssessment.mockSuccess({
        demoAssessment: { framework_id: 9 },
      })
      useFetchFrameworkElements.mockSuccess({
        data: { data: 'success' },
      })
      const wrap = mount(failMount, { ...mockRoute })
      expectText(wrap, '')
      await wrap.trigger('click')
      await wrap.vm.$nextTick()
      await wrap.vm.$nextTick()
      const spans = wrap.findAll('span')
      expectText(spans.at(0), 'assessmentData_9')
      expectText(spans.at(1), 'frameworksData_success')
    })
  })
})
