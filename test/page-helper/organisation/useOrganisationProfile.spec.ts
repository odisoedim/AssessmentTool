import { ref } from '@nuxtjs/composition-api'
import { mount, shallowMount } from '@vue/test-utils'
import {
  useOrganisationProfile,
  useInjectProfileData,
  useSaveProfileData,
} from '~/pages-helper/organisation/useOrganisationProfile'
import { renderFrameworkElements } from '~/test/helper/mockData'
const orgId = 1
const useFetchOrganisationInformation = jest.fn()
const useUpdateOrganisationInformation = jest.fn()
const useUpdateOrganisationName = jest.fn()
jest.mock('~/api/organisation', () => {
  return {
    useFetchOrganisationInformation: () => useFetchOrganisationInformation(),
    useUpdateOrganisationInformation: () => useUpdateOrganisationInformation(),
    useUpdateOrganisationName: () => useUpdateOrganisationName(),
  }
})
useUpdateOrganisationName.mockReturnValue(async () => {
  await 1
  return {}
})
useFetchOrganisationInformation.mockReturnValue(async () => {
  await 1
  return {
    companyName: 'test',
    foundedYear: 2020,
    companyDescribe: 'test test test',
    sector: 1,
    industry: 11,
    annualTurnover: 1,
    employeesNumber: 1,
  }
})
useUpdateOrganisationInformation.mockReturnValue(async () => {
  await 1
  return {
    organizationId: orgId,
    organizationName: 'test',
    companyName: 'test',
    foundedYear: 2020,
    companyDescribe: 'test test test',
    sector: 1,
    industry: 11,
    annualTurnover: 1,
    employeesNumber: 1,
  }
})

const useOrganisation = jest.fn()
jest.mock('@use/useOrganisation', () => {
  return {
    useOrganisation: () => useOrganisation(),
  }
})
useOrganisation.mockReturnValue({ currentOrganisation: ref(orgId) })
const options = jest.fn()
const mockMount = {
  template: `<div></div>`,
  setup() {
    useOrganisationProfile(options())
  },
}
options.mockReturnValue({
  rowSectorOptions: ref([renderFrameworkElements(1)]),
  profileOptions: ref({
    employeesOption: [{ name: 'employees', value: 1 }],
    revenueOption: [{ name: 'revenue', value: 1 }],
  }),
})

const parent = mount(mockMount).vm
describe('useOrganisationProfile', () => {
  it('has data', async () => {
    const wrapper = mount(
      {
        template: `<div>{{Object.values(formFillData).join(',')}}_{{Object.values(profileShowData).join(',')}}</div>`,
        setup() {
          const { formFillData, profileShowData } = useInjectProfileData()
          return {
            formFillData,
            profileShowData,
          }
        },
      },
      {
        parent,
      }
    )
    await wrapper.vm.$nextTick()
    expect(wrapper.find('div').text()).toBe(
      'test,2020,test test test,1,11,1,1_test,2020,test test test,name_1,name_11,revenue,employees'
    )
  })
  it('has no profileShowData', async () => {
    options.mockReturnValue({
      rowSectorOptions: ref([]),
      profileOptions: ref({
        employeesOption: [],
        revenueOption: [],
      }),
    })
    const wrapper = mount(
      {
        template: `<div>{{formFillData}}_{{profileShowData}}</div>`,
        setup() {
          const { formFillData, profileShowData } = useInjectProfileData()
          return {
            formFillData,
            profileShowData,
          }
        },
      },
      {
        parent: shallowMount({
          template: `<div></div>`,
          setup() {
            useOrganisationProfile(options())
          },
        }).vm,
      }
    )
    await wrapper.vm.$nextTick()
    expect(wrapper.find('div').text()).toBe('_{}')
  })
  it('can save', async () => {
    const wrapper = mount(
      {
        template: `<div @click="save">{{JSON.stringify(result)}}</div>`,
        setup() {
          const { update } = useSaveProfileData()
          const result = ref<{}>()
          const save = async () => {
            result.value = await update({
              organizationName: 'test',
              companyName: '',
              foundedYear: 2020,
              companyDescribe: 'test test test',
              sector: 1,
              industry: 11,
              annualTurnover: 1,
              employeesNumber: 1,
            })
          }
          return {
            save,
            result,
          }
        },
      },
      {
        parent,
      }
    )
    await wrapper.vm.$nextTick()
    await wrapper.trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('div').text()).toBe(
      JSON.stringify({
        rawOrganisationProfileData: {
          organizationId: 1,
          organizationName: 'test',
          companyName: 'test',
          foundedYear: 2020,
          companyDescribe: 'test test test',
          sector: 1,
          industry: 11,
          annualTurnover: 1,
          employeesNumber: 1,
        },
      })
    )
  })
})
