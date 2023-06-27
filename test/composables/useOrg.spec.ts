import { mount } from '@vue/test-utils'
import { useOrg } from '@use/useOrg'
import { onMounted } from '@nuxtjs/composition-api'
import {
  useCommonGraphqlMock,
  useFetchUserinfoMock,
} from '~/test/helper/mockApi'
import { expectText } from '~/test/helper/expect'
import { nextTick } from '~/test/helper/nextTick'

const useFetchOrganisations = useCommonGraphqlMock()
const useUpdateOrganisation = useCommonGraphqlMock()
const useCreateOrganisation = useCommonGraphqlMock()
const useFetchUserinfo = useFetchUserinfoMock()
jest.mock('~/api/auth', () => ({
  useFetchUserinfo: () => useFetchUserinfo.mock(),
}))

jest.mock('~/api/organisation', () => ({
  useFetchOrganisations: () => useFetchOrganisations.mock(),
  useUpdateOrganisation: () => useUpdateOrganisation.mock(),
  useCreateOrganisation: () => useCreateOrganisation.mock(),
}))
describe('useOrg', () => {
  it('will fail if fetch user fail', async () => {
    jest.clearAllMocks()
    useFetchUserinfo.mockFail('fetch user fail')
    const wrap = mount({
      template: `<div>{{error}}</div>`,
      setup() {
        const { fetch, error } = useOrg()
        onMounted(async () => await fetch())
        return { error }
      },
    })
    await nextTick(wrap, 3)
    expectText(wrap, 'Error: fetch user fail')
  })
  it('will fail if fetch fetchOrg from CMS fail', async () => {
    jest.clearAllMocks()
    useFetchUserinfo.mockSuccess()
    useFetchOrganisations.mockFail('fetch org from CMS fail')
    const wrap = mount({
      template: `<div>{{error}}</div>`,
      setup() {
        const { fetch, error } = useOrg()
        onMounted(async () => await fetch())
        return { error }
      },
    })
    await nextTick(wrap, 3)
    expectText(wrap, 'Error: fetch org from CMS fail')
  })
  it('will create a org for cms if org of user never register in cms', async () => {
    jest.clearAllMocks()
    useFetchUserinfo.mockSuccess()
    useFetchOrganisations.mockSuccess({
      organisations: [],
    })
    const wrap = mount({
      template: `<div>{{error}}</div>`,
      setup() {
        const { fetch, error } = useOrg()
        onMounted(async () => await fetch())
        return { error }
      },
    })
    await nextTick(wrap, 3)
    expect(useCreateOrganisation.result).toBeCalledTimes(1)
    expect(useCreateOrganisation.result).toBeCalledWith({
      orgId: '1',
      orgName: 'organizationName',
      orgPhoto: 'https://org.img',
    })
  })
  it('will update org for cms if cms already has the org', async () => {
    jest.clearAllMocks()
    useFetchUserinfo.mockSuccess()
    useFetchOrganisations.mockSuccess({
      organisations: [{ id: '120', orgId: '1' }],
    })
    const wrap = mount({
      template: `<div>{{error}}</div>`,
      setup() {
        const { fetch, error } = useOrg()
        onMounted(async () => await fetch())
        return { error }
      },
    })
    await nextTick(wrap, 3)
    expect(useUpdateOrganisation.result).toBeCalledTimes(1)
    expect(useUpdateOrganisation.result).toBeCalledWith({
      id: '120',
      orgId: '1',
      orgName: 'organizationName',
      orgPhoto: 'https://org.img',
    })
  })
})
