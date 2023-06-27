import { useGet } from '@use/useAxios'
import { Service } from '~/type/enum'
import { ID } from '~/type/base'

export const useFetchAssessmentsScore = () =>
  useGet<
    { organisation: ID },
    Record<string, { survey: Record<string, number>; score: number }>
  >('assessments', Service.MIDDLEWARE)

export const useFetchAssessmentScore = () =>
  useGet<
    { organisation: ID; assessment: ID },
    Record<string, { survey: Record<string, number>; score: number }>
  >('assessment', Service.MIDDLEWARE)

export const useFetchCircleScore = () =>
  useGet<
    { organisation: ID; assessment: ID; surveyId: ID },
    Record<string, number>
  >('circle', Service.MIDDLEWARE)

export const useFetchDemoScore = () =>
  useGet<
    { organisation: ID; assessment: ID; surveyId: ID },
    { surveyId: string; score: number }
  >('demo', Service.MIDDLEWARE)

export const useFetchDemoScores = () =>
  useGet<{ organisation: ID }, Record<string, number>>(
    'demos',
    Service.MIDDLEWARE
  )
export const useFetchSurveyScore = () =>
  useGet<
    { organisation: ID; assessment: ID; surveyId: ID },
    { surveyId: string; score: number }
  >('survey', Service.MIDDLEWARE)
