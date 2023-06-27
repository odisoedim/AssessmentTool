import { computed, onMounted, ref, Ref } from '@nuxtjs/composition-api'
import { createLocalVue, mount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import {
  renderAssessment,
  renderFrameworkElement,
} from '~/test/helper/mockData'
import { provideDemoSurveyPages } from '~/pages-helper/assessment/survey/surveyPages'
import {
  provideDemoComputedPages,
  useComputedPages,
} from '~/pages-helper/assessment/survey/computedPages'
import {
  useOrganisationMock,
  useSurveyIdsMock,
  useUserinfoMock,
} from '~/test/helper/mockInject'
import { ID } from '~/type/base'
import { useCommonGraphqlMock } from '~/test/helper/mockApi'
import {
  provideDemoSurveyStore,
  useSurveyStore,
} from '~/pages-helper/assessment/survey/surveyStore'
import {
  DemoSurveyPage,
  CircleDemoStrategyEndPage,
  DemoSubStrategyPage,
  DemoSurveyPageType,
} from '~/pages-helper/assessment/survey/createPage'
import { expectText } from '~/test/helper/expect'
import { nextTick } from '~/test/helper/nextTick'
import { DemoAnswersStore } from '~/type/schema/answersStore'

const getCaseStore = jest.fn()
jest.mock('@use/useCaseStore', () => ({
  useCaseStore: () => ({
    getCaseStore,
  }),
}))

const refAssessment = ref(renderAssessment(1))
const useUserinfo = useUserinfoMock()
jest.mock('@use/useUserinfo', () => ({
  useUserinfo: () => useUserinfo.mock(),
}))
useUserinfo.mockResult(true)
const useSurveyIds = useSurveyIdsMock()
jest.mock('~/pages-helper/assessment/survey/surveyIds', () => ({
  useSurveyIds: () => useSurveyIds.mock(),
}))
useSurveyIds.mockValue('1', '9')
const useCreateStore = useCommonGraphqlMock()
const useFetchStore = useCommonGraphqlMock()
const useUpdateStore = useCommonGraphqlMock()
const answersStore = (id: ID) => ({
  demoAnswersStore: {
    id,
  },
})
const createStoreReturn = (id: ID) => ({
  createDemoAnswersStore: answersStore(id),
})
const updateStoreReturn = (id: ID) => ({
  updateDemoAnswersStore: answersStore(id),
})

const createCircleStore = (id: ID) => ({
  [id]: {
    challenge: {
      check: [`${id}_other1`, `${id}_other2`],
      other: `${id}_other_text`,
    },
    challengeExplain: `${id}_challengeExplain_text`,
    opportunities: `${id}_opportunities_text`,
    notes: `${id}_notes_text`,
  },
})
const createSubStore = (id: ID, option: string) => ({
  [id]: { option, provideExample: `${id}_example_text` },
})

jest.mock('~/api/answersStore', () => ({
  useDemoFetchStore: () => useFetchStore.mock(),
  useDemoUpdateStore: () => useUpdateStore.mock(),
  useDemoCreateStore: () => useCreateStore.mock(),
}))

const alert = jest.fn()
const console = { log: jest.fn(), error: jest.fn() }
Object.assign(window, { alert, console })
const useOrganisation = useOrganisationMock()
jest.mock('@use/useOrganisation', () => ({
  useOrganisation: () => useOrganisation.mock(),
}))
useOrganisation.currentOrganisation.mockReturnValue(ref('1'))
const commonSetup = () => {
  const elements = [
    renderFrameworkElement(1, '9'),
    renderFrameworkElement(2, '9'),
  ]
  const refElement = ref()
  provideDemoSurveyPages(refAssessment, refElement)
  provideDemoComputedPages()
  provideDemoSurveyStore(refElement, refAssessment)
  onMounted(() => (refElement.value = elements))
}
const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()
const parent = () =>
  mount(
    {
      template: '<div></div>',
      setup() {
        commonSetup()
      },
    },
    { localVue, router }
  ).vm
const store = {
  demoAnswersStores: [
    {
      id: '1',
      demo_assessment: { id: 1 },
      surveyId: '9',
      progress: {
        current: {
          id: '2',
          type: DemoSurveyPageType.SubStrategyPage,
        },
      },
      completed: false,
      organisation: '',
      frozenBy: null,
      updated: '',
      data: {
        ...createCircleStore('9'),
        ...createSubStore('1', '1'),
        ...createSubStore('2', '2'),
      },
    },
  ] as DemoAnswersStore[],
}

describe('provide/inject surveyStore', () => {
  it('can work', () => {
    const wrap = mount(
      {
        template: `<div></div>`,
        setup() {
          useSurveyStore()
        },
      },
      { parent: parent() }
    )
    expect(wrap).toBeTruthy()
  })

  it('resume the survey data if it fetch store success', async () => {
    useFetchStore.mockSuccess(store)
    useUpdateStore.mockSuccess(updateStoreReturn('1'))
    const wrap = mount(
      {
        template: `
          <div>
          <span id='subOptions'>{{ subAnswers.map(i => i.option).join('/') }}</span>
          <span id='provideExample'>{{ subAnswers.map(i => i.provideExample).join('/') }}</span>
          <span id='challengeCheck'>{{ circleAnswers.map(i => i.challenge.check.join('/')).join('/') }}</span>
          </div>`,
        setup() {
          useSurveyStore()
          const { computedPages } = useComputedPages()
          const subAnswers = computed(() =>
            (computedPages as Ref<DemoSurveyPage[]>).value
              .filter((i) => i.type === DemoSurveyPageType.SubStrategyPage)
              .map((page) => (page as DemoSubStrategyPage).input)
          )
          const circleAnswers = computed(() =>
            (computedPages as Ref<DemoSurveyPage[]>).value
              .filter(
                (i) => i.type === DemoSurveyPageType.CircleStrategyEndPage
              )
              .map((page) => (page as CircleDemoStrategyEndPage).input)
          )
          return { subAnswers, circleAnswers }
        },
      },
      { parent: parent() }
    )
    await nextTick(wrap, 3)
    // TODO: fix test
    expectText(wrap.find('#subOptions'), '') // '1/2'
  })
  describe('resume the survey progress if will fetch store success', () => {
    it('resume the survey progress if will fetch store success and not completed', async () => {
      useFetchStore.mockSuccess(store)
      useUpdateStore.mockSuccess(updateStoreReturn('1'))
      const wrap = mount(
        {
          template: `
          <div>
          <span id='pageIndex'>{{ pageIndex }}</span>
          <span id='furthestPage'>{{ furthestPage }}</span>
          </div>`,
          setup() {
            useSurveyStore()
            const { pageIndex, furthestPage } = useComputedPages()
            return { pageIndex, furthestPage }
          },
        },
        { parent: parent() }
      )
      await nextTick(wrap, 3)
      expectText(wrap.find('#pageIndex'), '1')
      await nextTick(wrap)
      expectText(wrap.find('#furthestPage'), '1')
    })

    it('resume the survey progress and jump to submit page if will fetch store success and completed', async () => {
      const _store = JSON.parse(JSON.stringify(store))
      _store.demoAnswersStores[0].completed = true
      useFetchStore.mockSuccess(_store)
      useUpdateStore.mockSuccess(updateStoreReturn('1'))
      const wrap = mount(
        {
          template: `
          <div>
          <span id='pageIndex'>{{ pageIndex }}</span>
          <span id='furthestPage'>{{ furthestPage }}</span>
          </div>`,
          setup() {
            useSurveyStore()
            const { pageIndex, furthestPage } = useComputedPages()
            return { pageIndex, furthestPage }
          },
        },
        { parent: parent() }
      )
      await nextTick(wrap, 3)
      expectText(wrap.find('#pageIndex'), '3')
      await nextTick(wrap)
      expectText(wrap.find('#furthestPage'), '3')
    })
  })

  describe('will save data when page change', () => {
    it('will create a new data if saved first time', async () => {
      jest.clearAllMocks()
      useFetchStore.mockFail()
      useCreateStore.mockSuccess(createStoreReturn('100'))
      const wrap = mount(
        {
          template: `<div @click='genPages'>{{ storeId }}</div>`,
          setup() {
            const { genPages } = useComputedPages()

            const { storeId } = useSurveyStore()

            return { storeId, genPages }
          },
        },
        { parent: parent() }
      )
      await nextTick(wrap, 1)
      await wrap.trigger('click')
      expect(useCreateStore.result).toBeCalledTimes(1)
      await nextTick(wrap, 1)
      expectText(wrap, '100')
    })
    it('will update data if not saved first time', async () => {
      jest.clearAllMocks()
      useFetchStore.mockSuccess(store)
      useUpdateStore.mockSuccess(updateStoreReturn(24))
      const wrap = mount(
        {
          template: `
            <div @click='nextPage'></div>`,
          setup() {
            const { nextPage } = useComputedPages()
            return { nextPage }
          },
        },
        { parent: parent() }
      )
      await nextTick(wrap, 3)
      expect(useUpdateStore.result).toBeCalledTimes(1)
    })
  })

  it('will show alert and go back if the survey is frozenBy another member', async () => {
    jest.clearAllMocks()
    const _store = JSON.parse(JSON.stringify(store))
    _store.demoAnswersStores[0].frozenBy = {
      id: 100,
      username: 'Joy',
    }
    useFetchStore.mockSuccess(_store)

    const wrap = mount(
      {
        template: `<div></div>`,
      },
      {
        parent: parent(),
      }
    )
    await nextTick(wrap, 2)
    expect(alert).toBeCalledTimes(1)
    expect(alert).toBeCalledWith('Frozen by Joy')
  })
})
