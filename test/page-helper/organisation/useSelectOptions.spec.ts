import { computed } from '@nuxtjs/composition-api'
import { mount } from '@vue/test-utils'
import {
  useSelectOptions,
  useInjectOptions,
} from '~/pages-helper/organisation/useSelectOptions'
import { useCommonGraphqlMock } from '~/test/helper/mockApi'

const useFetchProfileOptions = useCommonGraphqlMock()
jest.mock('~/api/profileOptions', () => {
  return {
    useFetchProfileOptions: () => useFetchProfileOptions.mock(),
  }
})
useFetchProfileOptions.mockSuccess({
  profileOptions: [
    { id: '1', value: '1', text: '0-10', order: 0, type: 'employees' },
    { id: '2', value: '2', text: '0k-10k', order: 0, type: 'revenue' },
  ],
})

const useFetchFrameworkElements = useCommonGraphqlMock()
jest.mock('~/api/frameworkElements', () => {
  return {
    useFetchFrameworkElements: () => useFetchFrameworkElements.mock(),
  }
})
useFetchFrameworkElements.mockSuccess({
  frameworkElements: [
    { id: '1', name: 'test1', children: [{ id: '11', name: 'test11' }] },
    { id: '2', name: 'test2', children: [{ id: '21', name: 'test21' }] },
  ],
})

describe('useSelectOptions', () => {
  it('has data', async () => {
    const wrapper = mount({
      template: `
      <div>
        <div :id="key" v-for="(value, key) in options" :key="key">
          {{ JSON.stringify(value.value || value) }}
        </div>
      </div>`,
      setup() {
        useSelectOptions()
        const {
          rowSectorOptions,
          rowIndustryOptions,
          profileOptions,
          genYearOptions,
        } = useInjectOptions()
        const yearOptions = genYearOptions(2020, 2022)
        const options = computed(() => ({
          rowSectorOptions,
          rowIndustryOptions,
          profileOptions,
          yearOptions,
        }))
        return {
          options,
        }
      },
    })

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#rowSectorOptions').text()).toBe(
      JSON.stringify([
        { id: '1', name: 'test1', children: [{ id: '11', name: 'test11' }] },
        { id: '2', name: 'test2', children: [{ id: '21', name: 'test21' }] },
      ])
    )
    expect(wrapper.find('#rowIndustryOptions').text()).toBe(
      JSON.stringify({
        '1': [{ id: '11', name: 'test11' }],
        '2': [{ id: '21', name: 'test21' }],
      })
    )
    expect(wrapper.find('#profileOptions').text()).toBe(
      JSON.stringify({
        employeesOption: [{ name: '0-10', value: 1 }],
        revenueOption: [{ name: '0k-10k', value: 2 }],
      })
    )
    expect(wrapper.find('#yearOptions').text()).toBe(
      JSON.stringify([
        { name: '2022', value: 2022 },
        { name: '2021', value: 2021 },
        { name: '2020', value: 2020 },
      ])
    )
  })

  it('gen year correctly desc', () => {
    const wrapper = mount({
      template: `
      <div>
        <div id="yearOptions">
          {{ yearOptions[0].value }},{{yearOptions[yearOptions.length-1].value }}
        </div>
      </div>`,
      setup() {
        useSelectOptions()
        const { genYearOptions } = useInjectOptions()
        const yearOptions = genYearOptions(2020)
        return {
          yearOptions,
        }
      },
    })
    expect(wrapper.find('#yearOptions').text()).toBe(
      `${new Date().getFullYear()},2020`
    )
  })
  it('gen year asc', () => {
    const wrapper = mount({
      template: `
      <div>
        <div id="yearOptions">
          {{ yearOptions[0].value }},{{yearOptions[yearOptions.length-1].value }}
        </div>
      </div>`,
      setup() {
        useSelectOptions()
        const { genYearOptions } = useInjectOptions()
        const yearOptions = genYearOptions(2020, 2022, 'asc')
        return {
          yearOptions,
        }
      },
    })
    expect(wrapper.find('#yearOptions').text()).toBe(
      `2020,${new Date().getFullYear()}`
    )
  })
  it('fail fetch profileOptions', async () => {
    useFetchFrameworkElements.mockFail()
    const wrapper = mount({
      template: `
      <div>
        <div id="result">
          {{ rowSectorOptions }}
        </div>
      </div>`,
      setup() {
        useSelectOptions()
        const { rowSectorOptions } = useInjectOptions()
        return {
          rowSectorOptions,
        }
      },
    })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#result').text()).toBe('')
  })
  it('fail fetch rowIndustryOptions', async () => {
    useFetchFrameworkElements.mockSuccess('')
    useFetchProfileOptions.mockFail()
    const wrapper = mount({
      template: `
      <div>
        <div id="result">
          {{ JSON.stringify(profileOptions) }}
        </div>
      </div>`,
      setup() {
        useSelectOptions()
        const { profileOptions } = useInjectOptions()
        return {
          profileOptions,
        }
      },
    })
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#result').text()).toBe(
      JSON.stringify({
        employeesOption: [],
        revenueOption: [],
      })
    )
  })
})
