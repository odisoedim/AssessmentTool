import { mount, shallowMount } from '@vue/test-utils'
import { onMounted } from '@nuxtjs/composition-api'
import SurveyStrategyCheckbox from '~/components/molecules/SurveyStrategyCheckbox.vue'
import { FrameworkElement } from '~/type/frameworkElement'
import { ID } from '~/type/base'
import {
  provideCircleStrategyCheck,
  useCircleStrategyCheck,
} from '~/pages-helper/assessment/survey/circleStrategyCheck'
const elementMock: (id: ID) => FrameworkElement = (id: ID) => ({
  children: [],
  description: '',
  framework: {
    id: '1',
    name: '',
    description: 'string',
    short_description: 'string',
  },
  id,
  name: '',
  substrategy_questions: [],
})

describe('SurveyStrategyCheckbox', () => {
  it('can work', () => {
    const wrap = shallowMount(SurveyStrategyCheckbox, {
      propsData: {
        element: elementMock(1),
      },
      setup() {
        provideCircleStrategyCheck()
      },
    })
    expect(wrap).toBeTruthy()
  })

  it('can check by using click/enter/space', async () => {
    const wrap = mount({
      components: {
        SurveyStrategyCheckbox,
      },
      setup() {
        provideCircleStrategyCheck()
        return {
          elements: [elementMock(1), elementMock(2), elementMock(3)],
          ...useCircleStrategyCheck(),
        }
      },
      template: `
        <div>
        <SurveyStrategyCheckbox :element='elements[0]' />
        <SurveyStrategyCheckbox :element='elements[1]' />
        <SurveyStrategyCheckbox :element='elements[2]' />
        <div id='result'>{{ circleStrategies.join('/') }}</div>
        </div>
      `,
    })
    const checkboxGroup = wrap.findAllComponents(SurveyStrategyCheckbox)
    const result = wrap.find('#result')
    expect(result.text()).toBe('')
    await checkboxGroup.at(0).trigger('click')
    await checkboxGroup.at(1).trigger('keydown.enter')
    expect(result.text()).toBe('1/2')
  })

  it('can uncheck by using click/enter/space', async () => {
    const wrap = mount({
      components: {
        SurveyStrategyCheckbox,
      },
      setup() {
        provideCircleStrategyCheck()
        const { circleStrategies } = useCircleStrategyCheck()
        onMounted(() => {
          circleStrategies.value = ['1', '2']
        })
        return {
          elements: [elementMock(1), elementMock(2), elementMock(3)],
          circleStrategies,
        }
      },
      template: `
        <div>
        <SurveyStrategyCheckbox :element='elements[0]' />
        <SurveyStrategyCheckbox :element='elements[1]' />
        <SurveyStrategyCheckbox :element='elements[2]' />
        <div id='result'>{{ circleStrategies.join('/') }}</div>
        </div>
      `,
    })
    const checkboxGroup = wrap.findAllComponents(SurveyStrategyCheckbox)
    const result = wrap.find('#result')
    await wrap.vm.$nextTick()
    expect(result.text()).toBe('1/2')
    await checkboxGroup.at(0).trigger('keydown.enter')
    await checkboxGroup.at(1).trigger('click')
    expect(result.text()).toBe('')
  })
})
