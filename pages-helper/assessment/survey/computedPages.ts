import {
  computed,
  inject,
  InjectionKey,
  provide,
  ref,
  Ref,
  watch,
} from '@nuxtjs/composition-api'
import { usePage } from '@use/usePage'
import { useCaseStore } from '@use/useCaseStore'
import {
  SubStrategyPage,
  SurveyPage,
  SurveyPageType,
  DemoSubStrategyPage,
  DemoSurveyPage,
  DemoSurveyPageType,
} from '~/pages-helper/assessment/survey/createPage'
import { useBoolean, UseBoolean } from '~/composables'
import { useSurveyPages } from '~/pages-helper/assessment/survey/surveyPages'
import { useCircleStrategyCheck } from '~/pages-helper/assessment/survey/circleStrategyCheck'

export const computedPagesSymbol: InjectionKey<{
  computedPages: Ref<SurveyPage[] | DemoSurveyPage[]>
  nextPage: (onFail?: CallableFunction) => void
  prevPage: () => number | false
  ready: () => void
  genPages: () => void
  pageIndex: Ref<number>
  furthestPage: Ref<number>
  pagesLength: Ref<number>
  validation: UseBoolean
}> = Symbol('computedPages')
export const provideComputedPages = () => {
  const computedPages = ref<SurveyPage[]>([])
  const pagesLength = computed(() => computedPages.value.length)
  const pages = useSurveyPages() as Ref<SurveyPage[]>
  const { circleStrategies } = useCircleStrategyCheck()
  const validation = useBoolean()
  const {
    pageIndex,
    nextPage: _nextPage,
    prevPage,
    clear,
  } = usePage(-1, pagesLength, -1)
  const furthestPage = ref(-1)
  const { getCaseStore } = useCaseStore()

  const nextPage = (onFail?: CallableFunction) => {
    if (validation.bool.value) {
      _nextPage()
    } else {
      onFail && onFail()
    }
  }
  watch(circleStrategies, () => {
    furthestPage.value = -1
  })
  watch(pageIndex, () => {
    if (pageIndex.value > furthestPage.value) {
      furthestPage.value = pageIndex.value
    }
  })

  watch(pageIndex, () => process.client && window.scrollTo(0, 0))

  watch(pageIndex, async () => {
    const page = computedPages.value[pageIndex.value]
    if (page && page.type === SurveyPageType.SubStrategyPage) {
      const _page = page as SubStrategyPage
      const cases = await getCaseStore(_page.data.id)
      _page.data.case = cases || []
      _page.data.caseLoading = false
    }
  })

  const genPages = () => {
    computedPages.value = pages.value.filter(({ group }) =>
      circleStrategies.value.includes(group.id + '')
    )
  }
  const ready = () => {
    genPages()
    clear()
  }
  provide(computedPagesSymbol, {
    computedPages,
    nextPage,
    prevPage,
    ready,
    genPages,
    pageIndex,
    pagesLength,
    furthestPage,
    validation,
  })
}
export const provideDemoComputedPages = () => {
  const computedPages = useSurveyPages() as Ref<DemoSurveyPage[]>
  const pagesLength = computed(() => computedPages.value.length)
  const validation = useBoolean()
  const {
    pageIndex,
    nextPage: _nextPage,
    clear,
    prevPage,
  } = usePage(-1, pagesLength, -1)
  const furthestPage = ref(-1)
  const { getCaseStore } = useCaseStore()

  const nextPage = (fail?: CallableFunction) => {
    if (validation.bool.value) {
      _nextPage()
      return
    }
    fail && fail()
  }
  watch(pageIndex, () => {
    if (pageIndex.value > furthestPage.value) {
      furthestPage.value = pageIndex.value
    }
  })
  watch(pageIndex, async () => {
    const page = computedPages.value[pageIndex.value]
    if (page && page.type === DemoSurveyPageType.SubStrategyPage) {
      const _page = page as DemoSubStrategyPage
      const cases = await getCaseStore(_page.data.id)
      _page.data.case = cases || []
      _page.data.caseLoading = false
    }
  })

  watch(pageIndex, () => process.client && window.scrollTo(0, 0))

  provide(computedPagesSymbol, {
    computedPages,
    nextPage,
    prevPage,
    ready: () => {
      return ''
    },
    genPages: () => {
      clear()
    },
    pageIndex,
    pagesLength,
    furthestPage,
    validation,
  })
}
export const useComputedPages = () => inject(computedPagesSymbol)!
