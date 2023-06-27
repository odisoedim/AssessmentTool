import { mount, shallowMount } from '@vue/test-utils'
import SurveyPanel from '~/components/organisms/SurveyPanel.vue'
import CeButton from '~/components/atoms/CeButton.vue'
describe('SurveyPanel', () => {
  it('can work', () => {
    const wrapper = mount(SurveyPanel, {
      propsData: { itemId: 146 },
      data() {
        return {
          id: 4,
        }
      },
    })
    expect(wrapper.exists()).toBeTruthy()
  })
  it('has correct redirect url', () => {
    const wrapper = shallowMount(SurveyPanel, {
      propsData: { itemId: 166 },
      data() {
        return {
          id: 1,
        }
      },
    })
    expect(wrapper.findComponent(CeButton).attributes().to).toBe(
      '/assessment/survey/1_166'
    )
  })
})
