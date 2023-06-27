import { mount, shallowMount } from '@vue/test-utils'
import SurveyStrategyNoCheckbox from '~/components/molecules/SurveyStrategyNoCheckbox.vue'
import {
  provideCircleStrategyCheck,
  useCircleStrategyCheck,
} from '~/pages-helper/assessment/survey/circleStrategyCheck'

describe('SurveyStrategyNoCheckbox', () => {
  it('can work', () => {
    const wrap = shallowMount(SurveyStrategyNoCheckbox, {
      setup() {
        provideCircleStrategyCheck()
      },
    })
    expect(wrap).toBeTruthy()
  })

  it('can check by using click/enter/space', async () => {
    const wrap = mount({
      components: {
        SurveyStrategyNoCheckbox,
      },
      setup() {
        provideCircleStrategyCheck()
        const { circleStrategies, noCircleStrategies } =
          useCircleStrategyCheck()
        return {
          circleStrategies,
          noCircleStrategies,
        }
      },
      template: `
        <div>
        <SurveyStrategyNoCheckbox />
        <div id='result'>{{ noCircleStrategies.join('/') }}</div>
        </div>
      `,
    })
    const noCheckbox = wrap.findComponent(SurveyStrategyNoCheckbox)
    const result = wrap.find('#result')
    expect(result.text()).toBe('')
    await noCheckbox.trigger('click')
    expect(result.text()).toBe('-1')
    await noCheckbox.trigger('keydown.enter')
    expect(result.text()).toBe('')
    await noCheckbox.trigger('keydown.space')
    expect(result.text()).toBe('-1')
    await wrap.setData({ circleStrategies: ['1', '2'] })
    await wrap.vm.$nextTick()
    expect(result.text()).toBe('')
  })
})
