// hooks
import { useOrganisation } from '@use/useOrganisation'
import { useFetchAssessments, useFetchDemoAssessments } from '~/api/assessment'
import { useRequest } from '~/composables'
import { useDemoFetchStores, useFetchStores } from '~/api/answersStore'
import { useFetchAssessmentsScore, useFetchDemoScores } from '~/api/score'
import { useFetchFrameworkElementsByArray } from '~/api/frameworkElements'

// utils
import { checkUserAndOrg } from '~/util/auth'

// type
import { ID } from '~/type/base'

export const useAssessmentsAndSurvey = (organisationId? : ID) => {
  const { currentOrganisation: orgId } = useOrganisation()
  const fetchAssessments = useFetchAssessments()
  const fetchDemoAssessments = useFetchDemoAssessments()
  const fetchAnswers = useFetchStores()
  const fetchDemoAnswers = useDemoFetchStores()
  const fetchAssessmentScore = useFetchAssessmentsScore()
  const fetchDemoAssessmentScore = useFetchDemoScores()
  const fetchElements = useFetchFrameworkElementsByArray()
  const check = checkUserAndOrg()

  const { result, loading, error } = useRequest(async () => {
    check()
    const { data: assessmentsData, error: assessmentError } =
      await fetchAssessments({
        orgId: /* istanbul ignore next */ organisationId || orgId.value || '',
      })


    if (assessmentError) throw assessmentError

    const { data: demoAssessmentsData, error: demoAssessmentError } =
      await fetchDemoAssessments()
    if (demoAssessmentError) throw demoAssessmentError

    const { data: elementsData, error: elementsError } = await fetchElements({
      id: [
        .../* istanbul ignore next */ (assessmentsData?.assessments || []),
        .../* istanbul ignore next */ (demoAssessmentsData?.demoAssessments ||
          []),
      ].map((i) => i.framework_id),
    })
    if (elementsError) throw elementsError
    const { data: answersData } = await fetchAnswers({
      organisation: organisationId || orgId.value!,
      assessment:
        /* istanbul ignore next */ assessmentsData?.assessments.map(
          (i) => i.id
        ) || [],
    })
    const { data: demoAnswersData } = await fetchDemoAnswers({
      organisation: organisationId || orgId.value!,
      demo_assessment:
        /* istanbul ignore next */ demoAssessmentsData?.demoAssessments.map(
          (i) => i.id
        ) || [],
    })
    const scoreData = await fetchAssessmentScore({
      organisation: organisationId ||  orgId.value!,
    })
    const demoScoreData = await fetchDemoAssessmentScore({
      organisation: organisationId || orgId.value!,
    })
    return {
      assessmentsData,
      answersData,
      scoreData,
      elementsData,
      demoAnswersData,
      demoAssessmentsData,
      demoScoreData,
    }
  })

  return { result, loading, error }
}
