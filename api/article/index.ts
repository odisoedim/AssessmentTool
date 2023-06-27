import { useQuery } from '@use/apollo'
import articles from '@gql/kh/articles.gql'
import { usePost } from '@use/useAxios'
import { Article } from '~/type/article'
import { GraphqlFrom, Service } from '~/type/enum'
import { CaseBySort } from '~/type/caseBySort'

export const useFetchArticles = () =>
  useQuery<{ articles: Article[] }>({ query: articles }, GraphqlFrom.KH)

export interface CaseBody<T> {
  index: 'kh'
  doc_type: 'articles'
  search: ''
  sort: number
  filtered: {
    reports: false
    curator: boolean
    collections?: [
      {
        id: string,
        value: number
      }
    ]
  } & T
}

export const useFetchArticlesFromES = () =>
  usePost<CaseBody<any>, CaseBySort>('/prod/search', Service.ES)
