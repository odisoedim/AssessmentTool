import { useParamsId } from '@use/useParamsId'
import { useOrganisation } from '@use/useOrganisation'
import { useFetchFrameworkElements } from '~/api/frameworkElements'
import { useFetchAssessment, useFetchDemoAssessment } from '~/api/assessment'
import { useFetchStores, useDemoFetchStore } from '~/api/answersStore'
import { useFetchDemoScore, useFetchAssessmentScore } from '~/api/score'
import { checkUserAndOrg } from '~/util/auth'

export const useAssessmentResultFetch = () => {
  const id = useParamsId()
  const assessmentId = id.value.split('_')[0]
  const fetchAssessment = useFetchAssessment()
  const fetchFrameworks = useFetchFrameworkElements()
  const fetchAnswers = useFetchStores()
  const fetchAssessmentScore = useFetchAssessmentScore()

  const { currentOrganisation: organisationId } = useOrganisation()
  const check = checkUserAndOrg()
  return {
    assessmentId,
    fetch: async () => {
      check()
      const { data: assessmentData, error: assessmentError } =
        await fetchAssessment({
          id: assessmentId,
        })
      if (assessmentError) throw assessmentError
      const { data: frameworksData, error: frameworksError } =
        await fetchFrameworks({
          id: assessmentData!.assessment.framework_id,
          isTop: true,
        })
      if (frameworksError) throw frameworksError
      const { data: answersData, error: answersError } = await fetchAnswers({
        assessment: [assessmentId],
        organisation: organisationId.value || '',
      })
      if (answersError) throw answersError
      const scoresData = await fetchAssessmentScore({
        organisation: organisationId.value || '',
        assessment: assessmentId,
      })
      return {
        assessmentData,
        frameworksData,
        answersData,
        scoresData,
      }
    },
  }
}

export const useDemoAssessmentResultFetch = () => {
  const id = useParamsId()
  const assessmentId = id.value.split('_')[0]
  const fetchAssessment = useFetchDemoAssessment()
  const fetchFrameworks = useFetchFrameworkElements()
  const fetchAnswers = useDemoFetchStore()
  const fetchDemoScore = useFetchDemoScore()
  const { currentOrganisation: organisationId } = useOrganisation()
  const check = checkUserAndOrg()

  return {
    assessmentId,
    fetch: async () => {
      check()
      const { data: assessmentData, error: assessmentError } =
        await fetchAssessment({
          id: assessmentId,
        })
      if (assessmentError) throw assessmentError
      const { data: frameworksData, error: frameworksError } =
        await fetchFrameworks({
          id: assessmentData!.demoAssessment.framework_id,
          isTop: true,
        })
      if (frameworksError) throw frameworksError
      const { data: answersData, error: answersError } = await fetchAnswers({
        demo_assessment: assessmentId,
        organisation: organisationId.value || '',
        surveyId: assessmentData!.demoAssessment.framework_id,
      })
      if (answersError) throw answersError
      let score = -1
      if (answersData?.demoAnswersStores[0]?.completed) {
        const { score: demoScore } = await fetchDemoScore({
          organisation: organisationId.value || '',
          assessment: assessmentId,
          surveyId: assessmentData!.demoAssessment.framework_id,
        })
        score = demoScore
      }
      return {
        assessmentData,
        frameworksData,
        answersData,
        score,
      }
    },
  }
}
