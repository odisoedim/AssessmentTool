import { shallowMount } from '@vue/test-utils'
import OrganisationBoardingModal from '~/components/organisms/OrganisationBoardingModal.vue'
import { useCommonGraphqlMock } from '~/test/helper/mockApi'
import CeModal from '~/components/molecules/CeModal.vue'
import OrganisationBoardingWelcome from '~/components/molecules/OrganisationBoardingWelcome.vue'
import OrganisationBoardingStart from '~/components/molecules/OrganisationBoardingStart.vue'
import { ONBOARDING_FIND_ORG } from '~/util/static'
import OrganisationBoardingAddNew from '~/components/molecules/OrganisationBoardingAddNew.vue'
const useFetchOrganisations = useCommonGraphqlMock()
jest.mock('~/api/organisation', () => ({
  useFetchOrganisations: () => useFetchOrganisations.mock(),
}))
useFetchOrganisations.mockSuccess({
  organisations: [
    { orgName: 'name_1', orgId: '1' },
    { orgName: 'name_2', orgId: '2' },
  ],
})
describe('OrganisationBoardingModal.vue', () => {
  it('can work', () => {
    const wrap = shallowMount(OrganisationBoardingModal)
    expect(wrap).toBeTruthy()
  })
  it('always show model', () => {
    const wrap = shallowMount(OrganisationBoardingModal)
    expect(wrap.findComponent(CeModal).exists()).toBeTruthy()
  })
  describe('show OrganisationBoardingWelcome', () => {
    it('show if user have not choose org in OrganisationBoardingStart', () => {
      const wrap = shallowMount(OrganisationBoardingModal)
      expect(
        wrap.findComponent(OrganisationBoardingWelcome).isVisible()
      ).toBeTruthy()
    })
  })
  describe('show OrganisationBoardingStart', () => {
    it('show if user click next in Welcome', async () => {
      const wrap = shallowMount(OrganisationBoardingModal)
      expect(
        wrap.findComponent(OrganisationBoardingStart).isVisible()
      ).toBeFalsy()
      await wrap.findComponent(OrganisationBoardingWelcome).vm.$emit('next')
      expect(
        wrap.findComponent(OrganisationBoardingStart).isVisible()
      ).toBeTruthy()
    })
    it('show if user already choose a org', async () => {
      localStorage.setItem(ONBOARDING_FIND_ORG, '2')
      const wrap = shallowMount(OrganisationBoardingModal)
      await wrap.vm.$nextTick()
      expect(
        wrap.findComponent(OrganisationBoardingStart).isVisible()
      ).toBeTruthy()
    })
    it('show if user click back in OrganisationBoardingAddNew', async () => {
      localStorage.setItem(ONBOARDING_FIND_ORG, '')
      const wrap = shallowMount(OrganisationBoardingModal)
      await wrap.findComponent(OrganisationBoardingWelcome).vm.$emit('next')
      await wrap.findComponent(OrganisationBoardingStart).vm.$emit('add')
      await wrap.findComponent(OrganisationBoardingAddNew).vm.$emit('back')
      expect(
        wrap.findComponent(OrganisationBoardingStart).isVisible()
      ).toBeTruthy()
    })
  })
  describe('show OrganisationBoardingAddNew', () => {
    it('show if user click `Add new organisation` in OrganisationBoardingStart', async () => {
      localStorage.setItem(ONBOARDING_FIND_ORG, '')
      const wrap = shallowMount(OrganisationBoardingModal)
      await wrap.findComponent(OrganisationBoardingWelcome).vm.$emit('next')
      await wrap.findComponent(OrganisationBoardingStart).vm.$emit('add')
      expect(
        wrap.findComponent(OrganisationBoardingAddNew).isVisible()
      ).toBeTruthy()
    })
  })
  it('fetch organisations', async () => {
    const wrap = shallowMount(OrganisationBoardingModal)
    await wrap.vm.$nextTick()
    await wrap.vm.$nextTick()
    const start = wrap.findComponent(OrganisationBoardingStart)
    expect(
      start.vm.$props.options.map((i: { name: string }) => i.name).join('/')
    ).toBe('name_1/name_2')
  })
})
