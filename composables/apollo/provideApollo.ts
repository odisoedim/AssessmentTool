import { ApolloClient, ApolloLink, createHttpLink } from '@apollo/client'
import type { NormalizedCacheObject } from '@apollo/client/core'
import { inject, InjectionKey, provide } from '@nuxtjs/composition-api'

import { GraphqlFrom } from '~/type/enum'
import { authLink, cache } from '~/apollo/client'

const clientSymbol: InjectionKey<
  Record<GraphqlFrom, ApolloClient<NormalizedCacheObject>>
> = Symbol('apollo-client')

function httpLink(uri: string) {
  return createHttpLink({
    uri,
    fetchOptions: {
      mode: 'cors',
    },
    fetch: global.fetch,
  })
}

export const provideApollo = (uri: Record<GraphqlFrom, string>) => {
  const clientObj: Record<GraphqlFrom, ApolloClient<NormalizedCacheObject>> = {
    [GraphqlFrom.CMS]: new ApolloClient({
      link: ApolloLink.from([authLink(), httpLink(uri[GraphqlFrom.CMS])]),
      cache: cache(),
      queryDeduplication: false,
    }),
    [GraphqlFrom.KH]: new ApolloClient({
      link: httpLink(uri[GraphqlFrom.KH]),
      cache: cache(),
      queryDeduplication: false,
    }),
  }

  provide(clientSymbol, clientObj)
}

export const useApollo = () => {
  const apolloClient = inject(clientSymbol)
  /* istanbul ignore next */
  if (!apolloClient) throw new Error('inject apolloClient failed')
  return apolloClient
}
