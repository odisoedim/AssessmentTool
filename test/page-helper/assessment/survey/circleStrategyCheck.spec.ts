import { mount } from '@vue/test-utils'
import {
  provideCircleStrategyCheck,
  useCircleStrategyCheck,
} from '~/pages-helper/assessment/survey/circleStrategyCheck'
import { expectText } from '~/test/helper/expect'

describe('provide/inject circleStrategyCheck', () => {
  it('has a array of string named circleStrategies', async () => {
    const wrap = mount({
      template: `
          <div id='circleStrategies' @click='push'>{{ circleStrategies.join('/') }}</div>`,
      setup() {
        provideCircleStrategyCheck()
        const { circleStrategies } = useCircleStrategyCheck()
        const push = () => {
          circleStrategies.value.push('a')
          circleStrategies.value.push('b')
        }
        return { circleStrategies, push }
      },
    })
    expectText(wrap, '')
    await wrap.trigger('click')
    expectText(wrap, 'a/b')
  })
  it('has a function named setCircleStrategies, can add element for circleStrategies', async () => {
    const wrap = mount({
      template: `
          <div id='circleStrategies' @click='setCircleStrategies("hello")'>{{ circleStrategies.join('/') }}</div>`,
      setup() {
        provideCircleStrategyCheck()
        const { circleStrategies, setCircleStrategies } =
          useCircleStrategyCheck()
        return { circleStrategies, setCircleStrategies }
      },
    })
    expectText(wrap, '')
    await wrap.trigger('click')
    expectText(wrap, 'hello')
  })
  it('has a function named setCircleStrategies, can remove element for circleStrategies if circleStrategies already has this element', async () => {
    const wrap = mount({
      template: `
          <div id='circleStrategies' @click='setCircleStrategies("hello")'>{{ circleStrategies.join('/') }}</div>`,
      setup() {
        provideCircleStrategyCheck()
        const { circleStrategies, setCircleStrategies } =
          useCircleStrategyCheck()
        circleStrategies.value = ['hello']
        return { circleStrategies, setCircleStrategies }
      },
    })
    expectText(wrap, 'hello')
    await wrap.trigger('click')
    expectText(wrap, '')
  })
})
