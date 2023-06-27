import { useOrganisation } from '@use/useOrganisation'
import { provideSurveyIds } from '~/pages-helper/assessment/survey/surveyIds'
import { useFetchAssessment } from '~/api/assessment'
import { useFetchFrameworkElement } from '~/api/frameworkElements'
import { useFetchStore } from '~/api/answersStore'
import { useFetchCircleScore } from '~/api/score'
import { checkUserAndOrg } from '~/util/auth'

export const useSurveyResultFetch = () => {
  const { assessmentId, surveyId } = provideSurveyIds()
  const fetchAssessment = useFetchAssessment()
  const fetchFramework = useFetchFrameworkElement()
  const fetchAnswers = useFetchStore()
  const fetchCircleScore = useFetchCircleScore()

  const { currentOrganisation: organisationId } = useOrganisation()
  const check = checkUserAndOrg()
  return {
    assessmentId,
    surveyId,
    fetch: async () => {
      check()
      const { data: assessmentData, error: assessmentError } =
        await fetchAssessment({
          id: assessmentId.value,
        })
      if (assessmentError) throw assessmentError
      const { data: frameworksData, error: frameworksError } =
        await fetchFramework({
          id: surveyId.value,
        })
      if (frameworksError) throw frameworksError
      const { data: answersData, error: answersError } = await fetchAnswers({
        assessment: assessmentId.value,
        surveyId: surveyId.value,
        organisation: organisationId.value + '',
      })
      if (answersError) throw answersError
      const circleScoresData = await fetchCircleScore({
        organisation: organisationId.value + '',
        assessment: assessmentId.value,
        surveyId: surveyId.value,
      })
      return {
        assessmentData,
        frameworksData,
        answersData,
        circleScoresData,
      }
    },
  }
}
