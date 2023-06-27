import { computed, onMounted, ref } from '@nuxtjs/composition-api'
import { mount } from '@vue/test-utils'
import { provideSurveyPages } from '~/pages-helper/assessment/survey/surveyPages'
import { renderFrameworkElements } from '~/test/helper/mockData'
import {
  provideCircleStrategyCheck,
  useCircleStrategyCheck,
} from '~/pages-helper/assessment/survey/circleStrategyCheck'
import {
  provideComputedPages,
  useComputedPages,
} from '~/pages-helper/assessment/survey/computedPages'
import { expectText } from '~/test/helper/expect'
import { nextTick } from '~/test/helper/nextTick'
import {
  SubStrategyPage,
  SurveyPageType,
} from '~/pages-helper/assessment/survey/createPage'
const getCaseStore = jest.fn()
jest.mock('@use/useCaseStore', () => ({
  useCaseStore: () => ({
    getCaseStore,
  }),
}))

getCaseStore.mockReturnValue(null)
const commonSetup = () => {
  const elements = renderFrameworkElements(1)
  provideSurveyPages(ref(elements))
  provideCircleStrategyCheck()
  provideComputedPages()
}
const genPages = () => {
  const { setCircleStrategies } = useCircleStrategyCheck()
  setCircleStrategies('11')
  const useComputedPagesObj = useComputedPages()
  onMounted(() => useComputedPagesObj.ready())
  return useComputedPagesObj
}
const parent = () =>
  mount({
    template: '<div></div>',
    setup() {
      commonSetup()
    },
  }).vm
describe('provide/inject computedPages', () => {
  it(`has computedPages, but it is empty at first`, () => {
    const wrap = mount(
      {
        template: '<div>{{computedPages.length}}</div>',
        setup() {
          return useComputedPages()
        },
      },
      { parent: parent() }
    )
    expectText(wrap, '0')
  })
  it(`has computedPages render after changing circleStrategies and call genPages`, async () => {
    const wrap = mount(
      {
        template:
          '<div><div id="pageName">{{computedPages.map(i=>i.data.id).join("/")}}</div> <div id="length">{{pagesLength}}</div></div>',
        setup() {
          const { computedPages, pagesLength } = genPages()
          return { computedPages, pagesLength }
        },
      },
      { parent: parent() }
    )
    await wrap.vm.$nextTick()
    expectText(wrap.find('#pageName'), '11/111/112/11')
    expectText(wrap.find('#length'), '4')
  })
  it('can plus pageIndex by call nextPage if validation is true', async () => {
    const wrap = mount(
      {
        template: '<div>{{pageIndex}}</div>',
        setup() {
          const { pageIndex, validation, nextPage } = genPages()
          onMounted(() => {
            validation.open()
            nextPage()
          })
          return { pageIndex }
        },
      },
      { parent: parent() }
    )
    await wrap.vm.$nextTick()
    expectText(wrap, '1')
  })

  it('cannot plus pageIndex by call nextPage if validation is false', async () => {
    const fn = jest.fn()
    const wrap = mount(
      {
        template: '<div>{{pageIndex}}</div>',
        setup() {
          const { pageIndex, validation, nextPage } = genPages()
          onMounted(() => {
            validation.close()
            nextPage(fn)
          })
          return { pageIndex }
        },
      },
      { parent: parent() }
    )
    await wrap.vm.$nextTick()
    expectText(wrap, '0')
    expect(fn).toBeCalledTimes(1)
  })

  describe('it has furthestPage', () => {
    it('is max of pageIndex', async () => {
      const wrap = mount(
        {
          template: '<div @click="prevPage">{{furthestPage}}</div>',
          setup() {
            const { furthestPage, nextPage, validation, prevPage } = genPages()
            onMounted(() => {
              validation.open()
              nextPage()
              nextPage()
              nextPage()
              nextPage()
            })
            return { furthestPage, prevPage }
          },
        },
        { parent: parent() }
      )
      await nextTick(wrap, 2)
      expectText(wrap, '4')
      await wrap.trigger('click')
      await wrap.trigger('click')
      await nextTick(wrap, 2)
      expectText(wrap, '4')
    })

    it('will be -1 if circleStrategies change', async () => {
      const wrap = mount(
        {
          template: '<div @click="reset">{{furthestPage}}</div>',
          setup() {
            const { furthestPage, pageIndex } = genPages()
            const { setCircleStrategies } = useCircleStrategyCheck()
            onMounted(() => {
              pageIndex.value = 5
            })
            return { furthestPage, reset: () => setCircleStrategies('12') }
          },
        },
        { parent: parent() }
      )
      await nextTick(wrap, 2)
      expectText(wrap, '5')
      await wrap.trigger('click')
      await nextTick(wrap, 2)
      expectText(wrap, '-1')
    })
  })

  it('will make window scrollTo (0,0) when pageIndex change', async () => {
    process.client = true
    const scrollTo = jest.fn()
    Object.assign(window, { scrollTo })
    const wrap = mount(
      {
        template: '<div></div>',
        setup() {
          const { pageIndex } = genPages()
          onMounted(() => {
            pageIndex.value = 1
          })
        },
      },
      { parent: parent() }
    )
    await wrap.vm.$nextTick()
    expect(scrollTo).toBeCalledTimes(1)
  })
  it('will fetch cases when pageIndex change to page type eq `SurveyPageType.SubStrategyPage`', async () => {
    getCaseStore.mockReturnValueOnce([{ id: 1 }, { id: 2 }])
    const wrap = mount(
      {
        template: `<div @click='changePage'>
        <div id='cases' v-show='caseLoading'>{{cases.map(i=>i.id).join('/')}}</div>
        </div>`,
        setup() {
          const { pageIndex, computedPages } = genPages()
          const page = computed(() => computedPages.value[pageIndex.value])
          const data = computed(() => {
            if (
              page.value &&
              page.value.type === SurveyPageType.SubStrategyPage
            ) {
              return (page.value as SubStrategyPage).data
            }
          })
          const cases = computed(() => data.value?.case || [])
          const caseLoading = computed(() => data.value?.caseLoading)
          return {
            cases,
            caseLoading,
            changePage() {
              pageIndex.value = 2
            },
          }
        },
      },
      { parent: parent() }
    )
    await wrap.vm.$nextTick()
    const cases = wrap.find('#cases')
    expectText(wrap, '')
    expect(cases.isVisible()).toBeFalsy()
    await wrap.trigger('click')
    expect(cases.isVisible()).toBeTruthy()
    await wrap.vm.$nextTick()
    expectText(wrap, '1/2')
  })
})
