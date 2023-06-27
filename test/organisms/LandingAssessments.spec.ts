import { shallowMount, mount } from '@vue/test-utils'
import LandingAssessments from '~/components/organisms/LandingAssessments.vue'
import LandingAssessmentCard from '~/components/molecules/LandingAssessmentCard.vue'

const assessmentData = [
  {
    id: '1',
    image: {
      url: '/uploads/Frame_8111_1610d8719c.png',
    },
    title: 'Demo',
    content:
      'A short and sweet way to get familiar with Circle Economy’s key elements and Circularity Assessment as a tool. Learn more about circular strategies and opportunities with just a few key questions.',
    duration: '~40 mins',
    key_elements: 'Key Elements of the Circular Economy',
    button_text: 'Start demo',
    button_link: 'login',
  },
  {
    id: '2',
    image: {
      url: '/uploads/Frame_8114_2e677717bb.png',
    },
    title: 'Circle Economy’s Key Elements',
    content:
      'Get to know the key elements of the circular economy in greater detail in this multi-tiered assessment. You’ll move beyond the key elements and dive into each element’s substrategies to better assess your product or business, and gain more specific insights as a result.',
    duration: '~2 hrs',
    key_elements: 'Key Elements of the Circular Economy',
    button_text: 'Start assessment',
    button_link:
      'https://docs.google.com/forms/d/e/1FAIpQLSepm2fNr7IWlrbLLl74ot-Cca7GJorZTfli-j0pqnJfNl82SA/viewform',
  },
]

describe('LandingAssessments', () => {
  it('can work', () => {
    const wrap = shallowMount(LandingAssessments)
    expect(wrap.exists()).toBeTruthy()
  })
  it('render assessment card', () => {
    const wrap = shallowMount(LandingAssessments, {
      propsData: {
        assessments: assessmentData,
      },
    })
    expect(wrap.exists()).toBeTruthy()
    const landingAssessmentCards = wrap.findAllComponents(LandingAssessmentCard)
    expect(landingAssessmentCards.wrappers.length).toBe(3)
  })
  it('will expand or close when click card', async () => {
    jest.useFakeTimers()
    const wrap = mount(LandingAssessments, {
      propsData: {
        assessments: assessmentData,
      },
    })
    expect(wrap.exists()).toBeTruthy()
    const landingAssessmentCards = wrap.findAllComponents(LandingAssessmentCard)
    await landingAssessmentCards.wrappers[1].find('.card-left').trigger('click')
    expect(wrap.vm.$data.currentCard).toBe(1)
    expect(wrap.vm.$data.isCardExpanded).toBe(true)
    await landingAssessmentCards.wrappers[1]
      .find('.card-close')
      .trigger('click')
    jest.runAllTimers()
    expect(wrap.vm.$data.isCardExpanded).toBe(false)
    expect(wrap.vm.$data.currentCard).toBe(-1)
  })
})
