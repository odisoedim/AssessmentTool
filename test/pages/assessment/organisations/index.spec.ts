import { mount, shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { useOrganisationMock } from '~/test/helper/mockInject'

import OrgAssessmentsPage from '@/pages/assessment/organisations/index.vue'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import CollapseCard from '~/components/organisms/CollapseCard.vue'
import CollapseCardItem from '~/components/molecules/CollapseCardItem.vue'
import AssessmentCardGroup from '~/components/organisms/AssessmentCardGroup.vue'
import { renderAssessment } from '~/test/helper/mockData'
const useOrganisation = useOrganisationMock()
jest.mock('@use/useOrganisation', () => ({
  useOrganisation: () => useOrganisation.mock(),
}))

const useAssessmentsMock = () => {
  const fn = jest.fn()
  const success = (id: any) => {
    jest.clearAllMocks()
    fn.mockReturnValue({
      error: ref(null),
      assessments: ref([renderAssessment(id)]),
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
useOrganisation.getOrganisation.mockReturnValue(
  ref({
    jobTitle: 'testing',
    organizationId: 1,
    organizationName: `1_name`,
  })
)

useOrganisation.organisations.mockReturnValue(
  ref([
    {
      jobTitle: 'testing',
      organizationId: 3,
      organizationName: `${4}_name`,
      organizationPhotoPath: `https://org_${2}.img`,
    },
  ])
)

useOrganisation.getOrganisation.mockReturnValue(
  ref({
    jobTitle: 'testing',
    organizationId: 1,
    organizationName: `1_name`,
  })
)
describe('OrgAssessmentsPage', () => {
  it('can work', () => {
    useAssessments.success(1)

    const wrap = mount(OrgAssessmentsPage)
    expect(wrap).toBeTruthy()
  })

  it('render ceheader 1 with title ', () => {
    useAssessments.fail()
    const wrap = shallowMount(OrgAssessmentsPage)
    expect(wrap.findComponent(CeHeading1).text()).toBe('Organisations')
  })

  it('render collaspe card when success', () => {
    useAssessments.success(1)
    const wrap = shallowMount(OrgAssessmentsPage)
    expect(wrap.findComponent(CollapseCard).exists()).toBeTruthy()
  })

  it('render CollapseCardItem when success', () => {
    useAssessments.success(1)
    useOrganisation.organisations.mockReturnValue(
      ref([
        {
          jobTitle: 'testing',
          organizationId: 3,
          organizationName: `${4}_name`,
          organizationPhotoPath: `https://org_${2}.img`,
        },
      ])
    )

    const wrap = shallowMount(OrgAssessmentsPage)
    expect(wrap.findComponent(CollapseCardItem)).toBeTruthy()
  })
  it('render assessment-card-group when success', () => {
    useAssessments.success(1)
    const wrap = shallowMount(OrgAssessmentsPage)
    expect(wrap.findComponent(AssessmentCardGroup)).toBeTruthy()
  })

  it('will not render assessment-card-group when fail', () => {
    useAssessments.fail()
    const wrap = shallowMount(OrgAssessmentsPage)
    expect(wrap.findComponent(AssessmentCardGroup).exists()).toBeFalsy()
  })
  it('should render CardCollapse', () => {
    useAssessments.success(1)
    useOrganisation.organisations.mockReturnValue(
      ref(
        ['13', '24', '74'].forEach((orgId) => ({
          jobTitle: 'testing',
          organizationId: orgId,
          organizationName: `${orgId}_name`,
          organizationPhotoPath: `https://org_${orgId}.img`,
        }))
      )
    )
    const allOrgAssessments = jest.fn()
    allOrgAssessments.mockReturnValue(
      ref([
        {
          id: 1,
          orgName: 'bazaks',
          orgId: 7072,
          orgImg: 'http://test',
          orgAssessments: [],
          completed: true,
          score: 1,
          progress: 50,
        },
      ])
    )
    const wrap = mount({
      components: { CollapseCard, CollapseCardItem },
      template: `
        <CollapseCard v-model="activeNames">
          <CollapseCardItem
          v-for="item in allOrgAssessment" :key="item.id"
          :title="item.orgName"
          :score="item.score"
          :progress="item.progress"
          :completed="item.completed" 
          :org-id="item.orgId"
          :org-img="item.orgImg"
          >
          </CollapseCardItem>
      </CollapseCard>`,
      setup() {
        const activeNames = ref([])
        const allOrgAssessment = allOrgAssessments()
        return {
          allOrgAssessment,
          activeNames,
        }
      },
    })
    expect(wrap.findComponent(CollapseCardItem).exists()).toBeTruthy()
  })
})
