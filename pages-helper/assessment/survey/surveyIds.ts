import {
  inject,
  InjectionKey,
  provide,
  ref,
  Ref,
  watchEffect,
} from '@nuxtjs/composition-api'
import { useParamsId } from '@use/useParamsId'

const surveyIdsSymbol: InjectionKey<{
  assessmentId: Ref<string>
  surveyId: Ref<string>
}> = Symbol('surveyIds')
export const provideSurveyIds = () => {
  const id = useParamsId()
  const assessmentId = ref('')
  const surveyId = ref('')
  watchEffect(() => {
    const [$assessmentId, $surveyId] = id.value.split('_')
    assessmentId.value = $assessmentId
    surveyId.value = $surveyId
  })
  provide(surveyIdsSymbol, { assessmentId, surveyId })
  return {
    assessmentId,
    surveyId,
  }
}
export const useSurveyIds = () => inject(surveyIdsSymbol)!
