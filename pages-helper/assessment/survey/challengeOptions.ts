import {
  computed,
  inject,
  InjectionKey,
  provide,
  Ref,
} from '@nuxtjs/composition-api'
import { FrameworkElement } from '~/type/frameworkElement'

export const challengeOptionsSymbol: InjectionKey<Ref<FrameworkElement[]>> =
  Symbol('subChallengeOptions')
export const provideChallengeOptions = (
  challenges: Ref<FrameworkElement[] | undefined>
) => {
  const challengeOptions = computed(() => challenges.value || [])
  provide(challengeOptionsSymbol, challengeOptions)
}
export const useChallengeOptions = () => inject(challengeOptionsSymbol)!
