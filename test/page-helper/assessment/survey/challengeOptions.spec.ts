import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import {
  provideChallengeOptions,
  useChallengeOptions,
} from '~/pages-helper/assessment/survey/challengeOptions'
import { expectText } from '~/test/helper/expect'
import { renderFrameworkElement } from '~/test/helper/mockData'

describe('provide/inject challengeOptions', () => {
  it('has challengeOptions from challenges, but it will be empty if challenges has no data', () => {
    const wrap = mount({
      template: `<div id='options'>{{challengeOptions.join('/')}}</div>`,
      setup() {
        provideChallengeOptions(ref())
        return {
          challengeOptions: useChallengeOptions(),
        }
      },
    })
    expectText(wrap, '')
  })
  it('has challengeOptions from challenges', () => {
    const wrap = mount({
      template: `<div id='options'>{{challengeOptions.map(i=>i.name).join('/')}}</div>`,
      setup() {
        const elements = [
          renderFrameworkElement(1),
          renderFrameworkElement(2),
          renderFrameworkElement(3),
        ]
        provideChallengeOptions(ref(elements))
        return {
          challengeOptions: useChallengeOptions(),
        }
      },
    })
    expectText(wrap, 'name_1/name_2/name_3')
  })
})
