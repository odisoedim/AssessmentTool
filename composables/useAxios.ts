import Axios, { AxiosInstance } from 'axios'
import {
  inject,
  InjectionKey,
  provide,
  unref,
  ComputedRef,
  Ref,
} from '@nuxtjs/composition-api'
import { MaybeRef } from '@vueuse/core'
import { useCookies } from '@use/useCookie'
import { Service } from '~/type/enum'
import { AUTH0_TOKEN_KEY, COOKIE_TOKEN_KEY } from '~/util/static'
import { gotoLogin } from '~/util/auth'

const axiosSymbol: InjectionKey<Record<Service, AxiosInstance>> =
  Symbol('axios-client')

export const provideAxios = (url: Record<Service, string>) => {
  const axiosObj: Record<Service, AxiosInstance> = {
    [Service.CMS]: Axios.create({
      baseURL: url[Service.CMS],
    }),
    [Service.ES]: Axios.create({
      baseURL: url[Service.ES],
    }),
    [Service.AUTH0]: Axios.create({
      baseURL: url[Service.AUTH0],
    }),
    [Service.ACCOUNT]: Axios.create({
      baseURL: url[Service.ACCOUNT],
    }),
    [Service.MIDDLEWARE]: Axios.create({
      baseURL: url[Service.MIDDLEWARE],
    }),
  }
  const cookies = useCookies()

  axiosObj.ACCOUNT.interceptors.request.use((config) => {
    const token = cookies.get(AUTH0_TOKEN_KEY)
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }
    return config
  })
  axiosObj.ACCOUNT.interceptors.response.use(
    (res) => res,
    (error) => {
      error.response.status === 401 && gotoLogin()
      return Promise.reject(error)
    }
  )

  axiosObj.MIDDLEWARE.interceptors.request.use((config) => {
    const token = Buffer.from(
      `${process.env.CAT_MIDDLEWARE_USER}:${process.env.CAT_MIDDLEWARE_PASSWORD}`
    ).toString('base64')
    const userToken = cookies.get(COOKIE_TOKEN_KEY)
    config.headers = {
      ...config.headers,
      Authorization: `Basic ${token}`,
      'user-token': userToken,
    }
    return config
  })
  provide(axiosSymbol, axiosObj)
}

export const useAxios = () => {
  const axiosClient = inject(axiosSymbol)
  /* istanbul ignore next */
  if (!axiosClient) throw new Error('inject axiosClient failed')
  return axiosClient
}

export const usePost = <Body, Result>(
  url: Ref<string> | string,
  from: Service
) => {
  const axios = useAxios()[from]
  return (data: MaybeRef<Body> | ComputedRef<Body>) =>
    axios.post<Result>(unref(url), unref(data)).then((res) => res.data)
}

export const usePut = <Body, Result>(
  url: Ref<string> | string,
  from: Service
) => {
  const axios = useAxios()[from]
  return (data: MaybeRef<Body> | ComputedRef<Body>) =>
    axios.put<Result>(unref(url), unref(data)).then((res) => res.data)
}

export const useGet = <Body, Result>(
  url: Ref<string> | string,
  from: Service
) => {
  const axios = useAxios()[from]
  return (data?: MaybeRef<Body> | ComputedRef<Body>) =>
    axios
      .request<Result>({ url: unref(url), params: unref(data) })
      .then((res) => res.data)
}
