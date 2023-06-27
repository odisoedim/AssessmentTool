import {
  inject,
  InjectionKey,
  provide,
  Ref,
  useRoute,
} from '@nuxtjs/composition-api'
import { useRequestAsync } from '@use/useRequest'
import { GraphqlError } from '@use/apollo'
import { AccountUserinfo, MeInfo } from '~/type/auth'
import { useFetchMe, useFetchUserinfo } from '~/api/auth'

export const meSymbol: InjectionKey<{
  error: Ref<GraphqlError | undefined>
  loading: Ref<boolean>
  result: Ref<{
    cmsInfo: { me: MeInfo } | null
    userinfo: AccountUserinfo
  } | null>
  clearInfo: () => void
}> = Symbol('me')

export const provideUserinfo = () => {
  const route = useRoute()
  const fetchMe = useFetchMe()
  const fetchUserinfo = useFetchUserinfo()
  const { result, error, loading } = useRequestAsync('me', async () => {
    if (/\/auth\/auth0/.test(route.value.path)) {
      return null
    }
    if (!process.client && route.value.path === '/') {
      return null
    }
    const { data: cmsInfo, error: _error } = await fetchMe()
    if (_error) throw _error
    const userinfo = await fetchUserinfo()
    return { cmsInfo, userinfo }
  })
  const clearInfo = () => {
    result.value = null
  }
  provide(meSymbol, { result, error, loading, clearInfo })
}

export const useUserinfo = () => {
  const meInfo = inject(meSymbol)
  if (!meInfo) throw new Error('inject meInfo failed')
  return meInfo
}
