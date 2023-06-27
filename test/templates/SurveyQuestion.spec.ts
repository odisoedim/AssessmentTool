import { ref } from '@nuxtjs/composition-api'
import { shallowMount } from '@vue/test-utils'
import CeCardArea from '~/components/organisms/CaseStudyCardGroup.vue'
import CeInput from '~/components/atoms/CeInput.vue'
import { SubStrategyPage } from '~/pages-helper/assessment/survey/createPage'
import SurveyAnswerRadioGroup from '~/components/organisms/SurveyAnswerRadioGroup.vue'
import SurveyQuestion from '~/components/templates/SurveyQuestion.vue'

let validationResult = ''
const useComputedPages = jest.fn()
const useSurveyInfo = jest.fn()
const validation = {
  close: jest.fn(() => {
    validationResult = 'close'
  }),
  open: jest.fn(() => {
    validationResult = 'open'
  }),
}

const computedPageMock = function (
  option: string = '-1',
  provideExample: string = ''
) {
  return [
    {
      group: { name: 'string', id: '163' },
      data: {
        id: 11,
        name: 'string',
        description: 'string',
        questions: [],
        case: [
          {
            id: '1',
            title: 'title-1',
            main_image: { url: 'https://hello.com' },
            contenttype: {
              name: '',
            },
            locations: [
              {
                name: '',
              },
            ],
            organizations: [
              {
                logo: null,
                name: '',
              },
            ],
            outcome: 'outcome',
            problem: 'problem',
            solution: '',
            summary: '',
            created_at: '',
            updated_at: '',
          },
        ],
        caseLoading: false,
      },
      type: 1,
      input: {
        option,
        provideExample,
      },
    },
  ]
}

const computedPagesMock = function (option: string = '-1') {
  return {
    computedPages: ref<SubStrategyPage[]>(computedPageMock(option)),
    pageIndex: ref(0),
    validation,
  }
}
const surveyInfoMock = {
  id: 1,
}

useSurveyInfo.mockReturnValue(surveyInfoMock)
useComputedPages.mockReturnValue(computedPagesMock())

jest.mock('~/pages-helper/assessment/survey/computedPages', () => {
  return {
    useComputedPages: () => useComputedPages(),
  }
})

jest.mock('~/pages-helper/assessment/survey/surveyInfo', () => {
  return {
    useSurveyInfo: () => useSurveyInfo(),
  }
})
describe('SurveyQuestion', () => {
  it('can work', () => {
    const wrapper = shallowMount(SurveyQuestion)
    expect(wrapper).toBeTruthy()
  })
  it('has case card', () => {
    const wrapper = shallowMount(SurveyQuestion)
    const caseCard = wrapper.findComponent(CeCardArea)
    expect(caseCard).toBeTruthy()
    expect(caseCard.vm.$props.caseList).toEqual(computedPageMock()[0].data.case)
  })
  it('has checkBox for question', () => {
    const wrapper = shallowMount(SurveyQuestion)
    const checkBox = wrapper.findComponent(SurveyAnswerRadioGroup)
    expect(checkBox).toBeTruthy()
    expect(checkBox.vm.$parent.$el.nodeName).toBe('SURVEY-CARD-STUB')
  })
  it('can show checkBox textarea', async () => {
    const wrapper = shallowMount(SurveyQuestion)

    let checkBoxArea = wrapper.findComponent(CeInput)
    expect(checkBoxArea.exists()).toBeFalsy()
    await wrapper.setData({
      data: computedPageMock('1')[0].data,
      input: computedPageMock('1')[0].input,
    })
    await wrapper.vm.$nextTick()
    checkBoxArea = wrapper.findComponent(CeInput)
    expect(checkBoxArea.exists()).toBeTruthy()
  })
  it('validation', async () => {
    const wrapper = shallowMount(SurveyQuestion)
    await wrapper.setData({
      data: computedPageMock('0', 'test')[0].data,
      input: computedPageMock('0', 'test')[0].input,
    })
    expect(validationResult).toBe('open')
    await wrapper.setData({
      data: computedPageMock('1', 'test')[0].data,
      input: computedPageMock('1', 'test')[0].input,
    })
    expect(validationResult).toBe('open')
    await wrapper.setData({
      data: computedPageMock('1')[0].data,
      input: computedPageMock('1')[0].input,
    })
    expect(validationResult).toBe('close')
  })
  it('is correct type', async () => {
    const wrapper = shallowMount(SurveyQuestion)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.subStrategyPage.type).toBe(1)
  })
})
