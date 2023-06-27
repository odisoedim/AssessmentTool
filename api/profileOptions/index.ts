import profileOptions from '@gql/cms/profileOptions.gql'
import { useQuery } from '@use/apollo'
import { profileOption } from '~/type/schema/profilePosition'

export const useFetchProfileOptions = () =>
  useQuery<{ profileOptions: profileOption[] }>({ query: profileOptions })
