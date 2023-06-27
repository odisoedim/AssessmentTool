import { CaseSort, ENUM_QUESTION_TYPE } from '~/type/enum'
import { ID, Markdown } from '~/type/base'

export interface Question {
  id: number
  text: string
  type: ENUM_QUESTION_TYPE
  priority: number
  required: boolean
  model: string
  heading: string
  blankPlaceholder?: string
}
export interface SubstrategyOption {
  name: string
  not_applicable: string
  score_0: string
  score_25: string
  score_50: string
  score_75: string
  score_100: string
}
export interface Assessment {
  id: ID
  name: string
  title: string
  image: {
    url: string
  }
  richDescription: Markdown
  framework_id: string
  tag_id: string
  collection_id: string
  language: string
  progress?: number
  score?: number
  lastEdited?: string
  frozenBy?: string
  questions: Question[]
  substrategy_option: SubstrategyOption
  case_is_approved: boolean
  case_sort_by: keyof typeof CaseSort
}
