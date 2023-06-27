import { useMutate, useQuery } from '@use/apollo'
import createAnswersStore from '@gql/cms/createAnswersStore.gql'
import updateAnswersStore from '@gql/cms/updateAnswersStore.gql'
import answersStore from '@gql/cms/answersStore.gql'
import answersStores from '@gql/cms/answersStores.gql'
import createDemoAnswersStore from '@gql/cms/createDemoAnswersStore.gql'
import updateDemoAnswersStore from '@gql/cms/updateDemoAnswersStore.gql'
import demoAnswersStore from '@gql/cms/demoAnswersStore.gql'
import demoAnswersStores from '@gql/cms/demoAnswersStores.gql'
import { GraphqlFrom } from '~/type/enum'
import {
  AnswersStore,
  AnswersStoreInput,
  DemoAnswersStore,
  DemoAnswersStoreInput,
} from '~/type/schema/answersStore'
import { ID } from '~/type/base'

export const useCreateStore = () =>
  useMutate<
    {
      createAnswersStore: {
        answersStore: AnswersStore
      }
    },
    AnswersStoreInput
  >({ mutation: createAnswersStore }, GraphqlFrom.CMS)

export const useUpdateStore = () =>
  useMutate<
    {
      updateAnswersStore: {
        answersStore: AnswersStore
      }
    },
    Required<AnswersStoreInput>
  >({ mutation: updateAnswersStore }, GraphqlFrom.CMS)

export const useFetchStore = () =>
  useQuery<
    { answersStores: AnswersStore[] },
    { assessment: ID; organisation: ID; surveyId: ID }
  >({ query: answersStore, fetchPolicy: 'no-cache' }, GraphqlFrom.CMS)

export const useFetchStores = () =>
  useQuery<
    { answersStores: AnswersStore[] },
    { assessment: ID[]; organisation: ID }
  >({ query: answersStores, fetchPolicy: 'no-cache' }, GraphqlFrom.CMS)

export const useDemoCreateStore = () =>
  useMutate<
    {
      createDemoAnswersStore: {
        demoAnswersStore: DemoAnswersStore
      }
    },
    DemoAnswersStoreInput
  >({ mutation: createDemoAnswersStore }, GraphqlFrom.CMS)

export const useDemoUpdateStore = () =>
  useMutate<
    {
      updateDemoAnswersStore: {
        demoAnswersStore: DemoAnswersStore
      }
    },
    Required<DemoAnswersStoreInput>
  >({ mutation: updateDemoAnswersStore }, GraphqlFrom.CMS)

export const useDemoFetchStore = () =>
  useQuery<
    { demoAnswersStores: DemoAnswersStore[] },
    { demo_assessment: ID; organisation: ID; surveyId: ID }
  >({ query: demoAnswersStore, fetchPolicy: 'no-cache' }, GraphqlFrom.CMS)

export const useDemoFetchStores = () =>
  useQuery<
    { demoAnswersStores: DemoAnswersStore[] },
    { demo_assessment: ID[]; organisation: ID }
  >({ query: demoAnswersStores, fetchPolicy: 'no-cache' }, GraphqlFrom.CMS)
