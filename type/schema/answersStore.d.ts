import { ID } from '~/type/base'
import {
  CircleStrategyEndInput,
  SubStrategyInput,
  SurveyPageType,
  DemoSurveyPageType,
} from '~/pages-helper/assessment/survey/createPage'
import { User } from '~/type/schema/user'

export interface AnswersStore {
  id?: ID
  assessment: { id: ID }
  frozenBy: User | null
  surveyId: string
  updated: string
  data: Record<string | number, SubStrategyInput | CircleStrategyEndInput>
  completed: boolean
  organisation: string
  progress: {
    current: { id: ID; type: SurveyPageType }
    userProfileInfo: { firstName: string | null; picture: string | null }
    circleStrategies: string[]
  }
}
export interface AnswersStoreInput
  extends Omit<Omit<AnswersStore, 'frozenBy'>, 'assessment'> {
  frozenBy: ID | null
  assessment: ID
}
export interface DemoAnswersStore {
  id?: ID
  demo_assessment: { id: ID }
  frozenBy: User | null
  surveyId: string
  updated: string
  data: Record<string | number, CircleStrategyEndInput | SubStrategyInput>
  completed: boolean
  organisation: string
  progress: {
    current: { id: ID; type: DemoSurveyPageType }
    userProfileInfo: { firstName: string | null; picture: string | null }
  }
}

export interface DemoAnswersStoreInput
  extends Omit<Omit<DemoAnswersStore, 'frozenBy'>, 'demo_assessment'> {
  frozenBy: ID | null
  demo_assessment: ID
}
