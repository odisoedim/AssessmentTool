import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import {
  provideSurveyPages,
  useSurveyPages,
} from '~/pages-helper/assessment/survey/surveyPages'
import { expectText } from '~/test/helper/expect'
import { renderFrameworkElements } from '~/test/helper/mockData'

describe('provide/inject surveyPages', () => {
  it('has pages from element, but it will be empty if element has no data', () => {
    const wrap = mount({
      template: `<div>{{pages.map(i=>i.data.id).join('/')}}</div>`,
      setup() {
        provideSurveyPages(ref())
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
            {{page.group.id}}_{{page.type}}_{{page.data.id}}
          </li>
        </ul>`,
      setup() {
        const element = renderFrameworkElements(2)
        provideSurveyPages(ref(element))
        return {
          pages: useSurveyPages(),
        }
      },
    })
    const listEls = wrap.findAll('li')
    expect(listEls.length).toBe(9)
    expectText(listEls.at(1), '21_1_211')
    expectText(listEls.at(5), '22_1_221')
    expectText(listEls.at(8), '22_2_22')
  })
})
