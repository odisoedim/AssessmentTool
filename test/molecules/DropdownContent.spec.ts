import { mount, shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import DropdownContent from '~/components/molecules/DropdownContent.vue'
import CeSmallText from '~/components/atoms/CeSmallText.vue'
import { expectText } from '~/test/helper/expect'
import CeHalfPxLine from '~/components/atoms/CeHalfPxLine.vue'
import DropdownItem from '~/components/atoms/DropdownItem.vue'
import { useOrganisationMock } from '~/test/helper/mockInject'
const list = [
  { text: 'hello1', icon: 'user', name: 'world1' },
  { text: 'hello2', icon: 'user', name: 'world2' },
]
const useOrganisation = useOrganisationMock()
jest.mock('@use/useOrganisation', () => ({
  useOrganisation: () => useOrganisation.mock(),
}))
useOrganisation.organisations.mockReturnValue([])
Object.defineProperty(window, 'location', {
  value: {
    reload: jest.fn,
  },
})
describe('DropdownContent', () => {
  it('can work', () => {
    const wrap = mount(DropdownContent)
    expect(wrap).toBeTruthy()
  })
  it('can set header', () => {
    const wrap = mount(DropdownContent, { propsData: { header: 'hello' } })
    const textEl = wrap.findComponent(CeSmallText)
    expectText(textEl, 'hello')
  })
  it('can set header and it will show a half px line', () => {
    const wrap = mount(DropdownContent, { propsData: { header: 'hello' } })
    const halfPxLine = wrap.findComponent(CeHalfPxLine)
    expect(halfPxLine).toBeTruthy()
  })

  describe('can set dropdown list', () => {
    it('will render dropdownItem.vue', () => {
      const wrap = shallowMount(DropdownContent, { propsData: { list } })
      const dropdownItems = wrap.findAllComponents(DropdownItem)
      expect(dropdownItems.at(0).vm.$props.text).toBe('hello1')
      expect(dropdownItems.at(0).vm.$props.icon).toBe('user')
      expect(dropdownItems.at(1).vm.$props.text).toBe('hello2')
      expect(dropdownItems.at(1).vm.$props.icon).toBe('user')
    })
    it('dropdownItem can click and emit', async () => {
      const cb = jest.fn()
      const wrap = shallowMount(DropdownContent, {
        propsData: { list },
        listeners: {
          active: cb,
        },
      })
      const dropdownItems = wrap.findAllComponents(DropdownItem)
      expect(cb).toBeCalledTimes(0)
      await dropdownItems.at(0).trigger('click')
      expect(cb).toBeCalledTimes(1)
      expect(cb).toBeCalledWith('world1')
      await dropdownItems.at(1).trigger('click')
      expect(cb).toBeCalledTimes(2)
      expect(cb).toBeCalledWith('world2')
    })
    it('will render organisations if user has more then 2 organisations', () => {
      useOrganisation.organisations.mockReturnValue(
        ['13', '24'].map((orgId) => ({
          jobTitle: 'testing',
          organizationId: orgId,
          organizationName: `${orgId}_name`,
          organizationPhotoPath: `https://org_${orgId}.img`,
        }))
      )
      const wrap = shallowMount(DropdownContent)
      const organisations = wrap.findAll('.dropdown-content__organisation')
      expect(organisations.length).toBe(2)
    })
    it('will set organisations if click organisation item and not the same organisation', () => {
      useOrganisation.organisations.mockReturnValue(
        ['13', '24'].map((orgId) => ({
          jobTitle: 'testing',
          organizationId: orgId,
          organizationName: `${orgId}_name`,
          organizationPhotoPath: `https://org_${orgId}.img`,
        }))
      )
      useOrganisation.currentOrganisation.mockReturnValue(ref('24'))
      const wrap = shallowMount(DropdownContent)
      const organisations = wrap.findAll('.dropdown-content__organisation')
      expect(organisations.at(0).trigger('click')).toBeTruthy()
    })
    it('will not set organisations if click organisation item and the same organisation', async () => {
      jest.clearAllMocks()
      useOrganisation.organisations.mockReturnValue(
        ['13', '24'].map((orgId) => ({
          jobTitle: 'testing',
          organizationId: orgId,
          organizationName: `${orgId}_name`,
          organizationPhotoPath: `https://org_${orgId}.img`,
        }))
      )
      useOrganisation.currentOrganisation.mockReturnValue(ref('13'))
      const wrap = shallowMount(DropdownContent)
      const organisations = wrap.findAll('.dropdown-content__organisation')
      await organisations.at(0).trigger('click')
      expect(useOrganisation.setOrganisation).toBeCalledTimes(0)
    })
  })
})
