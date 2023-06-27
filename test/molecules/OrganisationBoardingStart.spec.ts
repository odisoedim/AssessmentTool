import { mount, shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import OrganisationBoardingStart from '~/components/molecules/OrganisationBoardingStart.vue'
import CeSelect from '~/components/atoms/CeSelect.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import { expectText } from '~/test/helper/expect'

describe('OrganisationBoardingStart', () => {
  it('can work', () => {
    const wrap = shallowMount({
      components: {
        OrganisationBoardingStart,
      },
      template: '<OrganisationBoardingStart v-model="value" />',
      setup() {
        const value = ref('')
        return { value }
      },
    })
    expect(wrap).toBeTruthy()
  })
  describe('will render options', () => {
    it('default empty array', () => {
      const wrap = mount({
        components: {
          OrganisationBoardingStart,
        },
        template: '<OrganisationBoardingStart v-model="value"  />',
        setup() {
          const value = ref('')
          return { value }
        },
      })
      const select = wrap.findComponent(CeSelect)
      expect(select.vm.$props.options).toEqual([])
    })
    it('will render options', () => {
      const _options = [1, 2].map((i) => ({ name: `name_${i}`, value: i + '' }))
      const wrap = mount({
        components: {
          OrganisationBoardingStart,
        },
        template:
          '<OrganisationBoardingStart v-model="value" :options="options" />',
        setup() {
          const value = ref('')
          const options = ref(_options)
          return { value, options }
        },
      })
      const select = wrap.findComponent(CeSelect)
      expect(select.vm.$props.options).toEqual(_options)
    })
  })

  it('will emit `add` if click `Add new organisation`', async () => {
    const add = jest.fn()
    const wrap = mount({
      components: {
        OrganisationBoardingStart,
      },
      template: '<OrganisationBoardingStart v-model="value"  @add="add" />',
      setup() {
        const value = ref('')
        return { value, add }
      },
    })
    const button = wrap.findComponent(CeButton)
    expect(add).toBeCalledTimes(0)
    await button.trigger('click')
    expect(add).toBeCalledTimes(1)
  })

  it('emit input when user choose from select', async () => {
    const wrap = mount({
      components: {
        OrganisationBoardingStart,
      },
      template:
        '<div><OrganisationBoardingStart v-model="value"   /><div id="value">{{value}}</div></div>',
      setup() {
        const value = ref('')
        return { value }
      },
    })
    expectText(wrap.find('#value'), '')
    await wrap.findComponent(CeSelect).vm.$emit('input', '1')
    expectText(wrap.find('#value'), '1')
  })
})
