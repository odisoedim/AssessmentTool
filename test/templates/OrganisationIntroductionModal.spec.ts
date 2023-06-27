import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { useOrganisationMock } from '~/test/helper/mockInject'
import OrganisationIntroductionModal from '~/components/templates/OrganisationIntroductionModal.vue'
import OnboardingIntroduceWelcome from '~/components/molecules/OnboardingIntroduceWelcome.vue'
import OnboardingIntroduceWelcome2 from '~/components/molecules/OnboardingIntroduceWelcome2.vue'
import OnboardingIntroduceWelcome3 from '~/components/molecules/OnboardingIntroduceWelcome3.vue'
import CeButton from '~/components/atoms/CeButton.vue'

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
describe('OrganisationIntroductionModal', () => {
  it('can work', () => {
    const wrap = mount(OrganisationIntroductionModal)
    expect(wrap.exists()).toBeTruthy()
  })
  it('can into next page', async () => {
    const wrap = mount(OrganisationIntroductionModal)
    const page1 = wrap.findComponent(OnboardingIntroduceWelcome)
    const page2 = wrap.findComponent(OnboardingIntroduceWelcome2)
    const nextButton = wrap.findAllComponents(CeButton).wrappers[1]
    expect(page1.exists()).toBeTruthy()
    expect(page2.exists()).toBeFalsy()
    await nextButton.trigger('click')
    expect(page1.exists()).toBeFalsy()
    expect(page2).toBeTruthy()
    await nextButton.trigger('click')
    const page3 = wrap.findComponent(OnboardingIntroduceWelcome3)
    expect(page2.exists()).toBeFalsy()
    expect(page3.exists()).toBeTruthy()
    await nextButton.trigger('click')
    expect(wrap.vm.$data.visible).toBeFalsy()
  })
  it('can close modal', async () => {
    const wrap = mount(OrganisationIntroductionModal)
    const closeButton = wrap.findAllComponents(CeButton).wrappers[0]
    await closeButton.trigger('click')
    expect(wrap.vm.$data.visible).toBeFalsy()
  })
})
