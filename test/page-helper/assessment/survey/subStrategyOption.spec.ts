import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import {
  provideSubStrategyOption,
  useSubStrategyOption,
} from '~/pages-helper/assessment/survey/subStrategyOption'
import { expectText } from '~/test/helper/expect'
import { renderAssessment } from '~/test/helper/mockData'
import { Assessment } from '~/type/assessment'

describe('provide/inject subStrategyOptions', () => {
  it('has substrategyOption from assessment Data, but it will be empty if assessment has no data', () => {
    const wrap = mount({
      template: `<div id='options'>{{substrategyOption.join('/')}}</div>`,
      setup() {
        provideSubStrategyOption(ref())
        return {
          substrategyOption: useSubStrategyOption(),
        }
      },
    })
    expectText(wrap, '')
  })
  it('has substrategyOption from assessment Data', () => {
    const wrap = mount({
      template: `<div id='options'>{{substrategyOption.join('/')}}</div>`,
      setup() {
        const assessment = renderAssessment(1)
        assessment.substrategy_option = {
          name: 'substrategy_option',
          score_0: '1',
          score_25: '2',
          score_50: '3',
          score_75: '4',
          score_100: '5',
          not_applicable: '6',
        }
        provideSubStrategyOption(ref<Assessment>(assessment))
        return {
          substrategyOption: useSubStrategyOption(),
        }
      },
    })
    expectText(wrap, '1/2/3/4/5/6')
  })
})
