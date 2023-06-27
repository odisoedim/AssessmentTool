import { useFetchLandingPage } from '~/api/landingPage'
import { useRequestAsync } from '~/composables'

export const useLandingPageAsync = () => {
  const fetchLandingPage = useFetchLandingPage()

  return useRequestAsync('landingPage', async () => {
    const { data: landingPageData } = await fetchLandingPage()
    return {
      landingPage: landingPageData?.landingPage,
    }
  })
}
