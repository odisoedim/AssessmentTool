import { ID } from '~/type/base'

export interface LandingAvailableAssessment {
  id: ID
  image: {
    url: string
    alternativeText: String
  }
  title: string
  content: string
  duration: string
  key_elements: string
  button_text: string
  button_link: string
}

export interface LandingBenefit {
  id: string
  title: string
  content: string
  image: {
    url: string
    alternativeText: String
  }
}

export interface LandingCarousel {
  id: string
  title: string
  description: string
  avatar: {
    url: string
    alternativeText: String
  }
}
export interface PageMeta {
  title: string
  robots: string
  description: string
  canoical: string
}
export interface LandingPage {
  started_image: {
    url: string
    alternativeText: String
  }
  available_assessment: LandingAvailableAssessment[]
  benefit: LandingBenefit[]
  carousel: LandingCarousel[]
  meta: PageMeta
}
