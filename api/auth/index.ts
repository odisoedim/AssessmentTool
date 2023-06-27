import { useQuery } from '@use/apollo'
import me from '@gql/cms/me.gql'
import { useGet } from '@use/useAxios'
import { AccountUserinfo, Auth0Info, MeInfo } from '~/type/auth'
import { Service } from '~/type/enum'

export const useFetchMeAuth0 = () =>
  useGet<{}, Auth0Info>(`/auth/auth0/callback`, Service.CMS)

export const useFetchMe = () => useQuery<{ me: MeInfo }>({ query: me })

export const useFetchUserinfo = () =>
  useGet<{}, AccountUserinfo>('/userinfo', Service.ACCOUNT)
