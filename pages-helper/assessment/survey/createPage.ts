import {
  SubStrategyAnswer,
  SubstrategyQuestion,
} from '~/type/substrategyQuestion'

import { Article } from '~/type/article'
import { Assessment } from '~/type/assessment'
import { ENUM_QUESTION_TYPE } from '~/type/enum'
import { FrameworkElement } from '~/type/frameworkElement'
import { ID } from '~/type/base'

export enum SurveyPageType {
  CircleStrategyStartPage,
  SubStrategyPage,
  CircleStrategyEndPage,
}

export enum DemoSurveyPageType {
  SubStrategyPage,
  CircleStrategyEndPage,
}
export interface SurveyPage<
  Data extends { id: ID } = { id: ID },
  Type extends SurveyPageType = SurveyPageType,
  S = {}
> {
  group: { name: string; id: ID }
  data: Data
  type: Type
  input: S
}

export interface DemoSurveyPage<
  Data extends { id: ID } = { id: ID },
  Type extends DemoSurveyPageType = DemoSurveyPageType,
  S = {}
> {
  data: Data
  type: Type
  input: S
}

export type CircleStrategyStartPage = SurveyPage<
  {
    id: ID
    name: string
    description: string
    children: string[]
  },
  SurveyPageType.CircleStrategyStartPage
>

export type SubStrategyInput = {
  [x in ID]: string | SubStrategyAnswer
} & {
  option: string
  provideExample: string
}

export type SubStrategyPage = SurveyPage<
  {
    id: ID
    name: string
    description: string
    case: Article[]
    caseLoading: boolean
    questions: SubstrategyQuestion[]
  },
  SurveyPageType.SubStrategyPage,
  SubStrategyInput
>

export type DemoSubStrategyPage = DemoSurveyPage<
  {
    id: ID
    name: string
    description: string
    case: Article[]
    caseLoading: boolean
  },
  DemoSurveyPageType.SubStrategyPage,
  SubStrategyInput
>

export interface CircleStrategyEndChallengeInputQuestion {
  check: string[]
  other: string
}

export interface CircleStrategyRadioInput {
  radio: string
  other: string
}

export interface CircleStrategyCheckInput {
  check: string[]
  other: string
}

export interface CircleStrategyEndInputQuestion {
  heading: string
  model: string
  value: string | string[] | CircleStrategyEndChallengeInputQuestion
  type: ENUM_QUESTION_TYPE
}

export type CircleStrategyEndInput = CircleStrategyEndInputQuestion[]

export type CircleStrategyEndPage = SurveyPage<
  {
    id: ID
    name: string
    description: string
    children: string[]
  },
  SurveyPageType.CircleStrategyEndPage,
  CircleStrategyEndInput
>

export type CircleDemoStrategyEndPage = DemoSurveyPage<
  {
    id: ID
    name: string
    children: FrameworkElement[]
  },
  DemoSurveyPageType.CircleStrategyEndPage,
  CircleStrategyEndInput
>
export const createCircleStrategyStartPage = (element: FrameworkElement) => {
  const { name, description, children, id } = element
  const startPage: CircleStrategyStartPage = {
    group: { id, name },
    data: {
      id,
      name,
      description,
      children: (children || []).map((i) => i.name),
    },
    type: SurveyPageType.CircleStrategyStartPage,
    input: {},
  }
  return startPage
}

export const createSubStrategyPage = (
  element: FrameworkElement,
  group: SurveyPage['group']
) => {
  const { name, description, id } = element
  const subStrategy: SubStrategyPage = {
    group,
    data: {
      name,
      description,
      id,
      case: [],
      caseLoading: true,
      questions: element.substrategy_questions,
    },
    input: {
      option: '-1',
      provideExample: '',
    },
    type: SurveyPageType.SubStrategyPage,
  }
  return subStrategy
}

export const createDemoSubStrategyPage = (element: FrameworkElement) => {
  const { name, description, id } = element
  const subStrategy: DemoSubStrategyPage = {
    data: {
      name,
      description,
      id,
      case: [],
      caseLoading: true,
    },
    input: {
      option: '-1',
      provideExample: '',
    },
    type: DemoSurveyPageType.SubStrategyPage,
  }
  return subStrategy
}

export const createCircleStrategyEndPage = (element: FrameworkElement) => {
  const { name, description, children, id } = element
  const endPage: CircleStrategyEndPage = {
    group: { id, name },
    data: {
      id,
      name,
      description,
      children: (children || []).map((i) => i.name),
    },
    type: SurveyPageType.CircleStrategyEndPage,
    input: [],
  }
  return endPage
}

export const createDemoCircleStrategyEndPage = (
  assessment: Assessment,
  frameworks: FrameworkElement[]
) => {
  const { name, framework_id: frameworkId } = assessment
  const endPage: CircleDemoStrategyEndPage = {
    data: {
      id: frameworkId,
      name,
      children: frameworks,
    },
    type: DemoSurveyPageType.CircleStrategyEndPage,
    input: [],
  }
  return endPage
}
