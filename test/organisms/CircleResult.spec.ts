import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import CircleResult from '~/components/organisms/CircleResult.vue'
import QuestionResult from '~/components/molecules/QuestionResult.vue'
import { expectText } from '~/test/helper/expect'
import { ENUM_QUESTION_TYPE } from '~/type/enum'
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
const children = [
  {
    id: 1,
    name: 'sub_1',
    option: '1',
    provideExample: 'provideExample_1',
  },
  {
    id: 2,
    name: 'sub_2',
    option: '2',
    provideExample: 'provideExample_2',
  },
]
describe('CircleResult', () => {
  it('required data', () => {
    const wrap = mount(CircleResult, {
      propsData: {
        children,
        answers: [
          {
            heading: 'Challenges',
            model: 'challenge',
            type: ENUM_QUESTION_TYPE.check,
            value: {
              check: [
                'Market (pricing, supply, etc.)',
                'Technology',
                'Financing',
              ],
              other: 'other',
            },
          },
          {
            heading: 'Challenge Explain',
            model: 'challengeExplain',
            type: ENUM_QUESTION_TYPE.text,
            value: 'challengeExplain',
          },
          {
            heading: '1',
            model: 'opportunities',
            type: ENUM_QUESTION_TYPE.text,
            value: 'opportunities',
          },
        ],
        frameworkId: 1,
      },
    })
    expect(wrap.findAllComponents(QuestionResult).length).toBe(2)
    expect(wrap.findAll('.circle-result__challenges_check_bullet').length).toBe(
      4
    )
    expectText(
      wrap.find('.circle-result__challenges_explain'),
      'challengeExplain'
    )
    expectText(wrap.find('.circle-result__text'), 'opportunities')
  })
})
