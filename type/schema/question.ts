import { DateTime, ID } from '~/type/base'
import { ExampleLink } from '~/type/schema/exampleLink'
export enum ENUM_QUESTION_TYPE {
  input,
  radio,
  checkbox,
}
export interface Question {
  id: ID
  created_at: DateTime
  updated_at: DateTime
  title: string
  description: string
  type: ENUM_QUESTION_TYPE
  published_at: DateTime
  example_links: ExampleLink[]
}
