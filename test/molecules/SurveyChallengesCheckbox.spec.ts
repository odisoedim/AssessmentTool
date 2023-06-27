import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import SurveyChallengesCheckbox from '~/components/molecules/SurveyChallengesCheckbox.vue'
import '../helper/svgIcon'
import CeHeading5 from '~/components/atoms/CeHeading5.vue'

describe('SurveyChallengesCheckbox', () => {
  it('can work', () => {
    const wrap = mount(SurveyChallengesCheckbox, {
      propsData: { value: [], name: 'option_a' },
    })
    expect(wrap).toBeTruthy()
    expect(wrap.getComponent(CeHeading5).text()).toBe('option_a')
  })

  it('can check by using click/enter/space', async () => {
    const wrap = mount({
      components: { SurveyChallengesCheckbox },
      setup() {
        return {
          value: ref([]),
        }
      },
      template: `
        <div>
        <survey-challenges-checkbox name='option_a' v-model='value' />
        <survey-challenges-checkbox name='option_b' v-model='value' />
        <survey-challenges-checkbox name='option_c' v-model='value' />
        <div id='result'>{{value.join('/')}}</div>
        </div>
      `,
    })
    const checkboxGroup = wrap.findAllComponents(SurveyChallengesCheckbox)
    const result = wrap.find('#result')
    expect(result.text()).toBe('')
    await checkboxGroup.at(0).trigger('click')
    await checkboxGroup.at(1).trigger('click')
    expect(result.text()).toBe('option_a/option_b')
  })

  it('can uncheck by using click/enter/space', async () => {
    const wrap = mount({
      components: { SurveyChallengesCheckbox },
      setup() {
        return {
          value: ref(['option_a', 'option_c']),
        }
      },
      template: `
        <div>
        <survey-challenges-checkbox name='option_a' v-model='value' />
        <survey-challenges-checkbox name='option_b' v-model='value' />
        <survey-challenges-checkbox name='option_c' v-model='value' />
        <div id='result'>{{value.join('/')}}</div>
        </div>
      `,
    })
    const checkboxGroup = wrap.findAllComponents(SurveyChallengesCheckbox)
    const result = wrap.find('#result')
    expect(result.text()).toBe('option_a/option_c')
    await checkboxGroup.at(0).trigger('click')
    expect(result.text()).toBe('option_c')
    await checkboxGroup.at(2).trigger('keydown.enter')
    expect(result.text()).toBe('')
  })
})
