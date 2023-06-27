import { ref } from '@nuxtjs/composition-api'
import { shallowMount } from '@vue/test-utils'
import AssessmentOverviewHeader from '~/components/molecules/AssessmentOverviewHeader.vue'
import SurveyProgressLine from '~/components/molecules/SurveyProgressLine.vue'
import SurveyScoreCircle from '~/components/molecules/SurveyScoreCircle.vue'
import CeBreadcrumb from '~/components/atoms/CeBreadcrumb.vue'

import { useOrganisationMock } from '~/test/helper/mockInject'
 
const useOrganisation = useOrganisationMock()
jest.mock('@use/useOrganisation', () => ({
  useOrganisation: () => useOrganisation.mock(),
}))
useOrganisation.getOrganisation.mockReturnValue(
  ref({
    jobTitle: 'testing',
    organizationId: 1,
    organizationName: `1_name`,
  })
)
Object.defineProperty(window, 'location', {
  value: {
    reload: jest.fn,
  },
})

jest.mock('~/pages-helper/assessment/overview/_id', () => {
  return {
    useInjectAssessmentResult: () => {
      return {
        assessment: ref({ id: 1 }),
        scores: ref({
          1: {
            score: 70,
          },
        }),
      }
    },
  }
})

jest.mock('@use/useParamsId', () => {
  return { useParamsId: () => ref('1') }
})

const mockResult = jest.fn()
jest.mock('~/pages-helper/assessment/overview/assesmentCardResult', () => {
  return {
    useAssessmentCardResult: () => mockResult(),
  }
})

mockResult.mockReturnValue(
  ref([
    {
      completed: true,
    },
    {
      completed: false,
    },
  ])
)
describe('AssessmentOverviewHeader.vue', () => {
  it('can work', () => {
    const wrapper = shallowMount(AssessmentOverviewHeader)
    expect(wrapper).toBeTruthy()
  })
  it('shows progress line', () => {
    const wrapper = shallowMount(AssessmentOverviewHeader)
    expect(wrapper.findComponent(SurveyProgressLine)).toBeTruthy()
  })
  it('shows breadcrumbs', () => {
    const wrapper = shallowMount(AssessmentOverviewHeader)
    expect(wrapper.findComponent(CeBreadcrumb)).toBeTruthy()
  })
  it('shows score', () => {
    mockResult.mockReturnValue(
      ref([
        {
          completed: true,
        },
        {
          completed: true,
        },
      ])
    )
    const wrapper = shallowMount(AssessmentOverviewHeader)
    const score = wrapper.findComponent(SurveyScoreCircle)
    expect(wrapper.findComponent(SurveyProgressLine).exists()).toBeFalsy()
    expect(score.exists()).toBeTruthy()
    expect(score.attributes('score')).toBe('70')
  })
})
