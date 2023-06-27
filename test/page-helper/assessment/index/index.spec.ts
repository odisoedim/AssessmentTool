import { ref } from '@nuxtjs/composition-api'
import { mount } from '@vue/test-utils'
import { useAssessments } from '~/pages-helper/assessment/index'
import { expectText } from '~/test/helper/expect'
import { nextTick } from '~/test/helper/nextTick'

const useAssessmentsAndSurvey = jest.fn()
jest.mock('~/pages-helper/assessment/index/fetchAssessments', () => ({
  useAssessmentsAndSurvey: () => useAssessmentsAndSurvey(),
}))
useAssessmentsAndSurvey.mockReturnValue({
  result: ref({
    assessmentsData: {
      assessments: [
        {
          id: '4',
          framework_id: '9',
        },
      ],
    },
    answersData: {
      answersStores: [
        {
          surveyId: '159',
          progress: {
            circleStrategies: ['173'],
          },
          completed: false,
          assessment: {
            id: '4',
          },
        },
        {
          surveyId: '158',
          progress: {
            circleStrategies: ['169'],
          },
          completed: false,
          assessment: {
            id: '4',
          },
        },
        {
          surveyId: '157',
          progress: {
            circleStrategies: [],
          },
          completed: true,
          assessment: {
            id: '4',
          },
        },
        {
          surveyId: '162',
          progress: {
            circleStrategies: ['182'],
          },
          completed: true,
          assessment: {
            id: '4',
          },
        },
        {
          surveyId: '465',
          progress: {
            circleStrategies: ['381', '334', '338', '341'],
          },
          completed: true,
          assessment: {
            id: '4',
          },
        },
        {
          surveyId: '161',
          progress: {
            circleStrategies: ['178'],
          },
          completed: true,
          assessment: {
            id: '4',
          },
        },
        {
          surveyId: '160',
          progress: {
            circleStrategies: ['174', '175', '176'],
          },
          completed: true,
          assessment: {
            id: '4',
          },
        },
      ],
    },
    elementsData: {
      frameworkElements: [
        {
          id: '156',
          framework: {
            id: '9',
          },
        },
        {
          id: '157',
          framework: {
            id: '9',
          },
        },
        {
          id: '158',
          framework: {
            id: '9',
          },
        },
        {
          id: '159',
          framework: {
            id: '9',
          },
        },
        {
          id: '160',
          framework: {
            id: '9',
          },
        },
        {
          id: '161',
          framework: {
            id: '9',
          },
        },
        {
          id: '162',
          framework: {
            id: '9',
          },
        },
        {
          id: '465',
          framework: {
            id: '9',
          },
        },
      ],
    },
    scoreData: {
      4: {
        score: 67,
      },
    },
    demoAnswersData: {
      demoAnswersStores: [
        {
          id: '126',
          progress: {
            current: {
              id: '9',
              type: 1,
            },
          },
          data: {
            '156': {
              option: '4',
            },
            '157': {
              option: '3',
            },
            '158': {
              option: '2',
            },
            '159': {
              option: '-1',
            },
            '160': {
              option: '1',
            },
            '161': {
              option: '4',
            },
            '162': {
              option: '5',
            },
            '465': {
              option: '2',
            },
          },
          completed: false,
          demo_assessment: {
            id: '1',
          },
        },
      ],
    },
    demoAssessmentsData: {
      demoAssessments: [
        {
          id: '1',
          framework_id: '9',
        },
      ],
    },
    demoScoreData: { 1: 57 },
  }),
  loading: ref(false),
  error: ref(null),
})

describe('useAssessments', () => {
  it('can calc progress', async () => {
    const wrap = mount({
      template: `
        <div>
          <div v-for='item in assessments' :key='item.id'>
            <span class='score'>{{ item.score }}</span>
            <span class='progress'>{{ item.progress }}</span>
          </div>
        </div>`,
      setup() {
        const { assessments, answers, loading, error, elements } =
          useAssessments()
        return {
          assessments,
          answers,
          loading,
          error,
          elements,
        }
      },
    })
    await nextTick(wrap, 1)
    expectText(wrap.findAll('.score').at(0), '67')
    expectText(wrap.findAll('.score').at(1), '57')
    expectText(wrap.findAll('.progress').at(0), '63')
    expectText(wrap.findAll('.progress').at(1), '86')
  })
})
