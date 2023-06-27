import { Article } from '~/type/article'
import { Assessment } from '~/type/assessment'
import { FrameworkElement } from '~/type/frameworkElement'
import { ID } from '~/type/base'
export const renderFrameworkElements = (id: ID) => {
  const element = renderFrameworkElement(id)
  element.children = [
    renderFrameworkElement(`${id}1`),
    renderFrameworkElement(`${id}2`),
  ]
  element.children[0].children = [
    renderFrameworkElement(`${id}11`),
    renderFrameworkElement(`${id}12`),
  ]
  element.children[1].children = [
    renderFrameworkElement(`${id}21`),
    renderFrameworkElement(`${id}22`),
    renderFrameworkElement(`${id}23`),
  ]
  return element
}
export const renderFrameworkElement = (
  id: ID,
  frameworkId = '1',
  children: FrameworkElement[] = []
): FrameworkElement => ({
  id,
  name: `name_${id}`,
  description: `description_${id}`,
  children,
  framework: {
    name: `framework_name_${frameworkId}`,
    id: frameworkId,
    description: '',
    short_description: '',
  },
  substrategy_questions: [],
})

export const renderAssessment = (id: ID): Assessment => ({
  id,
  name: `name_${id}`,
  title: `title_${id}`,
  richDescription: `description_${id}`,
  questions: [],
  case_is_approved: true,
  case_sort_by: 'most_relevant',
  framework_id: 'framework_id_' + id,
  tag_id: '',
  collection_id: '',
  language: '',
  frozenBy: `name_${id}`,
  progress: 80,
  score: 23,
  lastEdited: `name_${id}`,
  substrategy_option: {
    name: '',
    not_applicable: '',
    score_0: '',
    score_25: '',
    score_50: '',
    score_75: '',
    score_100: '',
  },
  image: { url: '' },
})

export const renderArticle: (ids: ID[]) => Article[] = (ids: ID[]) =>
  ids.map((i) => ({
    id: i + '',
    title: `title-${i}`,
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
    outcome: '',
    problem: '',
    solution: '',
    summary: '',
    created_at: '',
    updated_at: '',
  }))

export const renderLandingPage = () => {
  return {
    started_image: {
      url: '',
    },
    available_assessment: Array(2).map((_item, index) => {
      return {
        id: index + '',
        image: {
          url: '',
        },
        title: '',
        content: '',
        duration: '',
        key_elements: '',
        button_text: '',
        button_link: '',
      }
    }),
    benefit: Array(3).map((_item, index) => {
      return {
        id: index + '',
        title: '',
        content: '',
        image: {
          url: '',
        },
      }
    }),
    carousel: Array(2).map((_item, index) => {
      return {
        id: index + '',
        title: '',
        description: '',
        avatar: {
          url: '',
        },
      }
    }),
    meta: {
      title: '1',
      robots: '2',
      description: '3',
      canoical: '4',
    },
  }
}
