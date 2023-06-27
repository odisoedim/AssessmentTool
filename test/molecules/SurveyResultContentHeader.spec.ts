import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { expectText } from '../helper/expect'
import { useOrganisationMock , useSurveyInfoMock} from '~/test/helper/mockInject'
 // components
import SurveyResultContentHeader from '~/components/molecules/SurveyResultContentHeader.vue'
import SurveyScoreCircle from '~/components/molecules/SurveyScoreCircle.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import CeBreadcrumb from '~/components/atoms/CeBreadcrumb.vue'
import CeHeading1 from '~/components/atoms/CeHeading1.vue' 
import CeHeading4 from '~/components/atoms/CeHeading4.vue'

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
const useSurveyInfo = useSurveyInfoMock()
jest.mock('~/pages-helper/assessment/survey/surveyInfo', () => {
  return {
    useSurveyInfo: () => useSurveyInfo.mock(),
  }
})
useSurveyInfo.mockInfo(1, 2)

jest.mock('@use/useParamsId', () => {
  return {
    useParamsId: () => {
      return ref('1_1')
    },
  }
})

describe('SurveyResultContentHeader', () => {
  it('can work', () => {
    const wrapper = shallowMount(SurveyResultContentHeader)
    expect(wrapper).toBeTruthy()
  })
  it('shows breadcrumbs', () => {
    const wrapper = shallowMount(SurveyResultContentHeader)
    expect(wrapper.findComponent(CeBreadcrumb)).toBeTruthy()
  })

  
  it('shows score progress and Edit survey button + shows framework and survey name', async () => {
    const wrapper = shallowMount(SurveyResultContentHeader, {
      propsData: {
        isCompleted: true,
        progress: 100,
        scoreSurvey: 100,
      },
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(CeButton).text()).toBe('Edit survey')
    expect(wrapper.findComponent(CeHeading1).text()).toBe('Name_1')
    expect(wrapper.findComponent(CeHeading4).text()).toBe('Framework:FrameworkName_2')
    expect(wrapper.findComponent(SurveyScoreCircle).exists()).toBeTruthy()
  })
  it('can redirect to survey', () => {
    const wrapper = shallowMount(SurveyResultContentHeader)
    expect(wrapper.findComponent(CeButton).attributes('to')).toBe(
      '/assessment/survey/1_1'
    )
  })
  it('shows Start survey button', () => {
    const wrapper = shallowMount(SurveyResultContentHeader, {
      propsData: {
        isCompleted: false,
        progress: 0,
        scoreSurvey: -1,
      },
    })
    expect(wrapper.findComponent(CeButton).text()).toBe('Start survey')
  })
  it('shows Resume survey button', () => {
    const wrapper = shallowMount(SurveyResultContentHeader, {
      propsData: {
        isCompleted: false,
        progress: 70,
        scoreSurvey: -1,
      },
    })
    expect(wrapper.findComponent(CeButton).text()).toBe('Resume survey')
  })
  it('is demo result', () => {
    const wrapper = shallowMount(SurveyResultContentHeader, {
      propsData: {
        isDemoResult: true,
      },
    })
    const ceButton = wrapper.findComponent(CeButton)
    expectText(ceButton, 'Start assessment')
    expect(ceButton.attributes('to')).toBe('/demoAssessment/survey/1_1')
  })


  it('is demo result and resumed assessment', () => {
    const wrapper = shallowMount(SurveyResultContentHeader, {
      propsData: {
        isDemoResult: true,
        isCompleted: false,
        progress: 3
      },
    })
    const ceButton = wrapper.findComponent(CeButton)
    expectText(ceButton, 'Resume assessment')
  
  })
})
