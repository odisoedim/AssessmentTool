import { shallowMount, mount } from '@vue/test-utils'
import LandingFeedbacks from '~/components/organisms/LandingFeedbacks.vue'
const feedbackData = [
  {
    id: '1',
    name: '– Tamara Veldboer, Senior Strategist at Circle Economy',
    feedback:
      'Circularity Assessment Tool is a simple self-diagnosis and a comprehensive starting point for circularity. Whether you are working for a multinational or a smaller business, the assessment will help you form a picture of your state of circularity and discover the next steps to take on your circular journey.',
    avatar: {
      url: '/uploads/landing_Avatar1_b4892a0f5c.png',
    },
  },
  {
    id: '2',
    name: '– Marc de Wit, Director Businesses at Circle Economy',
    feedback:
      "With Circularity Assessment Tool, we're enabling businesses to get a baseline overview within hours of where they stand in their journey to circularity. With the tool businesses have access to real world examples of other businesses that have successfully implemented circularity.",
    avatar: {
      url: '/uploads/landing_Avatar2_2f5db9f980.png',
    },
  },
]

describe('LandingFeedbacks', () => {
  it('can work', () => {
    const wrap = shallowMount(LandingFeedbacks)
    expect(wrap.exists()).toBeTruthy()
  })
  it('render feedback card', () => {
    const wrap = shallowMount(LandingFeedbacks, {
      propsData: {
        feedbacks: feedbackData,
      },
    })
    const landingFeedbackCards = wrap.findAll('.feedback-card')
    expect(landingFeedbackCards.wrappers.length).toBe(2)
  })
  it('will toggle when click index button', async () => {
    jest.useFakeTimers()
    const wrap = mount(LandingFeedbacks, {
      propsData: {
        feedbacks: feedbackData,
      },
    })
    const landingFeedbackIndexBtn = wrap.findAll('.index-btn')
    await landingFeedbackIndexBtn.wrappers[1].trigger('click')
    expect(wrap.vm.$data.isShowFeedback).toBe(false)
    expect(wrap.vm.$data.currentFeedbackBtn).toBe(1)
    jest.runAllTimers()
    expect(wrap.vm.$data.currentFeedback).toBe(1)
    expect(wrap.vm.$data.isShowFeedback).toBe(true)
  })
})
