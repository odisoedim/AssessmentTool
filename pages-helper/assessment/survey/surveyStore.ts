import {
  computed,
  inject,
  InjectionKey,
  nextTick,
  provide,
  Ref,
  ref,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import { useUserinfo } from '@use/useUserinfo'
import { useOrganisation } from '@use/useOrganisation'
import { useSurveyPages } from '~/pages-helper/assessment/survey/surveyPages'
import { useCircleStrategyCheck } from '~/pages-helper/assessment/survey/circleStrategyCheck'
import { useSurveyIds } from '~/pages-helper/assessment/survey/surveyIds'
import { DateTime, ID } from '~/type/base'
import {
  CircleStrategyEndInput,
  SubStrategyInput,
  SurveyPage,
  SurveyPageType,
  DemoSurveyPage,
} from '~/pages-helper/assessment/survey/createPage'
import {
  AnswersStoreInput,
  DemoAnswersStoreInput,
} from '~/type/schema/answersStore'
import {
  useCreateStore,
  useFetchStore,
  useUpdateStore,
  useDemoCreateStore,
  useDemoFetchStore,
  useDemoUpdateStore,
} from '~/api/answersStore'
import { UseBoolean, useBoolean, useRequest } from '~/composables'
import { useComputedPages } from '~/pages-helper/assessment/survey/computedPages'
import { FrameworkElement } from '~/type/frameworkElement'
import { Assessment } from '~/type/assessment'

const surveyStoreSymbol: InjectionKey<{
  save: (frozen?: boolean, complete?: boolean) => Promise<void>
  storeId: Ref<string>
  isCompleted: UseBoolean
}> = Symbol('surveyStore')
export const provideSurveyStore = (
  element: Ref<FrameworkElement | undefined>
) => {
  const pages = useSurveyPages()
  const { computedPages, pageIndex, genPages, furthestPage, pagesLength } =
    useComputedPages()
  const { circleStrategies } = useCircleStrategyCheck()
  const { result } = useUserinfo()
  const userId = computed(() => result.value?.cmsInfo?.me.id || null)
  const userFirstName = computed(
    () => result.value?.userinfo?.firstname || null
  ).value
  const userPicture = computed(
    () => result.value?.userinfo?.picture || null
  ).value
  const { currentOrganisation: organisationId } = useOrganisation()
  const { assessmentId, surveyId } = useSurveyIds()
  const updated = ref<DateTime>('')
  const isFrozen = useBoolean()
  const isCompleted = useBoolean()
  const storeData: Ref<Record<
    string | number,
    CircleStrategyEndInput | SubStrategyInput
  > | null> = computed(() => {
    if (!computedPages.value || !computedPages.value.length) return null
    const data: Record<ID, CircleStrategyEndInput | SubStrategyInput> = {}
    ;(computedPages.value as SurveyPage[]).forEach((item) => {
      if (item.type === SurveyPageType.CircleStrategyStartPage) return
      data[item.data.id] = item.input as
        | CircleStrategyEndInput
        | SubStrategyInput
    })
    return data
  })
  const storeDataFn = (): AnswersStoreInput => {
    const _pages = computedPages.value
    const index =
      furthestPage.value >= _pages.length
        ? _pages.length - 1
        : furthestPage.value
    const current = _pages[index] || {
      data: { id: -1 },
      type: SurveyPageType.CircleStrategyStartPage,
    }
    updated.value = new Date().toJSON()
    return {
      completed: isCompleted.bool.value,
      organisation: organisationId.value + '',
      assessment: assessmentId.value,
      surveyId: surveyId.value,
      frozenBy: isFrozen.bool.value ? userId.value : null,
      data: storeData.value || {},
      progress: {
        current: {
          id: current.data.id,
          type: current.type as SurveyPageType,
        },
        userProfileInfo: {
          firstName: userFirstName,
          picture: userPicture,
        },
        circleStrategies: circleStrategies.value,
      },
      updated: updated.value,
    }
  }

  const storeId = ref('')
  const creteStore = useCreateStore()
  const fetchStore = useFetchStore()
  const updateStore = useUpdateStore()
  const router = useRouter()
  const { fetch: createStoreFetch } = useRequest(
    async () => {
      const { error, data } = await creteStore(storeDataFn())
      if (error) throw error
      return data
    },
    {
      immediate: false,
      success(res) {
        storeId.value = res?.createAnswersStore.answersStore.id + '' || ''
      },
    }
  )
  const { fetch: updateStoreFetch } = useRequest(
    async () => {
      const { data, error } = await updateStore({
        ...storeDataFn(),
        id: storeId.value,
      })
      if (error) throw error
      return data
    },
    {
      immediate: false,
      success(res) {
        storeId.value = res?.updateAnswersStore.answersStore.id + '' || ''
      },
    }
  )
  const disabledSave = useBoolean(true)

  const { fetch: getStore } = useRequest(
    async () => {
      const { data, error } = await fetchStore({
        assessment: assessmentId.value,
        surveyId: surveyId.value,
        organisation: organisationId.value || '',
      })
      if (error) throw error
      return data
    },
    {
      immediate: false,
      success(res) {
        if (res && res.answersStores) {
          if (res.answersStores.length) {
            const { id, data, progress, frozenBy, completed } =
              res.answersStores[0]
            if (frozenBy && frozenBy.id !== userId.value) {
              alert(`Frozen by ${frozenBy.username}`)
              router.back()
              return
            }
            isCompleted.set(completed)
            storeId.value = id + ''
            circleStrategies.value = progress.circleStrategies
            genPages()
            ;(pages.value as SurveyPage[]).forEach((item, _index) => {
              if (item.type === SurveyPageType.CircleStrategyStartPage) return
              if (!data[item.data.id]) return
              item.input = data[item.data.id]
            })
            if (completed || progress.current.id === -1) {
              pageIndex.value = pagesLength.value
            } else {
              pageIndex.value = (computedPages.value as SurveyPage[]).findIndex(
                (item, _index) => {
                  return (
                    +progress.current.id === +item.data.id &&
                    +progress.current.type === +item.type
                  )
                }
              )
            }
          }
        }
      },
      final() {
        nextTick(() => disabledSave.close())
      },
    }
  )
  const save = async (frozen: boolean = true, complete: boolean = false) => {
    if (disabledSave.bool.value) return
    isFrozen.set(frozen)
    !isCompleted.bool.value && isCompleted.set(complete)
    if (storeId.value) {
      await updateStoreFetch()
    } else {
      await createStoreFetch()
    }
  }
  watch(computedPages, () => {
    if (disabledSave.bool.value) return
    isCompleted.close()
  })
  watch(element, async () => {
    element && (await getStore())
  })
  watch(pageIndex, async () => {
    if (pageIndex.value >= 0) {
      await save(true)
    }
  })

  provide(surveyStoreSymbol, { save, storeId, isCompleted })
}

export const provideDemoSurveyStore = (
  elements: Ref<FrameworkElement[] | undefined>,
  assessment: Ref<Assessment | undefined>
) => {
  const pages = useSurveyPages()
  const { computedPages, pageIndex, furthestPage, pagesLength } =
    useComputedPages()
  const { result } = useUserinfo()
  const userId = computed(() => result.value?.cmsInfo?.me.id || null)
  const userFirstName = computed(
    () => result.value?.userinfo?.firstname || null
  ).value
  const userPicture = computed(
    () => result.value?.userinfo?.picture || null
  ).value
  const { currentOrganisation: organisationId } = useOrganisation()
  const { assessmentId } = useSurveyIds()
  const surveyId = computed(() => {
    return assessment.value!.framework_id
  })
  const updated = ref<DateTime>('')
  const isFrozen = useBoolean()
  const isCompleted = useBoolean()
  const storeData: Ref<Record<
    string | number,
    CircleStrategyEndInput | SubStrategyInput
  > | null> = computed(() => {
    if (!computedPages.value || !computedPages.value.length) return null
    const data: Record<ID, CircleStrategyEndInput | SubStrategyInput> = {}
    ;(computedPages.value as DemoSurveyPage[]).forEach((item) => {
      data[item.data.id] = item.input as
        | CircleStrategyEndInput
        | SubStrategyInput
    })
    return data
  })
  const storeDataFn = (): DemoAnswersStoreInput => {
    const _pages = computedPages.value
    const index =
      furthestPage.value >= _pages.length
        ? _pages.length - 1
        : furthestPage.value
    const current = _pages[index] as DemoSurveyPage
    updated.value = new Date().toJSON()
    return {
      completed: isCompleted.bool.value,
      organisation: organisationId.value + '',
      demo_assessment: assessmentId.value,
      surveyId: surveyId.value,
      frozenBy: isFrozen.bool.value ? userId.value : null,
      data: storeData.value!,
      progress: {
        current: {
          id: current.data.id,
          type: current.type,
        },
        userProfileInfo: {
          firstName: userFirstName,
          picture: userPicture,
        },
      },
      updated: updated.value,
    }
  }

  const storeId = ref('')
  const createStore = useDemoCreateStore()
  const fetchStore = useDemoFetchStore()
  const updateStore = useDemoUpdateStore()
  const router = useRouter()
  const { fetch: createStoreFetch } = useRequest(
    async () => {
      const { error, data } = await createStore(storeDataFn())
      if (error) throw error
      return data
    },
    {
      immediate: false,
      success(res) {
        storeId.value =
          res?.createDemoAnswersStore.demoAnswersStore.id + '' || ''
      },
    }
  )
  const { fetch: updateStoreFetch } = useRequest(
    async () => {
      const { data, error } = await updateStore({
        ...storeDataFn(),
        id: storeId.value,
      })
      if (error) throw error
      return data
    },
    {
      immediate: false,
      success(res) {
        storeId.value =
          res?.updateDemoAnswersStore.demoAnswersStore.id + '' || ''
      },
    }
  )

  const { fetch: getStore } = useRequest(
    async () => {
      const { data, error } = await fetchStore({
        demo_assessment: assessmentId.value,
        surveyId: surveyId.value,
        organisation: organisationId.value || '',
      })
      if (error) throw error
      return data
    },
    {
      immediate: false,
      success(res) {
        if (res && res.demoAnswersStores && res.demoAnswersStores.length) {
          const { id, data, progress, frozenBy, completed } =
            res.demoAnswersStores[0]
          if (frozenBy && frozenBy.id !== userId.value) {
            alert(`Frozen by ${frozenBy.username}`)
            router.back()
            return
          }
          isCompleted.set(completed)
          storeId.value = id + ''
          pages.value.forEach((item: any, _index: number) => {
            if (!data[item.data.id]) return
            item.input = data[item.data.id]
          })
          if (completed) {
            pageIndex.value = pagesLength.value
          } else {
            let index = 0
            computedPages.value.forEach((item: any, _index: number) => {
              if (
                +progress.current.id === +item.data.id &&
                +progress.current.type === +item.type
              ) {
                index = _index
              }
            })
            pageIndex.value = index
          }
        }
      },
    }
  )
  const save = async (frozen: boolean = true, complete: boolean = false) => {
    isFrozen.set(frozen)
    !isCompleted.bool.value && isCompleted.set(complete)
    if (storeId.value) {
      await updateStoreFetch()
    } else {
      await createStoreFetch()
    }
  }
  watch(elements, async () => {
    elements && (await getStore())
  })
  watch(pageIndex, async () => {
    if (pageIndex.value >= 0) {
      await save(true)
    }
  })

  provide(surveyStoreSymbol, { save, storeId, isCompleted })
}

export const useSurveyStore = () => inject(surveyStoreSymbol)!
