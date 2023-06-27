import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import CollapseElement from '~/components/molecules/CollapseElement.vue'
import { useSurveyInfoMock } from '~/test/helper/mockInject'

const useSurveyInfo = useSurveyInfoMock()
jest.mock('~/pages-helper/assessment/survey/surveyInfo', () => {
  return {
    useSurveyInfo: () => useSurveyInfo.mock(),
  }
})
useSurveyInfo.mockInfo(1, 2)

const useSurveyResultGroup = jest.fn()
jest.mock('~/pages-helper/assessment/result/surveyResult', () => {
  return {
    useSurveyResultGroup: () => useSurveyResultGroup(),
  }
})
useSurveyResultGroup.mockReturnValue(
  ref([{ name: 'test1' }, { name: 'test2' }])
)

describe('CollapseElement.vue', () => {
  it('can work', () => {
    const wrapper = shallowMount(CollapseElement, {
      mocks: {
        $route: {
          hash: '',
        },
      },
    })
    expect(wrapper).toBeTruthy()
  })
  it('is close default', async () => {
    const wrapper = shallowMount(CollapseElement, {
      mocks: {
        $route: {
          hash: '',
        },
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.expand).toBeFalsy()
  })
  it('can expand from more', async () => {
    const wrapper = shallowMount(CollapseElement, {
      mocks: {
        $route: {
          hash: 'more',
        },
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.expand).toBeTruthy()
  })
})
