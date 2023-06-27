import { meSymbol, provideUserinfo, useUserinfo } from '@use/useUserinfo'
import { mount } from '@vue/test-utils'
import { computed } from '@nuxtjs/composition-api'
import { useFetchMeMock, useFetchUserinfoMock } from '~/test/helper/mockApi'
import { expectText } from '~/test/helper/expect'
import { nextTick } from '~/test/helper/nextTick'
const useFetchMe = useFetchMeMock()
const useFetchUserinfo = useFetchUserinfoMock()
jest.mock('~/api/auth', () => ({
  useFetchMe: () => useFetchMe.mock(),
  useFetchUserinfo: () => useFetchUserinfo.mock(),
}))
const mountHelp = (path: string = '/hello') =>
  mount(
    {
      template:
        '<div id="username" @click="clearInfo">{{username}}_{{nickname}}</div>',
      setup() {
        provideUserinfo()
        const { result, clearInfo } = useUserinfo()
        const username = computed(() => result.value?.cmsInfo?.me.username)
        const nickname = computed(() => result.value?.userinfo.nickname)
        return { username, nickname, result, clearInfo }
      },
    },
    {
      mocks: {
        $route: {
          path,
        },
      },
    }
  )
describe('useUserinfo', () => {
  describe('meSymbol', () => {
    it('is a symbol', () => {
      expect(typeof meSymbol).toBe('symbol')
    })
  })

  describe('use/provide Userinfo', () => {
    it('will get userinfo when fetch data success', async () => {
      useFetchMe.mockSuccess()
      useFetchUserinfo.mockSuccess()
      const wrap = mountHelp()
      await nextTick(wrap, 3)
      expectText(wrap, 'test_Jon')
      await wrap.trigger('click')
      expectText(wrap, '_')
    })
    it('will get error when fetch data error', async () => {
      useFetchMe.mockFail()
      useFetchUserinfo.mockSuccess()
      const wrap = mountHelp()
      await nextTick(wrap, 3)
      expectText(wrap, '_')
    })
    it('will get error when fetch data error', async () => {
      useFetchMe.mockSuccess()
      useFetchUserinfo.mockFail()
      const wrap = mountHelp()
      await nextTick(wrap, 3)
      expectText(wrap, '_')
    })
    it('will not fetch data in /auth/auth0 page', async () => {
      jest.clearAllMocks()
      useFetchMe.mockSuccess()
      useFetchUserinfo.mockSuccess()
      const wrap = mountHelp('/auth/auth0')
      await nextTick(wrap, 3)
      expectText(wrap, '_')
      expect(useFetchMe.result).toBeCalledTimes(0)
      expect(useFetchUserinfo.result).toBeCalledTimes(0)
    })
    it('will not fetch data in "/" page and in server', async () => {
      jest.clearAllMocks()
      process.client = false
      useFetchMe.mockSuccess()
      useFetchUserinfo.mockSuccess()
      const wrap = mountHelp('/')
      await nextTick(wrap, 3)
      expectText(wrap, '_')
    })
  })
})
