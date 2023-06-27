import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'

import {
  provideAssessmentCardResult,
  useAssessmentCardResult,
} from '~/pages-helper/assessment/overview/assesmentCardResult'
import { renderFrameworkElement } from '~/test/helper/mockData'
import { AnswersStore } from '~/type/schema/answersStore'
import { ENUM_QUESTION_TYPE } from '~/type/enum'
jest.mock('~/composables/useParamsId', () => {
  return {
    useParamsId: () => ref('4'),
  }
})

const mockData = () => {
  const element_1 = renderFrameworkElement('160')
  const element_2 = renderFrameworkElement('161')
  const element_3 = renderFrameworkElement('162')
  const answers: AnswersStore[] = [
    {
      assessment: { id: '4' },
      organisation: '1',
      completed: false,
      frozenBy: null,
      surveyId: '160',
      id: '40',
      progress: {
        current: {
          id: '176',
          type: 2,
        },
        userProfileInfo: { firstName: 'odiso', picture: 'https://pic' },
        circleStrategies: ['176', '174'],
      },
      data: {
        '174': [
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
            heading: 'Challenge Explain',
            model: 'challengeExplain',
            type: ENUM_QUESTION_TYPE.text,
            value: '1',
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
        '222': {
          option: '1',
          provideExample: '21',
        },
        '223': {
          option: '1',
          provideExample: '32',
        },
        '231': {
          option: '5',
          provideExample: '',
        },
        '232': {
          option: '-1',
          provideExample: '',
        },
      },
      updated: '2021-12-15T03:31:21.000Z',
    },
    {
      assessment: { id: '4' },
      organisation: '1',
      completed: true,
      frozenBy: null,
      surveyId: '161',
      id: '41',
      progress: {
        current: {
          id: '176',
          type: 2,
        },
        userProfileInfo: { firstName: 'odiso', picture: 'https://pic' },
        circleStrategies: [],
      },
      data: {
        '222': {
          option: '1',
          provideExample: '21',
        },
        '223': {
          option: '1',
          provideExample: '32',
        },
      },
      updated: '2021-12-15T03:31:21.000Z',
    },
    {
      assessment: { id: '4' },
      organisation: '1',
      completed: true,
      frozenBy: null,
      surveyId: '162',
      id: '42',
      progress: {
        current: {
          id: '176',
          type: 2,
        },
        userProfileInfo: { firstName: 'odiso', picture: 'https://pic' },
        circleStrategies: ['176'],
      },
      data: {
        '222': {
          option: '1',
          provideExample: '21',
        },
      },
      updated: '2021-12-15T03:31:21.000Z',
    },
  ]
  const frameworks = [element_1, element_2, element_3]
  const scores = {
    '4': {
      score: 25,
      survey: { '160': -1, '161': 25, '162': -1 },
    },
  }
  return { answers, frameworks, scores }
}

describe('provide/inject assessmentCardResult', () => {
  describe('has result from frameworks and answer', () => {
    it('will be empty if frameworks has no data', () => {
      const wrapper = mount({
        template: `<div>{{result.map(i=>i.id).join('/')}}</div>`,
        setup() {
          provideAssessmentCardResult(ref(), ref(), ref())
          return {
            result: useAssessmentCardResult(),
          }
        },
      })
      expect(wrapper.find('div').text()).toBe('')
    })
    it('will get N/A if frameworks has data but answer is empty ', () => {
      const wrapper = mount({
        template: `<div>{{result[0].notApplicable}}</div>`,
        setup() {
          provideAssessmentCardResult(ref(mockData().frameworks), ref(), ref())
          return {
            result: useAssessmentCardResult(),
          }
        },
      })
      expect(wrapper.find('div').text()).toBeTruthy()
    })
    it('will get result if frameworks has data and answer is not empty ', () => {
      const wrapper = mount({
        template: `<div>{{result[1].progress}},{{ result[1].score}}</div>`,
        setup() {
          provideAssessmentCardResult(
            ref(mockData().frameworks),
            ref(mockData().answers),
            ref(mockData().scores)
          )
          return {
            result: useAssessmentCardResult(),
          }
        },
      })
      expect(wrapper.find('div').text()).toBe('100,25')
    })
    it('will get N/A when answer has not data ', () => {
      const wrapper = mount({
        template: `<div>{{result[1].notApplicable}}</div>`,
        setup() {
          provideAssessmentCardResult(
            ref(mockData().frameworks),
            ref(mockData().answers),
            ref(mockData().scores)
          )
          return {
            result: useAssessmentCardResult(),
          }
        },
      })
      expect(wrapper.find('div').text()).toBeTruthy()
    })
    it('will get N/A when all answers choice notApplicable ', () => {
      const wrapper = mount({
        template: `<div>{{result[2].notApplicable}}</div>`,
        setup() {
          provideAssessmentCardResult(
            ref(mockData().frameworks),
            ref(mockData().answers),
            ref(mockData().scores)
          )
          return {
            result: useAssessmentCardResult(),
          }
        },
      })
      expect(wrapper.find('div').text()).toBeTruthy()
    })
    it('order by progress and completed and notApplicable', () => {
      const wrapper = mount({
        template: `<div>
          <div v-for="item in result" :key="item.id">
            <div class="progress">{{item.progress}}</div>
            <div class="completed">{{item.completed}}</div>
            <div class="notApplicable">{{item.notApplicable}}</div>
          </div>

        </div>`,
        setup() {
          provideAssessmentCardResult(
            ref(mockData().frameworks),
            ref(mockData().answers),
            ref(mockData().scores)
          )
          return {
            result: useAssessmentCardResult(),
          }
        },
      })
      const progressElements = wrapper.findAll('.progress')
      expect(+progressElements.wrappers[0].text()).toBeLessThanOrEqual(
        +progressElements.wrappers[1].text()
      )
      expect(+progressElements.wrappers[1].text()).toBeLessThanOrEqual(
        +progressElements.wrappers[2].text()
      )
      const completedElements = wrapper.findAll('.completed')
      expect(completedElements.wrappers[1].text()).toBe('true')
      expect(completedElements.wrappers[2].text()).toBe('true')
      const notApplicableElements = wrapper.findAll('.notApplicable')
      expect(notApplicableElements.wrappers[1].text()).toBe('false')
      expect(notApplicableElements.wrappers[2].text()).toBe('true')
    })
  })
})
