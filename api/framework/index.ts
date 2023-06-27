import { useQuery } from '@use/apollo'
import framework from '@gql/kh/framework.gql'
import { Framework } from '~/type/framework'

export const useFetchFramework = () =>
  useQuery<{ framework: Framework }>({
    query: framework,
  })
