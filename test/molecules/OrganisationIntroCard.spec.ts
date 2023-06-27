import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import OrganisationIntroCard from '~/components/molecules/OrganisationIntroCard.vue'
import { useOrganisationMock } from '~/test/helper/mockInject'
const useOrganisation = useOrganisationMock()
jest.mock('@use/useOrganisation', () => ({
  useOrganisation: () => useOrganisation.mock(),
}))
useOrganisation.currentOrganisation.mockReturnValue(ref('1'))
describe('OrganisationIntroCard', () => {
  it('can work', () => {
    const wrap = shallowMount(OrganisationIntroCard)
    expect(wrap).toBeTruthy()
  })
})
