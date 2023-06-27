import { provideSurveyIds } from '~/pages-helper/assessment/survey/surveyIds'
import { useFetchAssessment, useFetchDemoAssessment } from '~/api/assessment'
import {
  useFetchFrameworkElement,
  useFetchFrameworkElements,
} from '~/api/frameworkElements'
import { checkUserAndOrg } from '~/util/auth'

export const useSurveyWithAssessmentRequest = () => {
  const { assessmentId, surveyId } = provideSurveyIds()
  const fetchAssessment = useFetchAssessment()
  const fetchFramework = useFetchFrameworkElement()
  const fetchChallenges = useFetchFrameworkElements()
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

      const { data: challengesData, error: challengesError } =
        await fetchChallenges({
          id: 266,
          isTop: true,
        })
      if (challengesError) throw challengesError
      return { assessmentData, frameworksData, challengesData }
    },
  }
}

export const useDemoSurveyWithAssessmentRequest = () => {
  const { assessmentId } = provideSurveyIds()
  const fetchAssessment = useFetchDemoAssessment()
  const fetchFrameworks = useFetchFrameworkElements()
  const check = checkUserAndOrg()

  return {
    assessmentId,
    fetch: async () => {
      check()
      const { data: assessmentData, error: assessmentError } =
        await fetchAssessment({
          id: assessmentId.value,
        })
      if (assessmentError) throw assessmentError
      const { data: frameworksData, error: frameworksError } =
        await fetchFrameworks({
          id: assessmentData!.demoAssessment.framework_id,
          isTop: true,
        })
      if (frameworksError) throw frameworksError

      const { data: challengesData, error: challengesError } =
        await fetchFrameworks({
          id: 266,
          isTop: true,
        })
      if (challengesError) throw challengesError

      return { assessmentData, frameworksData, challengesData }
    },
  }
}
