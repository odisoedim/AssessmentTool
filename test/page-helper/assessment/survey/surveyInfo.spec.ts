import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import {
  provideSurveyInfo,
  useSurveyInfo,
} from '~/pages-helper/assessment/survey/surveyInfo'
import { expectText } from '~/test/helper/expect'
import {
  renderAssessment,
  renderFrameworkElement,
} from '~/test/helper/mockData'

describe('provide/inject surveyInfo', () => {
  it('has surveyInfo from assessment and element, but it will be empty if assessment and element has no data', () => {
    const wrap = mount({
      template: `<div><span id='assessmentName'>{{info.assessmentName}}</span><span id='name'>{{info.name}}</span></div>`,
      setup() {
        provideSurveyInfo(ref(), ref())
        return { info: useSurveyInfo() }
      },
    })
    expectText(wrap, '')
  })
  it('has surveyInfo from assessment and element', () => {
    const wrap = mount({
      template: `<div><span id='assessmentName'>{{info.assessmentName}}</span><span id='name'>{{info.name}}</span></div>`,
      setup() {
        provideSurveyInfo(
          ref(renderFrameworkElement(10)),
          ref(renderAssessment(1))
        )
        return { info: useSurveyInfo() }
      },
    })
    expectText(wrap.find('#assessmentName'), 'name_1')
    expectText(wrap.find('#name'), 'name_10')
  })
})
