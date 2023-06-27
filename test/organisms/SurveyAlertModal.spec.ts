import { mount, shallowMount } from '@vue/test-utils'
import SurveyAlertModal from '~/components/organisms/SurveyAlertModal.vue'
import { useBoolean } from '~/composables'
import CeModalWithContent from '~/components/molecules/CeModalWithContent.vue'
import CeButton from '~/components/atoms/CeButton.vue'

describe('SurveyAlertModal', () => {
  it('can work', () => {
    const wrap = shallowMount(SurveyAlertModal, { propsData: { value: true } })
    expect(wrap).toBeTruthy()
  })
  it('can close', async () => {
    const cb = jest.fn()
    const wrap = mount(SurveyAlertModal, {
      propsData: { value: true },
      listeners: { input: cb },
    })
    const closeBtn = wrap.findComponent(CeButton)
    await closeBtn.trigger('click')
    await wrap.vm.$nextTick()
    expect(cb).toBeCalledTimes(1)
    expect(cb).toHaveBeenCalledWith(false)
  })
  it('use v-model to control visible', async () => {
    const wrap = mount({
      components: { SurveyAlertModal },
      template: `
        <div>
        <SurveyAlertModal v-model='bool' />
        <button id='button' @click='open'>{{ bool ? 1 : 0 }}</button>
        </div>
      `,
      setup() {
        return {
          ...useBoolean(),
        }
      },
    })
    const button = wrap.find('#button')
    const modal = wrap.findComponent(CeModalWithContent)
    expect(button.text()).toBe('0')
    expect(modal.vm.$props.value).toBe(false)
    await button.trigger('click')
    expect(button.text()).toBe('1')
    expect(modal.vm.$props.value).toBe(true)
  })
})
