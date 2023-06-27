import { mount, shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { useOrganisationMock } from '~/test/helper/mockInject'
import OnboardingIntroduceWelcome from '~/components/molecules/OnboardingIntroduceWelcome.vue'
import CeHeading4 from '~/components/atoms/CeHeading4.vue'
import { expectText } from '~/test/helper/expect'

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
describe('OnboardingIntroduceWelcome', () => {
  it('can work', () => {
    const wrap = shallowMount(OnboardingIntroduceWelcome)
    expect(wrap.exists()).toBeTruthy()
  })
  it('show name of organization', () => {
    const wrap = mount(OnboardingIntroduceWelcome)
    const ceHeading4 = wrap.findComponent(CeHeading4)
    expectText(ceHeading4, '1_name')
  })
})
