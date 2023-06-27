export const useFetchUserinfoMock = () => {
  const result = jest.fn()
  const mockSuccess = () => {
    result.mockResolvedValue({
      id: '1',
      nickname: 'Jon',
      firstname: 'Jon',
      lastname: 'Don',
      email: 'Email@google.com',
      picture: 'https://picture',
      sub: '',
      googlePicture: '',
      selectedOrganization: {},
      organizations: [
        {
          jobTitle: 'testing',
          organizationId: '1',
          organizationName: 'organizationName',
          organizationPhotoPath: 'https://org.img',
        },
      ],
      communities: [],
    })
  }
  const mockFail = (errMsg = '') => {
    result.mockRejectedValue(new Error(errMsg))
  }
  return {
    mock: () => () => result(),
    mockSuccess,
    mockFail,
    result,
  }
}

export const useFetchMeMock = () => {
  const result = jest.fn()
  const mockSuccess = () => {
    result.mockReturnValue({
      data: {
        me: { username: 'test', id: '1', email: 'xxx@xx.com' },
      },
      error: null,
    })
  }
  const mockFail = () => {
    result.mockReturnValue({
      data: null,
      error: new Error('mock fail'),
    })
  }
  return {
    mock: () => () => result(),
    mockSuccess,
    mockFail,
    result,
  }
}

export const useCommonGraphqlMock = () => {
  const result = jest.fn()
  const mockSuccess = <T>(data: T) => {
    result.mockReturnValue({
      data,
      error: null,
    })
  }
  const mockFail = (errorMsg: string = 'mock fail') => {
    result.mockReturnValue({
      data: null,
      error: new Error(errorMsg),
    })
  }
  return {
    mock: () => (args: any) => result(args),
    mockSuccess,
    mockFail,
    result,
  }
}

export const useCommonMock = () => {
  const result = jest.fn()
  const mockSuccess = <T>(data: T) => {
    result.mockReturnValue(data)
  }
  const mockFail = (errorMsg: string = 'mock fail') => {
    result.mockRejectedValue(new Error(errorMsg))
  }
  return {
    mock: () => (args: any) => result(args),
    mockSuccess,
    mockFail,
    result,
  }
}
