import { mount } from '@vue/test-utils'
import {
  provideSurveyIds,
  useSurveyIds,
} from '~/pages-helper/assessment/survey/surveyIds'
import { expectText } from '~/test/helper/expect'

describe('provide/inject surveyIds', () => {
  it('will return assessmentId form paramsId `{{assessmentId}}_{{surveyId}}`', () => {
    const wrap = mount(
      {
        template: `<div>
          <div id='assessmentId'>{{assessmentId}}</div>
          <div id='surveyId'>{{surveyId}}</div>
          </div>`,
        setup() {
          provideSurveyIds()
          return useSurveyIds()
        },
      },
      {
        mocks: {
          $route: {
            params: {
              id: '1_2',
            },
          },
        },
      }
    )
    expectText(wrap.find('#assessmentId'), '1')
    expectText(wrap.find('#surveyId'), '2')
  })
})
