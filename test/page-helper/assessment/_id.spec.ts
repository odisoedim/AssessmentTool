import { mount } from '@vue/test-utils'
import { computed, ref } from '@nuxtjs/composition-api'
import { useCommonGraphqlMock } from '~/test/helper/mockApi'
import { useAssessmentAsync } from '~/pages-helper/assessment/_id'
import { nextTick } from '~/test/helper/nextTick'
import {
  renderAssessment,
  renderFrameworkElement,
} from '~/test/helper/mockData'
import { expectText } from '~/test/helper/expect'

const useFetchAssessment = useCommonGraphqlMock()
jest.mock('~/api/assessment', () => ({
  useFetchAssessment: () => useFetchAssessment.mock(),
}))
const useFetchFrameworkElements = useCommonGraphqlMock()
jest.mock('~/api/frameworkElements', () => ({
  useFetchFrameworkElements: () => useFetchFrameworkElements.mock(),
}))
describe('assessment/_id.ts', () => {
  it('fetch data', async () => {
    useFetchAssessment.mockSuccess({ assessment: renderAssessment(12) })
    useFetchFrameworkElements.mockSuccess({
      frameworkElements: [
        renderFrameworkElement(22),
        renderFrameworkElement(23),
      ],
    })
    const wrap = mount({
      template: `<div>
      <div id='assessment'>{{assessmentId}}</div>
      <div id='frameworkElements'>{{frameworkElementsId}}</div>
      </div>`,
      setup() {
        const { result } = useAssessmentAsync(ref('1'))
        const assessmentId = computed(() => result.value?.assessment?.id)
        const frameworkElementsId = computed(() =>
          result.value?.frameworkElements?.map((i) => i.id).join('/')
        )
        return { assessmentId, frameworkElementsId }
      },
    })
    await nextTick(wrap, 3)
    expectText(wrap.find('#assessment'), '12')
    expectText(wrap.find('#frameworkElements'), '22/23')
  })
})
