import landingPage from '@gql/cms/landingPage.gql'

import { useQuery } from '@use/apollo'
import { LandingPage } from '~/type/landingPage'

export const useFetchLandingPage = () =>
  useQuery<{ landingPage: LandingPage }>({
    query: landingPage,
  })
