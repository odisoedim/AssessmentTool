import { shallowMount } from '@vue/test-utils'
import AppHeader from '~/components/templates/AppHeader.vue'
import { useCookieMock, useUserinfoMock } from '~/test/helper/mockInject'
import HeaderOrganization from '~/components/organisms/HeaderOrganization.vue'
import HeaderTabs from '~/components/organisms/HeaderTabs.vue'
const useUserinfo = useUserinfoMock()
jest.mock('@use/useCookie', () => ({
  useCookies: () => useCookieMock().mock(),
}))
jest.mock('@use/useUserinfo', () => ({
  useUserinfo: () => useUserinfo.mock(),
}))

describe('AppHeader', () => {
  it('can work', () => {
    const wrap = shallowMount(AppHeader)
    expect(wrap).toBeTruthy()
  })
  it('has HeaderOrganization and HeaderTabs if user logged', () => {
    useUserinfo.mockResult(true)
    const wrap = shallowMount(AppHeader, {
      mocks: {
        $route: {
          value: '',
        },
      },
    })
    expect(wrap.findComponent(HeaderOrganization).exists()).toBeTruthy()
    expect(wrap.findComponent(HeaderTabs).exists()).toBeFalsy()
  })
})
