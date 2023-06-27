import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { useCommonGraphqlMock } from '~/test/helper/mockApi'
import { useSurveyWithAssessmentRequest } from '~/pages-helper/assessment/survey/useSurveyWithAssessmentRequest'
import { expectText } from '~/test/helper/expect'
import { useOrganisationMock, useUserinfoMock } from '~/test/helper/mockInject'

const useFetchAssessment = useCommonGraphqlMock()
const useFetchFrameworkElement = useCommonGraphqlMock()
const useFetchFrameworkElements = useCommonGraphqlMock()
jest.mock('~/api/assessment', () => ({
  useFetchAssessment: () => useFetchAssessment.mock(),
}))
jest.mock('~/api/frameworkElements', () => ({
  useFetchFrameworkElement: () => useFetchFrameworkElement.mock(),
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
  it('return assessmentId and surveyId from route', () => {
    const wrap = mount(
      {
        template: `<div>{{assessmentId}}_{{surveyId}}</div>`,
        setup() {
          return useSurveyWithAssessmentRequest()
        },
      },
      { ...mockRoute }
    )
    expectText(wrap, '1_2')
  })
  describe('return a fetch, can fetch data', () => {
    const failMount = {
      template: `
            <div @click='fetch'>
              <div v-if='error'>{{error}}</div>
              <div v-else>
                <span v-for='(v,k) in result' :key='k'>
                  {{k}}_{{Object.values(v).join('/')}}
                </span>
              </div>
            </div>`,
      setup() {
        const { fetch } = useSurveyWithAssessmentRequest()
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
    it('return error when fetchAssessment fail', async () => {
      useFetchAssessment.mockFail('fetchAssessment fail')
      const wrap = mount(failMount, { ...mockRoute })
      expectText(wrap, '')
      await wrap.trigger('click')
      await wrap.vm.$nextTick()
      expectText(wrap, 'fetchAssessment fail')
    })
    it('return error when fetchFramework fail', async () => {
      useFetchAssessment.mockSuccess({})
      useFetchFrameworkElement.mockFail('fetchFramework fail')
      const wrap = mount(failMount, { ...mockRoute })
      expectText(wrap, '')
      await wrap.trigger('click')
      await wrap.vm.$nextTick()
      await wrap.vm.$nextTick()
      expectText(wrap, 'fetchFramework fail')
    })
    it('return error when fetchFrameworks fail', async () => {
      useFetchAssessment.mockSuccess({})
      useFetchFrameworkElement.mockSuccess({})
      useFetchFrameworkElements.mockFail('fetchFrameworks fail')
      const wrap = mount(failMount, { ...mockRoute })
      expectText(wrap, '')
      await wrap.trigger('click')
      await wrap.vm.$nextTick()
      await wrap.vm.$nextTick()
      expectText(wrap, 'fetchFrameworks fail')
    })
    it('return data when fetch success', async () => {
      useFetchAssessment.mockSuccess({ data: 'success' })
      useFetchFrameworkElement.mockSuccess({
        data: 'success',
      })
      useFetchFrameworkElements.mockSuccess({
        data: 'success',
      })
      const wrap = mount(failMount, { ...mockRoute })
      expectText(wrap, '')
      await wrap.trigger('click')
      await wrap.vm.$nextTick()
      await wrap.vm.$nextTick()
      const spans = wrap.findAll('span')
      expectText(spans.at(0), 'assessmentData_success')
      expectText(spans.at(1), 'frameworksData_success')
      expectText(spans.at(2), 'challengesData_success')
    })
  })
})
