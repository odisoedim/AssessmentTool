import {
  computed,
  inject,
  InjectionKey,
  onMounted,
  provide,
  Ref,
  ref,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'

// hooks + utils
import { useUserinfo } from '@use/useUserinfo'
import { useCookies } from '@use/useCookie'
import { useRequest } from '@use/useRequest'
import { useBoolean } from '@use/useBoolean'
import { ONBOARDING_PROFILE, ORG_KEY } from '~/util/static'
import { useFetchOrganisationInformation } from '~/api/organisation'
// types
import { ID } from '~/type/base'
import { OrganizationFromAccountSystem } from '~/type/auth'
import { LINK_ORG_PROFILE } from '~/constants/route'
interface OrganisationProfile {
  organizationId: ID
  organizationName: string
  companyName: string | null
  foundedYear: number | null
  companyDescribe: string | null
  sector: number | null
  industry: number | null
  annualTurnover: number | null
  employeesNumber: number | null
}
interface GetOrganisationStatus {
  completed: boolean
  score: number
  progress: number
}
export const organisationSymbol: InjectionKey<{
  getOrganisation: Ref<OrganizationFromAccountSystem | undefined>
  setOrganisation: (org?: ID) => void
  organisations: Ref<OrganizationFromAccountSystem[]>
  currentOrganisation: Ref<ID | undefined>
  showProfileOnboarding: Ref<boolean>
  showAssessmentsOnboarding: Ref<boolean>
  finishOnboarding: (type: 'profile' | 'assessments') => void
  getOrganisationStatus: (assessments: Array<any>) => GetOrganisationStatus
}> = Symbol('organisation')
const SHOW_BEFORE = 'show_before'

export const provideOrganisation = () => {
  const router = useRouter()
  const cookies = useCookies()
  const { result } = useUserinfo()
  const organisations = computed(
    () => /* istanbul ignore next */ result.value?.userinfo.organizations || []
  )

  const currentOrganisation = ref<ID>()
  onMounted(() => {
    if (result.value && !organisations.value.length) {
      router.push(LINK_ORG_PROFILE)
    }
  })

  let progressAverage: number
  let scoreAverage: number

  /**
  |--------------------------------------------------
  | calc and get organisation progress, score and status
  |--------------------------------------------------
  */
  const getOrganisationStatus = (assessmentsList: any) => {
    const mapKeys = (ikey: string) =>
      assessmentsList.map((element: any) => element[ikey])

    const handleSumArray = (dataList: any) =>
      computed(() =>
        dataList.reduce((previous: any, next: any) => previous + next, 0)
      ).value

    const progress = computed(() => mapKeys('progress'))

    const isProgressCompleted = computed(() => {
      return progress?.value.every((value: any) => value === 100)
    }).value

    const score = computed(() => mapKeys('score'))

    const sumScores = handleSumArray(score?.value)

    const sumProgress = handleSumArray(progress?.value)

    scoreAverage = Math.round(sumScores / score.value.length)
    progressAverage = Math.round(sumProgress / progress.value.length)

    return computed(() => {
      return {
        completed: isProgressCompleted,
        progress: progressAverage,
        score: scoreAverage,
      }
    }).value
  }
  const setOrganisation = (org?: ID) => {
    if (org === currentOrganisation.value) return
    if (org) {
      currentOrganisation.value = org
      cookies.set(ORG_KEY, org)
    } else {
      currentOrganisation.value = undefined
      cookies.remove(ORG_KEY)
    }
  }
  const getOrganisation = computed(() =>
    organisations.value.find(
      (i) => i.organizationId === currentOrganisation.value
    )
  )

  watch(
    organisations,
    () => {
      if (organisations.value && organisations.value.length) {
        const store = cookies.get(ORG_KEY)

        setOrganisation(store || organisations.value[0].organizationId)
      } else {
        setOrganisation()
      }
    },
    { immediate: true }
  )
  const showProfileOnboarding = useBoolean(false)
  const showAssessmentsOnboarding = useBoolean(false)

  const finishOnboarding = (type: 'profile' | 'assessments') => {
    const key = `${ONBOARDING_PROFILE}_${currentOrganisation.value}_${type}`
    localStorage.setItem(key, SHOW_BEFORE)
    switch (type) {
      case 'assessments':
        showAssessmentsOnboarding.close()
        break
      case 'profile':
        showProfileOnboarding.close()
        break
    }
  }

  const fetchOrganisationProfile = useFetchOrganisationInformation(
    computed(() => currentOrganisation.value + '' || '')
  )

  const { fetch } = useRequest(() => fetchOrganisationProfile(), {
    immediate: false,
    success(res) {
      const fields: (keyof OrganisationProfile)[] = [
        'foundedYear',
        'companyDescribe',
        'sector',
        'industry',
        'annualTurnover',
        'employeesNumber',
      ]
      const isComplete = fields.reduce(
        (pre, field) => res[field] !== null && pre,
        true as boolean
      )

      const key = `${ONBOARDING_PROFILE}_${currentOrganisation.value}`
      if (isComplete) {
        const _showAssessmentsOnboarding = localStorage.getItem(
          key + '_assessments'
        )
        if (_showAssessmentsOnboarding === SHOW_BEFORE) return
        showAssessmentsOnboarding.open()
        router.push('/assessment')
      } else {
        const _showProfileOnboarding = localStorage.getItem(key + '_profile')
        if (_showProfileOnboarding === SHOW_BEFORE) return
        showProfileOnboarding.open()
        router.push(LINK_ORG_PROFILE)
      }
    },
  })

  onMounted(() => currentOrganisation.value && fetch())
  provide(organisationSymbol, {
    getOrganisation,
    setOrganisation,
    organisations,
    currentOrganisation,
    showAssessmentsOnboarding: showAssessmentsOnboarding.bool,
    showProfileOnboarding: showProfileOnboarding.bool,
    finishOnboarding,
    getOrganisationStatus,
  })
}

export const useOrganisation = () => inject(organisationSymbol)!
