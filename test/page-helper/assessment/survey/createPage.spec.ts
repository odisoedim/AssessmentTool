import {
  renderFrameworkElement,
  renderFrameworkElements,
} from '~/test/helper/mockData'
import {
  createCircleStrategyEndPage,
  createCircleStrategyStartPage,
  createSubStrategyPage,
  SurveyPageType,
} from '~/pages-helper/assessment/survey/createPage'

const elements = renderFrameworkElements(3)

describe('createPage', () => {
  describe('createStartPage', () => {
    it('create a start page by elements', () => {
      const startPage = createCircleStrategyStartPage(elements.children![0])
      expect(startPage.type).toBe(SurveyPageType.CircleStrategyStartPage)
      expect(startPage.group.id).toBe('31')
      expect(startPage.data.description).toBe('description_31')
      expect(startPage.data.children.join('/')).toBe('name_311/name_312')
    })
    it('create a start page by elements', () => {
      const element = renderFrameworkElement(5)
      element.children = null
      const startPage = createCircleStrategyStartPage(element)
      expect(startPage.data.children.join('/')).toBe('')
    })
  })
  describe('createSubStrategyPage', () => {
    it('create a sub-strategy page by elements', () => {
      const startPage = createSubStrategyPage(
        elements.children![1].children![0],
        elements.children![1]
      )
      expect(startPage.type).toBe(SurveyPageType.SubStrategyPage)
      expect(startPage.group.id).toBe('32')
      expect(startPage.data.description).toBe('description_321')
      expect(startPage.input.option).toBe('-1')
      expect(startPage.input.provideExample).toBe('')
    })
  })

  describe('createCircleStrategyEndPage', () => {
    it('create a circle-strategy-end page by elements', () => {
      const startPage = createCircleStrategyEndPage(elements.children![1])
      expect(startPage.type).toBe(SurveyPageType.CircleStrategyEndPage)
      expect(startPage.group.id).toBe('32')
      expect(startPage.data.description).toBe('description_32')
      expect(startPage.data.children.join('/')).toBe(
        'name_321/name_322/name_323'
      )
    })
    it('create a start page by elements', () => {
      const element = renderFrameworkElement(6)
      element.children = null
      const startPage = createCircleStrategyEndPage(element)
      expect(startPage.data.children.join('/')).toBe('')
    })
  })
})
