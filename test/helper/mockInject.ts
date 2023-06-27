import { ref } from '@nuxtjs/composition-api'
import {
  renderAssessment,
  renderFrameworkElement,
} from '~/test/helper/mockData'
import { useBoolean } from '~/composables'
import { ID } from '~/type/base'
import { OrganizationFromAccountSystem } from '~/type/auth'
import { ENUM_QUESTION_TYPE } from '~/type/enum'
import { Question } from '~/type/assessment'

export const useCookieMock = () => {
  const remove = jest.fn()
  const set = jest.fn()
  const get = jest.fn()
  const getAll = jest.fn()
  const removeAll = jest.fn()

  return {
    mock: () => ({
      remove,
      set,
      get,
      getAll,
      removeAll,
    }),
    remove,
    set,
    get,
    getAll,
    removeAll,
  }
}

export const useUserinfoMock = () => {
  const cmsInfo = {
    me: { username: 'test', id: '1', email: 'xxx@xx.com' },
  }
  const userinfo = {
    id: '1',
    nickname: 'Jon',
    firstname: 'Jon',
    lastname: 'Don',
    email: 'Email@google.com',
    picture: 'https://picture',
    sub: '',
    googlePicture: '',
    selectedOrganization: {},
    organizations: [] as OrganizationFromAccountSystem[],
    communities: [],
  }
  const error = jest.fn()
  const loading = jest.fn()
  const result = jest.fn()
  const clearInfo = jest.fn()

  const mockResult = (isLogin = true, _orgId: string | string[] = '1') => {
    if (_orgId) {
      const orgArr = Array.isArray(_orgId) ? _orgId : [_orgId]
      userinfo.organizations = orgArr.map((orgId) => ({
        jobTitle: 'testing',
        organizationId: orgId,
        organizationName: `${orgId}_name`,
        organizationPhotoPath: `https://org_${orgId}.img`,
      }))
    } else {
      userinfo.organizations = []
    }
    result.mockReturnValue(ref(isLogin ? { cmsInfo, userinfo } : null))
  }
  return {
    mock: () => ({
      error: error(),
      loading: loading(),
      result: result(),
      clearInfo,
    }),
    clearInfo,
    mockResult,
    error,
    loading,
    result,
  }
}

export const useSurveyChildrenMock = () => {
  const value = jest.fn()
  const mockValue = (length: number) => {
    value.mockReturnValue(
      ref(
        Array(length)
          .fill(0)
          .map((_, i) => renderFrameworkElement(i))
      )
    )
  }
  return {
    mock: () => value(),
    value,
    mockValue,
  }
}

export const useSurveyStoreMock = () => {
  const save = jest.fn()
  const isCompleted = jest.fn()
  const storeId = jest.fn()
  return {
    save,
    storeId,
    isCompleted,
    mock: () => ({ save, isCompleted: isCompleted(), storeId: storeId() }),
  }
}

export const useSurveyIdsMock = () => {
  const assessmentId = jest.fn()
  const surveyId = jest.fn()
  const mockValue = (_assessmentId: string, _surveyId: string) => {
    assessmentId.mockReturnValue(ref(_assessmentId))
    surveyId.mockReturnValue(ref(_surveyId))
  }
  return {
    mock: () => ({
      assessmentId: assessmentId(),
      surveyId: surveyId(),
    }),
    assessmentId,
    surveyId,
    mockValue,
  }
}

export const useSurveyInfoMock = () => {
  const info = jest.fn()
  const mockInfo = (id: ID, frameworkId: ID) => {
    info.mockReturnValue(
      ref({
        name: `name_${id}`,
        description: `description_${id}`,
        id,
        assessmentName: `assessmentName_${id}`,
        frameworkId,
        frameworkName: `frameworkName_${frameworkId}`,
        children: [],
      })
    )
  }
  return {
    mock: () => info(),
    info,
    mockInfo,
  }
}

export const useEndQuestionsMock = () => {
  const question = jest.fn()
  const mockQuestion = () => {
    question.mockReturnValue(
      ref(<Question[]>[
        {
          text: 'text_1',
          type: ENUM_QUESTION_TYPE.text,
          priority: 500,
          required: false,
          model: 'text_1',
        },
      ])
    )
  }
  return {
    mock: () => question(),
    question,
    mockQuestion,
  }
}

export const useDemoSurveyInfoMock = () => {
  const info = jest.fn()
  const mockInfo = (id: ID, frameworkId: ID) => {
    info.mockReturnValue(
      ref({
        name: `frameworkName_${frameworkId}`,
        description: `description_${id}`,
        id,
        assessmentName: `assessmentName_${id}`,
        frameworkId,
        frameworkName: `frameworkName_${frameworkId}`,
        children: [renderFrameworkElement(1)],
      })
    )
  }
  return {
    mock: () => info(),
    info,
    mockInfo,
  }
}

export const useComputedPagesMock = () => {
  const computedPages = jest.fn()
  const nextPage = jest.fn()
  const prevPage = jest.fn()
  const ready = jest.fn()
  const pageIndex = jest.fn()
  const pagesLength = jest.fn()
  const furthestPage = jest.fn()
  const validation = useBoolean()
  return {
    mock: () => ({
      computedPages: computedPages(),
      nextPage,
      prevPage,
      ready,
      pageIndex: pageIndex(),
      furthestPage: furthestPage(),
      pagesLength: pagesLength(),
      validation,
    }),
    furthestPage,
    computedPages,
    nextPage,
    prevPage,
    ready,
    pageIndex,
    pagesLength,
    validation,
  }
}

export const useCircleStrategyCheckMock = () => {
  const circleStrategies = jest.fn()
  const setCircleStrategies = jest.fn()
  const noCircleStrategies = jest.fn()
  return {
    mock: () => ({
      circleStrategies: circleStrategies(),
      setCircleStrategies,
      noCircleStrategies: noCircleStrategies(),
    }),
    circleStrategies,
    setCircleStrategies,
    noCircleStrategies,
  }
}

export const useAssessmentsMock = () => {
  const value = jest.fn()
  const mockValue = (length: number) => {
    value.mockReturnValue({
      assessments: Array(length)
        .fill(0)
        .map((_, i) => renderAssessment(i)),
      loading: false,
    })
  }
  return {
    mock: () => value(),
    value,
    mockValue,
  }
}

export const useOrganisationMock = () => {
  const organisations = jest.fn()
  const currentOrganisation = jest.fn()
  const setOrganisation = jest.fn()
  const getOrganisation = jest.fn()
  const finishOnboarding = jest.fn()
  const showProfileOnboarding = jest.fn()
  const showAssessmentsOnboarding = jest.fn()
  const getOrganisationStatus = jest.fn()
  return {
    mock: () => ({
      organisations: organisations(),
      currentOrganisation: currentOrganisation(),
      setOrganisation,
      getOrganisation: getOrganisation(),
      finishOnboarding,
      showProfileOnboarding,
      showAssessmentsOnboarding,
      getOrganisationStatus,
    }),
    organisations,
    currentOrganisation,
    setOrganisation,
    getOrganisation,
    finishOnboarding,
    showProfileOnboarding,
    showAssessmentsOnboarding,
    getOrganisationStatus,
  }
}

export const useDateJsMock = () => {
  const format = jest.fn()

  return {
    mock: () => ({
      format,
    }),
    format,
  }
}
