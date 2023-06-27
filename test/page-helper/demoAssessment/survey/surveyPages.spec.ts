import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import {
  provideDemoSurveyPages,
  useSurveyPages,
} from '~/pages-helper/assessment/survey/surveyPages'
import { expectText } from '~/test/helper/expect'
import {
  renderAssessment,
  renderFrameworkElements,
} from '~/test/helper/mockData'
const elements = [renderFrameworkElements(2)]

describe('provide/inject surveyPages', () => {
  it('has pages from element, but it will be empty if element has no data', () => {
    const wrap = mount({
      template: `<div>{{pages.map(i=>i.data.id).join('/')}}</div>`,
      setup() {
        provideDemoSurveyPages(ref(renderAssessment(1)), ref())
        return {
          pages: useSurveyPages(),
        }
      },
    })
    expectText(wrap, '')
  })
  it('has pages from element', () => {
    const wrap = mount({
      template: `<ul>
          <li v-for='(page,index) in pages' :key='index' >
            {{page.type}}_{{page.data.id}}
          </li>
        </ul>`,
      setup() {
        provideDemoSurveyPages(ref(renderAssessment(1)), ref(elements))
        return {
          pages: useSurveyPages(),
        }
      },
    })
    const listEls = wrap.findAll('li')
    expect(listEls.length).toBe(2)
    expectText(listEls.at(0), '0_2')
    expectText(listEls.at(1), '1_framework_id_1')
  })
})
