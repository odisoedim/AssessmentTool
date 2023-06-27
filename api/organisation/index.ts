import { useMutate, useQuery } from '@use/apollo'
import organisations from '@gql/cms/organisations.gql'
import updateOrganisation from '@gql/cms/updateOrganisation.gql'
import createOrganisation from '@gql/cms/createOrganisation.gql'
import { useGet, usePut } from '@use/useAxios'
import { computed, Ref } from '@nuxtjs/composition-api'
import { Organisation } from '~/type/schema/organisation'
import { Service } from '~/type/enum'

export const useFetchOrganisations = () =>
  useQuery<{ organisations: Organisation[] }, { ids: string[] }>({
    query: organisations,
  })

export const useUpdateOrganisation = () =>
  useMutate<
    { updateOrganisation: { organisation: Organisation } },
    Organisation
  >({
    mutation: updateOrganisation,
  })

export const useCreateOrganisation = () =>
  useMutate<
    { createOrganisation: { organisation: Organisation } },
    Omit<Organisation, 'id'>
  >({
    mutation: createOrganisation,
  })

export const useFetchOrganisationInformation = (id: Ref<string>) =>
  useGet<
    {},
    {
      organizationId: number
      organizationName: string
      companyName: string
      foundedYear: number
      companyDescribe: string
      sector: number
      industry: number
      annualTurnover: number
      employeesNumber: number
    }
  >(
    computed(() => `/api/organization/${id.value}/information`),
    Service.ACCOUNT
  )

export const useUpdateOrganisationInformation = (id: Ref<string>) =>
  usePut<
    {
      companyName: string
      foundedYear: number
      companyDescribe: string
      sector: number
      industry: number
      annualTurnover: number
      employeesNumber: number
    },
    {
      organizationId: number
      organizationName: string
      companyName: string
      foundedYear: number
      companyDescribe: string
      sector: number
      industry: number
      annualTurnover: number
      employeesNumber: number
    }
  >(
    computed(() => `/api/organization/${id.value}/information`),
    Service.ACCOUNT
  )

export const useUpdateOrganisationName = (id: Ref<string>) =>
  usePut<
    {
      organizationName: string
    },
    {}
  >(
    computed(() => `/api/organization/${id.value}`),
    Service.ACCOUNT
  )
