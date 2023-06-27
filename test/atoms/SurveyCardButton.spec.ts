import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import SurveyCardButton from '~/components/atoms/SurveyCardButton.vue'
import CeButton from '~/components/atoms/CeButton.vue'
jest.mock('@use/useParamsId', () => {
  return {
    useParamsId: () => {
      return ref(1)
    },
  }
})
describe('SurveyCardButton.vue', () => {
  it('can work', () => {
    const wrap = shallowMount(SurveyCardButton, {
      propsData: {
        itemId: 146,
      },
    })
    expect(wrap).toBeTruthy()
  })
  it('shows start button and has correct url', () => {
    const wrapper = shallowMount(SurveyCardButton, {
      propsData: {
        itemId: 146,
        progress: 0,
        score: -1,
      },
    })
    const buttons = wrapper.findAllComponents(CeButton)
    const startButton = buttons
      .filter((item) => {
        return item.text() === 'Start'
      })
      .at(0)
    expect(startButton.attributes('roottype')).toBe('nuxt-link')
    expect(startButton.attributes('to')).toBe('/assessment/survey/1_146')
  })
  it('shows Resume button and has correct url', () => {
    const wrapper = shallowMount(SurveyCardButton, {
      propsData: {
        itemId: 146,
        progress: 50,
        score: -1,
      },
    })
    const buttons = wrapper.findAllComponents(CeButton)
    const resumeButton = buttons
      .filter((item) => {
        return item.text() === 'Resume'
      })
      .at(0)
    expect(resumeButton.attributes('roottype')).toBe('nuxt-link')
    expect(resumeButton.attributes('to')).toBe('/assessment/survey/1_146')
  })
  it('shows View results button and has correct url', () => {
    const wrapper = shallowMount(SurveyCardButton, {
      propsData: {
        itemId: 146,
        progress: 100,
        completed: true,
        score: 70,
      },
    })
    const buttons = wrapper.findAllComponents(CeButton)
    const resultsButton = buttons
      .filter((item) => {
        return item.text() === 'View results'
      })
      .at(0)
    expect(resultsButton.attributes('roottype')).toBe('nuxt-link')
    expect(resultsButton.attributes('to')).toBe('/assessment/result/1_146')
  })
})
