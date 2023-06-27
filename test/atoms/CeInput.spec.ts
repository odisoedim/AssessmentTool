import { mount, shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import CeInput from '~/components/atoms/CeInput.vue'

describe('CeInput.vue', () => {
  it('can work', () => {
    const wrapper = shallowMount(CeInput, {
      propsData: {
        value: '',
      },
    })
    expect(wrapper).toBeTruthy()
  })
  describe('textarea', () => {
    it('is textarea', () => {
      const wrapper = shallowMount(CeInput, {
        propsData: {
          type: 'textarea',
          value: '',
        },
      })

      expect(wrapper.find('textarea')).toBeTruthy()
    })
    it('work normally', async () => {
      const wrapper = mount({
        components: { CeInput },
        setup() {
          return {
            value: ref(''),
          }
        },
        template: `
        <div>
        <CeInput type='textarea' v-model='value' />
        </div>
      `,
      })
      await wrapper.setData({ value: 'test' })
      expect(wrapper.findComponent(CeInput).vm.$data.value_).toBe('test')
    })
  })
  describe('input', () => {
    it('is default input', () => {
      const wrapper = shallowMount(CeInput, {
        propsData: {
          value: '',
        },
      })
      expect(wrapper.find('input')).toBeTruthy()
    })
  })
})
