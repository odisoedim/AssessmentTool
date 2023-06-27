import {
  computed,
  inject,
  InjectionKey,
  provide,
  Ref,
} from '@nuxtjs/composition-api'
import { Assessment } from '~/type/assessment'
import { CaseSort } from '~/type/enum'

const caseFetchBodySymbol: InjectionKey<
  Ref<{ curator: boolean; sort: number; framework: string, collection: string } | null>
> = Symbol('caseFetchBody')
export const provideCaseFetchBody = (
  assessment: Ref<Assessment | undefined>
) => {
  const caseBody = computed(() => {
    if (!assessment.value) {
      return null
    }
    const { case_is_approved, case_sort_by, framework_id, collection_id } = assessment.value
    return {
      curator: case_is_approved,
      sort: +CaseSort[case_sort_by],
      framework: framework_id + '',
      collection: collection_id
    }
  })
  provide(caseFetchBodySymbol, caseBody)
}
export const useCaseFetchBody = () => inject(caseFetchBodySymbol)!
