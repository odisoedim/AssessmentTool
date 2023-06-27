import { ref } from '@nuxtjs/composition-api'
import { shallowMount } from '@vue/test-utils'
import SurveyAnswerRadioGroup from '~/components/organisms/SurveyAnswerRadioGroup.vue'
import SurveyAnswerRadio from '~/components/molecules/SurveyAnswerRadio.vue'
import { expectClass, expectStyle } from '~/test/helper/expect'

const useSubStrategyOptionMock = jest.fn()
jest.mock('~/pages-helper/assessment/survey/subStrategyOption', () => ({
  useSubStrategyOption: () => useSubStrategyOptionMock(),
}))

useSubStrategyOptionMock.mockReturnValue(
  ref([
    'score_0',
    'score_50',
    'score_25',
    'score_75',
    'score_100',
    'not_applicable',
  ])
)
describe('SurveyAnswerRadioGroup', () => {
  it('can work', () => {
    const wrap = shallowMount(SurveyAnswerRadioGroup, {
      propsData: { value: '' },
    })
    expect(wrap).toBeTruthy()
  })

  it('render radio surveyAnswerRadio ', () => {
    const wrap = shallowMount(SurveyAnswerRadioGroup, {
      propsData: { value: '' },
    })
    const radios = wrap.findAllComponents(SurveyAnswerRadio)
    expect(radios.length).toBe(6)
    expect(radios.at(3).vm.$props.text).toBe('score_75')
  })

  it('will not active line before select radio', () => {
    const wrap = shallowMount(SurveyAnswerRadioGroup, {
      propsData: { value: '' },
    })
    const inactiveLine = wrap.find('.answers__inactive-line')
    const activeLine = wrap.find('.answers__active-line')
    expectClass(inactiveLine, ['w-full', 'bg-kh-blue-grey-400'])
    expectClass(activeLine, 'bg-kh-primary')
    expectStyle(activeLine, { width: '0%' })
  })
  it('will active line when select radio unless not_applicable', async () => {
    const wrap = shallowMount(SurveyAnswerRadioGroup, {
      propsData: { value: '' },
    })
    await wrap.setProps({ value: '3' })
    const inactiveLine = wrap.find('.answers__inactive-line')
    const activeLine = wrap.find('.answers__active-line')
    expectClass(inactiveLine, ['w-full', 'bg-kh-blue-grey-400'])
    expectClass(activeLine, 'bg-kh-primary')
    expectStyle(activeLine, { width: '75%' })
  })
  it('will not active line when select not_applicable', async () => {
    const wrap = shallowMount(SurveyAnswerRadioGroup, {
      propsData: { value: '' },
    })
    await wrap.setProps({ value: '5' })
    const inactiveLine = wrap.find('.answers__inactive-line')
    const activeLine = wrap.find('.answers__active-line')
    expectClass(inactiveLine, ['w-full', 'bg-kh-blue-grey-400'])
    expectClass(activeLine, 'bg-kh-primary')
    expectStyle(activeLine, { width: '0%' })
  })
})
