import { mount } from '@vue/test-utils'
import OrganisationProfile from '~/components/organisms/OrganisationProfile.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import {
  useProvideEditBoolean,
  useInjectEditBoolean,
} from '~/pages-helper/organisation/useEditBoolean'
const useInjectProfileData = jest.fn()
jest.mock('~/pages-helper/organisation/useOrganisationProfile', () => {
  return {
    useInjectProfileData: () => useInjectProfileData(),
  }
})
useInjectProfileData.mockReturnValue({
  profileShowData: {
    organisationName: '',
    year: '',
    organisationDesc: '',
    sector: '',
    industry: '',
    revenue: '',
    employees: '',
  },
})

describe('OrganisationProfile.vue', () => {
  it('can work', async () => {
    const wrapper = mount({
      template: `<div><OrganisationProfile /><p id='edit'>{{edit}}</p></div>`,
      components: {
        OrganisationProfile,
      },
      setup() {
        useProvideEditBoolean()
        const { bool: edit } = useInjectEditBoolean()
        return {
          edit,
        }
      },
    })
    expect(wrapper).toBeTruthy()
    await wrapper
      .findComponent(OrganisationProfile)
      .findComponent(CeButton)
      .trigger('click')
    expect(wrapper.find('#edit').text()).toBe('true')
  })
})
