import {
  computed,
  inject,
  InjectionKey,
  provide,
  Ref,
} from '@nuxtjs/composition-api'
import { ID } from '~/type/base'
import { FrameworkElement } from '~/type/frameworkElement'
import { Assessment } from '~/type/assessment'

const surveyInfoSymbol: InjectionKey<
  Ref<{
    name: string
    description: string
    id: ID
    assessmentName: string
    frameworkId: ID
    frameworkName: string
    children?: FrameworkElement[] | []
  }>
> = Symbol('surveyInfo')
export const provideSurveyInfo = (
  element: Ref<FrameworkElement | undefined>,
  assessment: Ref<Assessment | undefined>
) => {
  const info = computed(() => {
    if (!element.value || !assessment.value)
      return {
        name: '',
        description: '',
        id: '',
        assessmentName: '',
        frameworkId: '',
        frameworkName: '',
      }
    const {
      name,
      description,
      framework: { id: frameworkId, name: frameworkName },
    } = element.value
    const { framework_id, name: assessmentName } = assessment.value
    return {
      name,
      description,
      id: framework_id,
      assessmentName,
      frameworkId,
      frameworkName,
    }
  })
  provide(surveyInfoSymbol, info)
}

export const provideDemoSurveyInfo = (
  assessment: Ref<Assessment | undefined>,
  elements: Ref<FrameworkElement[] | undefined>
) => {
  const info = computed(() => {
    if (!elements.value || !assessment.value)
      return {
        name: '',
        assessmentName: '',
        description: '',
        id: '',
        frameworkId: '',
        frameworkName: '',
        children: [],
      }
    const {
      name: assessmentName,
      id,
      framework_id: frameworkId,
    } = assessment.value
    const {
      framework: { description, name: frameworkName },
    } = elements.value[0]
    return {
      name: assessmentName,
      assessmentName,
      description,
      id,
      frameworkName,
      frameworkId,
      children: elements.value,
    }
  })
  provide(surveyInfoSymbol, info)
}
export const useSurveyInfo = () => inject(surveyInfoSymbol)!
