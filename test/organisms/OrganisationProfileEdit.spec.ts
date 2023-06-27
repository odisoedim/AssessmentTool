import { shallowMount, mount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import OrganisationProfileEdit from '~/components/organisms/OrganisationProfileEdit.vue'
import ProfileFormItem from '~/components/molecules/ProfileFormItem.vue'
import CeSelect from '~/components/atoms/CeSelect.vue'
import CeButton from '~/components/atoms/CeButton.vue'
import CeWarningText from '~/components/atoms/CeWarningText.vue'
import {
  useProvideEditBoolean,
  useInjectEditBoolean,
} from '~/pages-helper/organisation/useEditBoolean'

const formData = {
  organizationName: 'test',
  foundedYear: '',
  companyDescribe: 'test test test',
  sector: 1,
  industry: 11,
  annualTurnover: '',
  employeesNumber: '',
}

const useInjectProfileData = jest.fn()
const useSaveProfileData = jest.fn()
const update = jest.fn()
jest.mock('~/pages-helper/organisation/useOrganisationProfile', () => {
  return {
    useInjectProfileData: () => useInjectProfileData(),
    useSaveProfileData: () => useSaveProfileData(),
  }
})
useInjectProfileData.mockReturnValue({
  formFillData: ref(formData),
})
useSaveProfileData.mockReturnValue({
  update: () => update(),
})

const useInjectOptions = jest.fn()
jest.mock('~/pages-helper/organisation/useSelectOptions', () => {
  return {
    useInjectOptions: () => useInjectOptions(),
  }
})
useInjectOptions.mockReturnValue({
  genYearOptions: () => {},
  profileOptions: ref({
    revenueOption: [{ name: '1', value: 1 }],
    employeesOption: [{ name: '1', value: 1 }],
  }),
  rowSectorOptions: ref([
    { name: 'sector1', id: 1 },
    { name: 'sector2', id: 2 },
  ]),
  rowIndustryOptions: ref({
    1: [{ name: 'industry1', id: 11 }],
    2: [{ name: 'industry2', id: 21 }],
  }),
})

describe('OrganisationProfileEdit.vue', () => {
  it('can work', () => {
    const wrapper = shallowMount(OrganisationProfileEdit, {
      setup() {
        useProvideEditBoolean()
      },
    })
    expect(wrapper).toBeTruthy()
  })
  it('has 7 formItems', () => {
    const wrapper = shallowMount(OrganisationProfileEdit, {
      setup() {
        useProvideEditBoolean()
      },
    })
    expect(wrapper.findAllComponents(ProfileFormItem).length).toBe(7)
  })
  it('can clear industry selected when change sector', async () => {
    const wrapper = mount(OrganisationProfileEdit, {
      setup() {
        useProvideEditBoolean()
      },
    })
    const formItem = wrapper.findAllComponents(ProfileFormItem)
    const sector = formItem.at(3)
    const industry = formItem.at(4)
    await wrapper.vm.$nextTick()
    expect(sector.find('.select-box__input').text()).toBe('sector1')
    await industry.vm.$nextTick()
    expect(industry.find('.select-box__input').text()).toBe('industry1')
    await sector.findComponent(CeSelect).setData({ value_: '2' })
    expect(industry.find('.select-box__input').text()).toBe('Industry')
  })
  it('can validate when save', async () => {
    const wrapper = shallowMount(OrganisationProfileEdit, {
      setup() {
        useProvideEditBoolean()
      },
    })
    const save = wrapper.findAllComponents(CeButton).at(1)

    await save.trigger('click')
    expect(wrapper.findComponent(CeWarningText).text()).toBe(
      'There are 3 unanswered questions. Please complete all questions.'
    )
  })
  describe('save success and exit', () => {
    it('can close edit form by exit', async () => {
      const wrapper = mount({
        template: `<div><OrganisationProfileEdit /><p id='edit'>{{edit}}</p></div>`,
        components: {
          OrganisationProfileEdit,
        },
        setup() {
          useProvideEditBoolean()
          const { bool: edit, open } = useInjectEditBoolean()
          open && open()
          return {
            edit,
          }
        },
      })
      expect(wrapper.find('#edit').text()).toBe('true')
      const exit = wrapper
        .findComponent(OrganisationProfileEdit)
        .findAllComponents(CeButton)
        .at(0)
      await exit.trigger('click')
      expect(wrapper.find('#edit').text()).toBe('false')
    })
    it('can save success', async () => {
      useInjectProfileData.mockReturnValue({
        formFillData: ref({
          organizationName: 'test',
          companyName: '',
          foundedYear: 2020,
          companyDescribe: 'test test test',
          sector: 1,
          industry: 11,
          annualTurnover: 1,
          employeesNumber: 1,
        }),
      })
      const wrapper = mount({
        template: `<div><OrganisationProfileEdit /><p id='edit'>{{edit}}</p></div>`,
        components: {
          OrganisationProfileEdit,
        },
        setup() {
          useProvideEditBoolean()
          const { bool: edit, open } = useInjectEditBoolean()
          open && open()
          return {
            edit,
          }
        },
      })
      expect(wrapper.find('#edit').text()).toBe('true')
      const save = wrapper
        .findComponent(OrganisationProfileEdit)
        .findAllComponents(CeButton)
        .at(1)
      await save.trigger('click')
      expect(update).toBeCalled()
    })
  })
})
