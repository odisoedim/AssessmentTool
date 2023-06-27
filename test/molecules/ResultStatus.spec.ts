import { shallowMount } from '@vue/test-utils'
import ResultStatus from '~/components/molecules/ResultStatus.vue'
import { expectText } from '~/test/helper/expect'
import SurveyScoreCircle from '~/components/molecules/SurveyScoreCircle.vue'
import SurveyProgressLine from '~/components/molecules/SurveyProgressLine.vue'

describe('ResultStatus', () => {
  it('can work', () => {
    const wrap = shallowMount(ResultStatus)
    expect(wrap).toBeTruthy()
  })
  it('show N/A if notApplicable', () => {
    const wrap = shallowMount(ResultStatus, {
      propsData: {
        notApplicable: true,
      },
    })
    expectText(wrap, 'N/A')
  })
  it('show SurveyScoreCircle if applicable and progress eq 100', () => {
    const wrap = shallowMount(ResultStatus, {
      propsData: {
        notApplicable: false,
        progress: 100,
      },
    })
    expect(wrap.findComponent(SurveyScoreCircle)).toBeTruthy()
  })
  it('show SurveyProgressLine if applicable and progress not eq 100', () => {
    const wrap = shallowMount(ResultStatus, {
      propsData: {
        notApplicable: false,
        progress: 20,
      },
    })
    expect(wrap.findComponent(SurveyProgressLine)).toBeTruthy()
  })
})
