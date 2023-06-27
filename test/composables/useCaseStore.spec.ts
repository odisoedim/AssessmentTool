import { mount } from '@vue/test-utils'
import { useCaseStore } from '@use/useCaseStore'
import { ref } from '@nuxtjs/composition-api'
import { useCommonGraphqlMock } from '~/test/helper/mockApi'
import { CaseBySort } from '~/type/caseBySort'
import { renderArticle } from '~/test/helper/mockData'
import { Article } from '~/type/article'
import { expectText } from '~/test/helper/expect'
import { nextTick } from '~/test/helper/nextTick'

jest.mock('~/pages-helper/assessment/survey/caseFetchBody', () => ({
  useCaseFetchBody: () => ({
    value: {
      curator: true,
      sort: 0,
      framework: 9,
    },
  }),
}))
const useFetchArticles = useCommonGraphqlMock()
const useFetchArticlesFromES = jest.fn()
const renderArticlesFromEs = (ids: number[]): CaseBySort => ({
  hits: {
    hits: ids.map((id) => ({ _source: { id } })),
  },
})
jest.mock('~/api/article', () => ({
  useFetchArticles: () => useFetchArticles.mock(),
  useFetchArticlesFromES: () => (data: any) => useFetchArticlesFromES(data),
}))

describe('useCaseStore', () => {
  it('can work', () => {
    const wrap = mount({
      template: '<div></div>',
      setup() {
        useCaseStore()
      },
    })
    expect(wrap).toBeTruthy()
  })
  it('use getCaseStore to get study case', async () => {
    useFetchArticlesFromES.mockReturnValue(
      renderArticlesFromEs([1012, 2012, 3012])
    )
    useFetchArticles.mockSuccess({
      articles: renderArticle([1012, 2012, 3012]),
    })
    const wrap = mount({
      template: `<div @click="click">
      {{articles.map(i=>i.id).join('/')}}
      </div>`,
      setup() {
        const { getCaseStore } = useCaseStore()
        const articles = ref<Article[]>([])
        return {
          articles,
          click: async () => {
            articles.value = (await getCaseStore(12)) || []
          },
        }
      },
    })
    await wrap.trigger('click')
    expectText(wrap, '')
    expect(useFetchArticlesFromES).toBeCalledTimes(1)
    expect(useFetchArticles.result).toBeCalledTimes(1)
    await nextTick(wrap, 3)
    expectText(wrap, '1012/2012/3012')
  })
  it('use store to getCaseStore ', async () => {
    jest.clearAllMocks()
    useFetchArticlesFromES.mockReturnValueOnce(
      renderArticlesFromEs([1012, 2012, 3012])
    )
    useFetchArticles.result.mockReturnValueOnce({
      data: {
        articles: renderArticle([1012, 2012, 3012]),
      },
    })
    useFetchArticlesFromES.mockReturnValueOnce(
      renderArticlesFromEs([1023, 2023, 3023])
    )
    useFetchArticles.result.mockReturnValueOnce({
      data: {
        articles: renderArticle([1023, 2023, 3023]),
      },
    })
    const wrap = mount({
      template: `<div >
        <button id='i12' @click="click(12)"></button>
        <button id='i23' @click="click(23)"></button>
      </div>`,
      setup() {
        const { getCaseStore } = useCaseStore()
        return {
          click: async (id: number) => await getCaseStore(id),
        }
      },
    })
    await wrap.find('#i12').trigger('click')
    await nextTick(wrap, 1)
    expect(useFetchArticlesFromES).toBeCalledTimes(1)
    expect(useFetchArticles.result).toBeCalledTimes(1)
    await wrap.find('#i23').trigger('click')
    await nextTick(wrap, 1)
    expect(useFetchArticlesFromES).toBeCalledTimes(2)
    expect(useFetchArticles.result).toBeCalledTimes(2)
    await wrap.find('#i12').trigger('click')
    await nextTick(wrap, 1)
    expect(useFetchArticlesFromES).toBeCalledTimes(2)
    expect(useFetchArticles.result).toBeCalledTimes(2)
  })
  it('filter article make sure it will not show the same article', async () => {
    jest.clearAllMocks()
    useFetchArticlesFromES.mockReturnValueOnce(
      renderArticlesFromEs([1012, 2012, 3012])
    )
    useFetchArticlesFromES.mockReturnValueOnce(
      renderArticlesFromEs([1012, 2012, 1023, 2023, 3023])
    )
    useFetchArticles.mockSuccess({
      articles: renderArticle([]),
    })
    const wrap = mount({
      template: `
        <div>
        <button id='i12' @click='click(12)'></button>
        <button id='i23' @click='click(23)'></button>
        </div>`,
      setup() {
        const { getCaseStore } = useCaseStore()
        return {
          click: async (id: number) => await getCaseStore(id),
        }
      },
    })
    await wrap.find('#i12').trigger('click')
    await nextTick(wrap, 1)
    expect(useFetchArticles.result).lastCalledWith({
      ids: ['1012', '2012', '3012'],
    })
    await wrap.find('#i23').trigger('click')
    await nextTick(wrap, 1)
    expect(useFetchArticles.result).lastCalledWith({
      ids: ['1023', '2023', '3023'],
    })
  })
  it('sort article if it has been shown before', async () => {
    jest.clearAllMocks()
    useFetchArticlesFromES.mockReturnValueOnce(renderArticlesFromEs([1, 2, 3]))
    useFetchArticlesFromES.mockReturnValueOnce(
      renderArticlesFromEs([2, 3, 4, 5])
    )
    useFetchArticlesFromES.mockReturnValueOnce(renderArticlesFromEs([4, 5]))
    useFetchArticles.mockSuccess({
      articles: renderArticle([]),
    })
    const wrap = mount({
      template: `
        <div>
        <button id='i12' @click='click(12)'></button>
        <button id='i23' @click='click(23)'></button>
        <button id='i34' @click='click(34)'></button>
        </div>`,
      setup() {
        const { getCaseStore } = useCaseStore()
        return {
          click: async (id: number) => await getCaseStore(id),
        }
      },
    })
    await wrap.find('#i12').trigger('click')
    await nextTick(wrap, 1)
    expect(useFetchArticles.result).lastCalledWith({
      ids: ['1', '2', '3'],
    })
    await wrap.find('#i23').trigger('click')
    await nextTick(wrap, 1)
    expect(useFetchArticles.result).lastCalledWith({
      ids: ['4', '5', '2'],
    })
    await wrap.find('#i34').trigger('click')
    expect(useFetchArticles.result).lastCalledWith({
      ids: ['4', '5'],
    })
  })
})
