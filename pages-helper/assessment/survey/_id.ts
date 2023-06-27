import { computed } from '@nuxtjs/composition-api'
import { provideEndQuestions } from './endQuestionTexts'
import { useRequest } from '~/composables'
import { provideCircleStrategyCheck } from '~/pages-helper/assessment/survey/circleStrategyCheck'
import { provideSubStrategyOption } from '~/pages-helper/assessment/survey/subStrategyOption'
import { provideChallengeOptions } from '~/pages-helper/assessment/survey/challengeOptions'
import { provideSurveyInfo } from '~/pages-helper/assessment/survey/surveyInfo'
import { provideSurveyChildren } from '~/pages-helper/assessment/survey/surveyChildren'
import { provideSurveyPages } from '~/pages-helper/assessment/survey/surveyPages'
import { provideCaseFetchBody } from '~/pages-helper/assessment/survey/caseFetchBody'
import { provideSurveyStore } from '~/pages-helper/assessment/survey/surveyStore'
import { provideComputedPages } from '~/pages-helper/assessment/survey/computedPages'
import { useSurveyWithAssessmentRequest } from '~/pages-helper/assessment/survey/useSurveyWithAssessmentRequest'

export const useSurveyWithAssessment = () => {
  const { fetch } = useSurveyWithAssessmentRequest()
  const { result, loading, error } = useRequest(fetch)
  const assessment = computed(() => result.value?.assessmentData?.assessment)
  const framework = computed(
    () =>
      /* istanbul ignore next */ result.value?.frameworksData?.frameworkElement
  )
  const challenges = computed(
    () =>
      /* istanbul ignore next */ result.value?.challengesData?.frameworkElements
  )
  provideSubStrategyOption(assessment)
  provideChallengeOptions(challenges)
  provideCaseFetchBody(assessment)
  provideSurveyInfo(framework, assessment)
  // provideQuestionTexts(assessment)
  provideEndQuestions(assessment)
  provideSurveyChildren(framework)
  provideSurveyPages(framework)
  provideCircleStrategyCheck()
  provideComputedPages()
  provideSurveyStore(framework)
  return { loading, result, error }
}
