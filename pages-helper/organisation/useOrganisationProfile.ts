import {
  computed,
  inject,
  InjectionKey,
  provide,
  ref,
  Ref,
} from '@nuxtjs/composition-api'
import { useOrganisation } from '@use/useOrganisation'
import { useRequest } from '~/composables'
import {
  useFetchOrganisationInformation,
  useUpdateOrganisationInformation,
  useUpdateOrganisationName,
} from '~/api/organisation'
import { FrameworkElement } from '~/type/frameworkElement'
import { SelectOption } from '~/type/selectOption'
import { ErrMsg } from '~/util/errMsg'

const formFillDataSymbol: InjectionKey<Ref> = Symbol('rawProfileData')
const profileShowDataSymbol: InjectionKey<Ref> = Symbol('profileShowData')
export const useOrganisationProfile: (option: {
  rowSectorOptions: Ref<FrameworkElement[] | undefined>
  profileOptions: Ref<
    Record<'employeesOption' | 'revenueOption', SelectOption[]>
  >
}) => void = (options) => {
  const { currentOrganisation: orgId } = useOrganisation()
  const fetch = async () => {
    if (!orgId.value) {
      throw new Error(ErrMsg.NoOrganization)
    }
    const fetchOrganisationProfile = useFetchOrganisationInformation(
      ref(orgId.value + '')
    )
    const organisationProfileData = await fetchOrganisationProfile()
    return {
      organisationProfileData,
    }
  }

  const { result } = useRequest(fetch)

  const rawOrganisationProfileData = computed(
    () => result.value?.organisationProfileData
  )
  const sectorOptions = computed(() => {
    const _result = new Map()
    options.rowSectorOptions.value?.forEach(
      (item: { name: string; id: number | string }) => {
        _result.set(+item.id, item.name)
      }
    )
    return _result
  })

  const industryOptions = computed(() => {
    const _result = new Map()
    options.rowSectorOptions.value
      ?.map((item) => {
        return item.children
      })
      .flat(1)
      .forEach((item) => {
        item && _result.set(+item.id, item.name)
      })
    return _result
  })

  const revenueOption = computed(() => {
    const _result = new Map()
    options.profileOptions.value?.revenueOption.forEach(
      (item: { name: string; value: number | string }) => {
        _result.set(+item.value, item.name)
      }
    )
    return _result
  })

  const employeesOption = computed(() => {
    const _result = new Map()
    options.profileOptions.value?.employeesOption.forEach(
      (item: { name: string; value: number | string }) => {
        _result.set(+item.value, item.name)
      }
    )
    return _result
  })

  const profileShowData = computed(() => {
    const _result: { [key: string]: string } = {}
    const profileData:
      | {
          [key: string]: string | number
        }
      | undefined = rawOrganisationProfileData.value

    profileData &&
      Object.keys(profileData).forEach((item) => {
        switch (item) {
          case 'sector':
            _result[item] =
              sectorOptions.value.get(
                /* istanbul ignore next */ +profileData[item]
              ) || ''
            break
          case 'industry':
            _result[item] =
              industryOptions.value.get(
                /* istanbul ignore next */ +profileData[item]
              ) || ''
            break
          case 'annualTurnover':
            _result[item] =
              revenueOption.value.get(
                /* istanbul ignore next */ +profileData[item]
              ) || ''
            break
          case 'employeesNumber':
            _result[item] =
              employeesOption.value.get(
                /* istanbul ignore next */ +profileData[item]
              ) || ''
            break
          default:
            _result[item] = profileData[item]
              ? /* istanbul ignore next */ profileData[item] + ''
              : ''
            break
        }
      })
    return _result
  })
  provide(formFillDataSymbol, rawOrganisationProfileData)
  provide(profileShowDataSymbol, profileShowData)
}

export const useInjectProfileData = () => {
  return {
    formFillData: inject(formFillDataSymbol),
    profileShowData: inject(profileShowDataSymbol),
  }
}
export const useSaveProfileData: () => {
  update: (formData: any) => Promise<{}>
} = () => {
  const { currentOrganisation: orgId } = useOrganisation()
  const updateOrganisationInformation = useUpdateOrganisationInformation(
    computed(() => /* istanbul ignore next */ orgId.value + '' || '')
  )
  const updateOrganisationName = useUpdateOrganisationName(
    computed(() => /* istanbul ignore next */ orgId.value + '' || '')
  )
  const update: (formData: {
    organizationName: string
    companyName: string
    foundedYear: number
    companyDescribe: string
    sector: number
    industry: number
    annualTurnover: number
    employeesNumber: number
  }) => Promise<{}> = async (formData) => {
    const CMSData = { organizationName: formData.organizationName }
    const ASData = {
      companyName: '',
      foundedYear: formData.foundedYear,
      companyDescribe: formData.companyDescribe,
      sector: formData.sector,
      industry: formData.industry,
      annualTurnover: formData.annualTurnover,
      employeesNumber: formData.employeesNumber,
    }

    const rawOrganisationProfileData = await updateOrganisationInformation(
      ASData
    )
    await updateOrganisationName(CMSData)

    return {
      rawOrganisationProfileData,
    }
  }
  return { update }
}
