import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import CeRadio from '~/components/atoms/CeRadio.vue'
import { expectAttr } from '~/test/helper/expect'

describe('CeRadio', () => {
  it('can work', () => {
    const wrap = mount(CeRadio, {
      propsData: {
        name: 'option1',
        value: '',
      },
    })
    expect(wrap).toBeTruthy()
  })
  it('need set name and value', () => {
    const wrap = mount(CeRadio, {
      propsData: {
        name: 'option1',
        value: '',
      },
    })
    const input = wrap.find('input')
    expectAttr(input, { value: 'option1' })
  })
  it('can not use if not set props control', async () => {
    const cb = jest.fn()
    const wrap = mount(CeRadio, {
      propsData: {
        name: 'option_a',
        value: '',
      },
      listeners: {
        click: cb,
      },
    })
    expect(cb).toBeCalledTimes(0)
    await wrap.trigger('click')
    expect(cb).toBeCalledTimes(0)
  })
  it('can not use if set props stopActive', async () => {
    const cb = jest.fn()
    const wrap = mount(CeRadio, {
      propsData: {
        name: 'option_a',
        value: '',
        stopActive: true,
      },
      listeners: {
        click: cb,
      },
    })
    expect(cb).toBeCalledTimes(0)
    await wrap.trigger('click')
    expect(cb).toBeCalledTimes(0)
  })

  describe('can set props control', () => {
    it('can select by using click/enter/space', async () => {
      const wrap = mount({
        components: { CeRadio },
        setup() {
          return {
            value: ref(''),
          }
        },
        template: `
        <div>
        <CeRadio control name='option_a' v-model='value' />
        <CeRadio control name='option_b' v-model='value' />
        <CeRadio control name='option_c' v-model='value' />
        <div id='result'>{{value}}</div>
        </div>
      `,
      })
      const radioGroup = wrap.findAllComponents(CeRadio)
      const result = wrap.find('#result')
      expect(result.text()).toBe('')
      await radioGroup.at(0).trigger('click')
      expect(result.text()).toBe('option_a')
      await radioGroup.at(1).trigger('keydown.enter')
      expect(result.text()).toBe('option_b')
    })
    it('can emit event named change when select', async () => {
      const cb = jest.fn()
      const wrap = mount(CeRadio, {
        propsData: {
          name: 'option1',
          value: '',
          control: true,
        },
        listeners: { change: cb },
      })
      await wrap.trigger('click')
      expect(cb).toHaveBeenCalledTimes(1)
    })
  })
})
