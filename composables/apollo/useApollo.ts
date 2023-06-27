import { unref } from '@nuxtjs/composition-api'
import type { QueryOptions } from '@apollo/client/core/watchQueryOptions'
import { MaybeRef } from '@vueuse/core'
import { useAbortController, useApollo } from '@use/apollo'
import type { MutationOptions } from '@apollo/client'
import { GraphqlFrom } from '~/type/enum'

export const useQuery = <Result, Var = {}>(
  request: QueryOptions<Var, Result>,
  from: GraphqlFrom = GraphqlFrom.CMS
) => {
  const apolloClient = useApollo()[from]
  const abort = useAbortController()
  return async (variables?: MaybeRef<Var>) => {
    abort.check()
    abort.create()
    const unrefVariables = unref(variables || {}) as Var
    const options: QueryOptions<Var, Result> = {
      ...request,
      variables: unrefVariables,
      context: {
        ...request.context,
        fetchOptions: {
          ...request.context?.fetchOptions,
        },
      },
    }
    const signal = abort.getSignal()
    signal && (options.context.fetchOptions.signal = signal)
    try {
      const { data, errors } = await apolloClient.query<Result, Var>(options)
      abort.remove()
      return {
        error: errors,
        data: JSON.parse(JSON.stringify(data)) as Result,
      }
    } catch (e) {
      abort.remove()
      return {
        error: e,
        data: null,
      }
    }
  }
}

export const useMutate = <Result, Var = {}>(
  request: MutationOptions<Result, Var>,
  from: GraphqlFrom = GraphqlFrom.CMS
) => {
  const apolloClient = useApollo()[from]
  const abort = useAbortController()

  return async (variables?: MaybeRef<Var>) => {
    abort.check()
    abort.create()
    const unrefVariables = unref(variables || {}) as Var
    const options: MutationOptions<Result, Var> = {
      ...request,
      variables: unrefVariables,
      context: {
        ...request.context,
        fetchOptions: {
          ...request.context?.fetchOptions,
        },
      },
    }
    if (variables) options.variables = variables as Var
    const signal = abort.getSignal()
    signal && (options.context!.fetchOptions.signal = signal)
    try {
      const { data, errors } = await apolloClient.mutate<Result, Var>(options)
      abort.remove()
      return {
        error: errors,
        data: JSON.parse(JSON.stringify(data)) as Result,
      }
    } catch (e) {
      abort.remove()
      return {
        error: e,
        data: null,
      }
    }
  }
}
