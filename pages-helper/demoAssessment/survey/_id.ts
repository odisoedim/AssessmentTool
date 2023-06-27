import { computed } from '@nuxtjs/composition-api'
import { useRequest } from '~/composables'
import { provideSubStrategyOption } from '~/pages-helper/assessment/survey/subStrategyOption'
import { provideChallengeOptions } from '~/pages-helper/assessment/survey/challengeOptions'
import { provideDemoSurveyInfo } from '~/pages-helper/assessment/survey/surveyInfo'
import { provideDemoSurveyPages } from '~/pages-helper/assessment/survey/surveyPages'
import { provideCaseFetchBody } from '~/pages-helper/assessment/survey/caseFetchBody'
import { provideDemoSurveyStore } from '~/pages-helper/assessment/survey/surveyStore'
import { provideDemoComputedPages } from '~/pages-helper/assessment/survey/computedPages'
import { useDemoSurveyWithAssessmentRequest } from '~/pages-helper/assessment/survey/useSurveyWithAssessmentRequest'

export const useSurveyWithAssessment = () => {
  const { fetch } = useDemoSurveyWithAssessmentRequest()
  const { result, loading, error } = useRequest(fetch)
  const assessment = computed(
    () =>
      /* istanbul ignore next */ result.value?.assessmentData?.demoAssessment
  )
  const frameworks = computed(
    () =>
      /* istanbul ignore next */ result.value?.frameworksData?.frameworkElements
  )
  const challenges = computed(
    () =>
      /* istanbul ignore next */ result.value?.challengesData?.frameworkElements
  )
  provideSubStrategyOption(assessment)
  provideChallengeOptions(challenges)
  provideCaseFetchBody(assessment)
  provideDemoSurveyInfo(assessment, frameworks)
  provideDemoSurveyPages(assessment, frameworks)
  provideDemoComputedPages()
  provideDemoSurveyStore(frameworks, assessment)

  return { loading, result, error }
}
