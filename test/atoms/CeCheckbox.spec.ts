import '../helper/svgIcon'
import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import CeCheckbox from '~/components/atoms/CeCheckbox.vue'

describe('CeCheckbox.vue', () => {
  it('can work', () => {
    const wrap = mount(CeCheckbox, {
      propsData: {
        name: 'option_a',
        value: [],
      },
    })
    expect(wrap).toBeTruthy()
  })
  it('can not use if not set props control', async () => {
    const cb = jest.fn()
    const wrap = mount(CeCheckbox, {
      propsData: {
        name: 'option_a',
        value: [],
      },
      listeners: {
        click: cb,
      },
    })

    expect(cb).toBeCalledTimes(0)
    await wrap.trigger('click')
    expect(cb).toBeCalledTimes(0)
  })
  it('can set props control, it can check by using click/enter/space', async () => {
    const wrap = mount({
      components: { CeCheckbox },
      setup() {
        return {
          value: ref([]),
        }
      },
      template: `
        <div>
        <CeCheckbox control name='option_a' v-model='value' />
        <CeCheckbox control name='option_b' v-model='value' />
        <CeCheckbox control name='option_c' v-model='value' />
        <div id='result'>{{value.join('/')}}</div>
        </div>
      `,
    })
    const checkboxGroup = wrap.findAllComponents(CeCheckbox)
    const result = wrap.find('#result')
    expect(result.text()).toBe('')
    await checkboxGroup.at(0).trigger('click')
    await checkboxGroup.at(1).trigger('click')
    expect(result.text()).toBe('option_a/option_b')
  })

  it('can set props control, it can uncheck by using click/enter/space', async () => {
    const wrap = mount({
      components: { CeCheckbox },
      setup() {
        return {
          value: ref(['option_a', 'option_c']),
        }
      },
      template: `
        <div>
        <CeCheckbox control name='option_a' v-model='value' />
        <CeCheckbox control name='option_b' v-model='value' />
        <CeCheckbox control name='option_c' v-model='value' />
        <div id='result'>{{value.join('/')}}</div>
        </div>
      `,
    })
    const checkboxGroup = wrap.findAllComponents(CeCheckbox)
    const result = wrap.find('#result')
    expect(result.text()).toBe('option_a/option_c')
    await checkboxGroup.at(0).trigger('click')
    expect(result.text()).toBe('option_c')
    await checkboxGroup.at(2).trigger('keydown.enter')
    expect(result.text()).toBe('')
  })

  it('will emit a event when active', async () => {
    const fn = jest.fn()
    const wrap = mount({
      components: { CeCheckbox },
      setup() {
        return {
          value: ref([]),
          cb: fn,
        }
      },
      template: `
        <CeCheckbox @change='cb' control name='option_a' v-model='value' :stop-active="true"/>
      `,
    })
    const checkbox = wrap.findAllComponents(CeCheckbox)
    await checkbox.trigger('click')
    expect(fn).toBeCalledTimes(1)
  })
})
