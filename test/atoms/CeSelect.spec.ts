import { mount, shallowMount } from '@vue/test-utils'
import CeSelect from '~/components/atoms/CeSelect.vue'
import CeRadio from '~/components/atoms/CeRadio.vue'

describe('CeSelect', () => {
  it('can work', () => {
    const wrap = shallowMount(CeSelect, {
      propsData: {
        value: '',
      },
    })
    expect(wrap).toBeTruthy()
  })
  describe('select options box', () => {
    it('can open options box by space key', async () => {
      const wrap = mount(CeSelect, {
        propsData: {
          value: '',
          options: [
            { name: 'test1', value: '1' },
            { name: 'test2', value: '2' },
          ],
        },
      })
      expect(wrap.find('.select-box__options').isVisible()).toBeFalsy()
      await wrap.trigger('keydown.space')
      expect(wrap.find('.select-box__options').isVisible()).toBeTruthy()
      await wrap.trigger('keydown.space')
      expect(wrap.find('.select-box__options').isVisible()).toBeFalsy()
    })
    it('can open options box by enter key', async () => {
      const wrap = shallowMount(CeSelect, {
        propsData: {
          value: '',
          options: [
            { name: 'test1', value: '1' },
            { name: 'test2', value: '2' },
          ],
        },
      })
      expect(wrap.find('.select-box__options').isVisible()).toBeFalsy()
      await wrap.trigger('keydown.enter')
      expect(wrap.find('.select-box__options').isVisible()).toBeTruthy()
      await wrap.trigger('keydown.enter')
      expect(wrap.find('.select-box__options').isVisible()).toBeFalsy()
    })
    it('can open options box by click', async () => {
      const wrap = shallowMount(CeSelect, {
        propsData: {
          value: '',
          options: [
            { name: 'test1', value: '1' },
            { name: 'test2', value: '2' },
          ],
        },
      })
      expect(wrap.find('.select-box__options').isVisible()).toBeFalsy()
      await wrap.find('.select-box__input').trigger('click')
      expect(wrap.find('.select-box__options').isVisible()).toBeTruthy()
      await wrap.find('.select-box__input').trigger('click')
      expect(wrap.find('.select-box__options').isVisible()).toBeFalsy()
    })
  })
  describe('single select', () => {
    it('shows radio and can select', async () => {
      const wrap = shallowMount(CeSelect, {
        propsData: {
          value: '1',
          options: [
            { name: 'test1', value: '1' },
            { name: 'test2', value: '2' },
          ],
        },
      })
      expect(wrap.findComponent(CeRadio).isVisible).toBeTruthy()
      expect(wrap.find('.select-box__input').text()).toBe('test1')
      wrap.setProps({ value: '2' })
      await wrap.vm.$nextTick()
      expect(wrap.find('.select-box__input').text()).toBe('test2')
    })
    it('can select single by enter key', async () => {
      const wrap = mount({
        template: `<CeSelect v-model="value" :options="options"/>`,
        components: { CeSelect },
        setup() {
          return {
            value: '',
            options: [
              { name: 'test1', value: '1' },
              { name: 'test2', value: '2' },
            ],
          }
        },
      })
      await wrap.trigger('keydown.enter')
      await wrap.trigger('keydown.down.prevent')
      await wrap.trigger('keydown.enter')
      expect(wrap.find('.select-box__input').text()).toBe('test1')
      await wrap.trigger('keydown.down.prevent')
      await wrap.trigger('keydown.enter')
      expect(wrap.find('.select-box__input').text()).toBe('test2')
      await wrap.trigger('keydown.up.prevent')
      await wrap.trigger('keydown.enter')
      expect(wrap.find('.select-box__input').text()).toBe('test1')
    })
  })
  it('can change style by mouse', async () => {
    const wrap = shallowMount(CeSelect, {
      propsData: {
        value: '',
        options: [
          { name: 'test1', value: '1' },
          { name: 'test2', value: '2' },
        ],
      },
    })
    const label = wrap.find('label')
    await label.trigger('mouseover')
    expect(label.classes().includes('hover:bg-kh-primary-50')).toBeTruthy()
    await label.trigger('mousedown')
    expect(label.classes().includes('bg-kh-primary-100')).toBeTruthy()
    await label.trigger('mouseup')
    expect(label.classes().includes('bg-kh-primary-100')).toBeFalsy()
  })
})
