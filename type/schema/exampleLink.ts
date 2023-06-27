import { DateTime, ID } from '~/type/base'

export enum ENUM_EXAMPLELINK_TYPE {
  POLICY_CASE,
  ARTICLE__REPORT,
  BUSINESS_CASE,
}

export interface ExampleLink {
  id: ID
  created_at: DateTime
  updated_at: DateTime
  link: string
  title: string
  description: string
  type: ENUM_EXAMPLELINK_TYPE
  published_at: DateTime
}
