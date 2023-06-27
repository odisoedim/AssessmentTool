import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import {
  provideSurveyChildren,
  useSurveyChildren,
} from '~/pages-helper/assessment/survey/surveyChildren'
import { expectText } from '~/test/helper/expect'
import { renderFrameworkElement } from '~/test/helper/mockData'

describe('provide/inject surveyChildren', () => {
  it('has surveyChildren from element, but it will be empty if element has no data', () => {
    const wrap = mount({
      template: `<div>{{children.map(i=>i.name).join('/')}}</div>`,
      setup() {
        provideSurveyChildren(ref())
        return {
          children: useSurveyChildren(),
        }
      },
    })
    expectText(wrap, '')
  })
  it('has surveyChildren from element', () => {
    const wrap = mount({
      template: `<div>{{children.map(i=>i.name).join('/')}}</div>`,
      setup() {
        const element = renderFrameworkElement(1)
        element.children = [
          renderFrameworkElement(11),
          renderFrameworkElement(12),
          renderFrameworkElement(13),
        ]
        provideSurveyChildren(ref(element))
        return {
          children: useSurveyChildren(),
        }
      },
    })
    expectText(wrap, 'name_11/name_12/name_13')
  })
})
