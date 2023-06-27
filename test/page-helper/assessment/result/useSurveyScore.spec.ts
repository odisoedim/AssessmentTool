import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { useUserinfoMock } from '~/test/helper/mockInject'
import { useSurveyScore } from '~/pages-helper/assessment/result/useSurveyScore'

const answerMock = jest.fn()
answerMock.mockReturnValue(ref())
jest.mock('~/pages-helper/assessment/result/_id', () => {
  return {
    useInjectSurveyResult: () => {
      return {
        injectAnswer: answerMock(),
      }
    },
  }
})

const mockMount = {
  template: '<div>{{scoreSurvey&&scoreSurvey.score}}</div>',
  setup() {
    const { progress, completed, scoreSurvey } = useSurveyScore(
      ref('4'),
      ref('1')
    )
    return { progress, completed, scoreSurvey }
  },
}

const useFetchSurveyScore = jest.fn()
jest.mock('~/api/score', () => ({
  useFetchSurveyScore: () => useFetchSurveyScore(),
}))
useFetchSurveyScore.mockReturnValue(async () => {
  await 1
  return {
    score: 100,
    surveyId: '1',
  }
})
const useUserinfo = useUserinfoMock()
jest.mock('@use/useUserinfo', () => ({
  useUserinfo: () => useUserinfo.mock(),
}))
useUserinfo.mockResult()

jest.mock('@use/useParamsId', () => {
  return {
    useParamsId: () => {
      return ref('1_1')
    },
  }
})

describe('useSurveyScore', () => {
  it('is not completed', async () => {
    answerMock.mockReturnValue(ref())

    const wrapper = shallowMount(mockMount)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.completed).toBeFalsy()
    expect(wrapper.vm.$data.progress).toBe(0)
  })
  it('is completed and has score', async () => {
    answerMock.mockReturnValue(ref({ data: [], completed: true }))

    const wrapper = shallowMount(mockMount)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.completed).toBeTruthy()
    expect(wrapper.vm.$data.progress).toBe(-1)
    expect(wrapper.vm.$data.scoreSurvey.score).toBe(100)
  })
  it('has completed but has not score', async () => {
    answerMock.mockReturnValue(ref({ data: [{ option: 5 }], completed: true }))
    useFetchSurveyScore.mockReturnValue(async () => {
      await 1
      return {
        score: -1,
        surveyId: '1',
      }
    })
    const wrapper = shallowMount(mockMount)
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.completed).toBeTruthy()
    expect(wrapper.vm.$data.progress).toBe(100)
    expect(wrapper.vm.$data.scoreSurvey.score).toBe(-1)
  })
})
