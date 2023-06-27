import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import { useOrganisationMock } from '~/test/helper/mockInject'
import HeaderOrganization from '~/components/organisms/HeaderOrganization.vue'
import CeImage from '~/components/atoms/CeImage.vue'
import CeMenuItem from '~/components/atoms/CeMenuItem.vue'
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
    organizationPhotoPath: `https://org_1.img`,
  })
)
describe('HeaderOrganization', () => {
  it('can work', () => {
    const wrap = shallowMount(HeaderOrganization)
    expect(wrap).toBeTruthy()
  })
  it('show logo and name of organization', () => {
    const wrap = shallowMount(HeaderOrganization)
    expect(wrap.findComponent(CeImage).vm.$props.src).toBe('https://org_1.img')
    expectText(wrap.findComponent(CeMenuItem), '1_name')
  })
  it('show nothing if no organisation', () => {
    useOrganisation.getOrganisation.mockReturnValue(ref())
    const wrap = shallowMount(HeaderOrganization)
    expect(wrap.findComponent(CeImage).isVisible()).toBeFalsy()
    expect(wrap.findComponent(CeMenuItem).isVisible()).toBeFalsy()
  })
})
