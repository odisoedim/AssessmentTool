import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'

import {
  provideSurveyResultGroup,
  useSurveyResultGroup,
} from '~/pages-helper/assessment/result/surveyResult'
import { expectText } from '~/test/helper/expect'
import { renderFrameworkElement } from '~/test/helper/mockData'
import { AnswersStore } from '~/type/schema/answersStore'
import { ENUM_QUESTION_TYPE } from '~/type/enum'
const mockData = () => {
  const element = renderFrameworkElement(160)
  element.children = [
    renderFrameworkElement(174),
    renderFrameworkElement(175),
    renderFrameworkElement(176),
  ]
  element.children[0].children = [
    renderFrameworkElement(222),
    renderFrameworkElement(223),
  ]
  element.children[1].children = [
    renderFrameworkElement(224),
    renderFrameworkElement(225),
    renderFrameworkElement(226),
    renderFrameworkElement(227),
    renderFrameworkElement(228),
    renderFrameworkElement(229),
    renderFrameworkElement(230),
  ]
  element.children[2].children = [
    renderFrameworkElement(231),
    renderFrameworkElement(232),
  ]
  const answer: AnswersStore = {
    assessment: { id: '4' },
    frozenBy: {
      id: '1',
      username: 'user_1',
    },
    organisation: '1234',
    surveyId: '160',
    id: '40',
    completed: false,
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
          heading:
            'Please provide additional explanation on your key challenges for "Maximise lifetime of biological products"',
          model: 'challenge',
          value: {
            check: [
              'Market (pricing, supply, etc.)',
              'Technology',
              'Financing',
            ],
            other: '',
          },
          type: ENUM_QUESTION_TYPE.check,
        },
        {
          heading: '',
          model: 'opportunities',
          value: '1',
          type: ENUM_QUESTION_TYPE.text,
        },
      ],
      '176': [
        {
          heading:
            'Please provide additional explanation on your key challenges for "Maximise lifetime of biological products"',
          model: 'challenge',
          value: {
            other: 'Checked response',
            check: ['something else'],
          },
          type: ENUM_QUESTION_TYPE.check,
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
        option: '5',
        provideExample: '',
      },
    },
    updated: '2021-12-15T03:31:21.000Z',
  }
  const scores = { '174': 25, '176': -1 }
  return { answer, element, scores }
}
describe('provide/inject surveyResult', () => {
  it('has result from element and answer, but it will be empty if element or answer has no data', () => {
    const wrap = mount({
      template: `<div>{{answers.map(i=>i.id).join('/')}}</div>`,
      setup() {
        provideSurveyResultGroup(ref(), ref(), ref())
        return {
          answers: useSurveyResultGroup(),
        }
      },
    })
    expectText(wrap, '')
  })
  it('has result from element and answer', () => {
    const wrap = mount({
      template: `
        <div>
        <div
          v-for='circle in answers'
          :key='circle.id'
          :id='"circle_"+circle.id'
        >
          <h1>{{ circle.id }}_{{ circle.name }}</h1>
          <h2 class='circle-not-applicable' v-if='circle.notApplicable || circle.score === -1'>N/A</h2>
          <div v-else>
            <h2 class='circle-progress'>{{ circle.progress * 100 }}</h2>
            <h3 class='circle-score'>{{ circle.score }}</h3>
            <div
              v-for='sub in circle.children.filter((i) => !i.notApplicable)'
              :key='sub.id'
            >
              <h4>{{ sub.id }}_{{ sub.name }}</h4>
              <h5>sub.option: {{ sub.option }}</h5>
              <h6 class='provideExample'>sub.provideExample: {{ sub.provideExample }}</h6>
            </div>
            <div
              v-for='sub in circle.children.filter((i) => i.notApplicable)'
              :key='sub.id'
            >
              <h4>{{ sub.id }}_{{ sub.name }}</h4>
              <h5 class='sub-not-applicable'>N/A</h5>
            </div>
          </div>
          <div v-for='answer in circle.answers' class="a">
            <h6 v-if='answer.type === "check"' :class='answer.model'>{{ answer.value.check.join(' / ') }}</h6>
            <h6 v-else-if='answer.type === "text"' :class='answer.model'>{{ answer.value }}</h6>
          </div>
        </div>
        </div>`,
      setup() {
        const { element, answer, scores } = mockData()
        provideSurveyResultGroup(ref(element), ref(answer), ref(scores))
        return {
          answers: useSurveyResultGroup(),
        }
      },
    })
    const h1 = wrap.findAll('h1')
    expect(h1.length).toBe(3)
    expectText(h1.at(2), '176_name_176')

    const h2 = wrap.findAll('h2')
    expect(h2.length).toBe(3)
    expect(h2.filter((i) => i.classes('circle-not-applicable')).length).toBe(2)
    expectText(
      wrap.find('#circle_174 .challenge'),
      'Market (pricing, supply, etc.) / Technology / Financing'
    )
    expectText(wrap.find('#circle_174 .opportunities'), '1')
  })
})
