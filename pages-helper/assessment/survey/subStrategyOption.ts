import {
  computed,
  inject,
  InjectionKey,
  provide,
  Ref,
} from '@nuxtjs/composition-api'
import { Assessment } from '~/type/assessment'

const subStrategyOptionsSymbol: InjectionKey<Ref<string[]>> =
  Symbol('subStrategyOptions')
export const provideSubStrategyOption = (
  assessment: Ref<Assessment | undefined>
) => {
  const substrategyOption = computed(() => {
    if (!assessment.value) {
      return []
    }
    const { score_0, score_50, score_25, score_75, score_100, not_applicable } =
      assessment.value.substrategy_option
    return [score_0, score_25, score_50, score_75, score_100, not_applicable]
  })
  provide(subStrategyOptionsSymbol, substrategyOption)
}
export const useSubStrategyOption = () => inject(subStrategyOptionsSymbol)!
