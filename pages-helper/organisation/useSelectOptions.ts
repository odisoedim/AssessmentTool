import {
  computed,
  Ref,
  inject,
  provide,
  InjectionKey,
} from '@nuxtjs/composition-api'
import { useFetchFrameworkElements } from '~/api/frameworkElements'
import { useRequest } from '~/composables'
import { useFetchProfileOptions } from '~/api/profileOptions'
import { SelectOption } from '~/type/selectOption'
import { FrameworkElement } from '~/type/frameworkElement'

const optionsSymbol: InjectionKey<{
  rowSectorOptions: Ref<FrameworkElement[] | undefined>
  rowIndustryOptions: Ref<
    Record<string, { id: string | number; name: string }[]>
  >
  profileOptions: Ref<
    Record<'employeesOption' | 'revenueOption', SelectOption[]>
  >
  genYearOptions: (
    start?: number,
    end?: number,
    sort?: 'desc' | 'asc'
  ) => SelectOption[]
}> = Symbol('options')
export const useSelectOptions = () => {
  const fetchFrameworks = useFetchFrameworkElements()
  const fetchProfileOptions = useFetchProfileOptions()

  const fetch = async () => {
    const { data: frameworksData, error: frameworksError } =
      await fetchFrameworks({
        id: 5,
        isTop: true,
      })
    if (frameworksError) throw frameworksError

    const { data: profileOptionsCMS, error: profileOptionsCMSError } =
      await fetchProfileOptions()
    if (profileOptionsCMSError) throw profileOptionsCMSError
    return {
      frameworksData,
      profileOptionsCMS,
    }
  }

  const { result } = useRequest(fetch)
  const rowSectorOptions = computed(
    () => result.value?.frameworksData?.frameworkElements
  )
  const rowProfileOptions = computed(
    () => result.value?.profileOptionsCMS?.profileOptions
  )
  const profileOptions = computed(() => {
    const _result: Record<'employeesOption' | 'revenueOption', SelectOption[]> =
      {
        employeesOption: [],
        revenueOption: [],
      }
    rowProfileOptions.value
      ?.sort((a, b) => a.order - b.order)
      .forEach((item) => {
        switch (item.type) {
          case 'employees':
            _result.employeesOption.push({
              name: item.text,
              value: +item.value,
            })
            break
          case 'revenue':
            _result.revenueOption.push({ name: item.text, value: +item.value })
            break
          default:
            break
        }
      })
    return _result
  })

  const rowIndustryOptions = computed(() => {
    const _options: Record<string, { id: string | number; name: string }[]> = {}
    if (rowSectorOptions.value) {
      rowSectorOptions.value.forEach((item) => {
        _options[item.id] = item.children || []
      })
    }
    return _options
  })

  const genYearOptions = (
    start: number = 1900,
    end: number = 0,
    sort: 'desc' | 'asc' = 'desc'
  ) => {
    const date = new Date()
    const options: SelectOption[] = []
    if (!end) {
      end = date.getFullYear()
    }
    for (let i = 0; i <= end - start; i++) {
      if (sort === 'desc') {
        options.push({ name: end - i + '', value: end - i })
      } else {
        options.push({ name: start + i + '', value: start + i })
      }
    }
    return options
  }
  provide(optionsSymbol, {
    rowSectorOptions,
    rowIndustryOptions,
    profileOptions,
    genYearOptions,
  })
}

export const useInjectOptions = () => {
  return inject(optionsSymbol)!
}
