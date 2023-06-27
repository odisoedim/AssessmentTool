import { mount } from '@vue/test-utils'
import HeaderUser from '~/components/organisms/HeaderUser.vue'
import HeaderUserButton from '~/components/molecules/HeaderUserButton.vue'
import DropdownContent from '~/components/molecules/DropdownContent.vue'
import { MockLocation } from '~/test/helper/mockLocation'
import SignIn from '~/components/molecules/SignIn.vue'
import {
  useCookieMock,
  useOrganisationMock,
  useUserinfoMock,
} from '~/test/helper/mockInject'
import { LINK_ORG_ACCOUNT } from '~/constants/route'

const useUserinfo = useUserinfoMock()
jest.mock('@use/useUserinfo', () => ({
  useUserinfo: () => useUserinfo.mock(),
}))
const useCookies = useCookieMock()

jest.mock('@use/useCookie', () => ({
  useCookies: () => useCookies.mock(),
}))
useUserinfo.mockResult(true)
const useOrganisation = useOrganisationMock()
jest.mock('@use/useOrganisation', () => ({
  useOrganisation: () => useOrganisation.mock(),
}))
useOrganisation.organisations.mockReturnValue([])
describe('HeaderUser', () => {
  it('can work', () => {
    const wrap = mount(HeaderUser)
    expect(wrap).toBeTruthy()
  })
  describe('user is logged', () => {
    it('show user button ', () => {
      const wrap = mount(HeaderUser)
      const headerUserButton = wrap.findComponent(HeaderUserButton)
      expect(headerUserButton).toBeTruthy()
      expect(headerUserButton.vm.$props.photoUrl).toBe('https://picture')
      expect(headerUserButton.vm.$props.firstName).toBe('J')
    })

    it('can click user button to show dropdown', async () => {
      const wrap = mount(HeaderUser)
      const headerUserButton = wrap.findComponent(HeaderUserButton)
      await headerUserButton.trigger('click')
      const dropdown = wrap.findComponent(DropdownContent)
      expect(dropdown).toBeTruthy()
      expect(dropdown.vm.$props.header).toBe('Jon Don')
    })

    it('can click dropdown items', async () => {
      const open = jest.fn()
      Object.assign(window, { open })
      MockLocation('https://test')
      const wrap = mount(HeaderUser)
      expect(wrap).toBeTruthy()

      const headerUserButton = wrap.findComponent(HeaderUserButton)
      await headerUserButton.trigger('click')
      let dropdown = wrap.findComponent(DropdownContent)
      await dropdown.vm.$emit('active', 'signOut')
      expect(useCookies.remove).toBeCalledTimes(2)
      expect(useUserinfo.clearInfo).toBeCalledTimes(1)
      await headerUserButton.trigger('click')
      dropdown = wrap.findComponent(DropdownContent)
      await dropdown.vm.$emit('active', 'update')
      expect(open).toBeCalledTimes(1)
      expect(open).toBeCalledWith(LINK_ORG_ACCOUNT, '_blank', 'noopener')
    })
  })

  describe('user is not logged', () => {
    it('render a signIn button', () => {
      useUserinfo.mockResult(false)

      const wrap = mount(HeaderUser)
      const signIn = wrap.findComponent(SignIn)
      const headerUserButton = wrap.findComponent(HeaderUserButton)
      expect(signIn).toBeTruthy()
      expect(headerUserButton.exists()).toBeFalsy()
    })
  })
})
