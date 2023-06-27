import { mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import AuthAuth0 from '@/pages/auth/auth0.vue'
import { AUTH0_TOKEN_KEY, COOKIE_TOKEN_KEY } from '~/util/static'
import { useCookieMock } from '~/test/helper/mockInject'
import { MockLocation } from '~/test/helper/mockLocation'
const useCookies = useCookieMock()
const useRouteQuery = jest.fn()
const useFetchMeAuth0 = jest.fn()
const useOrg = jest.fn()
jest.mock('@use/useCookie', () => ({
  useCookies: () => useCookies.mock(),
}))
jest.mock('@use/useOrg', () => ({
  useOrg: () => ({
    fetch: useOrg,
  }),
}))

useRouteQuery.mockReturnValue(ref({ access_token: 'token_mock' }))
useFetchMeAuth0.mockReturnValue({ jwt: 'jwt_mock' })

jest.mock('@use/useRouteQuery.ts', () => {
  return {
    useRouteQuery: () => useRouteQuery(),
  }
})
jest.mock('~/api/auth', () => {
  return {
    useFetchMeAuth0: () => () => useFetchMeAuth0(),
  }
})
MockLocation('/auth/auth0')
describe('auth0', () => {
  it('can work', () => {
    const wrap = mount(AuthAuth0)
    expect(wrap).toBeTruthy()
  })
  it('will set token if login success', async () => {
    const wrap = mount(AuthAuth0)
    await wrap.vm.$nextTick()
    expect(useCookies.set).toBeCalledWith(AUTH0_TOKEN_KEY, 'token_mock')
    expect(useCookies.set).toBeCalledWith(COOKIE_TOKEN_KEY, 'jwt_mock')
  })
  it('it will update Org if login success', async () => {
    jest.clearAllMocks()
    const wrap = mount(AuthAuth0)
    await wrap.vm.$nextTick()
    expect(useOrg).toBeCalledTimes(1)
  })
  it('will not set token if login fail', async () => {
    useFetchMeAuth0.mockRejectedValue({})
    const wrap = mount(AuthAuth0)
    await wrap.vm.$nextTick()
    await wrap.vm.$nextTick()
    expect(useCookies.set).toBeCalledWith(AUTH0_TOKEN_KEY, '')
    expect(useCookies.set).toBeCalledWith(COOKIE_TOKEN_KEY, '')
  })
})
