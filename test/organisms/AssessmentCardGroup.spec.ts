import { mount, shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'

// helper
import { renderFrameworkElement } from '../helper/mockData'
import { useOrganisationMock } from '~/test/helper/mockInject'

// components
import AssessmentCardGroup from '~/components/organisms/AssessmentCardGroup.vue'
import AssessmentCard from '~/components/molecules/AssessmentCard.vue'
import AssessmentExpandCard from '~/components/molecules/AssessmentExpandCard.vue'

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

const element_1 = renderFrameworkElement('160')
describe('AssessmentCardGroup.vue', () => {
  it('can work', () => {
    const wrap = shallowMount(AssessmentCardGroup, {
      propsData: {
        assessments: [],
      },
      stubs: {
        ClientOnly: {
          template: `<div><slot /></div>`,
        },
      },
    })
    expect(wrap).toBeTruthy()
  })
  it('loading', () => {
    const wrap = mount(AssessmentCardGroup, {
      propsData: {
        assessments: [],
        loading: true,
        orgId: 1,
        progress: 3,
        score: 4,
        frameworks: element_1,
        lastEdited: '2021-12-15T03:31:21.000Z',
        frozenBy: 'odiso edim',
      },
      stubs: {
        ClientOnly: {
          template: `<div><slot /></div>`,
        },
      },
    })

    const assessmentCard = wrap.findComponent(AssessmentCard)
    const assessmentExpandCard = wrap.findComponent(AssessmentExpandCard)
    expect(assessmentCard.vm).toBeTruthy()
    expect(assessmentExpandCard.vm).toBeFalsy()
  })
})
