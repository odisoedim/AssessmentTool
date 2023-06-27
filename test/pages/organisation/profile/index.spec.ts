import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import organisation from '~/pages/organisation/profile/index.vue'
import OrganisationProfile from '~/components/organisms/OrganisationProfile.vue'
import OrganisationProfileEdit from '~/components/organisms/OrganisationProfileEdit.vue'
import { useOrganisationMock, useUserinfoMock } from '~/test/helper/mockInject'
import OrganisationBoardingModal from '~/components/organisms/OrganisationBoardingModal.vue'

jest.mock('~/pages-helper/organisation/useEditBoolean', () => {
  return {
    useProvideEditBoolean: () => jest.fn(),
    useInjectEditBoolean: () => jest.fn().mockReturnValue({ bool: false }),
  }
})

const useOrganisationProfile = jest.fn()
jest.mock('~/pages-helper/organisation/useOrganisationProfile', () => {
  return {
    useOrganisationProfile: () => useOrganisationProfile(),
  }
})

jest.mock('~/pages-helper/organisation/useSelectOptions', () => {
  return {
    useSelectOptions: () => jest.fn(),
    useInjectOptions: () => jest.fn().mockReturnValue({}),
  }
})

const useOrganisation = useOrganisationMock()
jest.mock('@use/useOrganisation', () => ({
  useOrganisation: () => useOrganisation.mock(),
}))
useOrganisation.organisations.mockReturnValue(ref([{}]))

 
useOrganisation.getOrganisation.mockReturnValue(
  ref({
    jobTitle: 'testing',
    organizationId: 1,
    organizationName: `1_name`,
  })
)
jest.mock('~/pages-helper/organisation/useSelectOptions', () => {
  return {
    useSelectOptions: () => jest.fn(),
    useInjectOptions: () => jest.fn().mockReturnValue({}),
  }
})

const useUserinfo = useUserinfoMock()
jest.mock('@use/useUserinfo', () => ({
  useUserinfo: () => useUserinfo.mock(),
}))
useUserinfo.mockResult(true)
describe('organisation.vue', () => {
  it('can work', () => {
    const wrapper = shallowMount(organisation)
    expect(wrapper).toBeTruthy()
  })
  it('can change to edit page', async () => {
    const wrapper = shallowMount(organisation)
    expect(wrapper.findComponent(OrganisationProfileEdit).exists()).toBeFalsy()
    expect(wrapper.findComponent(OrganisationProfile).exists()).toBeTruthy()
    wrapper.setData({ edit: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(OrganisationProfileEdit).exists()).toBeTruthy()
    expect(wrapper.findComponent(OrganisationProfile).exists()).toBeFalsy()
  })
  it('show modal if user dont have organisations', async () => {
    useOrganisation.organisations.mockReturnValue(ref([]))
    const wrapper = shallowMount(organisation)
    await wrapper.vm.$nextTick()
    expect(
      wrapper.findComponent(OrganisationBoardingModal).exists()
    ).toBeTruthy()
  })
})
