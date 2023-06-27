import { mount } from '@vue/test-utils'
import AppHeader from '~/components/templates/AppHeader.vue'
import AppFooter from '~/components/molecules/AppFooter.vue'
import { useCookieMock, useUserinfoMock } from '~/test/helper/mockInject'

jest.mock('@use/useCookie', () => ({
  useCookies: () => useCookieMock().mock(),
}))

jest.mock('@use/useUserinfo', () => ({
  useUserinfo: () => useUserinfoMock().mock(),
}))

describe('DefaultLayout', () => {
  test('AppHeader a Vue instance', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.vm).toBeTruthy()
  })
  test('AppFooter a Vue instance', () => {
    const wrapper = mount(AppFooter)
    expect(wrapper.vm).toBeTruthy()
  })
})
