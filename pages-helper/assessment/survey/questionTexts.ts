import {
  computed,
  inject,
  InjectionKey,
  provide,
  Ref,
} from '@nuxtjs/composition-api'
import { ENUM_QUESTION_TYPE } from '~/type/enum'
import { Assessment, Question } from '~/type/assessment'

const questionTextsSymbol: InjectionKey<
  Ref<{ [key in ENUM_QUESTION_TYPE]?: Question }>
> = Symbol('questionTexts')
export const provideQuestionTexts = (
  assessment: Ref<Assessment | undefined>
) => {
  const questionTexts = computed(() => {
    if (!assessment.value) return {}
    const questions: { [key in ENUM_QUESTION_TYPE]?: Question } = {}
    assessment.value.questions.forEach((item) => {
      questions[item.type] = item
    })
    return questions
  })
  provide(questionTextsSymbol, questionTexts)
}
export const useQuestionTexts = () => inject(questionTextsSymbol)!
