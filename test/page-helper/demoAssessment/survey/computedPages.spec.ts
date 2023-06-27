import { computed, onMounted, ref } from '@nuxtjs/composition-api'
import { mount } from '@vue/test-utils'
import { provideDemoSurveyPages } from '~/pages-helper/assessment/survey/surveyPages'
import {
  renderAssessment,
  renderFrameworkElements,
} from '~/test/helper/mockData'
import {
  provideDemoComputedPages,
  useComputedPages,
} from '~/pages-helper/assessment/survey/computedPages'
import { expectText } from '~/test/helper/expect'
import { nextTick } from '~/test/helper/nextTick'
import {
  DemoSubStrategyPage,
  DemoSurveyPageType,
} from '~/pages-helper/assessment/survey/createPage'
const getCaseStore = jest.fn()
jest.mock('@use/useCaseStore', () => ({
  useCaseStore: () => ({
    getCaseStore,
  }),
}))
const genPages = () => {
  const useComputedPagesObj = useComputedPages()
  return useComputedPagesObj
}
getCaseStore.mockReturnValue(null)
const commonSetup = () => {
  const elements = [renderFrameworkElements(1)]
  provideDemoSurveyPages(ref(renderAssessment(1)), ref(elements))
  provideDemoComputedPages()
}
const parent = () =>
  mount({
    template: '<div></div>',
    setup() {
      commonSetup()
    },
  }).vm
describe('provide/inject computedPages', () => {
  it(`has computedPages at first`, () => {
    const wrap = mount(
      {
        template: '<div>{{computedPages.length}}</div>',
        setup() {
          return useComputedPages()
        },
      },
      { parent: parent() }
    )
    expectText(wrap, '2')
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
    expectText(wrap, '0')
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
    expectText(wrap, '-1')
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
            })
            return { furthestPage, prevPage }
          },
        },
        { parent: parent() }
      )
      await nextTick(wrap, 2)
      expectText(wrap, '2')
      await wrap.trigger('click')
      await wrap.trigger('click')
      await nextTick(wrap, 2)
      expectText(wrap, '2')
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
            pageIndex.value = 0
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
              page.value.type === DemoSurveyPageType.SubStrategyPage
            ) {
              return (page.value as DemoSubStrategyPage).data
            }
          })
          const cases = computed(() => data.value?.case || [])
          const caseLoading = computed(() => data.value?.caseLoading)
          return {
            cases,
            caseLoading,
            changePage() {
              pageIndex.value = 0
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
