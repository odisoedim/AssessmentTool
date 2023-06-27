import frameworkElements from '@gql/kh/frameworkElements.gql'
import frameworkElementsByArray from '@gql/kh/frameworkElementsByArray.gql'
import frameworkElement from '@gql/kh/frameworkElement.gql'
import { useQuery } from '@use/apollo'
import { GraphqlFrom } from '~/type/enum'
import { FrameworkElement } from '~/type/frameworkElement'
import { ID } from '~/type/base'

export const useFetchFrameworkElements = () =>
  useQuery<
    { frameworkElements: FrameworkElement[] },
    { id: ID; parent?: ID; isTop?: boolean }
  >({ query: frameworkElements }, GraphqlFrom.KH)

export const useFetchFrameworkElement = () =>
  useQuery<{ frameworkElement: FrameworkElement }>(
    { query: frameworkElement },
    GraphqlFrom.KH
  )

export const useFetchFrameworkElementsByArray = () =>
  useQuery<{ frameworkElements: FrameworkElement[] }, { id: ID[] }>(
    {
      query: frameworkElementsByArray,
    },
    GraphqlFrom.KH
  )
