import {
  renderAssessment,
  renderFrameworkElement,
} from '~/test/helper/mockData'
import {
  createDemoCircleStrategyEndPage,
  createDemoSubStrategyPage,
  DemoSurveyPageType,
} from '~/pages-helper/assessment/survey/createPage'

const element = renderFrameworkElement(3)

describe('createPage', () => {
  describe('createSubStrategyPage', () => {
    it('create a sub-strategy page by elements', () => {
      const startPage = createDemoSubStrategyPage(element)
      expect(startPage.type).toBe(DemoSurveyPageType.SubStrategyPage)
      expect(startPage.data.description).toBe('description_3')
      expect(startPage.input.option).toBe('-1')
      expect(startPage.input.provideExample).toBe('')
    })
  })

  describe('createCircleStrategyEndPage', () => {
    it('create a circle-strategy-end page by elements', () => {
      const endPage = createDemoCircleStrategyEndPage(renderAssessment(1), [
        element,
      ])
      expect(endPage.type).toBe(DemoSurveyPageType.CircleStrategyEndPage)
      expect(endPage.data.children[0].id).toBe(3)
    })
  })
})
