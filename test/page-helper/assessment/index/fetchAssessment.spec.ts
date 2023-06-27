import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { useOrganisationMock, useUserinfoMock } from '~/test/helper/mockInject'
import { useCommonGraphqlMock, useCommonMock } from '~/test/helper/mockApi'
import { useAssessmentsAndSurvey } from '~/pages-helper/assessment/index/fetchAssessments'
import { expectText } from '~/test/helper/expect'
import { nextTick } from '~/test/helper/nextTick'
import { ErrMsg } from '~/util/errMsg'

const alert = jest.fn()
Object.assign(window, { alert, console })
const useUserinfo = useUserinfoMock()
jest.mock('@use/useUserinfo', () => ({
  useUserinfo: () => useUserinfo.mock(),
}))

const useFetchAssessments = useCommonGraphqlMock()
const useFetchDemoAssessments = useCommonGraphqlMock()
jest.mock('~/api/assessment', () => ({
  useFetchAssessments: () => useFetchAssessments.mock(),
  useFetchDemoAssessments: () => useFetchDemoAssessments.mock(),
}))

const useFetchStores = useCommonGraphqlMock()
const useDemoFetchStores = useCommonGraphqlMock()
jest.mock('~/api/answersStore', () => ({
  useFetchStores: () => useFetchStores.mock(),
  useDemoFetchStores: () => useDemoFetchStores.mock(),
}))

const useFetchFrameworkElementsByArray = useCommonGraphqlMock()
jest.mock('~/api/frameworkElements', () => ({
  useFetchFrameworkElementsByArray: () =>
    useFetchFrameworkElementsByArray.mock(),
}))

const useFetchAssessmentsScore = useCommonMock()
const useFetchDemoScores = useCommonMock()
jest.mock('~/api/score', () => ({
  useFetchAssessmentsScore: () => useFetchAssessmentsScore.mock(),
  useFetchDemoScores: () => useFetchDemoScores.mock(),
}))
const useOrganisation = useOrganisationMock()
jest.mock('@use/useOrganisation', () => ({
  useOrganisation: () => useOrganisation.mock(),
}))
useOrganisation.currentOrganisation.mockReturnValue(ref('1'))
describe('fetchAssessment', () => {
  const failMount = {
    template: `<div>{{error}}</div>`,
    setup() {
      const { error } = useAssessmentsAndSurvey()
      return {
        error,
      }
    },
  }
  it('return error when user not logged', async () => {
    useUserinfo.mockResult(false)
    const wrap = shallowMount(failMount)
    await nextTick(wrap, 1)
    expectText(wrap, `Error: ${ErrMsg.NoLogged}`)
  })
  it('return error when fetch assessments fail', async () => {
    useUserinfo.mockResult(true, '1')
    useFetchAssessments.mockFail('mock-error: fetch assessments fail')
    const wrap = shallowMount(failMount)
    await nextTick(wrap, 2)
    expectText(wrap, 'Error: mock-error: fetch assessments fail')
  })
  it('return error when fetch demo assessments fail', async () => {
    useUserinfo.mockResult(true, '1')
    useFetchAssessments.mockSuccess({ assessments: [] })
    useFetchDemoAssessments.mockFail('mock-error: fetch demo assessments fail')
    const wrap = shallowMount(failMount)
    await nextTick(wrap, 2)
    expectText(wrap, 'Error: mock-error: fetch demo assessments fail')
  })
  it('return error when fetch assessments fail', async () => {
    useUserinfo.mockResult(true, '1')
    useFetchAssessments.mockSuccess({ assessments: [] })
    useFetchDemoAssessments.mockSuccess({ demoAssessment: [] })
    useFetchFrameworkElementsByArray.mockFail('mock-error: fetch element fail')
    const wrap = shallowMount(failMount)
    await nextTick(wrap, 3)
    expectText(wrap, 'Error: mock-error: fetch element fail')
  })
  it('return assessmentsData/answersData/scoreData/elementsData if fetch success', async () => {
    useUserinfo.mockResult(true, '1')
    useFetchAssessments.mockSuccess({ assessments: [{ id: 1 }] })
    useFetchDemoAssessments.mockSuccess({ demoAssessments: [{ id: 11 }] })
    useFetchStores.mockSuccess({ answersStores: [{ id: 2 }] })
    useDemoFetchStores.mockSuccess({ demoAnswersStores: [{ id: 12 }] })
    useFetchFrameworkElementsByArray.mockSuccess({
      frameworkElements: [{ id: 3 }],
    })
    useFetchAssessmentsScore.mockSuccess({ 1: { score: 4 } })
    useFetchDemoScores.mockSuccess({ 5: 10 })
    const wrap = shallowMount({
      template: `<div v-if='result'>
      <div id='assessments'><span v-for='i in result.assessmentsData.assessments' :key='i.id'>{{i.id}}</span></div>
      <div id='demoAssessments'><span v-for='i in result.demoAssessmentsData.demoAssessments' :key='i.id'>{{i.id}}</span></div>
      <div id='answersStores'><span v-for='i in result.answersData.answersStores' :key='i.id'>{{i.id}}</span></div>
      <div id='demoAnswersStores'><span v-for='i in result.demoAnswersData.demoAnswersStores' :key='i.id'>{{i.id}}</span></div>
      <div id='frameworkElements'><span v-for='i in result.elementsData.frameworkElements' :key='i.id'>{{i.id}}</span></div>
      <div id='score'><span v-for='(v,k) in result.scoreData' :key='k'>{{v.score}}</span></div>
      <div id='demoScore'><span v-for='(v,k) in result.demoScoreData' :key='k'>{{k}}_{{v}}</span></div>
      </div>`,
      setup() {
        const { result, error } = useAssessmentsAndSurvey()
        return {
          result,
          error,
        }
      },
    })
    await nextTick(wrap, 5)
    expectText(wrap.find('#assessments'), '1')
    expectText(wrap.find('#answersStores'), '2')
    expectText(wrap.find('#frameworkElements'), '3')
    expectText(wrap.find('#score'), '4')
    expectText(wrap.find('#demoScore'), '5_10')
    expectText(wrap.find('#demoAssessments'), '11')
    expectText(wrap.find('#demoAnswersStores'), '12')
  })
  it('return error when user not has org', async () => {
    useUserinfo.mockResult(true, '')
    useOrganisation.currentOrganisation.mockReturnValue(ref(''))
    const wrap = shallowMount(failMount, {
      mocks: {
        $router: {
          replace: jest.fn(),
        },
      },
    })
    await nextTick(wrap, 1)
    expectText(wrap, `Error: ${ErrMsg.NoOrganization}`)
  })
})
