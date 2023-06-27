import { shallowMount, RouterLinkStub, mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import AssessmentPage from '@/pages/assessment/index.vue'
import AssessmentCardGroup from '~/components/organisms/AssessmentCardGroup.vue'
import { useOrganisationMock } from '~/test/helper/mockInject'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import { LINK_ORG_PROFILE, LINK_READ_ORG_ACCOUNT } from '~/constants/route'
const alert = jest.fn()
Object.assign(window, { alert, console })

const useAssessmentsMock = () => {
  const fn = jest.fn()
  const success = () => {
    jest.clearAllMocks()
    fn.mockReturnValue({
      error: ref(null),
      assessments: ref([]),
      loading: ref(false),
    })
  }
  const fail = () => {
    jest.clearAllMocks()
    fn.mockReturnValue({
      error: ref(new Error('error')),
      assessments: ref([]),
      loading: ref(false),
    })
  }
  return { fn, success, fail }
}
const useAssessments = useAssessmentsMock()
jest.mock('~/pages-helper/assessment/index', () => ({
  useAssessments: () => useAssessments.fn(),
}))
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
describe('AssessmentsPage', () => {
  it('can work', () => {
    useAssessments.success()
    const wrap = shallowMount(AssessmentPage)
    expect(wrap).toBeTruthy()
  })

  it('should content header 1 with "My assessments" title', () => {
    useAssessments.success()
    const wrap = shallowMount(AssessmentPage)
    const headerTitle = wrap.findComponent(CeHeading1)
    expect(headerTitle.text()).toBe('My assessments')
    expect(headerTitle.exists()).toBeTruthy()
  })

  it('should have a button with links', () => {
    useAssessments.success()
    const wrap = shallowMount(AssessmentPage)
    const btn = wrap.findAll(CeButton)
    expect(btn.at(1).text()).toBe("Manage this organisation's team")
    expect(btn.at(1).attributes().href).toBe(`${LINK_READ_ORG_ACCOUNT}/1`)
  })

  it('should link button to  organisation team when clicked', () => {
    useAssessments.success()
    const wrap = mount(AssessmentPage, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })
    const btnLink = wrap.findAllComponents(RouterLinkStub).at(1)
    expect(btnLink.text()).toBe('Manage this organisation’s profile')
    expect(btnLink.props().to).toBe(LINK_ORG_PROFILE)
  })
  it('render assessment-card-group when success', () => {
    useAssessments.success()
    const wrap = shallowMount(AssessmentPage)
    expect(wrap.findComponent(AssessmentCardGroup).exists()).toBeTruthy()
  })
  it('will not render assessment-card-group when fail', () => {
    useAssessments.fail()
    const wrap = shallowMount(AssessmentPage)
    expect(wrap.findComponent(AssessmentCardGroup).exists()).toBeFalsy()
  })
})
