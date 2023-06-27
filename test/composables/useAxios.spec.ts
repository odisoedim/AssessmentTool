import { mount } from '@vue/test-utils'
import { provideAxios, useAxios, useGet, usePost } from '@use/useAxios'
import { onMounted, ref } from '@nuxtjs/composition-api'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Service } from '~/type/enum'
import { useCookieMock } from '~/test/helper/mockInject'
import { expectText } from '~/test/helper/expect'
import { nextTick } from '~/test/helper/nextTick'
import { MockEnv } from '~/test/helper/mockEnv'
import clearAllMocks = jest.clearAllMocks

const useCookies = useCookieMock()
const mock = new MockAdapter(axios)
mock.onGet('http://strapi_rest/test').reply(200, 'get success')
mock.onPost('http://strapi_rest/test').reply(200, 'post success')

jest.mock('@use/useCookie', () => ({
  useCookies: () => useCookies.mock(),
}))
const gotoLogin = jest.fn()
jest.mock('~/util/auth', () => ({
  gotoLogin: () => gotoLogin(),
}))
const parent = () =>
  mount({
    template: '<div></div>',
    setup() {
      provideAxios({
        [Service.ES]: 'http://hk_es_service',
        [Service.CMS]: 'http://strapi_rest',
        [Service.AUTH0]: 'http://auth0_service',
        [Service.ACCOUNT]: 'http://account_service',
        [Service.MIDDLEWARE]: 'http://cat_middleware_rest',
      })
    },
  }).vm
describe('provide/inject Axios', () => {
  it('can work', () => {
    const wrap = mount(
      {
        template: '<div></div>',
        setup() {
          return { axiosObj: useAxios() }
        },
      },
      {
        parent: parent(),
      }
    )
    expect(wrap).toBeTruthy()
  })
  it('can use get by useGet', async () => {
    const wrap = mount(
      {
        template: '<div>{{data}}</div>',
        setup() {
          const useGetTest = useGet('/test', Service.CMS)
          const data = ref()
          onMounted(async () => {
            data.value = await useGetTest()
          })
          return { data }
        },
      },
      {
        parent: parent(),
      }
    )
    await nextTick(wrap, 3)
    expectText(wrap, 'get success')
  })
  it('can use post by usePost', async () => {
    const wrap = mount(
      {
        template: '<div>{{data}}</div>',
        setup() {
          const usePostTest = usePost('/test', Service.CMS)
          const data = ref()
          onMounted(async () => {
            data.value = await usePostTest({})
          })
          return { data }
        },
      },
      {
        parent: parent(),
      }
    )
    await nextTick(wrap, 3)
    expectText(wrap, 'post success')
  })
  it('will set Authorization when url from ACCOUNT', async () => {
    clearAllMocks()
    useCookies.get.mockReturnValue('AUTH0_TOKEN_KEY')
    mock.onGet('http://account_service/test').reply(200, '')
    const wrap = mount(
      {
        template: '<div>{{Authorization}}</div>',
        setup() {
          const axios = useAxios()
          const Authorization = ref('')
          onMounted(async () => {
            const res = await axios.ACCOUNT.get('test')
            Authorization.value = res.config.headers?.Authorization || ''
          })
          return { Authorization }
        },
      },
      {
        parent: parent(),
      }
    )
    await nextTick(wrap, 4)
    expectText(wrap, 'Bearer AUTH0_TOKEN_KEY')
  })
  it('will set token and user-token when url from MIDDLEWARE', async () => {
    clearAllMocks()
    useCookies.get.mockReturnValue('AUTH0_TOKEN_KEY')
    mock.onGet('http://cat_middleware_rest/test').reply(200, '')
    MockEnv({
      CAT_MIDDLEWARE_USER: 'user',
      CAT_MIDDLEWARE_PASSWORD: 'password',
    })
    const wrap = mount(
      {
        template:
          '<div><div id="Authorization">{{Authorization}}</div><div id="userToken">{{userToken}}</div></div>',
        setup() {
          const axios = useAxios()
          const Authorization = ref('')
          const userToken = ref('')
          onMounted(async () => {
            const res = await axios.MIDDLEWARE.get('test')
            Authorization.value = res.config.headers?.Authorization || ''
            userToken.value = res.config.headers?.['user-token'] || ''
          })
          return { Authorization, userToken }
        },
      },
      {
        parent: parent(),
      }
    )
    await nextTick(wrap, 3)
    expectText(
      wrap.find('#Authorization'),
      `Basic ${Buffer.from(`user:password`).toString('base64')}`
    )
    expectText(wrap.find('#userToken'), 'AUTH0_TOKEN_KEY')
  })
  it('will call gotoLogin when status of response eq 401 ', async () => {
    clearAllMocks()
    mock.onGet('http://account_service/test').reply(401, '')
    expect(gotoLogin).toBeCalledTimes(0)

    const wrap = mount(
      {
        template: '<div>{{error}}</div>',
        setup() {
          const error = ref()
          onMounted(async () => {
            try {
              await useAxios().ACCOUNT.get('/test')
            } catch (e) {
              error.value = e.message
            }
          })
          return { error }
        },
      },
      {
        parent: parent(),
      }
    )
    await nextTick(wrap, 5)
    expect(gotoLogin).toBeCalledTimes(1)
  })
})
