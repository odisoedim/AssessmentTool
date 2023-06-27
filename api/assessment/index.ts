import assessment from '@gql/cms/assessment.gql'
import assessments from '@gql/cms/assessmentsByOrg.gql'
import demoAssessment from '@gql/cms/demoAssessment.gql'
import demoAssessments from '@gql/cms/demoAssessments.gql'

import { useQuery } from '@use/apollo'
import { Assessment } from '~/type/assessment'
import { ID } from '~/type/base'

export const useFetchAssessment = () =>
  useQuery<{ assessment: Assessment }>({
    query: assessment,
  })

export const useFetchAssessments = () =>
  useQuery<{ assessments: Assessment[] }, { orgId: ID }>({
    query: assessments,
  })

export const useFetchDemoAssessment = () =>
  useQuery<{ demoAssessment: Assessment }, { id: ID }>({
    query: demoAssessment,
  })

export const useFetchDemoAssessments = () =>
  useQuery<{ demoAssessments: Assessment[] }>({
    query: demoAssessments,
  })
