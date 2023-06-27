import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { useSurveyInfoMock,useOrganisationMock } from '~/test/helper/mockInject'
import SurveyHeader from '~/components/organisms/SurveyHeader.vue'
import SurveyHeaderBack from '~/components/molecules/SurveyHeaderBack.vue'
import { expectText } from '~/test/helper/expect'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'
import CeP from '~/components/atoms/CeP.vue'
import CeBreadcrumb from '~/components/atoms/CeBreadcrumb.vue'

 
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
const useSurveyIds = jest.fn()
jest.mock('~/pages-helper/assessment/survey/surveyInfo', () => ({
  useSurveyInfo: () => useSurveyInfo.mock(),
}))
jest.mock('~/pages-helper/assessment/survey/surveyIds', () => ({
  useSurveyIds: () => useSurveyIds(),
}))

useSurveyInfo.mockInfo('1', '2')
useSurveyIds.mockReturnValue({ assessmentId: ref('1') })
describe('SurveyHeader', () => {
  it('can work', () => {
    const wrap = shallowMount(SurveyHeader)
    expect(wrap).toBeTruthy()
  })
  it('shows breadcrumbs', () => {
    const wrapper = shallowMount(SurveyHeader)
    expect(wrapper.findComponent(CeBreadcrumb)).toBeTruthy()
  })
  it('has SurveyHeaderBack', () => {
    const wrap = shallowMount(SurveyHeader, {
      propsData: {
        fromDemo: true,
      },
    })
    expect(wrap.findComponent(SurveyHeaderBack)).toBeTruthy()
  })

  it('show assessmentName and frameworkName', () => {
    const wrap = shallowMount(SurveyHeader, {
      propsData: {
        fromDemo: true,
      },
    })
    expectText(wrap.findComponent(CeHeading4), 'assessmentName_1')
    expectText(wrap.findComponent(CeP), 'Framework: frameworkName_2')
  })
})
