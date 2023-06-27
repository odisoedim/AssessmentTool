import { computed, ref } from '@nuxtjs/composition-api'
import { useRequest } from '@use/useRequest'
import { Article } from '~/type/article'
import {
  CaseBody,
  useFetchArticles,
  useFetchArticlesFromES,
} from '~/api/article'
import { ID } from '~/type/base'
import { useCaseFetchBody } from '~/pages-helper/assessment/survey/caseFetchBody'

const useCaseStoreFilter = () => {
  const store: Record<ID, boolean> = {}
  const push = (ids: ID[]) => ids.forEach((i) => (store[i] = true))
  const filter = (articles: string[]) => {
    const isShowBefore: string[] = []
    const notShowBefore: string[] = []
    Array.from(new Set(articles)).forEach((i) =>
      store[i] ? isShowBefore.push(i) : notShowBefore.push(i)
    )
    const _articles = [...notShowBefore, ...isShowBefore].slice(0, 3)
    push(_articles)
    return _articles
  }
  return { filter }
}
export const useCaseStore = () => {
  const caseBody = useCaseFetchBody()
  const caseStore = ref<Record<string, Article[]>>({})
  const fetchArticles = useFetchArticles()
  const caseStoreFilter = useCaseStoreFilter()
  const ids = ref<string[]>()
  const id = ref('')
  const { fetch } = useRequest(
    async () => {
      if (ids.value?.length) {
        const { data } = await fetchArticles({ ids: ids.value })
        return data!
      }
      return { articles: [] }
    },
    {
      immediate: false,
      success(res) {
        caseStore.value[id.value] = ids.value!.map(
          (_id) => res.articles.find((item) => +item.id === +_id)!
        )
      },
    }
  )
  const fetchArticlesFromES = useFetchArticlesFromES()
  const fetchArticlesFromESBody = computed<CaseBody<any>>(() => {
    const { curator, sort, framework, collection } = caseBody.value!
    const collectionFilter = collection ? {
      "collections": [
        {
          "id": collection,
          "value": 0
        }
      ],
    } : {};
    return {
      index: 'kh',
      doc_type: 'articles',
      search: '',
      sort,
      filtered:  {
        reports: false,
        curator,
        [`framework_elements__${framework}`]: [id.value],
        ...collectionFilter
      }

    }
  })
  const setCaseStore = async (_id: ID): Promise<Article[] | null> => {
    if (!caseBody.value) {
      return null
    }
    id.value = _id + ''
    try {
      const articles = await fetchArticlesFromES(fetchArticlesFromESBody)
      ids.value = caseStoreFilter.filter(
        articles.hits.hits.map((i) => i._source.id + '')
      )
    } catch (e) {
      ids.value = []
    }
    await fetch()
    return caseStore.value[_id]
  }
  const getCaseStore = (_id: ID): Promise<Article[] | null> => {
    if (caseStore.value[_id]) return Promise.resolve(caseStore.value[_id])
    return setCaseStore(_id)
  }
  return {
    getCaseStore,
  }
}
