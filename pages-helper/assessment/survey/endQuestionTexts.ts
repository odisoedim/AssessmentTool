import {
  computed,
  inject,
  InjectionKey,
  provide,
  Ref,
} from '@nuxtjs/composition-api'
import { Assessment, Question } from '~/type/assessment'

const endQuestionTextsSymbol: InjectionKey<Ref<Question[]>> =
  Symbol('endQuestionTexts')

export const provideEndQuestions = (
  assessment: Ref<Assessment | undefined>
) => {
  const endQuestionTexts = computed(
    () =>
      assessment.value?.questions.sort((a, b) => b.priority - a.priority) || []
  )

  provide(endQuestionTextsSymbol, endQuestionTexts)
}
export const useEndQuestions = () => inject(endQuestionTextsSymbol)!
