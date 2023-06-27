import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import SurveyResultTabs from '~/components/organisms/SurveyResultTabs.vue'
import CeTabs from '~/components/atoms/CeTabs.vue'

import ResultCollapse from '~/components/molecules/ResultCollapse.vue'
const useSurveyResultGroup = jest.fn()
jest.mock('~/pages-helper/assessment/result/surveyResult', () => ({
  useSurveyResultGroup: () => useSurveyResultGroup(),
}))
useSurveyResultGroup.mockReturnValue(
  ref([
    {
      name: 'Design out waste',
      id: '174',
      notApplicable: false,
      progress: 1,
      score: 0.25,
      children: [
        {
          id: '222',
          name: 'Design for minimal waste',
          option: '1',
          provideExample: '21',
          notApplicable: false,
        },
        {
          id: '223',
          name: 'Design for resource efficiency',
          option: '1',
          provideExample: '32',
          notApplicable: false,
        },
      ],
      answers: {
        challenge: {
          check: ['Market (pricing, supply, etc.)', 'Technology', 'Financing'],
          other: '',
        },
        challengeExplain: '1',
        opportunities: '1',
        notes: '1',
      },
    },
    {
      name: 'Design for cyclability',
      id: '175',
      notApplicable: true,
      progress: 0,
      score: -1,
      children: [],
      answers: null,
    },
    {
      name: 'Design for durability',
      id: '176',
      notApplicable: false,
      progress: 0.5,
      score: -1,
      children: [
        {
          id: '231',
          name: 'Design for physical durability',
          option: '4',
          provideExample: '',
          notApplicable: true,
        },
        {
          id: '232',
          name: 'Design for product attachment, emotional durability',
          option: '-1',
          provideExample: '',
          notApplicable: false,
        },
      ],
      answers: {
        challenge: { check: [], other: '' },
        challengeExplain: '',
        opportunities: '',
        notes: '',
      },
    },
  ])
)
describe('SurveyResultTabs.vue', () => {
  it('can work', () => {
    const wrapper = shallowMount(SurveyResultTabs, {
      propsData: {
        frameworkId: 1,
      },
    })
    expect(wrapper.exists()).toBeTruthy()
  })
  it('has correct structure', () => {
    const wrapper = shallowMount(SurveyResultTabs, {
      propsData: {
        frameworkId: 1,
      },
    })
    const tabs = wrapper.findComponent(CeTabs)
    expect(tabs).toBeTruthy()
    expect(tabs.findAllComponents(ResultCollapse).length).toBe(3)
  })
})
