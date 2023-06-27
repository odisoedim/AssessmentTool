import { mount, shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import DemoCircleResult from '~/components/organisms/DemoCircleResult.vue'
import QuestionResult from '~/components/molecules/QuestionResult.vue'
import ResultCard from '~/components/atoms/ResultCard.vue'
import { expectText } from '~/test/helper/expect'
import { ENUM_QUESTION_TYPE } from '~/type/enum'
import { CircleStrategyEndInput } from '~/pages-helper/assessment/survey/createPage'
import { SubAnswer } from '~/pages-helper/assessment/result/surveyResult'
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
const children: SubAnswer[] = [
  {
    id: 1,
    name: 'sub_1',
    option: '1',
    provideExample: 'provideExample_1',
    notApplicable: false,
  },
  {
    id: 2,
    name: 'sub_2',
    option: '2',
    provideExample: 'provideExample_2',
    notApplicable: true,
  },
]
const answers: CircleStrategyEndInput = [
  {
    heading: 'Challenges',
    model: 'challenge',
    type: ENUM_QUESTION_TYPE.check,
    value: {
      check: ['Market (pricing, supply, etc.)', 'Technology', 'Financing'],
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
]
describe('DemoCircleResult', () => {
  it('required data', () => {
    const wrap = mount(DemoCircleResult, {
      propsData: {
        children,
        answers,
        frameworkId: 1,
      },
    })
    expect(wrap.findAllComponents(QuestionResult).length).toBe(2)
    expectText(
      wrap.find('.circle-result__challenges_explain'),
      'challengeExplain'
    )
    expectText(wrap.find('.circle-result__text'), 'opportunities')
  })

  it('empty data', () => {
    const wrap = shallowMount(DemoCircleResult, {
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
              other: '',
            },
          },
          {
            heading: '1',
            model: 'opportunities',
            type: ENUM_QUESTION_TYPE.text,
            value: '1',
          },
          {
            heading: '1',
            model: 'notes',
            type: ENUM_QUESTION_TYPE.text,
            value: '1',
          },
          {
            heading: '1',
            model: 'attribution',
            type: ENUM_QUESTION_TYPE.list,
            value: 'John\nDoe',
          },
        ],
        frameworkId: 1,
      },
    })
    expect(wrap.findAllComponents(ResultCard).length).toBe(4)
  })
})
