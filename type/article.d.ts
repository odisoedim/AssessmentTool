import { DateTime, ID } from '~/type/base'
import { organization } from '~/type/organization'

export interface Article {
  id: ID
  title: string
  summary: string
  created_at: DateTime
  updated_at: DateTime
  main_image: {
    url: string
  }
  problem: string
  solution: string
  outcome: string
  locations: { name: string }[]
  contenttype: {
    name: string
  }
  organizations: organization[]
}
