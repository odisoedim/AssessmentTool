import {
  computed,
  inject,
  InjectionKey,
  provide,
  Ref,
} from '@nuxtjs/composition-api'
import { FrameworkElement } from '~/type/frameworkElement'

const surveyChildrenSymbol: InjectionKey<Ref<FrameworkElement[]>> =
  Symbol('surveyChildren')
export const provideSurveyChildren = (
  element: Ref<FrameworkElement | undefined>
) => {
  provide(
    surveyChildrenSymbol,
    computed(() => (element.value ? element.value?.children || [] : []))
  )
}
export const useSurveyChildren = () => inject(surveyChildrenSymbol)!
