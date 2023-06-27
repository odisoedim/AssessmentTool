import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import SurveyQuestionDesc from '~/components/templates/SurveyQuestionDesc.vue'
import CeHeading1 from '~/components/atoms/CeHeading1.vue'
import { CircleStrategyStartPage } from '~/pages-helper/assessment/survey/createPage'

let validationResult = ''
const useComputedPages = jest.fn()
const validation = {
  open: jest.fn(() => {
    validationResult = 'open'
  }),
}

const computedPageMock = function () {
  return [
    {
      group: { name: 'string', id: '163' },
      data: {
        id: 11,
        name: 'stringName',
        description: 'string',
        children: ['test1', 'test2', 'test3'],
      },
      type: 0,
      input: {},
    },
  ]
}

const computedPagesMock = function () {
  return {
    computedPages: ref<CircleStrategyStartPage[]>(computedPageMock()),
    pageIndex: ref(0),
    validation,
  }
}

useComputedPages.mockReturnValue(computedPagesMock())

jest.mock('~/pages-helper/assessment/survey/computedPages', () => {
  return {
    useComputedPages: () => useComputedPages(),
  }
})

describe('SurveyQuestionDesc', () => {
  it('can work', () => {
    const wrapper = shallowMount(SurveyQuestionDesc)
    expect(wrapper).toBeTruthy()
  })
  it('has correct structure', () => {
    const wrapper = shallowMount(SurveyQuestionDesc)

    expect(wrapper.findAll('li').length).toBe(3)
    expect(wrapper.findComponent(CeHeading1).text()).toBe('stringName')
    expect(validationResult).toBe('open')
  })
  it('is correct type', async () => {
    const wrapper = shallowMount(SurveyQuestionDesc)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.data.type).toBe(0)
  })
})
