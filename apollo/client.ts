import { useCookies } from '@use/useCookie'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client'
import { COOKIE_TOKEN_KEY } from '~/util/static'
import { gotoLogin } from '~/util/auth'
export function httpLink(uri: string) {
  return createHttpLink({
    uri,
    fetchOptions: {
      mode: 'cors',
    },
    fetch: global.fetch,
  })
}
export function authLink() {
  const cookies = useCookies()
  const link = setContext((_, prevContext) => {
    if (prevContext.forbidToken) return prevContext
    const { headers } = prevContext
    const token = cookies.get(COOKIE_TOKEN_KEY)
    if (token) {
      return {
        ...prevContext,
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      }
    }
    return prevContext
  })
  const errorLink = onError(({ response }) => {
    response?.errors?.forEach((item) => {
      item.message === 'Forbidden' && gotoLogin()
    })
  })
  return ApolloLink.from([link, errorLink])
}

export function cache(): InMemoryCache {
  return new InMemoryCache({
    resultCaching: false,
  })
}
