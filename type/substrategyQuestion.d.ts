import { ID } from './base'
import { ENUM_SUBSTRATEGY_QUESTION_TYPE } from './enum'
import {
  CircleStrategyCheckInput,
  CircleStrategyRadioInput,
} from '~/pages-helper/assessment/survey/createPage'

export interface SubstrategyQuestionAnswerOption {
  label: string
  value: number
}

export interface SubstrategyQuestion {
  id: ID
  title: string
  type: ENUM_SUBSTRATEGY_QUESTION_TYPE
  answer_options: SubstrategyQuestionAnswerOption[]
}

export interface SubStrategyAnswer {
  title: string
  type: ENUM_SUBSTRATEGY_QUESTION_TYPE
  answer: CircleStrategyCheckInput | CircleStrategyRadioInput | string
}
