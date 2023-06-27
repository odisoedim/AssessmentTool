import { computed, Ref } from '@nuxtjs/composition-api'
import { useRequest } from '@use/useRequest'
import { useUserinfo } from '@use/useUserinfo'
import { SubStrategyInput } from '~/pages-helper/assessment/survey/createPage'
import { useInjectSurveyResult } from '~/pages-helper/assessment/result/_id'
import { useFetchSurveyScore } from '~/api/score'

export const useSurveyScore: (
  assessmentId: Ref<number | string>,
  surveyId: Ref<number | string>
) => {
  completed: Ref<boolean>
  progress: Ref<number>
  scoreSurvey: Ref<{ score: number; surveyId: string } | null>
} = (assessmentId, surveyId) => {
  const { result } = useUserinfo()
  const { injectAnswer } = useInjectSurveyResult()

  const fetch = useFetchSurveyScore()
  const organisationId = computed<string>(
    () =>
      /* istanbul ignore next */ result.value?.userinfo.organizations[0]
        .organizationId + '' || ''
  )

  const { result: scoreSurvey } = useRequest(async () => {
    const data = await fetch({
      organisation: organisationId.value,
      assessment: assessmentId.value,
      surveyId: surveyId.value,
    })

    return data
  })

  const completed = computed(() => {
    if (!injectAnswer || !injectAnswer.value) return false
    return injectAnswer.value.completed
  })

  const progress = computed(() => {
    if (!injectAnswer || !injectAnswer.value) return 0
    const questionsNum = Object.values(injectAnswer.value.data).filter(
      (item) => (item as SubStrategyInput)?.option
    ).length
    let _progress = 0
    for (const key in injectAnswer.value.data) {
      if (+(injectAnswer.value.data[key] as SubStrategyInput)?.option > -1) {
        _progress++
      }
    }

    _progress = questionsNum
      ? Math.round((_progress / (questionsNum || 1)) * 100)
      : -1
    return _progress
  })
  return {
    completed,
    progress,
    scoreSurvey,
  }
}
