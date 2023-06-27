import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import SurveyResultHeader from '~/components/templates/SurveyResultHeader.vue'
const useSurveyResult = jest.fn()
const surveyResultMock = () => {
  const assessment = ref({
    id: '1',
    name: 'assessment',
  })
  const framework = ref({
    id: '166',
    name: 'framework',
  })
  return { injectAssessment: assessment, injectFramework: framework }
}
useSurveyResult.mockReturnValue(surveyResultMock())
jest.mock('~/pages-helper/assessment/result/_id', () => {
  return {
    useInjectSurveyResult: () => useSurveyResult(),
  }
})
describe('SurveyResultHeader', () => {
  it('can work', () => {
    const wrap = shallowMount(SurveyResultHeader)
    expect(wrap).toBeTruthy()
  })
  it('has correct paths', async () => {
    const wrap = shallowMount(SurveyResultHeader)
    await wrap.vm.$nextTick()
    expect(wrap.vm.$data.paths[0].title).toBe('Assessments')
    expect(wrap.vm.$data.paths[0].to).toBe('/assessment')
    expect(wrap.vm.$data.paths[1].title).toBe('assessment')
    expect(wrap.vm.$data.paths[1].to).toBe('/assessment/overview/1')
    expect(wrap.vm.$data.paths[2].title).toBe('framework')
    expect(wrap.vm.$data.paths[2].to).toBe('/assessment/result/1_166')
  })
})
