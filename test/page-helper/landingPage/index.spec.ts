import { mount } from '@vue/test-utils'
import { computed } from '@nuxtjs/composition-api'
import { useCommonGraphqlMock } from '~/test/helper/mockApi'
import { useLandingPageAsync } from '~/pages-helper'
import { nextTick } from '~/test/helper/nextTick'
import { renderLandingPage } from '~/test/helper/mockData'
import { expectText } from '~/test/helper/expect'

const useFetchLandingPage = useCommonGraphqlMock()
jest.mock('~/api/landingPage', () => ({
  useFetchLandingPage: () => useFetchLandingPage.mock(),
}))
describe('landingPage/index.ts', () => {
  it('fetch data', async () => {
    useFetchLandingPage.mockSuccess({ landingPage: renderLandingPage() })
    const wrap = mount({
      template: `<div>
        <div v-if="result">
          <div id='benefit'>{{benefit.length}}</div>
          <div id='carousel'>{{carousel.length}}</div>
          <div id='assessments'>{{assessments.length}}</div>
        </div>
      </div>`,
      setup() {
        const { result } = useLandingPageAsync()
        const benefit = computed(() => result.value?.landingPage?.benefit)
        const carousel = computed(() => result.value?.landingPage?.carousel)
        const assessments = computed(
          () => result.value?.landingPage?.available_assessment
        )
        return { result, benefit, carousel, assessments }
      },
    })
    await nextTick(wrap, 3)
    expectText(wrap.find('#benefit'), '3')
    expectText(wrap.find('#carousel'), '2')
    expectText(wrap.find('#assessments'), '2')
  })
})
