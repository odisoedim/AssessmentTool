import { computed, onMounted, ref, Ref } from '@nuxtjs/composition-api'
import { createLocalVue, mount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import { renderFrameworkElements } from '~/test/helper/mockData'
import { provideSurveyPages } from '~/pages-helper/assessment/survey/surveyPages'
import {
  provideCircleStrategyCheck,
  useCircleStrategyCheck,
} from '~/pages-helper/assessment/survey/circleStrategyCheck'
import {
  provideComputedPages,
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
  provideSurveyStore,
  useSurveyStore,
} from '~/pages-helper/assessment/survey/surveyStore'
import {
  CircleStrategyEndPage,
  SubStrategyPage,
  SurveyPageType,
  SurveyPage,
} from '~/pages-helper/assessment/survey/createPage'
import { expectText } from '~/test/helper/expect'
import { nextTick } from '~/test/helper/nextTick'
import { AnswersStore } from '~/type/schema/answersStore'

const getCaseStore = jest.fn()
jest.mock('@use/useCaseStore', () => ({
  useCaseStore: () => ({
    getCaseStore,
  }),
}))
const useUserinfo = useUserinfoMock()
jest.mock('@use/useUserinfo', () => ({
  useUserinfo: () => useUserinfo.mock(),
}))
useUserinfo.mockResult(true)
const useSurveyIds = useSurveyIdsMock()
jest.mock('~/pages-helper/assessment/survey/surveyIds', () => ({
  useSurveyIds: () => useSurveyIds.mock(),
}))
useSurveyIds.mockValue('3', '2')
const useCreateStore = useCommonGraphqlMock()
const useFetchStore = useCommonGraphqlMock()
const useUpdateStore = useCommonGraphqlMock()
const answersStore = (id: ID) => ({
  answersStore: {
    id,
  },
})
const createStoreReturn = (id: ID) => ({
  createAnswersStore: answersStore(id),
})
const updateStoreReturn = (id: ID) => ({
  updateAnswersStore: answersStore(id),
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
  useFetchStore: () => useFetchStore.mock(),
  useUpdateStore: () => useUpdateStore.mock(),
  useCreateStore: () => useCreateStore.mock(),
}))

const alert = jest.fn()
const console = { log: jest.fn(), error: jest.fn() }
Object.assign(window, { alert, console })

const commonSetup = () => {
  const elements = renderFrameworkElements(3)
  const refElement = ref()
  provideSurveyPages(refElement)
  provideCircleStrategyCheck()
  provideComputedPages()
  provideSurveyStore(refElement)
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
  answersStores: [
    {
      id: '24',
      progress: {
        current: {
          id: '32',
          type: 2,
        },
        circleStrategies: ['31', '32'],
      },
      completed: false,
      frozenBy: null,
      data: {
        ...createCircleStore(31),
        ...createCircleStore(32),
        ...createSubStore(311, '1'),
        ...createSubStore(312, '2'),
        ...createSubStore(321, '3'),
        ...createSubStore(322, '4'),
        ...createSubStore(323, '5'),
      },
    },
  ] as AnswersStore[],
}
const useOrganisation = useOrganisationMock()
jest.mock('@use/useOrganisation', () => ({
  useOrganisation: () => useOrganisation.mock(),
}))
useOrganisation.currentOrganisation.mockReturnValue(ref('1'))
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
    useUpdateStore.mockSuccess(updateStoreReturn(1))
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
            (computedPages as Ref<SurveyPage[]>).value
              .filter((i) => i.type === SurveyPageType.SubStrategyPage)
              .map((page) => (page as SubStrategyPage).input)
          )
          const circleAnswers = computed(() =>
            (computedPages as Ref<SurveyPage[]>).value
              .filter((i) => i.type === SurveyPageType.CircleStrategyEndPage)
              .map((page) => (page as CircleStrategyEndPage).input)
          )
          return { subAnswers, circleAnswers }
        },
      },
      { parent: parent() }
    )
    await nextTick(wrap, 3)
    expectText(wrap.find('#subOptions'), '1/2/3/4/5')
  })
  describe('resume the survey progress if will fetch store success', () => {
    it('resume the survey progress if will fetch store success and not completed', async () => {
      useFetchStore.mockSuccess(store)
      useUpdateStore.mockSuccess(updateStoreReturn(1))
      const wrap = mount(
        {
          template: `
          <div>
          <span id='pageIndex'>{{ pageIndex }}</span>
          <span id='furthestPage'>{{ furthestPage }}</span>
          <span id='circleStrategies'>{{ circleStrategies.join('/') }}</span>
          </div>`,
          setup() {
            useSurveyStore()
            const { pageIndex, furthestPage } = useComputedPages()
            const { circleStrategies } = useCircleStrategyCheck()
            return { pageIndex, furthestPage, circleStrategies }
          },
        },
        { parent: parent() }
      )
      await nextTick(wrap, 3)
      expectText(wrap.find('#pageIndex'), '8')
      await nextTick(wrap)
      expectText(wrap.find('#furthestPage'), '8')
      expectText(wrap.find('#circleStrategies'), '31/32')
    })

    it('resume the survey progress and jump to submit page if will fetch store success and completed', async () => {
      const _store = JSON.parse(JSON.stringify(store))
      _store.answersStores[0].completed = true
      useFetchStore.mockSuccess(_store)
      useUpdateStore.mockSuccess(updateStoreReturn(1))
      const wrap = mount(
        {
          template: `
          <div>
          <span id='pageIndex'>{{ pageIndex }}</span>
          <span id='furthestPage'>{{ furthestPage }}</span>
          <span id='circleStrategies'>{{ circleStrategies.join('/') }}</span>
          </div>`,
          setup() {
            useSurveyStore()
            const { pageIndex, furthestPage } = useComputedPages()
            const { circleStrategies } = useCircleStrategyCheck()
            return { pageIndex, furthestPage, circleStrategies }
          },
        },
        { parent: parent() }
      )
      await nextTick(wrap, 3)
      expectText(wrap.find('#pageIndex'), '9')
      await nextTick(wrap)
      expectText(wrap.find('#furthestPage'), '9')
      expectText(wrap.find('#circleStrategies'), '31/32')
    })
  })

  describe('will save data when page change', () => {
    it('will create a new data if saved first time', async () => {
      jest.clearAllMocks()
      useFetchStore.mockFail()
      useCreateStore.mockSuccess(createStoreReturn(100))
      const wrap = mount(
        {
          template: `<div @click='ready'>{{ storeId }}</div>`,
          setup() {
            const { storeId } = useSurveyStore()
            const { ready } = useComputedPages()
            const { setCircleStrategies } = useCircleStrategyCheck()
            onMounted(() => {
              setCircleStrategies('31')
              setCircleStrategies('32')
            })
            return { storeId, ready }
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
    _store.answersStores[0].frozenBy = {
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
