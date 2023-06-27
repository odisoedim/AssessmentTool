import { mount, shallowMount } from '@vue/test-utils'
import SurveyProgressBarLine from '~/components/atoms/SurveyProgressBarLine.vue'
import { expectClass, expectStyle } from '~/test/helper/expect'
import SurveyProgressCircleTitle from '~/components/atoms/SurveyProgressCircleTitle.vue'
import { useBoolean } from '~/composables'

describe('SurveyProgressBarLine.vue', () => {
  it('can work', () => {
    const wrap = shallowMount(SurveyProgressBarLine)
    expect(wrap).toBeTruthy()
  })
  it('can set active to change color with animation', async () => {
    const wrap = mount({
      components: { SurveyProgressBarLine },
      template:
        '<SurveyProgressBarLine :active="bool" @click.native="open"></SurveyProgressBarLine>',
      setup() {
        return { ...useBoolean() }
      },
    })
    const activeBar = wrap.find('.bg-kh-primary')
    expectClass(activeBar, ['w-0'])
    await wrap.trigger('click')
    expectClass(activeBar, ['w-full'])
  })

  it('can set size to change height', () => {
    const wrap = shallowMount(SurveyProgressBarLine, {
      propsData: { size: 'lg' },
    })
    expectClass(wrap, ['h-2.5'])
  })

  it('can set groupLength for SurveyProgressCircleTitle', () => {
    const wrap = mount(SurveyProgressBarLine, {
      propsData: { groupLength: 0.5 },
      slots: { default: 'hello' },
    })
    const title = wrap.findComponent(SurveyProgressCircleTitle)
    expectStyle(title, { width: '400px' })
  })
})
