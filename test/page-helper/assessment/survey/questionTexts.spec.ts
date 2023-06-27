import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { renderAssessment } from '~/test/helper/mockData'
import { ENUM_QUESTION_TYPE } from '~/type/enum'
import { expectText } from '~/test/helper/expect'
import { Question } from '~/type/assessment'
import {
  provideEndQuestions,
  useEndQuestions,
} from '~/pages-helper/assessment/survey/endQuestionTexts'

describe('provide/inject questionTexts', () => {
  it('has a map for question text, but it will be empty if challenges has no data', () => {
    const wrap = mount({
      template: `<div><span v-for='(v,k) in questions' :key='k'>{{k}}: {{v.text}}</span></div>`,
      setup() {
        provideEndQuestions(ref())
        return { questions: useEndQuestions() }
      },
    })
    expectText(wrap, '')
  })
  it('has a map for question text', () => {
    const questions: Question[] = [
      {
        type: ENUM_QUESTION_TYPE.text,
        text: '0_text',
        priority: 400,
        model: '0_text',
        required: false,
        heading: 'heading',
        id: 1,
      },
      {
        type: ENUM_QUESTION_TYPE.text,
        text: '1_text',
        priority: 200,
        model: '3_text',
        required: false,
        heading: 'heading 2',
        id: 2,
      },
    ]
    const wrap = mount({
      template: `<div><span v-for='(v,k) in questions' :key='k'>{{v.type}}: {{v.text}}</span></div>`,
      setup() {
        const assessment = renderAssessment(32)
        assessment.questions = questions
        provideEndQuestions(ref(assessment))
        return { questions: useEndQuestions() }
      },
    })
    const spans = wrap.findAll('span')
    expect(spans.length).toBe(questions.length)
    expectText(spans.at(0), `${ENUM_QUESTION_TYPE.text}: 0_text`)
    expectText(spans.at(1), `${ENUM_QUESTION_TYPE.text}: 1_text`)
  })

  it('has a sorted map for question text', () => {
    const questions: Question[] = [
      {
        type: ENUM_QUESTION_TYPE.text,
        text: '0_text',
        priority: 200,
        model: '0_text',
        required: false,
        heading: 'heading',
        id: 1,
      },
      {
        type: ENUM_QUESTION_TYPE.text,
        text: '1_text',
        priority: 400,
        model: '3_text',
        required: false,
        heading: 'heading 2',
        id: 2,
      },
    ]
    const wrap = mount({
      template: `<div><span v-for='(v,k) in questions' :key='k'>{{v.priority}}: {{v.text}}</span></div>`,
      setup() {
        const assessment = renderAssessment(32)
        assessment.questions = questions
        provideEndQuestions(ref(assessment))
        return { questions: useEndQuestions() }
      },
    })
    const spans = wrap.findAll('span')
    expect(spans.length).toBe(questions.length)
    expectText(spans.at(0), `400: 1_text`)
    expectText(spans.at(1), `200: 0_text`)
  })
})
