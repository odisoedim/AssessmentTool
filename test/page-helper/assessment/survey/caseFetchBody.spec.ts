import { mount } from '@vue/test-utils'
import { computed, ref } from '@nuxtjs/composition-api'
import {
  provideCaseFetchBody,
  useCaseFetchBody,
} from '~/pages-helper/assessment/survey/caseFetchBody'
import { expectText } from '~/test/helper/expect'
import { renderAssessment } from '~/test/helper/mockData'

describe('provide/inject caseFetchBody', () => {
  it('has caseBody from element, but it will be null if element has no data', () => {
    const wrap = mount({
      template: `<div>{{framework}}</div>`,
      setup() {
        provideCaseFetchBody(ref())
        const caseBody = useCaseFetchBody()
        return {
          framework: computed(() => caseBody.value?.framework || ''),
        }
      },
    })
    expectText(wrap, '')
  })
  it('has caseBody from element', () => {
    const wrap = mount({
      template: `
          <div>{{ framework }}</div>`,
      setup() {
        const assessment = renderAssessment(1)
        assessment.framework_id = '101'
        provideCaseFetchBody(ref(assessment))
        const caseBody = useCaseFetchBody()
        return {
          framework: computed(() => caseBody.value?.framework || ''),
        }
      },
    })
    expectText(wrap, '101')
  })
})
